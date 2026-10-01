<nav id="navbar" class="fixed top-0 left-0 right-0 z-50 transition-all duration-300" x-data="{ scrolled: false, mobileOpen: false }" 
     x-init="window.addEventListener('scroll', () => { scrolled = window.scrollY > 20 })"
     :class="scrolled ? 'bg-[#060816]/90 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/20' : 'bg-transparent'">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="flex items-center justify-between h-18 py-4">

            <!-- Logo -->
            <a href="<?= url('/') ?>" class="flex items-center group">
                <img src="<?= asset('images/Solvia.png') ?>" alt="Solvia Nova" class="h-10 w-auto object-contain transition-opacity duration-300 group-hover:opacity-80">
            </a>

            <!-- Desktop Menu -->
            <div class="hidden lg:flex items-center gap-1">
                <?php
                $navItems = [
                    ['/', __('nav.home')],
                    ['/about', __('nav.about')],
                    ['/services', __('nav.services')],
                    ['/portfolio', __('nav.portfolio')],
                    ['/gallery', __('nav.gallery')],
                    ['/team', __('nav.team')],
                    ['/articles', __('nav.articles')],
                    ['/contact', __('nav.contact')],
                ];
                foreach ($navItems as [$path, $label]):
                    $active = is_active($path);
                ?>
                <a href="<?= url($path) ?>" 
                   class="relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 group
                          <?= $active ? 'text-white' : 'text-slate-400 hover:text-white' ?>">
                    <?php if ($active): ?>
                    <span class="absolute inset-0 rounded-lg bg-white/5 border border-white/10"></span>
                    <?php endif; ?>
                    <span class="relative"><?= $label ?></span>
                </a>
                <?php endforeach; ?>
            </div>

            <!-- CTA + Language Switcher + Mobile Toggle -->
            <div class="flex items-center gap-3">
                <!-- Language Switcher -->
                <?php $currentLang = lang(); ?>
                <div class="hidden lg:flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl p-1">
                    <a href="<?= url('/lang/id') ?>"
                       class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 <?= $currentLang === 'id' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white' ?>">
                        ID
                    </a>
                    <a href="<?= url('/lang/en') ?>"
                       class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 <?= $currentLang === 'en' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white' ?>">
                        EN
                    </a>
                </div>

                <a href="<?= url('/contact') ?>" class="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/25 hover:shadow-blue-500/35">
                    <?= __e('nav.cta') ?>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </a>

                <!-- Mobile toggle -->
                <button @click="mobileOpen = !mobileOpen" class="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
                    <svg x-show="!mobileOpen" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
                    <svg x-show="mobileOpen" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
            </div>
        </div>

        <!-- Mobile Menu -->
        <div x-show="mobileOpen" x-transition:enter="transition ease-out duration-200" x-transition:enter-start="opacity-0 -translate-y-2" x-transition:enter-end="opacity-100 translate-y-0" x-transition:leave="transition ease-in duration-150" x-transition:leave-start="opacity-100 translate-y-0" x-transition:leave-end="opacity-0 -translate-y-2"
             class="lg:hidden pb-4 border-t border-white/5 mt-2 pt-4">
            <div class="flex flex-col gap-1">
                <?php foreach ($navItems as [$path, $label]): ?>
                <a href="<?= url($path) ?>" class="px-4 py-3 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors <?= is_active($path) ? 'text-white bg-white/5' : '' ?>">
                    <?= $label ?>
                </a>
                <?php endforeach; ?>

                <!-- Mobile Language Switcher -->
                <div class="flex items-center gap-2 px-4 py-3 mt-1">
                    <span class="text-slate-500 text-xs">Language:</span>
                    <a href="<?= url('/lang/id') ?>"
                       class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 <?= $currentLang === 'id' ? 'bg-blue-600 text-white' : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white' ?>">
                        🇮🇩 Indonesia
                    </a>
                    <a href="<?= url('/lang/en') ?>"
                       class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 <?= $currentLang === 'en' ? 'bg-blue-600 text-white' : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white' ?>">
                        🇬🇧 English
                    </a>
                </div>

                <a href="<?= url('/contact') ?>" class="mt-2 px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl text-center transition-colors">
                    <?= __e('nav.cta') ?>
                </a>
            </div>
        </div>
    </div>
</nav>
