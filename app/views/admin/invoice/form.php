<div class="max-w-4xl" x-data="invoiceForm(<?= htmlspecialchars(json_encode($inv ?: []), ENT_QUOTES, 'UTF-8') ?>)">
  <a href="<?= url('/sso/invoice') ?>" class="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
    Kembali ke Invoice
  </a>

  <form action="" method="POST" enctype="multipart/form-data" @submit="recalc(); return true;">
    <?= csrf_field() ?>
    <input type="hidden" name="subtotal" x-model="subtotal">
    <input type="hidden" name="discount" x-model="discount">
    <input type="hidden" name="total" x-model="total">

    <!-- HEADER -->
    <div class="bg-[#0F172A]/60 border border-white/8 rounded-2xl p-6 mb-6">
      <div class="flex items-center justify-between mb-5">
        <h3 class="text-white font-bold">Informasi Invoice</h3>
        <div>
          <select name="status" class="bg-[#060816] border border-white/10 focus:border-blue-500/50 text-slate-300 rounded-xl px-4 py-2 text-sm outline-none transition-colors">
            <option value="draft" <?= ($inv['status'] ?? 'draft') === 'draft' ? 'selected' : '' ?>>Draft</option>
            <option value="sent" <?= ($inv['status'] ?? '') === 'sent' ? 'selected' : '' ?>>Terkirim</option>
            <option value="paid" <?= ($inv['status'] ?? '') === 'paid' ? 'selected' : '' ?>>Lunas</option>
            <option value="cancelled" <?= ($inv['status'] ?? '') === 'cancelled' ? 'selected' : '' ?>>Batal</option>
          </select>
        </div>
      </div>
      <div class="grid md:grid-cols-2 gap-5">
        <div>
          <label class="block text-slate-400 text-sm font-medium mb-2">Nomor Invoice</label>
          <input type="text" value="<?= e($nextNum) ?>" disabled class="w-full bg-white/5 border border-white/10 text-slate-500 rounded-xl px-4 py-3 text-sm outline-none cursor-not-allowed">
          <input type="hidden" name="invoice_number" value="<?= e($nextNum) ?>">
        </div>
        <div>
          <label class="block text-slate-400 text-sm font-medium mb-2">Tanggal Invoice <span class="text-red-400">*</span></label>
          <input type="date" name="invoice_date" x-model="invoice_date" required
            class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white rounded-xl px-4 py-3 text-sm outline-none transition-colors [color-scheme:dark]">
        </div>
      </div>
    </div>

    <!-- PENERIMA -->
    <div class="bg-[#0F172A]/60 border border-white/8 rounded-2xl p-6 mb-6">
      <h3 class="text-white font-bold mb-5">Data Penerima (Kepada Yth.)</h3>
      <div class="grid md:grid-cols-2 gap-5">
        <div class="md:col-span-2">
          <label class="block text-slate-400 text-sm font-medium mb-2">Nama Perusahaan / Klien <span class="text-red-400">*</span></label>
          <input type="text" name="client_name" x-model="client_name" required
            class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors">
        </div>
        <div class="md:col-span-2">
          <label class="block text-slate-400 text-sm font-medium mb-2">Alamat Lengkap</label>
          <textarea name="client_address" x-model="client_address" rows="3"
            class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors"></textarea>
        </div>
        <div>
          <label class="block text-slate-400 text-sm font-medium mb-2">Email</label>
          <input type="email" name="client_email" x-model="client_email"
            class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors">
        </div>
        <div>
          <label class="block text-slate-400 text-sm font-medium mb-2">Telepon</label>
          <input type="text" name="client_phone" x-model="client_phone"
            class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors">
        </div>
      </div>
    </div>

    <!-- INFORMASI PROJECT -->
    <div class="bg-[#0F172A]/60 border border-white/8 rounded-2xl p-6 mb-6">
      <h3 class="text-white font-bold mb-5">Informasi Project</h3>
      <div class="grid md:grid-cols-2 gap-5">
        <div>
          <label class="block text-slate-400 text-sm font-medium mb-2">Nama Project <span class="text-red-400">*</span></label>
          <input type="text" name="project_name" x-model="project_name" required
            class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors">
        </div>
        <div>
          <label class="block text-slate-400 text-sm font-medium mb-2">Paket / Jenis Layanan</label>
          <input type="text" name="project_package" x-model="project_package"
            class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors">
        </div>
        <div>
          <label class="block text-slate-400 text-sm font-medium mb-2">Durasi Project</label>
          <input type="text" name="project_duration" x-model="project_duration" placeholder="Contoh: Juni 2025 — Agustus 2025"
            class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors">
        </div>
        <div>
          <label class="block text-slate-400 text-sm font-medium mb-2">Metode Pembayaran</label>
          <input type="text" name="payment_method" x-model="payment_method" placeholder="Contoh: 50% di awal, 50% setelah selesai"
            class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors">
        </div>
      </div>
    </div>

    <!-- LINE ITEMS -->
    <div class="bg-[#0F172A]/60 border border-white/8 rounded-2xl p-6 mb-6">
      <div class="flex items-center justify-between mb-5">
        <h3 class="text-white font-bold">Line Items</h3>
        <button type="button" @click="addItem()" class="px-4 py-2 bg-blue-600/20 border border-blue-500/30 text-blue-400 hover:text-white hover:bg-blue-600/40 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
          Tambah Item
        </button>
      </div>

      <template x-for="(item, idx) in items" :key="idx">
        <div class="bg-[#060816]/40 border border-white/5 rounded-xl p-4 mb-4">
          <div class="flex items-start justify-between mb-3">
            <span class="text-xs text-slate-500 font-semibold uppercase" x-text="'Item #' + (idx + 1)"></span>
            <button type="button" @click="removeItem(idx)" x-show="items.length > 1" class="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </div>
          <div class="grid md:grid-cols-12 gap-3">
            <div class="md:col-span-6">
              <label class="block text-slate-500 text-xs mb-1">Deskripsi</label>
              <input type="text" :name="'item_description['+idx+']'" x-model="item.description" required
                class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-3.5 py-2.5 text-sm outline-none transition-colors">
            </div>
            <div class="md:col-span-2">
              <label class="block text-slate-500 text-xs mb-1">Qty</label>
              <input type="number" :name="'item_qty['+idx+']'" x-model="item.qty" min="1" @input="recalc()"
                class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white rounded-xl px-3.5 py-2.5 text-sm outline-none transition-colors">
            </div>
            <div class="md:col-span-2">
              <label class="block text-slate-500 text-xs mb-1">Harga Satuan</label>
              <input type="text" :name="'item_price['+idx+']'" x-model="item.price_display" @input="item.price = parsePrice($el.value); recalc()"
                class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white rounded-xl px-3.5 py-2.5 text-sm outline-none transition-colors">
            </div>
            <div class="md:col-span-2">
              <label class="block text-slate-500 text-xs mb-1">Total</label>
              <div class="w-full bg-white/5 border border-white/10 text-slate-400 rounded-xl px-3.5 py-2.5 text-sm font-medium" x-text="formatPrice(item.qty * item.price)"></div>
            </div>
          </div>
          <div class="mt-3">
            <label class="block text-slate-500 text-xs mb-1">Sub-detail / Fitur (pisahkan dengan baris baru)</label>
            <textarea :name="'item_details['+idx+']'" x-model="item.details_text" rows="2"
              class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-3.5 py-2.5 text-sm outline-none transition-colors"></textarea>
          </div>
        </div>
      </template>
    </div>

    <!-- RINGKASAN -->
    <div class="bg-[#0F172A]/60 border border-white/8 rounded-2xl p-6 mb-6">
      <h3 class="text-white font-bold mb-5">Ringkasan Pembayaran</h3>
      <div class="max-w-md mx-auto space-y-4">
        <div class="flex items-center justify-between py-2 border-b border-white/5">
          <span class="text-slate-400 text-sm">Subtotal</span>
          <span class="text-white font-medium" x-text="formatPrice(subtotal)"></span>
        </div>
        <div class="flex items-center justify-between py-2 border-b border-white/5">
          <span class="text-slate-400 text-sm">Diskon</span>
          <div class="flex items-center gap-2">
            <span class="text-red-400 text-sm">- Rp</span>
            <input type="text" name="discount_display" x-model="discount_display" @input="discount = parsePrice($el.value); recalc()"
              class="w-32 bg-white/5 border border-white/10 focus:border-blue-500/50 text-white text-right rounded-lg px-3 py-2 text-sm outline-none transition-colors">
          </div>
        </div>
        <div class="flex items-center justify-between bg-[#0a2463] rounded-xl px-5 py-4">
          <span class="text-white font-bold text-base">TOTAL</span>
          <span class="text-white font-bold text-lg" x-text="formatPrice(total)"></span>
        </div>
      </div>
    </div>

    <!-- INFORMASI PEMBAYARAN -->
    <div class="bg-[#0F172A]/60 border border-white/8 rounded-2xl p-6 mb-6">
      <h3 class="text-white font-bold mb-5">Informasi Pembayaran</h3>
      <div class="grid md:grid-cols-2 gap-5">
        <div>
          <label class="block text-slate-400 text-sm font-medium mb-2">Nama Bank</label>
          <select name="bank_name" x-model="bank_name"
            class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white rounded-xl px-4 py-3 text-sm outline-none transition-colors">
            <option value="" class="bg-[#0F172A]">-- Pilih Bank --</option>
            <?php foreach (getBanks() as $b): ?>
            <option value="<?= e($b['name']) ?>" class="bg-[#0F172A]"><?= e($b['name']) ?></option>
            <?php endforeach; ?>
          </select>
        </div>
        <div>
          <label class="block text-slate-400 text-sm font-medium mb-2">Nomor Rekening</label>
          <input type="text" name="bank_account" x-model="bank_account"
            class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors">
        </div>
        <div>
          <label class="block text-slate-400 text-sm font-medium mb-2">Atas Nama</label>
          <input type="text" name="bank_holder" x-model="bank_holder"
            class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors">
        </div>
        <div>
          <label class="block text-slate-400 text-sm font-medium mb-2">Jenis Transfer</label>
          <select name="bank_type" x-model="bank_type"
            class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white rounded-xl px-4 py-3 text-sm outline-none transition-colors">
            <option value="" class="bg-[#0F172A]">-- Pilih Jenis Transfer --</option>
            <?php foreach (getTransferTypes() as $t): ?>
            <option value="<?= e($t) ?>" class="bg-[#0F172A]"><?= e($t) ?></option>
            <?php endforeach; ?>
          </select>
        </div>
      </div>
    </div>

    <!-- CATATAN -->
    <div class="bg-[#0F172A]/60 border border-white/8 rounded-2xl p-6 mb-6">
      <h3 class="text-white font-bold mb-5">Catatan</h3>
      <template x-for="(note, idx) in notes" :key="idx">
        <div class="flex items-center gap-2 mb-2">
          <input type="text" :name="'notes['+idx+']'" x-model="notes[idx]"
            class="flex-1 bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors">
          <button type="button" @click="notes.splice(idx, 1)" x-show="notes.length > 1" class="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
      </template>
      <button type="button" @click="notes.push('')" class="text-blue-400 hover:text-blue-300 text-sm mt-2 transition-colors">+ Tambah catatan</button>
    </div>

    <!-- TANDA TANGAN -->
    <div class="bg-[#0F172A]/60 border border-white/8 rounded-2xl p-6 mb-6">
      <h3 class="text-white font-bold mb-5">Tanda Tangan</h3>
      <div class="grid md:grid-cols-2 gap-5">
        <div class="md:col-span-2">
          <div class="text-slate-500 text-xs">
            Tanda tangan & penandatangan bersifat global. Kelola di <a href="<?= url('/sso/settings') ?>" class="text-blue-400 hover:text-blue-300 underline">Pengaturan</a>.
          </div>
        </div>
      </div>
    </div>

    <!-- SUBMIT -->
    <div class="flex items-center justify-end gap-3">
      <a href="<?= url('/sso/invoice') ?>" class="px-6 py-3 bg-white/5 border border-white/10 text-slate-400 hover:text-white rounded-xl text-sm font-medium transition-all duration-200">Batal</a>
      <button type="submit" class="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg shadow-blue-600/30">
        <?= $inv ? 'Simpan Perubahan' : 'Buat Invoice' ?>
      </button>
    </div>
  </form>
