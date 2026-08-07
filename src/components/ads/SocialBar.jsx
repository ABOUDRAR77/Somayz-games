/**
 * Adsterra Social Bar Ad
 * Network: effectivecpmnetwork.com
 * Renders a floating social-bar widget around the page edges.
 */
import { useEffect, useRef } from 'react';

export default function SocialBar() {
    const loaded = useRef(false);

    useEffect(() => {
        if (loaded.current) return;
        loaded.current = true;

        const script = document.createElement('script');
        script.src = 'https://pl30736729.effectivecpmnetwork.com/d0/4c/6d/d04c6d201157cb07da0df8ec27444d59.js';
        document.body.appendChild(script);

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    // Social bar is injected globally — no local DOM node needed
    return null;
}
