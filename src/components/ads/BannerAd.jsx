import { useEffect, useRef } from 'react';

/**
 * Adsterra Banner Ad (highperformanceformat.com)
 *
 * Supported sizes:
 *  • "300x250"  – Rectangle
 *  • "468x60"   – Full Banner
 *  • "160x600"  – Wide Skyscraper
 *  • "728x90"   – Leaderboard
 *  • "320x50"   – Mobile Banner
 *  • "160x300"  – Half Page
 *
 * Usage:
 *   <BannerAd size="300x250" />
 *   <BannerAd size="728x90" center />
 */

const BANNER_CONFIGS = {
    '300x250': { key: '5bea5d83c88aedd00eab62842a1c6121', width: 300, height: 250 },
    '468x60':  { key: '765572dbb1bc365c1488337bd56a31d5', width: 468, height: 60  },
    '160x600': { key: 'ae03ae3d6f1285f8236d0c4b87f75062', width: 160, height: 600 },
    '728x90':  { key: '10a351587c70d48cad814b9f12d3da6b', width: 728, height: 90  },
    '320x50':  { key: '623ec3cd2bec01ce2ac6343d3523b1a7', width: 320, height: 50  },
    '160x300': { key: '743e9bff91b70c91279cb26c93950234', width: 160, height: 300 },
};

export default function BannerAd({ size = '300x250', center = false, className = '' }) {
    const wrapperRef = useRef(null);
    const scriptLoaded = useRef(false);

    const config = BANNER_CONFIGS[size];

    useEffect(() => {
        if (!config || scriptLoaded.current || !wrapperRef.current) return;
        scriptLoaded.current = true;

        const { key, width, height } = config;

        // Set atOptions on window before loading the script
        window.atOptions = { key, format: 'iframe', height, width, params: {} };

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://www.highperformanceformat.com/${key}/invoke.js`;
        wrapperRef.current.appendChild(script);

        return () => {
            scriptLoaded.current = false;
            delete window.atOptions;
        };
    }, [config]);

    if (!config) {
        console.warn(`[BannerAd] Unknown size "${size}". Valid: ${Object.keys(BANNER_CONFIGS).join(', ')}`);
        return null;
    }

    const { width, height } = config;

    return (
        <div
            className={`adsterra-banner ${center ? 'mx-auto' : ''} ${className}`}
            style={{ width, height, overflow: 'hidden', flexShrink: 0 }}
            data-ad-size={size}
            ref={wrapperRef}
        />
    );
}
