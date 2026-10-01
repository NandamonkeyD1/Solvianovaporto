<?php
require_once APP_PATH . '/models/Service.php';

class AdminServicesController extends Controller {
    public function index(): void {
        $this->requireAdmin();
        $service = new Service();
        $this->view('admin.services.index', ['pageTitle' => 'Services', 'services' => $service->all('sort_order','ASC')], 'admin');
    }
    public function create(): void {
        $this->requireAdmin();
        if ($this->isPost()) {
            $data = ['name' => $this->sanitize($this->input('name','')), 'slug' => slug($this->input('name','')), 'category' => $this->sanitize($this->input('category','')), 'short_desc' => $this->sanitize($this->input('short_desc','')), 'description' => $this->input('description',''), 'sort_order' => (int)$this->input('sort_order',0), 'is_active' => 1, 'created_at' => date('Y-m-d H:i:s')];
            $service = new Service();
            $service->create($data);
            $this->setFlash('success', 'Service berhasil ditambahkan.');
            $this->redirect(url('/sso/services'));
            return;
        }
        $this->view('admin.services.form', ['pageTitle' => 'Tambah Service', 'service' => null], 'admin');
    }
    public function edit(string $id): void {
        $this->requireAdmin();
        $service = new Service();
        $item = $service->find((int)$id);
        if (!$item) { $this->redirect(url('/sso/services')); return; }
        if ($this->isPost()) {
            $data = ['name' => $this->sanitize($this->input('name','')), 'slug' => slug($this->input('name','')), 'category' => $this->sanitize($this->input('category','')), 'short_desc' => $this->sanitize($this->input('short_desc','')), 'description' => $this->input('description',''), 'sort_order' => (int)$this->input('sort_order',0), 'is_active' => (int)$this->input('is_active',1), 'updated_at' => date('Y-m-d H:i:s')];
            $service->update((int)$id, $data);
            $this->setFlash('success', 'Service berhasil diperbarui.');
            $this->redirect(url('/sso/services'));
            return;
        }
        $this->view('admin.services.form', ['pageTitle' => 'Edit Service', 'service' => $item], 'admin');
    }
    public function delete(string $id): void {
        $this->requireAdmin();
        $service = new Service();
        $service->delete((int)$id);
        $this->setFlash('success', 'Service berhasil dihapus.');
        $this->redirect(url('/sso/services'));
    }
}
