import { useState, useEffect } from 'react';

const useOfferVerification = (userId, isVerifying) => {
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        if (!userId || !isVerifying || isVerified) return;

        const checkLeads = () => {
            const callbackName = `jsonp_callback_${Math.round(100000 * Math.random())}`;

            window[callbackName] = (leads) => {
                delete window[callbackName];
                if (document.body.contains(script)) document.body.removeChild(script);

                if (leads && leads.length > 0) {
                    const userLead = leads.find(lead => lead.sub1 === userId);
                    if (userLead) setIsVerified(true);
                }
            };

            const script = document.createElement('script');
            script.src = `https://d1y3y09sav47f5.cloudfront.net/public/external/check2.php?testing=0&callback=${callbackName}`;

            script.onerror = () => {
                delete window[callbackName];
                if (document.body.contains(script)) document.body.removeChild(script);
            };

            document.body.appendChild(script);
        };

        checkLeads();
        const intervalId = setInterval(checkLeads, 30000);

        return () => clearInterval(intervalId);
    }, [userId, isVerifying, isVerified]);

    return isVerified;
};

export default useOfferVerification;