/**
 * Lightweight, non-invasive referral attribution detection.
 * Identifies generative search and AI referral origins without cookies,
 * fingerprinting, or tracking bloat.
 */

export type AiReferralSource =
  | 'chatgpt'
  | 'perplexity'
  | 'claude'
  | 'bing'
  | 'google'
  | 'brave'
  | 'github'
  | 'linkedin'
  | 'direct'
  | 'other';

export interface ReferralAttribution {
  source: AiReferralSource;
  referrerHost: string;
  isAiOrSearch: boolean;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

/**
 * Detects whether the current session arrived from a generative search or AI assistant.
 */
export function detectReferralAttribution(): ReferralAttribution {
  if (typeof window === 'undefined') {
    return { source: 'direct', referrerHost: '', isAiOrSearch: false };
  }

  const searchParams = new URLSearchParams(window.location.search);
  const utmSource = searchParams.get('utm_source') || undefined;
  const utmMedium = searchParams.get('utm_medium') || undefined;
  const utmCampaign = searchParams.get('utm_campaign') || undefined;

  const rawReferrer = document.referrer || '';
  if (!rawReferrer) {
    if (utmSource) {
      const lower = utmSource.toLowerCase();
      const isAi = lower.includes('chatgpt') || lower.includes('perplexity') || lower.includes('claude') || lower.includes('copilot');
      return {
        source: isAi ? (lower as AiReferralSource) : 'other',
        referrerHost: '',
        isAiOrSearch: isAi,
        utmSource,
        utmMedium,
        utmCampaign,
      };
    }
    return { source: 'direct', referrerHost: '', isAiOrSearch: false };
  }

  try {
    const parsed = new URL(rawReferrer);
    const host = parsed.hostname.toLowerCase();

    let source: AiReferralSource = 'other';
    let isAiOrSearch = false;

    if (host.includes('chatgpt.com') || host.includes('chat.openai.com')) {
      source = 'chatgpt';
      isAiOrSearch = true;
    } else if (host.includes('perplexity.ai')) {
      source = 'perplexity';
      isAiOrSearch = true;
    } else if (host.includes('claude.ai')) {
      source = 'claude';
      isAiOrSearch = true;
    } else if (host.includes('copilot.microsoft.com') || host.includes('bing.com')) {
      source = 'bing';
      isAiOrSearch = true;
    } else if (host.includes('search.brave.com') || host.includes('brave.com')) {
      source = 'brave';
      isAiOrSearch = true;
    } else if (host.includes('google.')) {
      source = 'google';
      isAiOrSearch = true;
    } else if (host.includes('github.com')) {
      source = 'github';
    } else if (host.includes('linkedin.com')) {
      source = 'linkedin';
    }

    return {
      source,
      referrerHost: host,
      isAiOrSearch,
      utmSource,
      utmMedium,
      utmCampaign,
    };
  } catch {
    return { source: 'other', referrerHost: '', isAiOrSearch: false };
  }
}

/**
 * Helper hook to log or forward AI referral events in development or production.
 */
export function logReferralAttribution() {
  if (typeof window === 'undefined') return;
  const attribution = detectReferralAttribution();

  if (attribution.isAiOrSearch && import.meta.env.DEV) {
    console.info(
      `[AI Referral Attribution] Arrived via ${attribution.source.toUpperCase()} (${attribution.referrerHost})`
    );
  }

  // Dispatch custom DOM event if site owner integrates custom analytics listeners
  window.dispatchEvent(
    new CustomEvent('app:referral', {
      detail: attribution,
    })
  );
}
