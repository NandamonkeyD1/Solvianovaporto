<?php
require_once APP_PATH . '/models/Portfolio.php';
require_once APP_PATH . '/models/Article.php';
require_once APP_PATH . '/models/Message.php';
require_once APP_PATH . '/models/Setting.php';
require_once APP_PATH . '/models/Team.php';
require_once APP_PATH . '/models/Gallery.php';
require_once APP_PATH . '/models/Testimonial.php';
require_once APP_PATH . '/models/Service.php';

class AdminController extends Controller {

    public function login(): void {
        if ($this->isAdmin()) {
            $this->redirect(url('/sso/dashboard'));
            return;
        }
        if ($this->isPost()) {
            $username = $this->sanitize($this->input('username', ''));
            $password = $this->input('password', '');

            if (empty($username) || empty($password)) {
                $this->setFlash('error', 'Username dan password wajib diisi.');
                $this->redirect(url('/sso'));
                return;
            }

            $db   = Database::getInstance();
            $stmt = $db->prepare("SELECT * FROM admins WHERE username = ? AND is_active = 1 LIMIT 1");
            $stmt->execute([$username]);
            $admin = $stmt->fetch();

            if ($admin && password_verify($password, $admin['password'])) {
                $_SESSION['admin_id']   = $admin['id'];
                $_SESSION['admin_name'] = $admin['name'];
                $_SESSION['admin_role'] = $admin['role'] ?? 'admin';
                $this->redirect(url('/sso/dashboard'));
            } else {
                $this->setFlash('error', 'Username atau password salah.');
                $this->redirect(url('/sso'));
            }
            return;
        }
        $this->view('admin.login', ['pageTitle' => 'Login Admin'], 'blank');
    }

    public function logout(): void {
        session_destroy();
        $this->redirect(url('/sso'));
    }

    public function dashboard(): void {
        $this->requireAdmin();
        $portfolio   = new Portfolio();
        $article     = new Article();
        $message     = new Message();
        $this->view('admin.dashboard', [
            'pageTitle'       => 'Dashboard',
            'totalPortfolio'  => $portfolio->count(),
            'totalArticle'    => $article->countPublished(),
            'totalMessage'    => $message->count(),
            'unreadMessage'   => $message->countUnread(),
            'recentMessages'  => $message->raw("SELECT * FROM messages ORDER BY created_at DESC LIMIT 5"),
        ], 'admin');
    }

    public function settings(): void {
        $this->requireAdmin();
        $setting = new Setting();
        $this->view('admin.settings', [
            'pageTitle' => 'Settings',
            'settings'  => $setting->getAll(),
        ], 'admin');
    }

    public function updateSettings(): void {
        $this->requireAdmin();
        if (!$this->isPost()) { $this->redirect(url('/sso/settings')); return; }
        $setting = new Setting();
        $fields  = ['site_name','site_email','site_phone','site_whatsapp','site_instagram','site_tiktok','site_youtube','site_linkedin','site_address','social_video_1','social_video_2','social_video_3','trusted_clients','signatory_name','signatory_role'];
        foreach ($fields as $field) {
            $val = $this->sanitize($this->input($field, ''));
            $setting->set($field, $val);
        }

        $sig = $this->uploadFile('signature_image', 'signature');
        if ($sig) {
            $oldSig = $setting->get('signature_image');
            if ($oldSig) {
                $oldFile = ROOT_PATH . '/public/' . $oldSig;
                if (file_exists($oldFile)) unlink($oldFile);
            }
            $setting->set('signature_image', $sig);
        }

        $this->setFlash('success', 'Settings berhasil disimpan.');
        $this->redirect(url('/sso/settings'));
    }
}
