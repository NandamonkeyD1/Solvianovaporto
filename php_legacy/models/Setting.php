<?php
class Setting extends Model {
    protected string $table = 'settings';

    public function get(string $key, string $default = ''): string {
        $row = $this->findBy('key', $key);
        return $row ? $row['value'] : $default;
    }

    public function set(string $key, string $value): void {
        $existing = $this->findBy('key', $key);
        if ($existing) {
            $this->update($existing['id'], ['value' => $value]);
        } else {
            $this->create(['key' => $key, 'value' => $value]);
        }
    }

    public function getAll(): array {
        $rows   = $this->all();
        $result = [];
        foreach ($rows as $row) {
            $result[$row['key']] = $row['value'];
        }
        return $result;
    }
}
