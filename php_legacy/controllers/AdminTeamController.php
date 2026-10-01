<?php
require_once APP_PATH . '/models/Team.php';

class AdminTeamController extends Controller {
    public function index(): void {
        $this->requireAdmin();
        $team = new Team();
        $this->view('admin.team.index', ['pageTitle' => 'Team', 'members' => $team->all('sort_order','ASC')], 'admin');
    }
    public function create(): void {
        $this->requireAdmin();
        if ($this->isPost()) {
            $data = [
                'name'       => strip_tags(trim($this->input('name', ''))),
                'position'   => strip_tags(trim($this->input('position', ''))),
                'bio'        => strip_tags(trim($this->input('bio', ''))),
                'skills'     => strip_tags(trim($this->input('skills', ''))),
                'sort_order' => (int)$this->input('sort_order', 0),
                'is_active'  => 1,
                'created_at' => date('Y-m-d H:i:s'),
            ];
            $photo = $this->uploadFile('photo', 'team');
            if ($photo) $data['photo'] = $photo;
            $team = new Team();
            $team->create($data);
            $this->setFlash('success', 'Anggota tim berhasil ditambahkan.');
            $this->redirect(url('/sso/team'));
            return;
        }
        $this->view('admin.team.form', ['pageTitle' => 'Tambah Tim', 'member' => null], 'admin');
    }
    public function edit(string $id): void {
        $this->requireAdmin();
        $team = new Team();
        $item = $team->find((int)$id);
        if (!$item) { $this->redirect(url('/sso/team')); return; }
        if ($this->isPost()) {
            $data = [
                'name'       => strip_tags(trim($this->input('name', ''))),
                'position'   => strip_tags(trim($this->input('position', ''))),
                'bio'        => strip_tags(trim($this->input('bio', ''))),
                'skills'     => strip_tags(trim($this->input('skills', ''))),
                'sort_order' => (int)$this->input('sort_order', 0),
                'is_active'  => (int)$this->input('is_active', 1),
                'updated_at' => date('Y-m-d H:i:s'),
            ];
            $photo = $this->uploadFile('photo', 'team');
            if ($photo) $data['photo'] = $photo;
            $team->update((int)$id, $data);
            $this->setFlash('success', 'Data tim berhasil diperbarui.');
            $this->redirect(url('/sso/team'));
            return;
        }
        $this->view('admin.team.form', ['pageTitle' => 'Edit Tim', 'member' => $item], 'admin');
    }
    public function delete(string $id): void {
        $this->requireAdmin();
        $team = new Team();
        $team->delete((int)$id);
        $this->setFlash('success', 'Anggota tim berhasil dihapus.');
        $this->redirect(url('/sso/team'));
    }
}
