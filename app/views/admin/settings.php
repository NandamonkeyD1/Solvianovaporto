<div class="max-w-2xl space-y-6">

  <!-- General Settings -->
  <div class="bg-[#0F172A]/60 border border-white/8 rounded-2xl p-6">
    <h3 class="text-white font-bold text-base mb-5 flex items-center gap-2">
      <svg class="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
      General
    </h3>
    <form action="<?= url('/sso/settings/update') ?>" method="POST" class="space-y-4">
      <?= csrf_field() ?>
      <?php foreach([
        ['site_name',      'Nama Website',              'text',  'Solvia Nova'],
        ['site_email',     'Email',                     'email', 'hello@solvianova.com'],
        ['site_phone',     'Telepon',                   'text',  '+62 831-4880-1578'],
        ['site_whatsapp',  'WhatsApp Number (tanpa +)', 'text',  '6283148801578'],
        ['site_address',   'Alamat',                    'text',  'Indonesia'],
      ] as [$key,$label,$type,$placeholder]): ?>
      <div>
        <label class="block text-slate-400 text-sm font-medium mb-2"><?= $label ?></label>
        <input type="<?= $type ?>" name="<?= $key ?>" value="<?= e($settings[$key] ?? '') ?>" placeholder="<?= $placeholder ?>"
          class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors">
      </div>
      <?php endforeach; ?>
      <div class="pt-2">
        <button type="submit" class="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 text-sm">Simpan</button>
      </div>
    </form>
  </div>

  <!-- Social Media Links (URL penuh) -->
  <div class="bg-[#0F172A]/60 border border-white/8 rounded-2xl p-6">
    <h3 class="text-white font-bold text-base mb-2 flex items-center gap-2">
      <svg class="w-4 h-4 text-pink-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
      Social Media <span class="text-slate-500 text-xs font-normal ml-1">(URL lengkap, tampil di footer & homepage)</span>
    </h3>
    <p class="text-slate-500 text-xs mb-5">Isi dengan URL lengkap. Kosongkan jika tidak punya. Hanya yang diisi yang akan tampil.</p>
    <form action="<?= url('/sso/settings/update') ?>" method="POST" class="space-y-4">
      <?= csrf_field() ?>
      <?php foreach([
        ['site_instagram', 'Instagram URL', 'https://instagram.com/solvianova'],
        ['site_tiktok',    'TikTok URL',    'https://tiktok.com/@solvianova'],
        ['site_youtube',   'YouTube URL',   'https://youtube.com/@solvianova'],
        ['site_linkedin',  'LinkedIn URL',  'https://linkedin.com/company/solvianova'],
      ] as [$key,$label,$placeholder]): ?>
      <div>
        <label class="block text-slate-400 text-sm font-medium mb-2"><?= $label ?></label>
        <input type="url" name="<?= $key ?>" value="<?= e($settings[$key] ?? '') ?>" placeholder="<?= $placeholder ?>"
          class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors">
      </div>
      <?php endforeach; ?>
      <div class="pt-2">
        <button type="submit" class="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 text-sm">Simpan</button>
      </div>
    </form>
  </div>

  <!-- Dipercaya Oleh -->
  <div class="bg-[#0F172A]/60 border border-white/8 rounded-2xl p-6">
    <h3 class="text-white font-bold text-base mb-2 flex items-center gap-2">
      <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>
      Dipercaya Oleh (Client)
    </h3>
    <p class="text-slate-500 text-xs mb-5">
      Satu baris = satu client. Format:<br>
      <code class="text-blue-400">Nama Client</code> — hanya tampil nama<br>
      <code class="text-blue-400">Nama Client | https://link-logo.png</code> — tampil logo gambar
    </p>
    <form action="<?= url('/sso/settings/update') ?>" method="POST">
      <?= csrf_field() ?>
      <textarea name="trusted_clients" rows="8" placeholder="PT Maju Bersama&#10;Toko Online Nusantara | https://example.com/logo.png&#10;Brand Lokal Indonesia&#10;CV Berkah Jaya"
        class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors resize-none font-mono"><?= e($settings['trusted_clients'] ?? '') ?></textarea>
      <div class="mt-4">
        <button type="submit" class="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 text-sm">Simpan</button>
      </div>
    </form>
  </div>

  <!-- Invoice Signature -->
  <div class="bg-[#0F172A]/60 border border-white/8 rounded-2xl p-6">
    <h3 class="text-white font-bold text-base mb-2 flex items-center gap-2">
      <svg class="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
      Invoice — Tanda Tangan
    </h3>
    <p class="text-slate-500 text-xs mb-5">Gambar tanda tangan global untuk semua invoice. TTD per-invoice bisa diatur di halaman invoice.</p>
    <form action="<?= url('/sso/settings/update') ?>" method="POST" enctype="multipart/form-data">
      <?= csrf_field() ?>
      <?php foreach([
        ['signatory_name', 'Nama Penandatangan', 'text', 'Ahmad Rizki Firmansyah'],
        ['signatory_role', 'Jabatan',            'text', 'Chief Executive Officer'],
      ] as [$key,$label,$type,$placeholder]): ?>
      <div>
        <label class="block text-slate-400 text-sm font-medium mb-2"><?= $label ?></label>
        <input type="<?= $type ?>" name="<?= $key ?>" value="<?= e($settings[$key] ?? '') ?>" placeholder="<?= $placeholder ?>"
          class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors">
      </div>
      <?php endforeach; ?>
      <div class="mt-4">
        <label class="block text-slate-400 text-sm font-medium mb-2">Gambar Tanda Tangan</label>
        <input type="file" name="signature_image" accept="image/png,image/jpeg,image/webp"
          class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-slate-300 file:text-white file:bg-blue-600/20 file:border-0 file:rounded-lg file:px-3 file:py-1.5 file:mr-3 file:text-sm file:font-medium cursor-pointer rounded-xl px-3 py-2.5 text-sm outline-none transition-colors">
        <?php if (!empty($settings['signature_image'])): ?>
        <div class="mt-3 flex items-center gap-3">
          <img src="<?= url($settings['signature_image']) ?>" alt="Signature" style="height:50px; width:auto; object-fit:contain;">
          <span class="text-xs text-slate-500">File sudah ada, upload ulang untuk mengganti</span>
        </div>
        <?php endif; ?>
      </div>
      <div class="mt-4">
        <button type="submit" class="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 text-sm">Simpan</button>
      </div>
    </form>
  </div>

  <!-- Video Showcase -->
  <div class="bg-[#0F172A]/60 border border-white/8 rounded-2xl p-6">
    <h3 class="text-white font-bold text-base mb-2 flex items-center gap-2">
      <svg class="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
      Video Showcase <span class="text-slate-500 text-xs font-normal ml-1">(tampil di homepage)</span>
    </h3>
    <p class="text-slate-500 text-xs mb-5">URL YouTube (watch?v=...) atau TikTok (@user/video/...). Kosongkan slot yang tidak dipakai.</p>
    <form action="<?= url('/sso/settings/update') ?>" method="POST" class="space-y-4">
      <?= csrf_field() ?>
      <?php for($v = 1; $v <= 3; $v++): ?>
      <div>
        <label class="block text-slate-400 text-sm font-medium mb-2">Video <?= $v ?></label>
        <input type="url" name="social_video_<?= $v ?>" value="<?= e($settings['social_video_'.$v] ?? '') ?>"
          placeholder="https://youtube.com/watch?v=... atau https://tiktok.com/@.../video/..."
          class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors">
      </div>
      <?php endfor; ?>
      <div class="pt-2">
        <button type="submit" class="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 text-sm">Simpan</button>
      </div>
    </form>
  </div>

</div>
