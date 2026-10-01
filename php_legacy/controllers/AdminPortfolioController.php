<?php
require_once APP_PATH . '/models/Portfolio.php';

class AdminPortfolioController extends Controller {

    public function index(): void {
        $this->requireAdmin();
        $portfolio = new Portfolio();
        $this->view('admin.portfolio.index', [
            'pageTitle'  => 'Portfolio',
            'portfolios' => $portfolio->all('sort_order', 'ASC'),
        ], 'admin');
    }

    public function create(): void {
        $this->requireAdmin();
        if ($this->isPost()) {
            $data = [
                'name'        => $this->sanitize($this->input('name', '')),
                'slug'        => slug($this->input('name', '')),
                'category'    => $this->sanitize($this->input('category', '')),
                'short_desc'  => $this->sanitize($this->input('short_desc', '')),
                'description' => $this->input('description', ''),
                'tech_stack'  => $this->sanitize($this->input('tech_stack', '')),
                'client'      => $this->sanitize($this->input('client', '')),
                'year'        => $this->sanitize($this->input('year', date('Y'))),
                'project_url' => $this->sanitize($this->input('project_url', '')),
                'github_url'  => $this->sanitize($this->input('github_url', '')),
                'case_study'  => $this->input('case_study', ''),
                'sort_order'  => (int)$this->input('sort_order', 0),
                'is_active'   => (int)$this->input('is_active', 1),
                'created_at'  => date('Y-m-d H:i:s'),
            ];
            $thumb = $this->uploadFile('thumbnail', 'portfolio');
            if ($thumb) $data['thumbnail'] = $thumb;

            $portfolio = new Portfolio();
            $portfolio->create($data);
            $this->setFlash('success', 'Portfolio berhasil ditambahkan.');
            $this->redirect(url('/sso/portfolio'));
            return;
        }
        $this->view('admin.portfolio.form', ['pageTitle' => 'Tambah Portfolio', 'portfolio' => null], 'admin');
    }

    public function edit(string $id): void {
        $this->requireAdmin();
        $portfolio = new Portfolio();
        $item      = $portfolio->find((int)$id);
        if (!$item) { $this->redirect(url('/sso/portfolio')); return; }

        if ($this->isPost()) {
            $data = [
                'name'        => $this->sanitize($this->input('name', '')),
                'slug'        => slug($this->input('name', '')),
                'category'    => $this->sanitize($this->input('category', '')),
                'short_desc'  => $this->sanitize($this->input('short_desc', '')),
                'description' => $this->input('description', ''),
                'tech_stack'  => $this->sanitize($this->input('tech_stack', '')),
                'client'      => $this->sanitize($this->input('client', '')),
                'year'        => $this->sanitize($this->input('year', date('Y'))),
                'project_url' => $this->sanitize($this->input('project_url', '')),
                'github_url'  => $this->sanitize($this->input('github_url', '')),
                'case_study'  => $this->input('case_study', ''),
                'sort_order'  => (int)$this->input('sort_order', 0),
                'is_active'   => (int)$this->input('is_active', 1),
                'updated_at'  => date('Y-m-d H:i:s'),
            ];
            $thumb = $this->uploadFile('thumbnail', 'portfolio');
            if ($thumb) $data['thumbnail'] = $thumb;

            $portfolio->update((int)$id, $data);
            $this->setFlash('success', 'Portfolio berhasil diperbarui.');
            $this->redirect(url('/sso/portfolio'));
            return;
        }
        $this->view('admin.portfolio.form', ['pageTitle' => 'Edit Portfolio', 'portfolio' => $item], 'admin');
    }

    public function delete(string $id): void {
        $this->requireAdmin();
        $portfolio = new Portfolio();
        $portfolio->delete((int)$id);
        $this->setFlash('success', 'Portfolio berhasil dihapus.');
        $this->redirect(url('/sso/portfolio'));
    }
}
