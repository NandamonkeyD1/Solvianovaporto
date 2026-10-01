<?php
require_once APP_PATH . '/models/Portfolio.php';
require_once APP_PATH . '/models/Article.php';
require_once APP_PATH . '/models/Setting.php';

class SeoController extends Controller {

    public function sitemap(): void {
        $portfolio = new Portfolio();
        $article   = new Article();

        $portfolios = $portfolio->getActive();
        $articles   = $article->getPublished(100);

        header('Content-Type: application/xml; charset=utf-8');
        echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

        // Static pages
        $staticPages = [
            ['/', '1.0', 'daily'],
            ['/about', '0.8', 'monthly'],
            ['/services', '0.8', 'monthly'],
            ['/portfolio', '0.9', 'weekly'],
            ['/case-study', '0.8', 'weekly'],
            ['/gallery', '0.7', 'weekly'],
            ['/team', '0.7', 'monthly'],
            ['/articles', '0.9', 'daily'],
            ['/contact', '0.7', 'monthly'],
        ];

        foreach ($staticPages as [$path, $priority, $freq]) {
            echo "  <url>\n";
            echo "    <loc>" . e(APP_URL . $path) . "</loc>\n";
            echo "    <changefreq>{$freq}</changefreq>\n";
            echo "    <priority>{$priority}</priority>\n";
            echo "  </url>\n";
        }

        // Portfolio pages
        foreach ($portfolios as $p) {
            echo "  <url>\n";
            echo "    <loc>" . e(APP_URL . '/portfolio/' . $p['slug']) . "</loc>\n";
            echo "    <lastmod>" . date('Y-m-d', strtotime($p['updated_at'] ?? $p['created_at'] ?? 'now')) . "</lastmod>\n";
            echo "    <changefreq>monthly</changefreq>\n";
            echo "    <priority>0.8</priority>\n";
            echo "  </url>\n";
        }

        // Article pages
        foreach ($articles as $a) {
            echo "  <url>\n";
            echo "    <loc>" . e(APP_URL . '/articles/' . $a['slug']) . "</loc>\n";
            echo "    <lastmod>" . date('Y-m-d', strtotime($a['updated_at'] ?? $a['published_at'] ?? $a['created_at'] ?? 'now')) . "</lastmod>\n";
            echo "    <changefreq>monthly</changefreq>\n";
            echo "    <priority>0.7</priority>\n";
            echo "  </url>\n";
        }

        echo '</urlset>';
        exit;
    }

    public function robots(): void {
        header('Content-Type: text/plain; charset=utf-8');
        echo "User-agent: *\n";
        echo "Allow: /\n";
        echo "Disallow: /sso/\n";
        echo "Disallow: /assets/uploads/\n";
        echo "\n";
        echo "Sitemap: " . APP_URL . "/sitemap.xml\n";
        exit;
    }
}
