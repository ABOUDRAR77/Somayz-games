import ReactGA from "react-ga4";

const GA_ID =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_GA_ID) ||
  (typeof process !== "undefined" && process.env?.REACT_APP_GA_ID) ||
  "";

// ─── SET THIS DIFFERENTLY ON EACH SITE ─────────────────────────────────────
// Old Next.js site:  SITE_NAME = "Gamesuki"
// New React site:    SITE_NAME = "GameWave"
const SITE_NAME =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_SITE_NAME) ||
  (typeof process !== "undefined" && process.env?.REACT_APP_SITE_NAME) ||
  "GameWave";

let _initialised = false;

export function initGA() {
  if (typeof window === "undefined") return;
  if (_initialised) return;
  if (!GA_ID) {
    console.warn("[GA] GA ID not set. Analytics disabled.");
    return;
  }

  ReactGA.initialize(GA_ID, {
    gaOptions: { send_page_view: false },
    gtagOptions: { anonymize_ip: true },
  });

  _initialised = true;
}

function isReady() {
  return _initialised && typeof window !== "undefined";
}

/** Injects site_name into every event payload */
function withSite(params = {}) {
  return { ...params, site_name: SITE_NAME };
}

// ─── Page view ───────────────────────────────────────────────────────────────
export function trackPageView(path, title) {
  if (!isReady()) return;
  ReactGA.send({
    hitType: "pageview",
    page: path,
    title: title ?? document.title,
    ...withSite(),
  });
}

// ─── Game events ───────────────────────────────────────────────────────────
export function trackGameView(game) {
  if (!isReady() || !game) return;
  ReactGA.event("view_item", withSite({
    currency: "USD",
    value: 0,
    items: [{
      item_id: game.slug,
      item_name: game.title || game.slug,
      item_category: game.genre || "Game",
      item_variant: game.version || "",
      price: 0,
      quantity: 1,
    }],
  }));
}

export function trackDownloadStart({ slug, name, version, genre, modInfo }) {
  if (!isReady()) return;
  ReactGA.event("download_start", withSite({
    item_id: slug,
    item_name: name,
    item_category: genre || "Game",
    item_variant: version || "latest",
    content_type: modInfo ? "mod_apk" : "apk",
    mod_info: modInfo || "original",
  }));
}

export function trackLockerOpen({ slug, name }) {
  if (!isReady()) return;
  ReactGA.event("locker_open", withSite({ item_id: slug, item_name: name }));
}

export function trackLockerUnlock({ slug, name }) {
  if (!isReady()) return;
  ReactGA.event("locker_unlock", withSite({ item_id: slug, item_name: name }));
}

export function trackSearch(query, resultCount) {
  if (!isReady() || !query) return;
  ReactGA.event("search", withSite({ search_term: query, result_count: resultCount ?? 0 }));
}

export function trackGameCardClick({ slug, name, genre, position, listName }) {
  if (!isReady()) return;
  ReactGA.event("select_item", withSite({
    item_list_id: listName?.toLowerCase().replace(/\s+/g, "_") || "unknown",
    item_list_name: listName || "Unknown List",
    items: [{ item_id: slug, item_name: name, item_category: genre || "Game", index: position ?? 0 }],
  }));
}

export function trackShare({ method, slug, name }) {
  if (!isReady()) return;
  ReactGA.event("share", withSite({ method, content_type: "game", item_id: slug, item_name: name }));
}

export function trackTelegramClick(location = "unknown") {
  if (!isReady()) return;
  ReactGA.event("telegram_click", withSite({ link_location: location }));
}

export function trackBlogRead({ slug, title, tags }) {
  if (!isReady()) return;
  ReactGA.event("blog_read", withSite({ item_id: slug, item_name: title, content_type: "blog_post", item_category: tags?.[0] || "general" }));
}

export function trackCategoryView(category, page = 1) {
  if (!isReady()) return;
  ReactGA.event("category_view", withSite({ item_category: category, page_number: page }));
}

export function trackCollectionView(tag) {
  if (!isReady()) return;
  ReactGA.event("collection_view", withSite({ collection_name: tag }));
}

// Generic escape hatch
export function trackEvent(eventName, params = {}) {
  if (!isReady()) return;
  ReactGA.event(eventName, withSite(params));
}