import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Wordmark } from "../components/atoms/Wordmark";
import { Button } from "../components/atoms/Button";

export function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>페이지를 찾을 수 없습니다 | olbaroGALBI</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <section className="min-h-[100svh] flex items-center justify-center pt-[80px] px-6">
        <div className="text-center max-w-[480px]">
          <Wordmark size="md" />
          <p className="mt-12 text-[clamp(72px,12vw,160px)] font-extrabold leading-[0.9] text-[var(--color-brass-400)] tracking-[-0.04em]">
            404
          </p>
          <h1 className="mt-6 text-[24px] font-bold text-[var(--color-fg-strong)]">
            페이지를 찾을 수 없습니다.
          </h1>
          <p className="mt-4 text-[15px] text-[var(--color-fg-muted)] leading-[1.85]">
            요청하신 페이지가 존재하지 않거나 이동되었습니다.
          </p>
          <div className="mt-10">
            <Link to="/">
              <Button>홈으로 돌아가기</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
