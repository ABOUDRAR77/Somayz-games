import { useEffect, useRef } from 'react';

/**
 * Adsterra Native Banner Ad
 * Network: effectivecpmnetwork.com
 * Container ID: c2e680d704d80c49d8752b50714a0a8f
 */
export default function NativeBanner({ className = '' }) {
    const containerRef = useRef(null);
    const scriptLoaded = useRef(false);

    useEffect(() => {
        if (scriptLoaded.current || !containerRef.current) return;
        scriptLoaded.current = true;

        // Create the inner container div that Adsterra targets
        const adContainer = document.createElement('div');
        adContainer.id = 'container-c2e680d704d80c49d8752b50714a0a8f';
        containerRef.current.appendChild(adContainer);

        // Inject the Adsterra script
        const script = document.createElement('script');
        script.async = true;
        script.setAttribute('data-cfasync', 'false');
        script.src = 'https://pl30736726.effectivecpmnetwork.com/c2e680d704d80c49d8752b50714a0a8f/invoke.js';
        containerRef.current.appendChild(script);

        return () => {
            scriptLoaded.current = false;
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={`adsterra-native-banner ${className}`}
            data-ad-type="native-banner"
        />
    );
}
