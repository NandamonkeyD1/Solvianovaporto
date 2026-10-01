<?php
class Service extends Model {
    protected string $table = 'services';

    public function getActive(): array {
        return $this->raw(
            "SELECT * FROM {$this->table} WHERE is_active = 1 ORDER BY sort_order ASC"
        );
    }

    public function getByCategory(string $category): array {
        return $this->raw(
            "SELECT * FROM {$this->table} WHERE category = ? AND is_active = 1 ORDER BY sort_order ASC",
            [$category]
        );
    }

    public function getCategories(): array {
        $stmt = $this->db->query("SELECT DISTINCT category FROM {$this->table} WHERE is_active = 1");
        return $stmt->fetchAll(PDO::FETCH_COLUMN);
    }
}
