<?php
class Team extends Model {
    protected string $table = 'team_members';

    public function getActive(): array {
        return $this->raw(
            "SELECT * FROM {$this->table} WHERE is_active = 1 ORDER BY sort_order ASC"
        );
    }
}
