<?php
class Category extends Model {
    protected string $table = 'categories';

    public function getAll(): array {
        return $this->raw("SELECT * FROM {$this->table} ORDER BY `type` ASC, `sort_order` ASC, `name` ASC");
    }

    public function getByType(string $type): array {
        return $this->raw(
            "SELECT * FROM {$this->table} WHERE `type` = ? ORDER BY `sort_order` ASC, `name` ASC",
            [$type]
        );
    }

    public function getTypes(): array {
        $stmt = $this->db->query("SELECT DISTINCT `type` FROM {$this->table} ORDER BY `type` ASC");
        return $stmt->fetchAll(PDO::FETCH_COLUMN);
    }

    public function getNamesForType(string $type): array {
        $rows = $this->getByType($type);
        return array_column($rows, 'name');
    }
}
