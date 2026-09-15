import { resolveSiteUrl } from '../src/config/siteConfig';
import { getIndexableRoutes } from '../src/lib/seo/routes';

export const DEFAULT_INDEXNOW_KEY = '7b23e819a6d44f8ea9c140df852a39d1';

/**
 * Submits URLs to the IndexNow protocol (supported by Bing, Yandex, Naver, and Seznam).
 * 
 * Note: IndexNow accelerates crawling and discovery; it does NOT guarantee indexing or ranking.
 */
async function runIndexNow() {
  const isDryRun = process.argv.includes('--dry-run');
  const targetArg = process.argv.find((arg) => arg.startsWith('--url='));

  const rawEnvUrl = process.env.SITE_URL || process.env.VITE_SITE_URL;
  const siteUrl = resolveSiteUrl(rawEnvUrl, true);
  const host = new URL(siteUrl).hostname;

  const key = (process.env.INDEXNOW_KEY || DEFAULT_INDEXNOW_KEY).trim();
  const keyLocation = `${siteUrl}/${key}.txt`;

  // Determine URLs to notify
  let urlsToNotify: string[] = [];

  if (targetArg) {
    const specified = targetArg.replace('--url=', '').trim();
    if (specified.startsWith('http')) {
      urlsToNotify.push(specified);
    } else {
      urlsToNotify.push(`${siteUrl}${specified.startsWith('/') ? '' : '/'}${specified}`);
    }
  } else {
    // Default to all canonical indexable routes
    const routes = getIndexableRoutes();
    urlsToNotify = routes.map((r) => `${siteUrl}${r.path === '/' ? '' : r.path}`);
  }

  console.log('\n========================================');
  console.log('  [IndexNow] Instant Search Engine URL Notification');
  console.log('========================================');
  console.log(`Host:        ${host}`);
  console.log(`Key:         ${key}`);
  console.log(`KeyLocation: ${keyLocation}`);
  console.log(`URLs count:  ${urlsToNotify.length}`);
  if (isDryRun) {
    console.log('Mode:        DRY RUN (no network requests made)');
  }

  const payload = {
    host,
    key,
    keyLocation,
    urlList: urlsToNotify,
  };

  if (isDryRun) {
    console.log('\n[IndexNow] Dry run payload:');
    console.log(JSON.stringify(payload, null, 2));
    console.log('\n[IndexNow] Dry run completed successfully.');
    return;
  }

  const endpoint = 'https://api.indexnow.org/indexnow';

  try {
    console.log(`\n[IndexNow] Submitting ${urlsToNotify.length} URL(s) to ${endpoint}...`);
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok || response.status === 200 || response.status === 202) {
      console.log(`✓ [IndexNow] Success: HTTP ${response.status} (URLs submitted for rapid discovery).`);
    } else {
      const errorText = await response.text();
      console.warn(`! [IndexNow] Notice: HTTP ${response.status} - ${response.statusText}`);
      if (errorText) {
        console.warn(`  Response: ${errorText}`);
      }
    }
  } catch (err: unknown) {
    // Network errors or offline environment must fail gracefully
    const message = err instanceof Error ? err.message : String(err);
    console.warn(`! [IndexNow] Network notification skipped or failed: ${message}`);
    console.warn('  (This is normal in offline dev environments and will not fail the build process)');
  }

  console.log('========================================\n');
}

runIndexNow().catch((err) => {
  console.error('[IndexNow] Unexpected execution error:', err);
  process.exit(0); // Exit 0 to preserve build stability
});
