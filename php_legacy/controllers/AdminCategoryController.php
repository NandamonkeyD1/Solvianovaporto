<?php
require_once APP_PATH . '/models/Category.php';

class AdminCategoryController extends Controller {

    public function index(): void {
        $this->requireAdmin();
        $category = new Category();
        $this->view('admin.categories.index', [
            'pageTitle'  => 'Kategori',
            'categories' => $category->getAll(),
            'types'      => ['portfolio', 'service', 'article'],
        ], 'admin');
    }

    public function create(): void {
        $this->requireAdmin();
        if ($this->isPost()) {
            $name  = $this->sanitize($this->input('name', ''));
            $type  = $this->sanitize($this->input('type', 'portfolio'));
            $sort  = (int) $this->input('sort_order', 0);

            if (empty($name)) {
                $this->setFlash('error', 'Nama kategori wajib diisi.');
                $this->redirect(url('/sso/categories/create'));
                return;
            }

            $category = new Category();
            $category->create([
                'name'       => $name,
                'type'       => $type,
                'sort_order' => $sort,
            ]);
            $this->setFlash('success', 'Kategori berhasil ditambahkan.');
            $this->redirect(url('/sso/categories'));
            return;
        }
        $this->view('admin.categories.form', [
            'pageTitle' => 'Tambah Kategori',
            'category'  => null,
            'types'     => ['portfolio', 'service', 'article'],
        ], 'admin');
    }

    public function edit(string $id): void {
        $this->requireAdmin();
        $category = new Category();
        $item     = $category->find((int) $id);
        if (!$item) {
            $this->redirect(url('/sso/categories'));
            return;
        }

        if ($this->isPost()) {
            $name = $this->sanitize($this->input('name', ''));
            $type = $this->sanitize($this->input('type', 'portfolio'));
            $sort = (int) $this->input('sort_order', 0);

            if (empty($name)) {
                $this->setFlash('error', 'Nama kategori wajib diisi.');
                $this->redirect(url('/sso/categories/edit/' . $id));
                return;
            }

            $category->update((int) $id, [
                'name'       => $name,
                'type'       => $type,
                'sort_order' => $sort,
            ]);
            $this->setFlash('success', 'Kategori berhasil diperbarui.');
            $this->redirect(url('/sso/categories'));
            return;
        }

        $this->view('admin.categories.form', [
            'pageTitle' => 'Edit Kategori',
            'category'  => $item,
            'types'     => ['portfolio', 'service', 'article'],
        ], 'admin');
    }

    public function delete(string $id): void {
        $this->requireAdmin();
        $category = new Category();
        $category->delete((int) $id);
        $this->setFlash('success', 'Kategori berhasil dihapus.');
        $this->redirect(url('/sso/categories'));
    }
}
