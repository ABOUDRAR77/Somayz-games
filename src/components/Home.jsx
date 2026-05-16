import HeroSection from './HeroSection';
import DesignPatternsSection from './DesignPatternsSection';
import UserJourneysSection from './UserJourneysSection';
import InspirationSection from './InspirationSection';
import ContactSection from './ContactSection';

export default function Home() {
    return (
        <>
            <HeroSection />
            <DesignPatternsSection />
            <ContactSection />
            <InspirationSection />
        </>
    );
}