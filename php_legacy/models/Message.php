<?php
class Message extends Model {
    protected string $table = 'messages';

    public function getUnread(): array {
        return $this->raw(
            "SELECT * FROM {$this->table} WHERE is_read = 0 ORDER BY created_at DESC"
        );
    }

    public function countUnread(): int {
        return $this->count("is_read = 0");
    }

    public function markRead(int $id): bool {
        return $this->update($id, ['is_read' => 1]);
    }
}
