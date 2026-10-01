<?php
/**
 * Script one-time: Download Tailwind CSS standalone & Alpine.js ke folder assets/js
 * Jalankan SEKALI dari CLI: php download_assets.php
 * Atau akses via browser (hapus setelah dipakai)
 */

$files = [
    // Tailwind CSS standalone (full build, no purge needed for CDN-style usage)
    'https://cdn.tailwindcss.com/3.4.4'
        => __DIR__ . '/public/assets/js/tailwind.min.js',

    // Alpine.js
    'https://cdn.jsdelivr.net/npm/alpinejs@3.14.1/dist/cdn.min.js'
        => __DIR__ . '/public/assets/js/alpine.min.js',
];

foreach ($files as $url => $dest) {
    if (file_exists($dest)) {
        echo "EXISTS: $dest\n";
        continue;
    }
    echo "Downloading $url ...\n";
    $content = @file_get_contents($url);
    if ($content === false) {
        // Try curl
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0');
        $content = curl_exec($ch);
        curl_close($ch);
    }
    if ($content) {
        file_put_contents($dest, $content);
        echo "SAVED: $dest (" . round(strlen($content)/1024) . " KB)\n";
    } else {
        echo "FAILED: $url\n";
    }
}
echo "\nDone. Delete this file after use.\n";
