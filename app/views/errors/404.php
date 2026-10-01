<!DOCTYPE html>
<html lang="id" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>404 — Halaman Tidak Ditemukan | Solvia Nova</title>
  <meta name="robots" content="noindex">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="<?= defined('APP_URL') ? rtrim(APP_URL,'/').'/assets/css/app.css' : '/assets/css/app.css' ?>">
</head>
<body class="bg-[#060816] text-white antialiased min-h-screen flex items-center justify-center">
  <div class="absolute inset-0" style="background-image:linear-gradient(rgba(59,130,246,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.04) 1px,transparent 1px);background-size:60px 60px;"></div>
  <div class="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

  <div class="relative text-center px-6 max-w-lg mx-auto">
    <div class="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-blue-700 mb-4 leading-none">404</div>
    <h1 class="text-2xl font-bold text-white mb-3">Halaman Tidak Ditemukan</h1>
    <p class="text-slate-400 mb-8 leading-relaxed">Halaman yang Anda cari tidak ada atau telah dipindahkan. Mungkin URL-nya salah ketik?</p>
    <div class="flex flex-wrap gap-3 justify-center">
      <a href="<?= defined('APP_URL') ? rtrim(APP_URL,'/') : '/' ?>" class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/25">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
        Kembali ke Home
      </a>
      <a href="<?= defined('APP_URL') ? rtrim(APP_URL,'/').'/contact' : '/contact' ?>" class="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold rounded-xl transition-all duration-200">
        Hubungi Kami
      </a>
    </div>
  </div>
  <script src="<?= defined('APP_URL') ? rtrim(APP_URL,'/').'/assets/js/app.js' : '/assets/js/app.js' ?>"></script>
</body>
</html>
