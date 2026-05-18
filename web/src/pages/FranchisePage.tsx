import { Helmet } from "react-helmet-async";
import { HeroFranchiseSection } from "../components/organisms/HeroFranchiseSection";
import { TrustBarSection } from "../components/organisms/TrustBarSection";
import { ValuePropsSection } from "../components/organisms/ValuePropsSection";
import { ComparisonSection } from "../components/organisms/ComparisonSection";
import { CostBreakdownTable } from "../components/organisms/CostBreakdownTable";
import { ProcessTimelineSection } from "../components/organisms/ProcessTimelineSection";
import { FounderStorySection } from "../components/organisms/FounderStorySection";
import { FaqSection } from "../components/organisms/FaqSection";
import { SocialProofMosaic } from "../components/organisms/SocialProofMosaic";
import { InquiryFormSection } from "../components/organisms/InquiryFormSection";
import { FooterCtaSection } from "../components/organisms/FooterCtaSection";

export function FranchisePage() {
  return (
    <>
      <Helmet>
        <html lang="ko" />
        <title>가맹모집 — 보증금 0원, 1,100만원으로 시작 | olbaroGALBI</title>
        <meta
          name="description"
          content="가맹비 550만 + 교육비 550만, 보증금 0원, 매월 매출의 1.65% 또는 매월 44만원 로열티, 차액가맹금 0원. 정보공개서 2025.0854 공개. 부산 본사가 직접 상담드립니다."
        />
        <link rel="canonical" href="https://olbarogalbi.web.app/franchise" />
      </Helmet>

      <HeroFranchiseSection />
      <TrustBarSection variant="authority" />
      <ValuePropsSection />
      <ComparisonSection />
      <CostBreakdownTable />
      <ProcessTimelineSection />
      <FounderStorySection />
      <SocialProofMosaic
        eyebrow="Proof · 부산이 먼저 검증"
        title={<>가맹 시작 전, <br />이미 검증된 매장.</>}
        intro="가맹점주가 시작하기 전에 이미 부산 미식 플랫폼·인플루언서·SNS가 검증한 브랜드입니다. 직영 3개 매장 운영 1년 만에 가맹 7개로 확장된 이유입니다."
      />
      <FaqSection />
      <InquiryFormSection />
      <FooterCtaSection />
    </>
  );
}
