// Centralized Vite-based milestone media resolution

const milestoneAssets = import.meta.glob<{ default: string } | string>(
  '/src/assets/milestones/**/*.{png,jpg,jpeg,webp,JPG,JPEG,PNG,pdf,PDF}',
  { eager: true }
);

function extractAssetUrl(mod: unknown): string {
  if (typeof mod === 'string') return mod;
  if (mod && typeof mod === 'object' && 'default' in mod && typeof (mod as { default: unknown }).default === 'string') {
    return (mod as { default: string }).default;
  }
  return '';
}

/**
 * Retrieve the resolved asset URL for a given folder and filename.
 * Example: getMilestoneAssetUrl('2026/sep-kmipn', '1.jpg')
 */
export function getMilestoneAssetUrl(folder: string, filename: string): string | undefined {
  const cleanFolder = folder.replace(/^\/+|\/+$/g, '');
  const cleanFilename = filename.replace(/^\/+/, '');

  // Exact matching first
  for (const path in milestoneAssets) {
    if (path.includes(`/${cleanFolder}/`) && path.endsWith(`/${cleanFilename}`)) {
      return extractAssetUrl(milestoneAssets[path]);
    }
  }

  // Case-insensitive fallback
  const lowerFolder = cleanFolder.toLowerCase();
  const lowerFilename = cleanFilename.toLowerCase();
  for (const path in milestoneAssets) {
    const lowerPath = path.toLowerCase();
    if (lowerPath.includes(`/${lowerFolder}/`) && lowerPath.endsWith(`/${lowerFilename}`)) {
      return extractAssetUrl(milestoneAssets[path]);
    }
  }

  return undefined;
}

/**
 * Retrieve all resolved asset items within a milestone folder.
 */
export function getMilestoneFolderAssets(
  folder: string
): { filename: string; url: string; isPdf: boolean }[] {
  const cleanFolder = folder.replace(/^\/+|\/+$/g, '').toLowerCase();
  const results: { filename: string; url: string; isPdf: boolean }[] = [];

  for (const path in milestoneAssets) {
    const lowerPath = path.toLowerCase();
    if (lowerPath.includes(`/${cleanFolder}/`)) {
      const parts = path.split('/');
      const filename = parts[parts.length - 1];
      const isPdf = lowerPath.endsWith('.pdf');
      const url = extractAssetUrl(milestoneAssets[path]);
      if (url) {
        results.push({ filename, url, isPdf });
      }
    }
  }

  return results;
}
