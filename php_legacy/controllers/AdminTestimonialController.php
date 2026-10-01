<?php
require_once APP_PATH . '/models/Testimonial.php';

class AdminTestimonialController extends Controller {
    public function index(): void {
        $this->requireAdmin();
        $t = new Testimonial();
        $this->view('admin.testimonials.index', ['pageTitle' => 'Testimonials', 'testimonials' => $t->all('sort_order','ASC')], 'admin');
    }
    public function create(): void {
        $this->requireAdmin();
        if ($this->isPost()) {
            $data = ['client_name' => $this->sanitize($this->input('client_name','')), 'company' => $this->sanitize($this->input('company','')), 'testimonial' => trim($this->input('testimonial','')), 'rating' => (int)$this->input('rating',5), 'sort_order' => (int)$this->input('sort_order',0), 'is_active' => 1, 'created_at' => date('Y-m-d H:i:s')];
            $photo = $this->uploadFile('photo', 'testimonials');
            if ($photo) $data['photo'] = $photo;
            $t = new Testimonial();
            $t->create($data);
            $this->setFlash('success', 'Testimonial berhasil ditambahkan.');
            $this->redirect(url('/sso/testimonials'));
            return;
        }
        $this->view('admin.testimonials.form', ['pageTitle' => 'Tambah Testimonial', 'testimonial' => null], 'admin');
    }
    public function edit(string $id): void {
        $this->requireAdmin();
        $t = new Testimonial();
        $item = $t->find((int)$id);
        if (!$item) { $this->redirect(url('/sso/testimonials')); return; }
        if ($this->isPost()) {
            $data = ['client_name' => $this->sanitize($this->input('client_name','')), 'company' => $this->sanitize($this->input('company','')), 'testimonial' => trim($this->input('testimonial','')), 'rating' => (int)$this->input('rating',5), 'sort_order' => (int)$this->input('sort_order',0), 'is_active' => (int)$this->input('is_active',1), 'updated_at' => date('Y-m-d H:i:s')];
            $photo = $this->uploadFile('photo', 'testimonials');
            if ($photo) $data['photo'] = $photo;
            $t->update((int)$id, $data);
            $this->setFlash('success', 'Testimonial berhasil diperbarui.');
            $this->redirect(url('/sso/testimonials'));
            return;
        }
        $this->view('admin.testimonials.form', ['pageTitle' => 'Edit Testimonial', 'testimonial' => $item], 'admin');
    }
    public function delete(string $id): void {
        $this->requireAdmin();
        $t = new Testimonial();
        $t->delete((int)$id);
        $this->setFlash('success', 'Testimonial berhasil dihapus.');
        $this->redirect(url('/sso/testimonials'));
    }
}
