<?php
require_once APP_PATH . '/models/Gallery.php';

class AdminGalleryController extends Controller {
    public function index(): void {
        $this->requireAdmin();
        $gallery = new Gallery();
        $this->view('admin.gallery.index', ['pageTitle' => 'Gallery', 'galleries' => $gallery->all('sort_order','ASC')], 'admin');
    }
    public function create(): void {
        $this->requireAdmin();
        if ($this->isPost()) {
            $image = $this->uploadFile('image', 'gallery');
            if (!$image) { $this->setFlash('error', 'Gagal upload gambar.'); $this->redirect(url('/sso/gallery/create')); return; }
            $gallery = new Gallery();
            $gallery->create(['image' => $image, 'caption' => $this->sanitize($this->input('caption','')), 'sort_order' => (int)$this->input('sort_order',0), 'is_active' => 1, 'created_at' => date('Y-m-d H:i:s')]);
            $this->setFlash('success', 'Foto berhasil diupload.');
            $this->redirect(url('/sso/gallery'));
            return;
        }
        $this->view('admin.gallery.form', ['pageTitle' => 'Upload Foto'], 'admin');
    }
    public function delete(string $id): void {
        $this->requireAdmin();
        $gallery = new Gallery();
        $gallery->delete((int)$id);
        $this->setFlash('success', 'Foto berhasil dihapus.');
        $this->redirect(url('/sso/gallery'));
    }
}
