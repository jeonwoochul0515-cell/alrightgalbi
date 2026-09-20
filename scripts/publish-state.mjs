// 재배포 파이프라인이 Firestore 의 발행 상태(site_publish/state)를 읽고 쓰는 도구.
// GitHub Actions 에서만 쓰이며, 서비스 계정(GOOGLE_APPLICATION_CREDENTIALS)으로 동작한다.
//
// 사용법:
//   node scripts/publish-state.mjs should-run      → 배포 필요 여부를 GITHUB_OUTPUT 에 기록
//   node scripts/publish-state.mjs building
//   node scripts/publish-state.mjs done
//   node scripts/publish-state.mjs failed "메시지"
import { appendFileSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

// firebase-admin 은 이 저장소의 의존성이 아니라 밖에서 빌려 쓴다.
// ESM import 는 NODE_PATH 를 무시하므로 createRequire 로 직접 해석한다.
const adminRoot = process.env.FIREBASE_ADMIN_ROOT;
if (!adminRoot) {
  console.error("FIREBASE_ADMIN_ROOT 환경변수가 필요합니다 (firebase-admin 설치 위치).");
  process.exit(1);
}
// 윈도우·리눅스 경로를 모두 안전하게 다룬다 — 디렉터리를 가리키도록 끝에 구분자를 둘다.
const requireAdmin = createRequire(pathToFileURL(resolve(adminRoot) + "/"));
const { initializeApp, applicationDefault, getApps } = requireAdmin("firebase-admin/app");
const { getFirestore, FieldValue } = requireAdmin("firebase-admin/firestore");

const [, , command, message] = process.argv;

if (!getApps().length) {
  initializeApp({
    credential: applicationDefault(),
    projectId: process.env.GCLOUD_PROJECT ?? "olbarogalbi",
  });
}
const db = getFirestore();
const ref = db.doc("site_publish/state");

function output(key, value) {
  console.log(`${key}=${value}`);
  if (process.env.GITHUB_OUTPUT) {
    appendFileSync(process.env.GITHUB_OUTPUT, `${key}=${value}\n`);
  }
}

switch (command) {
  case "should-run": {
    // 코드가 push 된 경우는 콘텐츠와 무관하게 항상 배포한다.
    if (process.env.GITHUB_EVENT_NAME === "push") {
      output("run", "true");
      output("reason", "코드 변경");
      break;
    }
    const snap = await ref.get();
    const state = snap.data() ?? {};
    if (state.status === "requested") {
      output("run", "true");
      output("reason", "관리자 요청");
      break;
    }
    // 수동 실행은 요청이 없어도 강제로 돌린다.
    if (process.env.GITHUB_EVENT_NAME === "workflow_dispatch") {
      output("run", "true");
      output("reason", "수동 실행");
      break;
    }
    output("run", "false");
    output("reason", "요청 없음");
    break;
  }

  case "building": {
    const runUrl =
      process.env.GITHUB_SERVER_URL && process.env.GITHUB_REPOSITORY && process.env.GITHUB_RUN_ID
        ? `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`
        : null;
    await ref.set(
      {
        status: "building",
        startedAt: FieldValue.serverTimestamp(),
        runUrl,
        error: null,
      },
      { merge: true }
    );
    console.log("상태를 building 으로 기록했습니다.");
    break;
  }

  case "done": {
    await ref.set(
      {
        status: "done",
        publishedAt: FieldValue.serverTimestamp(),
        error: null,
      },
      { merge: true }
    );
    console.log("상태를 done 으로 기록했습니다.");
    break;
  }

  case "failed": {
    await ref.set(
      {
        status: "failed",
        error: (message ?? "배포 실패").slice(0, 500),
      },
      { merge: true }
    );
    console.log("상태를 failed 로 기록했습니다.");
    break;
  }

  default:
    console.error(`알 수 없는 명령: ${command}`);
    process.exit(1);
}

process.exit(0);
