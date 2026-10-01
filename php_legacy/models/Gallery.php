<?php
class Gallery extends Model {
    protected string $table = 'gallery';

    public function getActive(int $limit = 50): array {
        return $this->raw(
            "SELECT * FROM {$this->table} WHERE is_active = 1 ORDER BY sort_order ASC, created_at DESC LIMIT ?",
            [$limit]
        );
    }
}
