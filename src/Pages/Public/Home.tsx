import CTASection from "@/components/Layout/PageComponents/Home/CTA";
import Features from "@/components/Layout/PageComponents/Home/Features";
import Hero from "@/components/Layout/PageComponents/Home/Hero";
import HowItWorks from "@/components/Layout/PageComponents/Home/HowItWorks";
import RolesSection from "@/components/Layout/PageComponents/Home/Roles";
const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <Hero />
      {/* Features section */}
      <Features />
      {/* How It Works Section */}
      <HowItWorks />
      {/* InterView Role Section */}
      <RolesSection />
      {/* Call To Action Section */}
      <CTASection />
    </div>
  );
};

export default Home;
