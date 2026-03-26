import fs from 'fs';
import path from 'path';


const BASE_URL = 'https://saenvirosolutions.com';


const staticRoutes = [
  '/',
  '/about',
  '/services',
  '/gallery',
  '/contact',
  '/team',
  '/client',
  '/blogs'
];


function extractMatches(content, regex) {
  const matches = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    if (match[1]) {
      matches.push(match[1]);
    }
  }
  return matches;
}

async function generateSitemap() {
  console.log('Generating sitemap...');
  try {

    const siteDataPath = path.resolve('src', 'constants', 'siteData.ts');

    if (!fs.existsSync(siteDataPath)) {
      console.error('Error: siteData.ts not found at', siteDataPath);
      process.exit(1);
    }

    const siteDataContent = fs.readFileSync(siteDataPath, 'utf8');
    console.log('Read siteData.ts successfully. Extracting products...');


    const productKeyRegex = /key:\s*['"]([^'"]+)['"]/g;
    const allKeys = extractMatches(siteDataContent, productKeyRegex);


    console.log('Got all keys', allKeys.length);
    const productsArrayMatch = siteDataContent.match(/export const products: Product\[\] = \[([\s\S]*?)\];/);
    console.log('Regex match for products done:', !!productsArrayMatch);
    let productRoutes = [];
    if (productsArrayMatch) {
      const productsContent = productsArrayMatch[1];
      const productKeys = extractMatches(productsContent, productKeyRegex);
      productRoutes = productKeys.map(key => `/product/${key}`);
    } else {
      console.warn('Could not cleanly extract products array. Falling back to all keys (might contain duplicates or incorrect keys).');

      productRoutes = [...new Set(allKeys)].map(key => `/product/${key}`);
    }

    console.log("Extracting blogs...");
    const blogKeyRegex = /key:\s*["']([^"']+)["']/g;
    const blogsArrayMatch = siteDataContent.match(
      /export const blogs = \[([\s\S]*?)\];/
    );
    console.log("Regex match for blogs done:", !!blogsArrayMatch);
    let blogRoutes = [];
    if (blogsArrayMatch) {
      const blogsContent = blogsArrayMatch[1];

      const blogKeys = extractMatches(blogsContent, blogKeyRegex);

      blogRoutes = blogKeys.map(key => `/blog/${key}`);
    } else {
      console.warn("Could not cleanly extract blogs array.");
    }


    const allRoutes = [...staticRoutes, ...productRoutes, ...blogRoutes];


    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
        .map(
          route => `  <url>
    <loc>${BASE_URL}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`
        )
        .join('\n')}
</urlset>`;


    const publicDir = path.resolve('public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir);
    }

    const outputPath = path.resolve(publicDir, 'sitemap.xml');
    fs.writeFileSync(outputPath, sitemapContent);

    console.log(`Sitemap generated successfully at ${outputPath}`);
    console.log(`Include ${allRoutes.length} URLs.`);
  } catch (error) {
    console.error('Failed to generate sitemap:', error);
    process.exit(1);
  }
}

generateSitemap();
