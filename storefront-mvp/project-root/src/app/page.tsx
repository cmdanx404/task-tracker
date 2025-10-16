import HeroSection from "../components/HeroSection";
import MobileAppPromo from "../components/MobileApp";
import FeaturedProducts from "../components/FeaturedProducts";
import TrustedBrands from "../components/TrustedBrands";
import ReviewsSection from "../components/ReviewSection";
import ContactForm from "../components/ContactForm";
import FooterSection from "../components/FooterSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <MobileAppPromo />
      <FeaturedProducts />
      <TrustedBrands />
      <ReviewsSection />
      <ContactForm />
      <FooterSection />
    </main>
  );
}
