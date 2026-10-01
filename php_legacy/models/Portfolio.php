<?php
class Portfolio extends Model {
    protected string $table = 'portfolios';

    public function getFeatured(int $limit = 6): array {
        return $this->raw(
            "SELECT * FROM {$this->table} WHERE is_active = 1 ORDER BY sort_order ASC, created_at DESC LIMIT ?",
            [$limit]
        );
    }

    public function getByCategory(string $category): array {
        return $this->raw(
            "SELECT * FROM {$this->table} WHERE category = ? AND is_active = 1 ORDER BY sort_order ASC, created_at DESC",
            [$category]
        );
    }

    public function getActive(): array {
        return $this->raw(
            "SELECT * FROM {$this->table} WHERE is_active = 1 ORDER BY sort_order ASC, created_at DESC"
        );
    }

    public function getCategories(): array {
        $stmt = $this->db->query("SELECT DISTINCT category FROM {$this->table} WHERE is_active = 1");
        return $stmt->fetchAll(PDO::FETCH_COLUMN);
    }
}
