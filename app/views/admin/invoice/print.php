<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Invoice — <?= e($inv['invoice_number']) ?></title>
<meta name="robots" content="noindex, nofollow">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Inter', 'Segoe UI', system-ui, sans-serif; background: #f3f4f6; display:flex; align-items:center; justify-content:center; min-height:100vh; padding:24px; }
  @media print {
    @page { margin: 0.3in 0.4in; size: A4; }
    body { background: none; padding:0; display:block; min-height:auto; }
    .no-print { display: none !important; }
    #invoice-area { page-break-inside: avoid; }
    #invoice-area [style*="padding:40px 60px 24px"] { padding: 20px 40px 12px !important; }
    #invoice-area [style*="padding:24px 60px"] { padding: 16px 40px !important; }
    #invoice-area [style*="padding:20px 60px"] { padding: 12px 40px !important; }
    #invoice-area [style*="margin-bottom:32px"] { margin-bottom: 16px !important; }
  }
  .inv-table { width: 100%; border-collapse: collapse; }
  .inv-table th { background: #0a2463; color: #fff; font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; padding: 10px 14px; text-align: left; }
  .inv-table td { padding: 10px 14px; border-bottom: 1px solid #e5e7eb; font-size: 13px; vertical-align: top; }
  .inv-table tr:last-child td { border-bottom: none; }
  @media print { .inv-table th { background: #0a2463 !important; color: #fff !important; } }
</style>
</head>
<body>

<div id="invoice-area">
<style>
  .inv-table { width: 100%; border-collapse: collapse; }
  .inv-table th { background: #0a2463; color: #fff; font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; padding: 10px 14px; text-align: left; }
  .inv-table td { padding: 10px 14px; border-bottom: 1px solid #e5e7eb; font-size: 13px; vertical-align: top; }
  .inv-table tr:last-child td { border-bottom: none; }
</style>

<!-- HEADER -->
<div style="background:#ffffff; border-radius:16px; box-shadow:0 8px 32px rgba(0,0,0,0.08); overflow:hidden;">
  <div style="padding:40px 60px 24px; border-bottom:1px solid #e5e7eb;">
    <div style="display:flex; align-items:flex-start; justify-content:space-between;">
      <div>
        <div style="display:flex; align-items:center; gap:12px; margin-bottom:4px;">
          <img src="<?= asset('images/Solvia.png') ?>" alt="Solvia Nova" style="height:48px; width:auto; object-fit:contain; flex-shrink:0;">
          <div>
            <div style="font-size:20px; font-weight:700; color:#0a2463;">Solvia.<span style="color:#3b82f6;">Nova</span></div>
            <div style="font-size:12px; color:#6b7280; font-weight:500; letter-spacing:0.05em;">Digital Solution Partner</div>
          </div>
        </div>
        <div style="margin-top:8px; font-size:12px; color:#9ca3af; font-style:italic;">"Membangun Solusi Digital untuk Masa Depan Bisnismu"</div>
      </div>

      <!-- badge nomor invoice + label TANGGAL -->
      <div style="text-align:right;">
        <div style="font-size:30px; font-weight:700; color:#0a2463; letter-spacing:-0.025em;">INVOICE</div>
        <div style="margin-top:8px; display:inline-block; background:#0a2463; color:#fff; font-size:12px; font-weight:600; padding:6px 16px; border-radius:8px;">
          NO. <?= e($inv['invoice_number']) ?>
        </div>
        <div style="margin-top:8px; font-size:13px; color:#1f2937; font-weight:600;">
          TANGGAL: <?= date('d F Y', strtotime($inv['invoice_date'])) ?>
        </div>
      </div>
    </div>
  </div>

  <div style="padding:24px 60px;">
    <!-- PENERIMA & PROJECT -->
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:32px; margin-bottom:32px;">
      <div>
        <div style="font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; color:#0a2463; margin-bottom:8px;">Kepada Yth.</div>
        <div style="font-size:14px; font-weight:700; color:#111827;"><?= e($inv['client_name']) ?></div>
        <div style="font-size:12px; color:#4b5563; margin-top:4px; line-height:1.625;"><?= nl2br(e($inv['client_address'])) ?></div>
        <?php if ($inv['client_email']): ?><div style="font-size:12px; color:#4b5563; margin-top:4px;">Email: <?= e($inv['client_email']) ?></div><?php endif; ?>
        <?php if ($inv['client_phone']): ?><div style="font-size:12px; color:#4b5563;">Telepon: <?= e($inv['client_phone']) ?></div><?php endif; ?>
      </div>
      <div>
        <div style="font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; color:#0a2463; margin-bottom:8px;">Informasi Project</div>
        <table style="font-size:12px; width:100%;">
          <?php if ($inv['project_name']): ?><tr><td style="color:#0a2463; padding:4px 12px 4px 0; width:110px;">Nama Project</td><td style="color:#1f2937; font-weight:500;"><?= e($inv['project_name']) ?></td></tr><?php endif; ?>
          <?php if ($inv['project_package']): ?><tr><td style="color:#0a2463; padding:4px 12px 4px 0;">Paket</td><td style="color:#1f2937; font-weight:500;"><?= e($inv['project_package']) ?></td></tr><?php endif; ?>
          <?php if ($inv['project_duration']): ?><tr><td style="color:#0a2463; padding:4px 12px 4px 0;">Durasi</td><td style="color:#1f2937; font-weight:500;"><?= e($inv['project_duration']) ?></td></tr><?php endif; ?>
          <?php if ($inv['payment_method']): ?><tr><td style="color:#0a2463; padding:4px 12px 4px 0;">Pembayaran</td><td style="color:#1f2937; font-weight:500;"><?= e($inv['payment_method']) ?></td></tr><?php endif; ?>
        </table>
      </div>
    </div>

    <!-- TABLE ITEMS -->
    <div style="margin-bottom:32px;">
      <div style="font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; color:#0a2463; margin-bottom:12px;">Rincian Layanan</div>
      <table class="inv-table">
        <thead>
          <tr>
            <th style="width:36px; text-align:center;">No</th>
            <th>Deskripsi</th>
            <th style="width:48px; text-align:center;">Qty</th>
            <th style="width:130px; text-align:right;">Harga Satuan</th>
            <th style="width:130px; text-align:right;">Total</th>
          </tr>
        </thead>
        <tbody>
          <?php $no = 1; foreach ($inv['items'] as $item): ?>
          <tr>
            <td style="text-align:center;"><?= $no++ ?></td>
            <td>
              <div style="font-weight:600; color:#111827; font-size:14px;"><?= e($item['description']) ?></div>
              <?php if (!empty($item['details']) && is_array($item['details'])): ?>
              <ul style="margin:4px 0 0; padding:0; list-style:none;">
                <?php foreach ($item['details'] as $d): ?>
                <li style="font-size:12px; color:#6b7280; display:flex; align-items:flex-start; gap:4px;">
                  <span style="color:#3b82f6; flex-shrink:0;">-</span>
                  <span><?= e($d) ?></span>
                </li>
                <?php endforeach; ?>
              </ul>
              <?php endif; ?>
            </td>
            <td style="text-align:center;"><?= (int) $item['qty'] ?></td>
            <td style="text-align:right; font-weight:500; color:#111827;">Rp <?= number_format((int) $item['price'], 0, ',', '.') ?></td>
            <td style="text-align:right; font-weight:600; color:#111827;">Rp <?= number_format((int) $item['total'], 0, ',', '.') ?></td>
          </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    </div>

    <!-- RINGKASAN: box Total Pembayaran (kiri) + Subtotal/Diskon/Total bar (kanan) -->
    <div style="margin-bottom:32px; display:flex; justify-content:space-between; align-items:flex-start; gap:24px;">
      <!-- LEFT: TOTAL PEMBAYARAN BOX -->
      <div style="flex:1; border:1px solid #e5e7eb; border-radius:12px; padding:20px;">
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:10px;">
          <svg style="width:16px; height:16px; color:#0a2463;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          <span style="font-size:12px; font-weight:700; color:#0a2463; text-transform:uppercase; letter-spacing:0.05em;">Total Pembayaran</span>
        </div>
        <div style="font-size:26px; font-weight:700; color:#0a2463;">Rp <?= number_format((int) $inv['total'], 0, ',', '.') ?></div>
        <div style="font-size:11px; color:#6b7280; font-style:italic; margin-top:6px;">
          (<?= ucwords($this->terbilang((int) $inv['total'])) ?> Rupiah)
        </div>
      </div>

      <!-- RIGHT: SUBTOTAL / DISKON / TOTAL -->
      <div style="width:280px;">
        <div style="display:flex; justify-content:space-between; padding:8px 0;">
          <span style="font-size:12px; color:#0a2463;">Subtotal</span>
          <span style="font-size:14px; color:#1f2937;">Rp <?= number_format((int) $inv['subtotal'], 0, ',', '.') ?></span>
        </div>
        <?php if ((int) $inv['discount'] > 0): ?>
        <div style="display:flex; justify-content:space-between; padding:8px 0;">
          <span style="font-size:12px; color:#0a2463;">Diskon</span>
          <span style="font-size:14px; color:#ef4444;">- Rp <?= number_format((int) $inv['discount'], 0, ',', '.') ?></span>
        </div>
        <?php endif; ?>
        <div style="display:flex; justify-content:space-between; align-items:center; background:#0a2463; padding:14px 16px; border-radius:8px; margin-top:8px;">
          <span style="font-size:14px; font-weight:700; color:#fff;">TOTAL</span>
          <span style="font-size:16px; font-weight:700; color:#fff;">Rp <?= number_format((int) $inv['total'], 0, ',', '.') ?></span>
        </div>
      </div>
    </div>

    <!-- INFORMASI PEMBAYARAN + CATATAN (kiri) & TANDA TANGAN (kanan) — SEJAJAR dalam satu flex -->
    <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:24px;">
      <!-- KIRI: Info Pembayaran + Catatan -->
      <div style="width:50%;">
        <?php if ($inv['bank_name']): ?>
        <div style="margin-bottom:20px; padding:20px; background:#f9fafb; border-radius:12px; border:1px solid #e5e7eb;">
          <div style="font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; color:#0a2463; margin-bottom:14px;">Informasi Pembayaran</div>
          <div style="display:flex; align-items:flex-start; gap:16px;">
            <div style="flex-shrink:0;"><?= bankLogoHtml($inv['bank_name'], 40) ?></div>
            <div style="flex:1; min-width:0;">
              <div style="font-weight:700; color:#1f2937; font-size:15px;"><?= e($inv['bank_name']) ?></div>
              <div style="font-size:14px; color:#4b5563; margin-top:4px;"><?= e($inv['bank_account']) ?></div>
              <div style="font-size:12px; color:#6b7280; margin-top:2px;">a.n. <?= e($inv['bank_holder']) ?></div>
              <?php if ($inv['bank_type']): ?>
              <div style="margin-top:10px; padding-top:10px; border-top:1px solid #e5e7eb; font-size:12px; color:#0a2463;">
                <span style="font-weight:600;">Jenis Transfer:</span> <?= e($inv['bank_type']) ?>
              </div>
              <?php endif; ?>
            </div>
          </div>
        </div>
        <?php endif; ?>

        <?php if (!empty($inv['notes'])): ?>
        <div>
          <div style="font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; color:#0a2463; margin-bottom:8px;">Catatan</div>
          <ul style="margin:0; padding:0; list-style:none;">
            <?php foreach ($inv['notes'] as $note): if (empty(trim($note))) continue; ?>
            <li style="font-size:12px; color:#4b5563; display:flex; align-items:flex-start; gap:6px; margin-bottom:4px;">
              <span style="color:#3b82f6; flex-shrink:0;">-</span>
              <span><?= e($note) ?></span>
            </li>
            <?php endforeach; ?>
          </ul>
        </div>
        <?php endif; ?>
      </div>

      <!-- KANAN: Tanda Tangan -->
      <div style="width:50%; text-align:center;">
        <div style="font-size:12px; color:#0a2463; margin-bottom:12px;">Hormat Kami,</div>
        <?php if (!empty($settings['signature_image'])): ?>
        <div style="margin-bottom:6px; display:flex; justify-content:center;">
          <img src="<?= url($settings['signature_image']) ?>" alt="Signature" style="height:50px; width:auto; object-fit:contain;">
        </div>
        <?php else: ?>
        <div style="margin-bottom:6px; display:flex; justify-content:center;">
          <svg style="width:120px; height:36px; color:#d1d5db;" viewBox="0 0 200 50"><path d="M20,40 Q40,10 60,35 Q80,5 100,30 Q120,15 140,25 Q160,20 180,30" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        </div>
        <?php endif; ?>
        <div style="font-size:14px; font-weight:700; color:#0a2463;"><?= e($settings['signatory_name'] ?: 'Ahmad Rizki Firmansyah') ?></div>
        <div style="font-size:12px; color:#0a2463;"><?= e($settings['signatory_role'] ?: 'Chief Executive Officer') ?></div>
        <div style="margin-top:8px; display:flex; align-items:center; justify-content:center; gap:6px;">
          <img src="<?= asset('images/Solvia.png') ?>" alt="Solvia Nova" style="height:18px; width:auto; object-fit:contain; flex-shrink:0;">
          <div style="text-align:left;">
            <div style="font-size:11px; font-weight:700; color:#0a2463;">Solvia.<span style="color:#3b82f6;">Nova</span></div>
            <div style="font-size:9px; color:#6b7280; font-weight:500; letter-spacing:0.05em;">Digital Solution Partner</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- FOOTER -->
  <div style="background:#0a2463; padding:20px 60px;">
    <div style="display:flex; align-items:center; justify-content:center; gap:32px; font-size:12px; color:rgba(255,255,255,0.8);">
      <div style="display:flex; align-items:center; gap:6px;">
        <svg style="width:14px; height:14px; flex-shrink:0;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
        <span><?= e($settings['site_address'] ?? 'Jl. Dr. Ide Anak Agung Gde Agung, Kuningan, Jakarta Selatan') ?></span>
      </div>
      <div style="display:flex; align-items:center; gap:6px;">
        <svg style="width:14px; height:14px; flex-shrink:0;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
        <span><?= e($settings['site_email'] ?? 'finance@solvianova.com') ?></span>
      </div>
      <div style="display:flex; align-items:center; gap:6px;">
        <svg style="width:14px; height:14px; flex-shrink:0;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>
        <span><?= e(preg_replace('#^https?://#', '', APP_URL)) ?></span>
      </div>
    </div>
  </div>
</div>

<div class="no-print" style="position:fixed; bottom:20px; left:50%; transform:translateX(-50%); display:flex; gap:12px; z-index:999;">
  <button onclick="window.print()" style="padding:12px 28px; background:#2563eb; color:#fff; border:none; border-radius:12px; font-size:14px; font-weight:600; cursor:pointer; box-shadow:0 4px 16px rgba(37,99,235,0.4); display:flex; align-items:center; gap:8px;">
    <svg style="width:16px; height:16px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
    Cetak / Simpan PDF
  </button>
  <button onclick="window.close()" style="padding:12px 28px; background:#1f2937; color:#fff; border:none; border-radius:12px; font-size:14px; font-weight:500; cursor:pointer; box-shadow:0 4px 16px rgba(0,0,0,0.2);">Tutup</button>
</div>

<script>
  if (window.location.search.includes('auto')) {
    setTimeout(function(){ window.print(); }, 500);
  }
</script>
</body>
</html>
