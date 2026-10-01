<?php
class App {
    public static function url(string $path = ''): string {
        return rtrim(APP_URL, '/') . '/' . ltrim($path, '/');
    }

    public static function asset(string $path): string {
        return rtrim(APP_URL, '/') . '/assets/' . ltrim($path, '/');
    }

    public static function slug(string $text): string {
        $text = mb_strtolower($text, 'UTF-8');
        $text = preg_replace('/[^a-z0-9\s-]/', '', $text);
        $text = preg_replace('/[\s-]+/', '-', $text);
        return trim($text, '-');
    }

    public static function excerpt(string $text, int $length = 150): string {
        $text = strip_tags($text);
        if (mb_strlen($text) <= $length) return $text;
        return mb_substr($text, 0, $length) . '...';
    }

    public static function timeAgo(string $datetime): string {
        $time = time() - strtotime($datetime);
        if ($time < 60)    return 'Baru saja';
        if ($time < 3600)  return floor($time / 60) . ' menit lalu';
        if ($time < 86400) return floor($time / 3600) . ' jam lalu';
        if ($time < 604800) return floor($time / 86400) . ' hari lalu';
        return date('d M Y', strtotime($datetime));
    }

    public static function readingTime(string $content): int {
        $wordCount = str_word_count(strip_tags($content));
        return max(1, (int) ceil($wordCount / 200));
    }

    public static function formatNumber(int $number): string {
        if ($number >= 1000000) return round($number / 1000000, 1) . 'M';
        if ($number >= 1000)    return round($number / 1000, 1) . 'K';
        return (string) $number;
    }

    public static function csrf(): string {
        if (empty($_SESSION['csrf_token'])) {
            $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        }
        return $_SESSION['csrf_token'];
    }

    public static function verifyCsrf(): bool {
        $token = $_POST['_token'] ?? '';
        return hash_equals($_SESSION['csrf_token'] ?? '', $token);
    }
}
