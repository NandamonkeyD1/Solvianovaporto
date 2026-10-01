<?php
require_once APP_PATH . '/models/Gallery.php';

class GalleryController extends Controller {
    public function index(): void {
        $gallery = new Gallery();
        $this->view('gallery.index', [
            'meta' => [
                'title'       => isEn() ? 'Gallery — Solvia Nova' : 'Galeri — Solvia Nova',
                'description' => isEn()
                    ? 'Documentation of Solvia Nova team activities — from development processes, meetings, to behind-the-scenes moments.'
                    : 'Dokumentasi aktivitas tim Solvia Nova — dari proses development, meeting, hingga momen di balik layar.',
            ],
            'galleries' => $gallery->getActive(60),
        ]);
    }
}
