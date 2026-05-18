import { Link } from "react-router-dom";
import { Wordmark } from "../atoms/Wordmark";
import { stores } from "../../data/stores";

export function SiteFooter() {
  return (
    <footer className="bg-[var(--color-charcoal-950)] border-t border-[var(--color-border)] mt-0">
      <div className="container-page py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          <div className="md:col-span-4">
            <Wordmark size="md" showKor />
            <p className="mt-6 text-[13px] text-[var(--color-fg-muted)] leading-[1.85] max-w-[34ch]">
              부산이 길러낸 가성비 한식 갈비 가맹본부.
              <br />
              같이 가요, 올바로.
            </p>
            <a
              href="tel:01057224929"
              className="inline-flex items-center gap-2 mt-6 px-5 py-3 rounded-md bg-[var(--color-ember-500)] text-[var(--color-ivory-50)] text-[14px] font-bold hover:bg-[var(--color-ember-400)] transition-colors min-h-[48px]"
            >
              본사 010-5722-4929
            </a>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-[11px] font-bold text-[var(--color-brass-400)] uppercase tracking-[0.16em] mb-4">
              회사 정보
            </h3>
            <dl className="text-[13px] leading-[2] text-[var(--color-fg-muted)]">
              <div className="grid grid-cols-[60px_1fr] gap-x-2">
                <dt className="text-[var(--color-fg-soft)]">상호</dt>
                <dd className="text-[var(--color-fg)]">올바로갈비</dd>
                <dt className="text-[var(--color-fg-soft)]">대표</dt>
                <dd className="text-[var(--color-fg)]">유종우</dd>
                <dt className="text-[var(--color-fg-soft)]">사업자</dt>
                <dd className="text-[var(--color-fg)]">728-38-01319</dd>
                <dt className="text-[var(--color-fg-soft)]">본사</dt>
                <dd className="text-[var(--color-fg)]">부산광역시 부산진구</dd>
              </div>
            </dl>
            <p className="mt-3 text-[11px] text-[var(--color-fg-soft)] leading-[1.7]">
              개인정보 보호책임자 유종우
              <br />
              frasier2015@naver.com
            </p>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-[11px] font-bold text-[var(--color-brass-400)] uppercase tracking-[0.16em] mb-4">
              직영 매장
            </h3>
            <ul className="text-[13px] leading-[1.9] text-[var(--color-fg-muted)] space-y-3">
              {stores.map((s) => (
                <li key={s.id}>
                  <Link to={`/stores/${s.id}`} className="hover:text-[var(--color-brass-300)]">
                    <span className="text-[var(--color-fg)]">{s.shortName}</span>
                    <br />
                    <span className="text-[11px]">{s.district}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-[11px] font-bold text-[var(--color-brass-400)] uppercase tracking-[0.16em] mb-4">
              가맹·법정
            </h3>
            <ul className="text-[12px] leading-[1.9] text-[var(--color-fg-muted)]">
              <li>
                <Link to="/franchise" className="hover:text-[var(--color-brass-300)]">
                  가맹 모집
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-[var(--color-brass-300)]">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-[var(--color-brass-300)]">
                  이용약관
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--color-border)] text-[11px] text-[var(--color-fg-soft)] leading-[1.85] space-y-2">
          <p>
            정보공개서 등록번호 <strong className="text-[var(--color-brass-400)]">2025.0854</strong> (공정거래위원회)
            · 가맹금 예치기관 신한은행 · 피해보상보험 서울보증보험(주)
          </p>
          <p>
            ※ 정보공개서를 제공받은 날부터 14일이 경과한 후에 가맹계약을 체결하거나
            가맹금을 수령합니다 (가맹사업거래의 공정화에 관한 법률 §7③).
          </p>
          <p>※ 본 사이트는 가맹희망자에게 정보공개서를 요청 시 즉시 제공합니다.</p>
          <p className="pt-2 text-[var(--color-fg-soft)]">© 2026 올바로갈비 · olbaroGALBI</p>
        </div>
      </div>
    </footer>
  );
}
