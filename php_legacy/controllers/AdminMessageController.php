<?php
require_once APP_PATH . '/models/Message.php';

class AdminMessageController extends Controller {
    public function index(): void {
        $this->requireAdmin();
        $msg = new Message();
        $this->view('admin.messages.index', ['pageTitle' => 'Messages', 'messages' => $msg->all('created_at','DESC')], 'admin');
    }
    public function show(string $id): void {
        $this->requireAdmin();
        $msg = new Message();
        $item = $msg->find((int)$id);
        if (!$item) { $this->redirect(url('/sso/messages')); return; }
        $msg->markRead((int)$id);
        $this->view('admin.messages.show', ['pageTitle' => 'Pesan dari '.$item['name'], 'message' => $item], 'admin');
    }
    public function delete(string $id): void {
        $this->requireAdmin();
        $msg = new Message();
        $msg->delete((int)$id);
        $this->setFlash('success', 'Pesan berhasil dihapus.');
        $this->redirect(url('/sso/messages'));
    }
}
