import { useEffect, useRef } from 'react';

/**
 * Adsterra Popunder Ad
 * Network: effectivecpmnetwork.com
 * Fires once per page load (popunder behaviour)
 */
export default function Popunder() {
    const loaded = useRef(false);

    useEffect(() => {
        if (loaded.current) return;
        loaded.current = true;

        const script = document.createElement('script');
        script.src = 'https://pl30736727.effectivecpmnetwork.com/5a/fe/47/5afe477d7a36c7755142107cdec91d88.js';
        document.body.appendChild(script);

        return () => {
            // Cleanup: remove the script tag on unmount
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    // Popunders don't have a visible element — they open a new window/tab
    return null;
}
