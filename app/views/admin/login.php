<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Login — Solvia Nova</title>
  <meta name="robots" content="noindex, nofollow">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script src="<?= asset('js/tailwind.min.js') ?>"></script>
  <script>tailwind.config={theme:{extend:{colors:{primary:'#060816'},fontFamily:{sans:['Inter','system-ui','sans-serif']}}}}</script>
  <script defer src="<?= asset('js/alpine.min.js') ?>"></script>
  <link rel="stylesheet" href="<?= asset('css/app.css') ?>">
</head>
<body class="bg-[#060816] text-white antialiased min-h-screen flex items-center justify-center">
  <div class="absolute inset-0" style="background-image:linear-gradient(rgba(59,130,246,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.04) 1px,transparent 1px);background-size:60px 60px;"></div>
  <div class="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

  <div class="relative w-full max-w-md px-6">
    <!-- Logo -->
    <div class="text-center mb-8">
      <div class="flex items-center justify-center mb-4">
        <img src="<?= asset('images/Solvia.png') ?>" alt="Solvia Nova" class="h-14 w-auto object-contain">
      </div>
      <p class="text-slate-500 text-sm mt-1">Admin Dashboard</p>
    </div>

    <!-- Flash -->
    <?php $flash = get_flash(); if($flash): ?>
    <div class="mb-4 px-4 py-3 rounded-xl text-sm <?= $flash['type'] === 'success' ? 'bg-emerald-500/15 border border-emerald-500/25 text-emerald-300' : 'bg-red-500/15 border border-red-500/25 text-red-300' ?>">
      <?= e($flash['message']) ?>
    </div>
    <?php endif; ?>

    <!-- Form -->
    <div class="bg-[#0F172A]/80 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
      <form action="<?= url('/sso') ?>" method="POST" class="space-y-5">
        <?= csrf_field() ?>
        <div>
          <label class="block text-slate-400 text-sm font-medium mb-2">Username</label>
          <input type="text" name="username" required autofocus placeholder="admin"
            class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors">
        </div>
        <div>
          <label class="block text-slate-400 text-sm font-medium mb-2">Password</label>
          <input type="password" name="password" required placeholder="••••••••"
            class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors">
        </div>
        <button type="submit" class="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/25">
          Masuk ke Dashboard
        </button>
      </form>
    </div>
    <p class="text-center text-slate-600 text-xs mt-6">
      <a href="<?= url('/') ?>" class="hover:text-slate-400 transition-colors">← Kembali ke website</a>
    </p>
  </div>
  <!-- no extra script needed -->
</body>
</html>
