/**
 * Adsterra SmartLink
 *
 * A plain anchor that wraps any child content with the Adsterra smartlink URL.
 * Clicking it opens the smartlink in a new tab.
 *
 * Usage:
 *   <SmartLink>Click here to continue</SmartLink>
 *   <SmartLink className="btn-primary">Get Reward</SmartLink>
 */

const SMARTLINK_URL =
    'https://www.effectivecpmnetwork.com/uqnbsjhnir?key=3c29f64cfb00ae5feb74a53993a1d491';

export default function SmartLink({ children, className = '', ...rest }) {
    return (
        <a
            href={SMARTLINK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
            {...rest}
        >
            {children}
        </a>
    );
}
