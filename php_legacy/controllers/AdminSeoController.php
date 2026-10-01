<?php
require_once APP_PATH . '/models/Setting.php';

class AdminSeoController extends Controller {
    public function index(): void {
        $this->requireAdmin();
        $setting = new Setting();
        $this->view('admin.seo', ['pageTitle' => 'SEO Management', 'settings' => $setting->getAll()], 'admin');
    }
    public function update(): void {
        $this->requireAdmin();
        if (!$this->isPost()) { $this->redirect(url('/sso/seo')); return; }
        $setting = new Setting();
        $fields = ['seo_title','seo_description','seo_keywords','google_analytics','google_search_console'];
        foreach ($fields as $field) {
            $setting->set($field, $this->sanitize($this->input($field, '')));
        }
        $this->setFlash('success', 'SEO settings berhasil disimpan.');
        $this->redirect(url('/sso/seo'));
    }
}
