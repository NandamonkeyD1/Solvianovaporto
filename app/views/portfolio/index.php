<!-- PORTFOLIO PAGE -->
<section class="relative pt-32 pb-20 overflow-hidden">
  <div class="absolute inset-0 bg-[#060816]">
    <div class="absolute inset-0" style="background-image:linear-gradient(rgba(59,130,246,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.04) 1px,transparent 1px);background-size:60px 60px;"></div>
    <div class="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl"></div>
  </div>
  <div class="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium uppercase tracking-widest mb-6" data-aos="fade-up">Portfolio</div>
    <h1 class="text-4xl lg:text-6xl font-bold text-white mb-6" data-aos="fade-up" data-aos-delay="100">Karya yang Berbicara Sendiri</h1>
    <p class="text-slate-400 text-xl max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">Setiap project adalah bukti nyata komitmen kami terhadap kualitas dan dampak bisnis yang terukur.</p>
  </div>
</section>

<section class="py-16" x-data="portfolioFilter()">
  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <!-- Filter tabs -->
    <div class="flex flex-wrap gap-2 justify-center mb-12" data-aos="fade-up">
      <button @click="filter = 'all'" :class="filter === 'all' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20'" class="px-5 py-2.5 border rounded-xl text-sm font-medium transition-all duration-200">
        Semua
      </button>
      <?php foreach(['Website','Dashboard','Branding','Automation','Mobile','Enterprise'] as $cat): ?>
      <button @click="filter = '<?= strtolower($cat) ?>'" :class="filter === '<?= strtolower($cat) ?>' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20'" class="px-5 py-2.5 border rounded-xl text-sm font-medium transition-all duration-200">
        <?= $cat ?>
      </button>
      <?php endforeach; ?>
    </div>

    <!-- Grid -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <?php
      $defaultPortfolios = [
        ['e-commerce-platform','E-Commerce Platform','Website','Laravel, Vue.js, MySQL, Midtrans','Platform belanja online lengkap dengan manajemen produk, payment gateway, dan laporan penjualan real-time.','website'],
        ['erp-manufacturing','ERP Manufacturing System','System','PHP, React, PostgreSQL, Redis','Sistem ERP terintegrasi untuk manajemen produksi, inventory, dan supply chain perusahaan manufaktur.','enterprise'],
        ['brand-identity-fmcg','Brand Identity FMCG','Branding','Figma, Illustrator, After Effects','Rebranding lengkap untuk perusahaan consumer goods — logo, guidelines, packaging, dan aset digital.','branding'],
        ['hr-management-system','HR Management System','System','PHP Native, MySQL, TailwindCSS','Sistem manajemen SDM lengkap: absensi, payroll, rekrutmen, dan evaluasi kinerja karyawan.','dashboard'],
        ['company-profile-premium','Company Profile Premium','Website','PHP, TailwindCSS, AlpineJS','Website company profile dengan CMS custom, SEO optimized, dan performa tinggi.','website'],
        ['whatsapp-automation','WhatsApp Automation Bot','Automation','Node.js, WhatsApp API, MySQL','Bot WhatsApp cerdas untuk customer service otomatis, notifikasi order, dan follow-up pelanggan.','automation'],
      ];
      $displayPortfolios = !empty($portfolios) ? $portfolios : $defaultPortfolios;
      foreach($displayPortfolios as $i => $p):
        $isArray = is_array($p) && isset($p['name']);
        $slug = $isArray ? $p['slug'] : $p[0];
        $name = $isArray ? $p['name'] : $p[1];
        $category = $isArray ? $p['category'] : $p[2];
        $tech = $isArray ? ($p['tech_stack'] ?? '') : $p[3];
        $desc = $isArray ? ($p['short_desc'] ?? '') : $p[4];
        $filterKey = $isArray ? strtolower($p['category']) : $p[5];
        $thumb = $isArray ? ($p['thumbnail'] ?? '') : '';
      ?>
      <div x-show="filter === 'all' || filter === '<?= $filterKey ?>'"
           x-transition:enter="transition ease-out duration-300"
           x-transition:enter-start="opacity-0 scale-95"
           x-transition:enter-end="opacity-100 scale-100"
           class="group" data-aos="fade-up" data-aos-delay="<?= ($i%3)*80 ?>">
        <a href="<?= url('/portfolio/'.$slug) ?>" class="block bg-[#0F172A]/60 border border-white/8 hover:border-blue-500/30 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10">
          <div class="aspect-video bg-gradient-to-br from-blue-900/30 to-slate-900/60 overflow-hidden relative">
            <?php if($thumb): ?>
            <img src="<?= url($thumb) ?>" alt="<?= e($name) ?>" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">
            <?php else: ?>
            <div class="w-full h-full flex items-center justify-center">
              <div class="w-16 h-16 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                <svg class="w-8 h-8 text-blue-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </div>
            </div>
            <?php endif; ?>
            <div class="absolute top-3 left-3">
              <span class="px-3 py-1 bg-blue-500/20 border border-blue-500/30 backdrop-blur-sm text-blue-300 text-xs font-medium rounded-full"><?= e($category) ?></span>
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex items-end p-5">
              <span class="text-white text-sm font-medium flex items-center gap-2">Lihat Detail <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg></span>
            </div>
          </div>
          <div class="p-5">
            <h3 class="text-white font-bold text-lg mb-2 group-hover:text-blue-300 transition-colors"><?= e($name) ?></h3>
            <p class="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2"><?= e($desc) ?></p>
            <div class="flex flex-wrap gap-2">
              <?php foreach(array_slice(explode(',', $tech), 0, 3) as $t): ?>
              <span class="px-2.5 py-1 bg-white/5 border border-white/10 text-slate-400 text-xs rounded-lg"><?= e(trim($t)) ?></span>
              <?php endforeach; ?>
            </div>
          </div>
        </a>
      </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="py-20">
  <div class="max-w-3xl mx-auto px-6 text-center" data-aos="fade-up">
    <div class="bg-gradient-to-br from-blue-600/15 to-blue-900/15 border border-blue-500/20 rounded-3xl p-10">
      <h2 class="text-3xl font-bold text-white mb-4">Project Anda Bisa Jadi yang Berikutnya</h2>
      <p class="text-slate-400 mb-8">Mari diskusikan bagaimana kami bisa membantu bisnis Anda bertransformasi secara digital.</p>
      <a href="<?= url('/contact') ?>" class="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/30">
        Mulai Project <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
      </a>
    </div>
  </div>
</section>

<script>
function portfolioFilter() {
  return { filter: 'all' }
}
</script>
