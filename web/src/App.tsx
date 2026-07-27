function App() {
  return (
    <div className="page">
      <a href="#main" className="skip-link">본문 바로가기</a>
      <div className="bg" aria-hidden="true" />

      <header className="header">
        <span className="brand-eyebrow">olbaroGALBI · 부산 본사 직영</span>
        <span className="brand-status">
          <span className="dot" aria-hidden="true" />
          Coming Soon
        </span>
      </header>

      <main className="main" id="main">
        <p className="eyebrow-tag">숯불갈비전문점</p>
        <h1 className="wordmark" aria-label="올바로갈비">
          <span className="lower">올바로</span>
          <span className="upper">갈비</span>
        </h1>
        <p className="kor-name">
          <span className="lat-blue">olbaro</span>
          <span className="sep">·</span>
          <span className="lat-red">GALBI</span>
        </p>

        <p className="headline">
          부산이 길러낸 가성비 숯불 갈비.
          <br />
          양념돼지갈비 <strong className="accent-bg">3,500원</strong>
          <span className="unit"> / 100g</span>
        </p>
        <p className="fineprint">
          상차림비 3,000원 별도 (테이블당) · 가격은 매장 사정에 따라 변동될 수 있습니다
        </p>

        <p className="subcopy">
          부산진구 부전 본사 직영을 시작으로 북구 화명, 김해 외동까지 직영 3개점.
          본사가 직접 운영해 검증한 올바른 가격, 올바른 원육.
          <br />
          가맹 모집은 곧 정식 오픈합니다. — 같이 가요, 올바로.
        </p>

        <div className="cta-row">
          <a className="cta cta-primary" href="tel:01057224929">
            본사 010-5722-4929
          </a>
          <a className="cta cta-secondary" href="mailto:frasier2015@naver.com">
            창업 상담 메일
          </a>
        </div>

        <p className="legal-notice">
          ※ 정보공개서를 제공받은 날부터 14일이 경과한 후에 가맹계약을 체결하거나
          가맹금을 수령합니다 (가맹사업거래의 공정화에 관한 법률 §7③).
        </p>
      </main>

      <footer className="footer">
        <div className="footer-cell">
          <strong>HQ</strong>
          <span>부산광역시 부산진구 중앙대로680번가길 81, 1층</span>
        </div>
        <div className="footer-cell">
          <strong>DIRECT STORES</strong>
          <span>서면 · 화명 · 김해외동</span>
        </div>
        <div className="footer-cell">
          <strong>LEGAL</strong>
          <span>
            상호 올바로갈비 · 대표 유종우
            <br />
            사업자등록번호 728-38-01319
            <br />
            정보공개서 등록번호 2025.0854 (공정거래위원회)
            <br />
            가맹금 예치기관 신한은행 · 피해보상보험 서울보증보험(주)
            <br />
            개인정보 보호책임자 유종우 · frasier2015@naver.com
          </span>
        </div>
        <div className="footer-meta">
          © 2026 올바로갈비 · olbaroGALBI
          <br />
          본 사이트는 가맹희망자에게 정보공개서를 요청 시 즉시 제공합니다.
        </div>
      </footer>
    </div>
  );
}

export default App;
