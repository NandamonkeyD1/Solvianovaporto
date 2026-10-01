<?php
require_once APP_PATH . '/models/Article.php';

class AdminArticleController extends Controller {

    public function index(): void {
        $this->requireAdmin();
        $article = new Article();
        $this->view('admin.articles.index', [
            'pageTitle' => 'Articles',
            'articles'  => $article->raw("SELECT * FROM articles ORDER BY created_at DESC"),
        ], 'admin');
    }

    public function create(): void {
        $this->requireAdmin();
        if ($this->isPost()) {
            $title = $this->sanitize($this->input('title', ''));
            $data  = [
                'title'        => $title,
                'slug'         => slug($title),
                'excerpt'      => $this->sanitize($this->input('excerpt', '')),
                'content'      => $this->input('content', ''),
                'category'     => $this->sanitize($this->input('category', '')),
                'tags'         => $this->sanitize($this->input('tags', '')),
                'meta_title'   => $this->sanitize($this->input('meta_title', $title)),
                'meta_desc'    => $this->sanitize($this->input('meta_desc', '')),
                'status'       => $this->input('status', 'draft'),
                'author_id'    => $_SESSION['admin_id'],
                'views'        => 0,
                'published_at' => $this->input('status') === 'published' ? date('Y-m-d H:i:s') : null,
                'created_at'   => date('Y-m-d H:i:s'),
            ];
            $thumb = $this->uploadFile('thumbnail', 'articles');
            if ($thumb) $data['thumbnail'] = $thumb;

            $article = new Article();
            $article->create($data);
            $this->setFlash('success', 'Artikel berhasil ditambahkan.');
            $this->redirect(url('/sso/articles'));
            return;
        }
        $this->view('admin.articles.form', ['pageTitle' => 'Tulis Artikel', 'article' => null], 'admin');
    }

    public function edit(string $id): void {
        $this->requireAdmin();
        $article = new Article();
        $item    = $article->find((int)$id);
        if (!$item) { $this->redirect(url('/sso/articles')); return; }

        if ($this->isPost()) {
            $title = $this->sanitize($this->input('title', ''));
            $data  = [
                'title'        => $title,
                'slug'         => slug($title),
                'excerpt'      => $this->sanitize($this->input('excerpt', '')),
                'content'      => $this->input('content', ''),
                'category'     => $this->sanitize($this->input('category', '')),
                'tags'         => $this->sanitize($this->input('tags', '')),
                'meta_title'   => $this->sanitize($this->input('meta_title', $title)),
                'meta_desc'    => $this->sanitize($this->input('meta_desc', '')),
                'status'       => $this->input('status', 'draft'),
                'updated_at'   => date('Y-m-d H:i:s'),
            ];
            if ($this->input('status') === 'published' && empty($item['published_at'])) {
                $data['published_at'] = date('Y-m-d H:i:s');
            }
            $thumb = $this->uploadFile('thumbnail', 'articles');
            if ($thumb) $data['thumbnail'] = $thumb;

            $article->update((int)$id, $data);
            $this->setFlash('success', 'Artikel berhasil diperbarui.');
            $this->redirect(url('/sso/articles'));
            return;
        }
        $this->view('admin.articles.form', ['pageTitle' => 'Edit Artikel', 'article' => $item], 'admin');
    }

    public function delete(string $id): void {
        $this->requireAdmin();
        $article = new Article();
        $article->delete((int)$id);
        $this->setFlash('success', 'Artikel berhasil dihapus.');
        $this->redirect(url('/sso/articles'));
    }
}
