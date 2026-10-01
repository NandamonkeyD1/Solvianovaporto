<!-- GALLERY PAGE -->
<section class="relative pt-32 pb-20 overflow-hidden">
  <div class="absolute inset-0 bg-[#060816]">
    <div class="absolute inset-0" style="background-image:linear-gradient(rgba(59,130,246,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.04) 1px,transparent 1px);background-size:60px 60px;"></div>
    <div class="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl"></div>
  </div>
  <div class="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium uppercase tracking-widest mb-6" data-aos="fade-up"><?= __e('gallery.badge') ?></div>
    <h1 class="text-4xl lg:text-6xl font-bold text-white mb-6" data-aos="fade-up" data-aos-delay="100"><?= __e('gallery.h1') ?></h1>
    <p class="text-slate-400 text-xl max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200"><?= __e('gallery.desc') ?></p>
  </div>
</section>

<section class="py-16" x-data="lightbox()">
  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <?php if(!empty($galleries)): ?>
    <div class="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
      <?php foreach($galleries as $i => $item): ?>
      <div class="break-inside-avoid group relative overflow-hidden rounded-xl border border-white/8 hover:border-blue-500/30 transition-all duration-300 cursor-pointer"
           data-aos="fade-up" data-aos-delay="<?= ($i%4)*60 ?>"
           data-lightbox-src="<?= url($item['image']) ?>"
           data-lightbox-caption="<?= e($item['caption'] ?? '') ?>"
           @click="show('<?= url($item['image']) ?>', '<?= e(addslashes($item['caption'] ?? '')) ?>')">
        <img src="<?= url($item['image']) ?>" alt="<?= e($item['caption'] ?? 'Gallery Solvia Nova') ?>"
             class="w-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
          <div class="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/></svg>
          </div>
          <?php if(!empty($item['caption'])): ?>
          <p class="text-white text-xs font-medium px-3 text-center"><?= e($item['caption']) ?></p>
          <?php endif; ?>
        </div>
      </div>
      <?php endforeach; ?>
    </div>
    <?php else: ?>
    <div class="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
      <?php
      $heights = [200,280,220,300,180,260,240,200,320,180,250,210];
      $labels  = ['Team Meeting','Development Session','Brainstorming','Code Review','Client Presentation','UI Design Process','System Testing','Project Planning','Team Collaboration','Documentation','Sprint Review','Product Launch'];
      for($i=0;$i<12;$i++):
      ?>
      <div class="break-inside-avoid group relative overflow-hidden rounded-xl border border-white/8 hover:border-blue-500/30 transition-all duration-300" data-aos="fade-up" data-aos-delay="<?= ($i%4)*60 ?>">
        <div class="bg-gradient-to-br from-blue-900/20 to-slate-900/40 flex items-center justify-center" style="height:<?= $heights[$i] ?>px">
          <div class="text-center">
            <div class="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mx-auto mb-2">
              <svg class="w-6 h-6 text-blue-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            </div>
            <p class="text-slate-600 text-xs"><?= $labels[$i] ?></p>
          </div>
        </div>
      </div>
      <?php endfor; ?>
    </div>
    <?php endif; ?>
  </div>

  <!-- Lightbox overlay -->
  <div x-show="open"
       x-transition:enter="transition ease-out duration-200" x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100"
       x-transition:leave="transition ease-in duration-150"  x-transition:leave-start="opacity-100" x-transition:leave-end="opacity-0"
       class="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
       @click.self="close()" @keydown.escape.window="close()" @keydown.arrow-left.window="prev()" @keydown.arrow-right.window="next()"
       style="display:none">
    <button @click="close()" class="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
    </button>
    <div x-show="items.length > 1" class="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-white/10 rounded-full text-white text-xs font-medium z-10">
      <span x-text="currentIndex + 1"></span> / <span x-text="items.length"></span>
    </div>
    <button x-show="items.length > 1" @click="prev()" class="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
    </button>
    <button x-show="items.length > 1" @click="next()" class="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
    </button>
    <div class="max-w-5xl w-full mx-12">
      <img :src="src" :alt="caption" class="w-full rounded-2xl object-contain max-h-[82vh] shadow-2xl"
           x-transition:enter="transition ease-out duration-150" x-transition:enter-start="opacity-0 scale-95" x-transition:enter-end="opacity-100 scale-100">
      <p x-show="caption" x-text="caption" class="text-slate-400 text-sm text-center mt-4 px-4"></p>
    </div>
  </div>
</section>

<script>
function lightbox() {
  return {
    open: false, src: '', caption: '', items: [], currentIndex: 0,
    init() {
      this.$nextTick(() => {
        const els = this.$el.querySelectorAll('[data-lightbox-src]');
        this.items = Array.from(els).map(el => ({ src: el.dataset.lightboxSrc, caption: el.dataset.lightboxCaption || '' }));
      });
    },
    show(src, caption) { this.src=src; this.caption=caption; this.currentIndex=this.items.findIndex(i=>i.src===src); this.open=true; document.body.style.overflow='hidden'; },
    close() { this.open=false; document.body.style.overflow=''; },
    prev() { if(!this.items.length) return; this.currentIndex=(this.currentIndex-1+this.items.length)%this.items.length; this.src=this.items[this.currentIndex].src; this.caption=this.items[this.currentIndex].caption; },
    next() { if(!this.items.length) return; this.currentIndex=(this.currentIndex+1)%this.items.length; this.src=this.items[this.currentIndex].src; this.caption=this.items[this.currentIndex].caption; }
  }
}
</script>
