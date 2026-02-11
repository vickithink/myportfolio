import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import TechStackSection from '@/components/TechStackSection';
import PortfolioSection from '@/components/PortfolioSection';
import WhyChooseMe from '@/components/WhyChooseMe';
import WorkProcess from '@/components/WorkProcess';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <TechStackSection />
        <PortfolioSection />
        <WhyChooseMe />
        <WorkProcess />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
