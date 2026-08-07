/**
 * Adsterra Ads — Barrel Export
 *
 * Import everything from one place:
 *
 *   import { BannerAd, NativeBanner, Popunder, SocialBar, SmartLink } from '../components/ads';
 *
 * ─────────────────────────────────────────────────────────────
 *  Component       │ Ad Type              │ Renders DOM?
 * ─────────────────┼──────────────────────┼──────────────────
 *  BannerAd        │ Display banner       │ Yes (iframe)
 *  NativeBanner    │ Native feed banner   │ Yes (div)
 *  Popunder        │ Popunder/new tab     │ No (script only)
 *  SocialBar       │ Floating social bar  │ No (script only)
 *  SmartLink       │ CPA smartlink <a>    │ Yes (<a> tag)
 * ─────────────────────────────────────────────────────────────
 */

export { default as BannerAd }     from './BannerAd';
export { default as NativeBanner } from './NativeBanner';
export { default as Popunder }     from './Popunder';
export { default as SocialBar }    from './SocialBar';
export { default as SmartLink }    from './SmartLink';
