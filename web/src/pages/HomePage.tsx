import { Helmet } from "react-helmet-async";
import { HeroSection } from "../components/organisms/HeroSection";
import { TrustBarSection } from "../components/organisms/TrustBarSection";
import { SloganBandSection } from "../components/organisms/SloganBandSection";
import { BrandStorySection } from "../components/organisms/BrandStorySection";
import { JourneySection } from "../components/organisms/JourneySection";
import { WhyOlbaroSection } from "../components/organisms/WhyOlbaroSection";
import { SignatureMenuSection } from "../components/organisms/SignatureMenuSection";
import { SocialProofMosaic } from "../components/organisms/SocialProofMosaic";
import { StoreLocatorSection } from "../components/organisms/StoreLocatorSection";
import { FranchiseTeaserSection } from "../components/organisms/FranchiseTeaserSection";
import { FooterCtaSection } from "../components/organisms/FooterCtaSection";

export function HomePage() {
  return (
    <>
      <Helmet>
        <html lang="ko" />
        <title>올바로갈비 · olbaroGALBI — 부산 가성비 숯불 갈비</title>
        <meta
          name="description"
          content="부산·경남·대구 10개 매장, 수제양념돼지갈비 100g 3,500원. 보증금 0원, 차액가맹금 0원, 로열티 1.65% 또는 월 44만원 — 정보공개서 2025.0854. 같이 가요, 올바로."
        />
        <link rel="canonical" href="https://olbarogalbi.web.app/" />
      </Helmet>

      <HeroSection />
      <TrustBarSection variant="authority" />
      <SloganBandSection />
      <BrandStorySection />
      <JourneySection />
      <WhyOlbaroSection />
      <SignatureMenuSection />
      <SocialProofMosaic />
      <StoreLocatorSection />
      <FranchiseTeaserSection />
      <FooterCtaSection />
    </>
  );
}
