<?php
class Article extends Model {
    protected string $table = 'articles';

    public function getPublished(int $limit = 10, int $offset = 0): array {
        return $this->raw(
            "SELECT a.*, u.name as author_name FROM {$this->table} a 
             LEFT JOIN admins u ON a.author_id = u.id
             WHERE a.status = 'published' 
             ORDER BY a.published_at DESC 
             LIMIT ? OFFSET ?",
            [$limit, $offset]
        );
    }

    public function getBySlug(string $slug): array|false {
        return $this->rawOne(
            "SELECT a.*, u.name as author_name FROM {$this->table} a 
             LEFT JOIN admins u ON a.author_id = u.id
             WHERE a.slug = ? AND a.status = 'published'",
            [$slug]
        );
    }

    public function getByCategory(string $category, int $limit = 10): array {
        return $this->raw(
            "SELECT * FROM {$this->table} WHERE category = ? AND status = 'published' ORDER BY published_at DESC LIMIT ?",
            [$category, $limit]
        );
    }

    public function getRecent(int $limit = 3): array {
        return $this->raw(
            "SELECT * FROM {$this->table} WHERE status = 'published' ORDER BY published_at DESC LIMIT ?",
            [$limit]
        );
    }

    public function countPublished(): int {
        return $this->count("status = 'published'");
    }

    public function getRelated(int $articleId, string $category, int $limit = 3): array {
        return $this->raw(
            "SELECT * FROM {$this->table} WHERE id != ? AND category = ? AND status = 'published' ORDER BY published_at DESC LIMIT ?",
            [$articleId, $category, $limit]
        );
    }
}
