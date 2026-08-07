import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navigation from './components/Navigation';
import Home from './components/Home';
import GameDetail from './components/GameDetail';
import Footer from './components/Footer';
import { Popunder, SocialBar } from './components/ads';

export default function App() {
    return (
        <BrowserRouter>
            {/* ── Global Adsterra Ads (invisible, fire once) ── */}
            <Popunder />
            <SocialBar />

            <ScrollToTop />
            <div className="min-h-screen bg-white dark:bg-[#0d0d0f] text-black dark:text-white overflow-x-hidden">
                <Navigation />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/:slug" element={<GameDetail />} />
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    );
}