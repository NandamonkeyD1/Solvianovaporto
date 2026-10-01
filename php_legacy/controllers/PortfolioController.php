<?php
require_once APP_PATH . '/models/Portfolio.php';

class PortfolioController extends Controller {

    public function index(): void {
        $portfolio = new Portfolio();
        $this->view('portfolio.index', [
            'meta' => [
                'title'       => 'Portfolio — Solvia Nova',
                'description' => 'Lihat karya-karya terbaik Solvia Nova: website, sistem, branding, dan automation yang telah kami bangun untuk klien.',
            ],
            'portfolios'  => $portfolio->getActive(),
            'categories'  => $portfolio->getCategories(),
        ]);
    }

    public function show(string $slug): void {
        $portfolio = new Portfolio();
        $item = $portfolio->findBy('slug', $slug);
        if (!$item || !$item['is_active']) {
            http_response_code(404);
            $this->view('errors.404', []);
            return;
        }
        $related = $portfolio->getByCategory($item['category']);
        $related = array_filter($related, fn($r) => $r['id'] !== $item['id']);
        $this->view('portfolio.show', [
            'meta' => [
                'title'       => $item['name'] . ' — Portfolio Solvia Nova',
                'description' => $item['short_desc'] ?? SEO_DESC,
                'og_image'    => !empty($item['thumbnail']) ? url($item['thumbnail']) : SEO_OG_IMAGE,
            ],
            'portfolio' => $item,
            'related'   => array_slice(array_values($related), 0, 3),
        ]);
    }

    public function caseStudy(): void {
        $portfolio = new Portfolio();
        $this->view('portfolio.case-study', [
            'meta' => [
                'title'       => 'Case Study — Solvia Nova',
                'description' => 'Studi kasus mendalam tentang bagaimana Solvia Nova memecahkan masalah bisnis nyata dengan solusi digital.',
            ],
            'portfolios' => $portfolio->raw("SELECT * FROM portfolios WHERE is_active = 1 AND case_study IS NOT NULL AND case_study != '' ORDER BY created_at DESC"),
        ]);
    }

    public function caseStudyDetail(string $slug): void {
        $portfolio = new Portfolio();
        $item = $portfolio->findBy('slug', $slug);
        if (!$item) {
            http_response_code(404);
            $this->view('errors.404', []);
            return;
        }
        $this->view('portfolio.case-study-detail', [
            'meta' => [
                'title'       => 'Case Study: ' . $item['name'] . ' — Solvia Nova',
                'description' => $item['short_desc'] ?? SEO_DESC,
            ],
            'portfolio' => $item,
        ]);
    }
}
