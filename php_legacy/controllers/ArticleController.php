<?php
require_once APP_PATH . '/models/Article.php';

class ArticleController extends Controller {

    public function index(): void {
        $article = new Article();
        $page    = max(1, (int)($_GET['page'] ?? 1));
        $result  = $article->paginate($page, 9, "status = 'published'", [], 'published_at', 'DESC');
        $this->view('articles.index', [
            'meta' => [
                'title'       => isEn()
                    ? 'Articles & Insights — Solvia Nova'
                    : 'Artikel & Insights — Solvia Nova',
                'description' => isEn()
                    ? 'Articles and insights on digital transformation, software development, branding, and technology from the Solvia Nova team.'
                    : 'Artikel dan insight seputar digital transformation, software development, branding, dan teknologi dari tim Solvia Nova.',
            ],
            'articles'   => $result['data'],
            'pagination' => $result,
        ]);
    }

    public function category(string $slug): void {
        $article  = new Article();
        $category = ucwords(str_replace('-', ' ', $slug));
        $articles = $article->getByCategory($category);
        $this->view('articles.index', [
            'meta' => [
                'title'       => $category . ' — Articles Solvia Nova',
                'description' => 'Artikel kategori ' . $category . ' dari Solvia Nova.',
            ],
            'articles'        => $articles,
            'pagination'      => null,
            'active_category' => $category,
        ]);
    }

    public function show(string $slug): void {
        $article = new Article();
        $item    = $article->getBySlug($slug);
        if (!$item) {
            http_response_code(404);
            $this->view('errors.404', []);
            return;
        }
        // Update view count
        $article->update($item['id'], ['views' => ($item['views'] ?? 0) + 1]);
        $related = $article->getRelated($item['id'], $item['category'] ?? '', 3);
        $this->view('articles.show', [
            'meta' => [
                'title'       => $item['title'] . ' — Solvia Nova',
                'description' => $item['meta_desc'] ?? excerpt($item['content'] ?? '', 160),
                'og_image'    => !empty($item['thumbnail']) ? url($item['thumbnail']) : SEO_OG_IMAGE,
                'type'        => 'article',
            ],
            'article' => $item,
            'related' => $related,
        ]);
    }
}
