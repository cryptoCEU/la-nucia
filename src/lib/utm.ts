// Capture UTM (and related) params on first page load and persist them
// in sessionStorage so they survive navigation and can be sent with form submissions.

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
  "gclid",
  "fbclid",
  "msclkid",
  "ttclid",
] as const;

const STORAGE_KEY = "lno_utms";
const REFERRER_KEY = "lno_referrer";
const LANDING_KEY = "lno_landing_url";

export type UtmData = Record<string, string>;

export const captureUtms = () => {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const existing: UtmData = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
    let changed = false;
    UTM_KEYS.forEach((k) => {
      const v = params.get(k);
      if (v && !existing[k]) {
        existing[k] = v;
        changed = true;
      }
    });
    if (changed) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    if (!sessionStorage.getItem(REFERRER_KEY)) {
      sessionStorage.setItem(REFERRER_KEY, document.referrer || "");
    }
    if (!sessionStorage.getItem(LANDING_KEY)) {
      sessionStorage.setItem(LANDING_KEY, window.location.href);
    }
  } catch (e) {
    console.warn("captureUtms failed", e);
  }
};

export const getUtms = (): UtmData => {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
};

export const getTrackingPayload = (): Record<string, string> => {
  if (typeof window === "undefined") return {};
  const utms = getUtms();
  const payload: Record<string, string> = { ...utms };
  UTM_KEYS.forEach((k) => {
    if (!payload[k]) payload[k] = "";
  });
  try {
    payload.referrer = sessionStorage.getItem(REFERRER_KEY) || document.referrer || "";
    payload.landing_url = sessionStorage.getItem(LANDING_KEY) || "";
    payload.page_url = window.location.href;
  } catch {
    // ignore
  }
  return payload;
};