</div>

<script>
function invoiceForm(data) {
  const defaultItem = () => ({
    description: '',
    details_text: '',
    qty: 1,
    price: 0,
    price_display: '0',
  });

  const parseItems = (items) => {
    if (!items || !items.length) return [defaultItem()];
    return items.map(item => ({
      description: item.description || '',
      details_text: (item.details && Array.isArray(item.details)) ? item.details.join('\n') : '',
      qty: item.qty || 1,
      price: item.price || 0,
      price_display: (item.price || 0).toLocaleString('id-ID'),
    }));
  };

  return {
    invoice_date: data.invoice_date || new Date().toISOString().split('T')[0],
    client_name: data.client_name || '',
    client_address: data.client_address || '',
    client_email: data.client_email || '',
    client_phone: data.client_phone || '',
    project_name: data.project_name || '',
    project_package: data.project_package || '',
    project_duration: data.project_duration || '',
    payment_method: data.payment_method || '',
    bank_name: data.bank_name || '',
    bank_account: data.bank_account || '',
    bank_holder: data.bank_holder || '',
    bank_type: data.bank_type || '',

    notes: (data.notes && Array.isArray(data.notes)) ? (data.notes.length ? data.notes : ['']) : [''],
    items: parseItems(data.items),
    subtotal: 0,
    discount: data.discount || 0,
    discount_display: data.discount ? (data.discount).toLocaleString('id-ID') : '',
    total: 0,

    init() {
      this.recalc();
    },

    parsePrice(val) {
      return parseInt(String(val).replace(/[^0-9]/g, '')) || 0;
    },

    formatPrice(val) {
      return 'Rp ' + (parseInt(val) || 0).toLocaleString('id-ID');
    },

    recalc() {
      let s = 0;
      this.items.forEach(item => {
        item.total = (parseInt(item.qty) || 1) * (parseInt(item.price) || 0);
        s += item.total;
      });
      this.subtotal = s;
      this.discount = this.parsePrice(this.discount_display);
      this.total = Math.max(0, this.subtotal - this.discount);
    },

    addItem() {
      this.items.push(defaultItem());
    },

    removeItem(idx) {
      if (this.items.length > 1) {
        this.items.splice(idx, 1);
        this.recalc();
      }
    },
  };
}
</script>
