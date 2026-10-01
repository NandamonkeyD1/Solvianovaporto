<?php
class Testimonial extends Model {
    protected string $table = 'testimonials';

    public function getActive(int $limit = 10): array {
        return $this->raw(
            "SELECT * FROM {$this->table} WHERE is_active = 1 ORDER BY sort_order ASC LIMIT ?",
            [$limit]
        );
    }
}
