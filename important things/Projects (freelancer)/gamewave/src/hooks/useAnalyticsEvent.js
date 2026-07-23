import {
  trackDownloadStart,
  trackLockerOpen,
  trackLockerUnlock,
  trackGameView,
  trackGameCardClick,
  trackSearch,
  trackShare,
  trackTelegramClick,
  trackBlogRead,
  trackCategoryView,
  trackCollectionView,
  trackEvent,
} from "../lib/analytics";

const useAnalyticsEvent = () => {
  const sendEvent = (eventName, params = {}) => {
    trackEvent(eventName, params);
  };

  return {
    sendEvent,
    trackDownloadStart,
    trackLockerOpen,
    trackLockerUnlock,
    trackGameView,
    trackGameCardClick,
    trackSearch,
    trackShare,
    trackTelegramClick,
    trackBlogRead,
    trackCategoryView,
    trackCollectionView,
  };
};

export default useAnalyticsEvent;