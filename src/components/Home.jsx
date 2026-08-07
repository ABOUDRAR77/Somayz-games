import HeroSection from './HeroSection';
import DesignPatternsSection from './DesignPatternsSection';
import UserJourneysSection from './UserJourneysSection';
import InspirationSection from './InspirationSection';
import ContactSection from './ContactSection';
import { BannerAd, NativeBanner } from '../components/ads';

export default function Home() {
    return (
        <>
            <HeroSection />

            {/* ── Leaderboard: high-visibility slot right after hero ── */}
            <div className="flex justify-center py-6 px-4">
                <BannerAd size="728x90" center />
            </div>

            <DesignPatternsSection />

            {/* ── Native Banner: blends between games grid and contact ── */}
            <div className="max-w-4xl mx-auto px-4 py-6">
                <NativeBanner />
            </div>

            <ContactSection />
            <InspirationSection />

            {/* ── Mobile Banner: above footer, great for mobile users ── */}
            <div className="flex justify-center py-6 px-4 md:hidden">
                <BannerAd size="320x50" center />
            </div>
        </>
    );
}