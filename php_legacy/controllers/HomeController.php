<?php
require_once APP_PATH . '/models/Portfolio.php';
require_once APP_PATH . '/models/Service.php';
require_once APP_PATH . '/models/Team.php';
require_once APP_PATH . '/models/Gallery.php';
require_once APP_PATH . '/models/Testimonial.php';
require_once APP_PATH . '/models/Article.php';
require_once APP_PATH . '/models/Message.php';
require_once APP_PATH . '/models/Setting.php';

class HomeController extends Controller {

    public function index(): void {
        $portfolio    = new Portfolio();
        $service      = new Service();
        $team         = new Team();
        $testimonial  = new Testimonial();
        $article      = new Article();
        $setting      = new Setting();

        $this->view('home.index', [
            'meta' => [
                'title'       => SEO_TITLE,
                'description' => SEO_DESC,
            ],
            'portfolios'   => $portfolio->getFeatured(6),
            'services'     => $service->getActive(),
            'teams'        => $team->getActive(),
            'testimonials' => $testimonial->getActive(6),
            'articles'     => $article->getRecent(3),
            'settings'     => $setting->getAll(),
        ]);
    }

    public function about(): void {
        $team = new Team();
        $this->view('home.about', [
            'meta' => [
                'title'       => isEn() ? 'About Us — Solvia Nova' : 'Tentang Kami — Solvia Nova',
                'description' => isEn()
                    ? 'Learn more about Solvia Nova. We are a modern digital transformation partner helping businesses grow with premium technology.'
                    : 'Kenali Solvia Nova lebih dalam. Kami adalah partner transformasi digital modern yang membantu bisnis berkembang dengan teknologi premium.',
            ],
            'teams' => $team->getActive(),
        ]);
    }

    public function services(): void {
        $service = new Service();
        $this->view('home.services', [
            'meta' => [
                'title'       => isEn() ? 'Services — Solvia Nova' : 'Layanan — Solvia Nova',
                'description' => isEn()
                    ? 'Premium digital services from Solvia Nova: Website Development, System Development, Branding & Creative, and Automation & AI.'
                    : 'Layanan digital premium dari Solvia Nova: Website Development, System Development, Branding & Creative, dan Automation & AI.',
            ],
            'services'   => $service->getActive(),
            'categories' => $service->getCategories(),
        ]);
    }

    public function serviceDetail(string $slug): void {
        $service = new Service();
        $item    = $service->findBy('slug', $slug);
        if (!$item || !$item['is_active']) {
            http_response_code(404);
            $this->view('errors.404', []);
            return;
        }
        $this->view('home.service-detail', [
            'meta' => [
                'title'       => $item['name'] . ' — Solvia Nova',
                'description' => $item['short_desc'] ?? SEO_DESC,
            ],
            'service' => $item,
        ]);
    }

    public function team(): void {
        $team = new Team();
        $this->view('home.team', [
            'meta' => [
                'title'       => isEn() ? 'Our Team — Solvia Nova' : 'Tim Kami — Solvia Nova',
                'description' => isEn()
                    ? 'Meet the professional Solvia Nova team experienced in digital solutions, software development, and modern branding.'
                    : 'Tim profesional Solvia Nova yang berpengalaman dalam digital solution, software development, dan branding modern.',
            ],
            'teams' => $team->getActive(),
        ]);
    }

    public function switchLang(string $code): void {
        $allowed = ['id', 'en'];
        if (in_array($code, $allowed, true)) {
            $_SESSION['lang'] = $code;
        }
        // Redirect back to referrer or home
        $referer = $_SERVER['HTTP_REFERER'] ?? url('/');
        // Prevent open redirect – only allow same-host redirects
        $parsed = parse_url($referer);
        $host   = $parsed['host'] ?? '';
        $serverHost = $_SERVER['HTTP_HOST'] ?? '';
        if ($host === $serverHost) {
            $this->redirect($referer);
        } else {
            $this->redirect(url('/'));
        }
    }

    public function contact(): void {
        require_once APP_PATH . '/models/Setting.php';
        $setting = new Setting();
        $this->view('home.contact', [
            'meta' => [
                'title'       => isEn() ? 'Contact — Solvia Nova' : 'Kontak — Solvia Nova',
                'description' => isEn()
                    ? 'Contact Solvia Nova for a free consultation. We are ready to help with your digital business transformation.'
                    : 'Hubungi Solvia Nova untuk konsultasi gratis. Kami siap membantu transformasi digital bisnis Anda.',
            ],
            'settings' => $setting->getAll(),
        ]);
    }

    public function sendContact(): void {
        if (!$this->isPost()) {
            $this->redirect(url('/contact'));
            return;
        }

        $name    = $this->sanitize($this->input('name', ''));
        $email   = filter_var($this->input('email', ''), FILTER_SANITIZE_EMAIL);
        $phone   = $this->sanitize($this->input('phone', ''));
        $subject = $this->sanitize($this->input('subject', ''));
        $message = $this->sanitize($this->input('message', ''));

        if (empty($name) || empty($email) || empty($message)) {
            $this->setFlash('error', isEn()
                ? 'Please fill in all required fields.'
                : 'Mohon lengkapi semua field yang diperlukan.');
            $this->redirect(url('/contact'));
            return;
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $this->setFlash('error', isEn()
                ? 'Invalid email format.'
                : 'Format email tidak valid.');
            $this->redirect(url('/contact'));
            return;
        }

        $msg = new Message();
        $msg->create([
            'name'       => $name,
            'email'      => $email,
            'phone'      => $phone,
            'subject'    => $subject,
            'message'    => $message,
            'is_read'    => 0,
            'created_at' => date('Y-m-d H:i:s'),
        ]);

        $this->setFlash('success', isEn()
            ? 'Your message has been sent successfully. We will get back to you soon!'
            : 'Pesan Anda berhasil dikirim. Kami akan segera menghubungi Anda!');
        $this->redirect(url('/contact'));
    }
}
