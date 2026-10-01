<!-- CASE STUDY PAGE -->
<section class="relative pt-32 pb-20 overflow-hidden">
  <div class="absolute inset-0 bg-[#060816]">
    <div class="absolute inset-0" style="background-image:linear-gradient(rgba(59,130,246,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.04) 1px,transparent 1px);background-size:60px 60px;"></div>
    <div class="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl"></div>
  </div>
  <div class="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium uppercase tracking-widest mb-6" data-aos="fade-up">Case Study</div>
    <h1 class="text-4xl lg:text-6xl font-bold text-white mb-6" data-aos="fade-up" data-aos-delay="100">Studi Kasus Nyata</h1>
    <p class="text-slate-400 text-xl max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">Bagaimana kami memecahkan masalah bisnis nyata dengan solusi digital yang terukur dan berdampak.</p>
  </div>
</section>

<section class="py-16">
  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <?php
    $defaultCases = [
      ['erp-manufacturing','ERP Manufacturing System','Enterprise','Perusahaan manufaktur dengan 200+ karyawan kesulitan mengelola inventory, produksi, dan laporan secara manual.','Implementasi ERP terintegrasi yang menghubungkan seluruh departemen dalam satu platform.','Efisiensi operasional meningkat 60%, waktu pelaporan berkurang dari 3 hari menjadi real-time.','PHP, React, PostgreSQL, Redis'],
      ['hr-management','HR Management System','System','Proses HR yang manual menyebabkan kesalahan payroll dan ketidakakuratan data karyawan.','Sistem HR digital dengan otomasi payroll, absensi biometrik, dan dashboard analytics.','Akurasi payroll 100%, waktu proses HR berkurang 70%, kepuasan karyawan meningkat signifikan.','PHP Native, MySQL, TailwindCSS'],
      ['ecommerce-platform','E-Commerce Platform','Website','UMKM fashion lokal kehilangan potensi penjualan karena tidak memiliki platform online yang proper.','Platform e-commerce custom dengan UX yang dioptimasi untuk konversi dan mobile-first.','Penjualan online meningkat 300% dalam 6 bulan pertama, bounce rate turun 45%.','Laravel, Vue.js, MySQL, Midtrans'],
    ];
    $displayCases = !empty($portfolios) ? $portfolios : $defaultCases;
    foreach($displayCases as $i => $p):
      $isArray = is_array($p) && isset($p['name']);
      $slug = $isArray ? $p['slug'] : $p[0];
      $name = $isArray ? $p['name'] : $p[1];
      $category = $isArray ? $p['category'] : $p[2];
      $cs = $isArray ? (json_decode($p['case_study'] ?? '{}', true) ?? []) : [];
      $problem = $isArray ? ($cs['Problem'] ?? '') : $p[3];
      $solution = $isArray ? ($cs['Solution'] ?? '') : $p[4];
      $result = $isArray ? ($cs['Result'] ?? '') : $p[5];
      $tech = $isArray ? ($p['tech_stack'] ?? '') : $p[6];
    ?>
    <div class="mb-12 bg-[#0F172A]/60 border border-white/8 rounded-2xl overflow-hidden" data-aos="fade-up">
      <div class="p-8">
        <div class="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <span class="inline-block px-3 py-1 bg-blue-500/15 border border-blue-500/25 text-blue-400 text-xs font-medium rounded-full mb-3"><?= e($category) ?></span>
            <h2 class="text-2xl font-bold text-white"><?= e($name) ?></h2>
          </div>
          <a href="<?= url('/portfolio/'.$slug) ?>" class="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-slate-300 hover:text-white text-sm rounded-xl transition-colors">
            Lihat Project <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </a>
        </div>
        <div class="grid md:grid-cols-3 gap-6">
          <?php foreach([['Problem','Masalah','red',$problem],['Solution','Solusi','blue',$solution],['Result','Hasil','emerald',$result]] as [$key,$label,$color,$text]): ?>
          <?php if($text): ?>
          <div class="bg-white/3 border border-white/5 rounded-xl p-5">
            <div class="flex items-center gap-2 mb-3">
              <div class="w-2 h-2 rounded-full bg-<?= $color ?>-400"></div>
              <span class="text-<?= $color ?>-400 text-xs font-semibold uppercase tracking-wide"><?= $label ?></span>
            </div>
            <p class="text-slate-400 text-sm leading-relaxed"><?= e($text) ?></p>
          </div>
          <?php endif; ?>
          <?php endforeach; ?>
        </div>
        <?php if($tech): ?>
        <div class="mt-5 flex flex-wrap gap-2">
          <?php foreach(explode(',', $tech) as $t): ?>
          <span class="px-2.5 py-1 bg-white/5 border border-white/10 text-slate-400 text-xs rounded-lg"><?= e(trim($t)) ?></span>
          <?php endforeach; ?>
        </div>
        <?php endif; ?>
      </div>
    </div>
    <?php endforeach; ?>
  </div>
</section>
