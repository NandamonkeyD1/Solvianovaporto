<?php

// ============================================================
// LANGUAGE / TRANSLATION HELPERS
// ============================================================

/**
 * Get current active language ('id' or 'en').
 */
function lang(): string {
    return $_SESSION['lang'] ?? 'id';
}

/**
 * Translate a key. Supports simple string replacement via :placeholder.
 * Falls back to the key itself if not found.
 *
 * @param  string $key
 * @param  array  $replace  e.g. ['name' => 'Solvia Nova']
 * @return string
 */
function __(string $key, array $replace = []): mixed {
    static $translations = [];
    $currentLang = lang();

    if (!isset($translations[$currentLang])) {
        $file = APP_PATH . '/lang/' . $currentLang . '.php';
        $translations[$currentLang] = file_exists($file) ? require $file : [];
    }

    $line = $translations[$currentLang][$key] ?? $key;

    if (is_string($line) && !empty($replace)) {
        foreach ($replace as $k => $v) {
            $line = str_replace(':' . $k, $v, $line);
        }
    }

    return $line;
}

/**
 * Like __() but also HTML-escapes the output.
 */
function __e(string $key, array $replace = []): string {
    $val = __($key, $replace);
    return is_string($val) ? e($val) : '';
}

/**
 * Check if current language is English.
 */
function isEn(): bool {
    return lang() === 'en';
}

/**
 * Check if current language is Indonesian.
 */
function isId(): bool {
    return lang() === 'id';
}

// ============================================================
// ORIGINAL HELPERS
// ============================================================

function url(string $path = ''): string {
    return App::url($path);
}

function asset(string $path): string {
    return App::asset($path);
}

function e(string $value): string {
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}

function slug(string $text): string {
    return App::slug($text);
}

function excerpt(string $text, int $length = 150): string {
    return App::excerpt($text, $length);
}

function csrf_field(): string {
    return '<input type="hidden" name="_token" value="' . App::csrf() . '">';
}

function csrf_token(): string {
    return App::csrf();
}

function old(string $key, string $default = ''): string {
    return e($_SESSION['old'][$key] ?? $default);
}

function flash(string $type, string $message): void {
    $_SESSION['flash'] = ['type' => $type, 'message' => $message];
}

function get_flash(): ?array {
    if (isset($_SESSION['flash'])) {
        $flash = $_SESSION['flash'];
        unset($_SESSION['flash']);
        return $flash;
    }
    return null;
}

function is_active(string $path): string {
    $current = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $current = '/' . trim($current, '/');
    $check   = '/' . trim($path, '/');
    return ($current === $check || ($check !== '/' && str_starts_with($current, $check))) ? 'active' : '';
}

function format_date(string $date, string $format = 'd M Y'): string {
    return date($format, strtotime($date));
}

function reading_time(string $content): int {
    return App::readingTime($content);
}

function time_ago(string $datetime): string {
    return App::timeAgo($datetime);
}

function component(string $name, array $data = []): void {
    extract($data);
    $file = APP_PATH . '/views/components/' . $name . '.php';
    if (file_exists($file)) require $file;
}

function seo_meta(array $meta = []): void {
    $title       = $meta['title']       ?? SEO_TITLE;
    $description = $meta['description'] ?? SEO_DESC;
    $keywords    = $meta['keywords']    ?? SEO_KEYWORDS;
    $ogImage     = $meta['og_image']    ?? SEO_OG_IMAGE;
    $canonical   = $meta['canonical']   ?? (APP_URL . parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
    $type        = $meta['type']        ?? 'website';

    echo '<title>' . e($title) . '</title>' . "\n";
    echo '<meta name="description" content="' . e($description) . '">' . "\n";
    echo '<meta name="keywords" content="' . e($keywords) . '">' . "\n";
    echo '<link rel="canonical" href="' . e($canonical) . '">' . "\n";
    echo '<meta property="og:title" content="' . e($title) . '">' . "\n";
    echo '<meta property="og:description" content="' . e($description) . '">' . "\n";
    echo '<meta property="og:image" content="' . e($ogImage) . '">' . "\n";
    echo '<meta property="og:url" content="' . e($canonical) . '">' . "\n";
    echo '<meta property="og:type" content="' . e($type) . '">' . "\n";
    echo '<meta property="og:site_name" content="' . e(APP_NAME) . '">' . "\n";
    echo '<meta name="twitter:card" content="summary_large_image">' . "\n";
    echo '<meta name="twitter:title" content="' . e($title) . '">' . "\n";
    echo '<meta name="twitter:description" content="' . e($description) . '">' . "\n";
    echo '<meta name="twitter:image" content="' . e($ogImage) . '">' . "\n";
}
