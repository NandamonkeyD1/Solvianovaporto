<?php

function getBanks(): array {
  return [
    ['name' => 'Bank Mandiri',               'domain' => 'bankmandiri.co.id'],
    ['name' => 'Bank Negara Indonesia (BNI)', 'domain' => 'bni.co.id'],
    ['name' => 'Bank Rakyat Indonesia (BRI)', 'domain' => 'bri.co.id'],
    ['name' => 'Bank Tabungan Negara (BTN)',  'domain' => 'btn.co.id'],
    ['name' => 'Bank Central Asia (BCA)',     'domain' => 'bca.co.id'],
    ['name' => 'Bank CIMB Niaga',             'domain' => 'cimbniaga.co.id'],
    ['name' => 'Bank Permata',               'domain' => 'permatabank.com'],
    ['name' => 'Bank Danamon',               'domain' => 'danamon.co.id'],
    ['name' => 'Bank Maybank Indonesia',     'domain' => 'maybank.co.id'],
    ['name' => 'Bank OCBC NISP',             'domain' => 'ocbc.id'],
    ['name' => 'Bank Mega',                  'domain' => 'bankmega.com'],
    ['name' => 'Bank Panin',                 'domain' => 'panin.co.id'],
    ['name' => 'Bank Bukopin (KB Bukopin)',  'domain' => 'kbmbank.com'],
    ['name' => 'Bank BTPN',                  'domain' => 'btpn.co.id'],
    ['name' => 'Bank Jago',                  'domain' => 'bankjago.co.id'],
    ['name' => 'Bank UOB Indonesia',         'domain' => 'uob.co.id'],
    ['name' => 'Bank Sinarmas',              'domain' => 'banksinarmas.com'],
    ['name' => 'Bank Commonwealth',          'domain' => 'bankcommowealth.co.id'],
    ['name' => 'Bank Maspion',               'domain' => 'bankmaspion.co.id'],
    ['name' => 'Bank Index',                 'domain' => 'bankindex.co.id'],
    ['name' => 'Bank Syariah Indonesia (BSI)','domain' => 'bankbsi.co.id'],
    ['name' => 'Bank Mega Syariah',          'domain' => 'megasyariah.co.id'],
    ['name' => 'Bank BTPN Syariah',          'domain' => 'btpnasyariah.co.id'],
    ['name' => 'Bank Panin Dubai Syariah',   'domain' => 'panindubaibank.co.id'],
    ['name' => 'Bank KB Bukopin Syariah',    'domain' => 'kbmbank.com'],
    ['name' => 'Bank Aladin Syariah',        'domain' => 'bankaladin.co.id'],
    ['name' => 'Bank DKI',                   'domain' => 'bankdki.co.id'],
    ['name' => 'Bank BJB (Jabar Banten)',    'domain' => 'bankbjb.co.id'],
    ['name' => 'Bank Jatim',                 'domain' => 'bankjatim.co.id'],
    ['name' => 'Bank Jateng',                'domain' => 'bankjateng.co.id'],
    ['name' => 'Bank Sumut',                 'domain' => 'banksumut.co.id'],
    ['name' => 'Bank Nagari',                'domain' => 'banknagari.co.id'],
    ['name' => 'Bank Riau Kepri',            'domain' => 'bankriaukepri.co.id'],
    ['name' => 'Bank Sumsel Babel',          'domain' => 'banksumselbabel.co.id'],
    ['name' => 'Bank Kalbar',                'domain' => 'bankkalbar.co.id'],
    ['name' => 'Bank Kaltimtara',            'domain' => 'bankaltimtara.co.id'],
    ['name' => 'Bank Kalsel',                'domain' => 'bankalsel.co.id'],
    ['name' => 'Bank Kalteng',               'domain' => 'bankalteng.co.id'],
    ['name' => 'Bank NTB Syariah',           'domain' => 'bankntbsyariah.co.id'],
    ['name' => 'Bank NTT',                   'domain' => 'bankntt.co.id'],
    ['name' => 'Bank Maluku Malut',          'domain' => 'bankmaluku.co.id'],
    ['name' => 'Bank Papua',                 'domain' => 'bankpapua.co.id'],
    ['name' => 'Bank SulutGo',               'domain' => 'banksulutgo.co.id'],
    ['name' => 'Bank Sulselbar',             'domain' => 'banksulselbar.co.id'],
    ['name' => 'Bank Sulteng',               'domain' => 'banksulteng.co.id'],
    ['name' => 'Bank Sultra',                'domain' => 'banksultra.co.id'],
    ['name' => 'Bank Bengkulu',              'domain' => 'bankbengkulu.co.id'],
    ['name' => 'Bank Lampung',               'domain' => 'banklampung.co.id'],
    ['name' => 'Bank Jambi',                 'domain' => 'bankjambi.co.id'],
    ['name' => 'Bank Aceh Syariah',          'domain' => 'bankaceh.co.id'],
  ];
}

function getTransferTypes(): array {
  return ['Sesama Bank', 'Antar Bank', 'Online Transfer'];
}

function bankSlug(string $name): string {
  $map = [
    'Bank Mandiri'                 => 'mandiri',
    'Bank Negara Indonesia (BNI)'  => 'bni',
    'Bank Rakyat Indonesia (BRI)'  => 'bri',
    'Bank Tabungan Negara (BTN)'   => 'btn',
    'Bank Central Asia (BCA)'      => 'bca',
    'Bank CIMB Niaga'              => 'cimb',
    'Bank Permata'                 => 'permata',
    'Bank Danamon'                 => 'danamon',
    'Bank Maybank Indonesia'       => 'maybank',
    'Bank OCBC NISP'               => 'ocbc',
    'Bank Mega'                    => 'mega',
    'Bank Panin'                   => 'panin',
    'Bank Bukopin (KB Bukopin)'    => 'bukopin',
    'Bank BTPN'                    => 'btpn',
    'Bank Jago'                    => 'jago',
    'Bank UOB Indonesia'           => 'uob',
    'Bank Sinarmas'                => 'sinarmas',
    'Bank Commonwealth'            => 'commonwealth',
    'Bank Maspion'                 => 'maspion',
    'Bank Index'                   => 'index',
    'Bank Syariah Indonesia (BSI)' => 'bsi',
    'Bank Mega Syariah'            => 'megasyariah',
    'Bank BTPN Syariah'            => 'btpnsyariah',
    'Bank Panin Dubai Syariah'     => 'panindubai',
    'Bank KB Bukopin Syariah'      => 'bukopinsyariah',
    'Bank Aladin Syariah'          => 'aladin',
    'Bank DKI'                     => 'dki',
    'Bank BJB (Jabar Banten)'      => 'bjb',
    'Bank Jatim'                   => 'jatim',
    'Bank Jateng'                  => 'jateng',
    'Bank Sumut'                   => 'sumut',
    'Bank Nagari'                  => 'nagari',
    'Bank Riau Kepri'              => 'riaukepri',
    'Bank Sumsel Babel'            => 'sumselbabel',
    'Bank Kalbar'                  => 'kalbar',
    'Bank Kaltimtara'              => 'kaltimtara',
    'Bank Kalsel'                  => 'kalsel',
    'Bank Kalteng'                 => 'kalteng',
    'Bank NTB Syariah'             => 'ntbsyariah',
    'Bank NTT'                     => 'ntt',
    'Bank Maluku Malut'            => 'maluku',
    'Bank Papua'                   => 'papua',
    'Bank SulutGo'                 => 'sulutgo',
    'Bank Sulselbar'               => 'sulselbar',
    'Bank Sulteng'                 => 'sulteng',
    'Bank Sultra'                  => 'sultra',
    'Bank Bengkulu'                => 'bengkulu',
    'Bank Lampung'                 => 'lampung',
    'Bank Jambi'                   => 'jambi',
    'Bank Aceh Syariah'            => 'aceh',
  ];
  return $map[$name] ?? '';
}

function bankLogoLocalUrl(string $name): ?string {
  $slug = bankSlug($name);
  if (!$slug) return null;
  $file = ASSETS_PATH . '/uploads/bank-logos/' . $slug . '.png';
  if (file_exists($file)) {
    return url('assets/uploads/bank-logos/' . $slug . '.png');
  }
  return null;
}

function bankLogoUrl(string $domain): string {
  return 'https://logo.clearbit.com/' . $domain;
}

function bankInitial(string $name): string {
  $name = preg_replace('/\(.*?\)/', '', $name);
  $parts = array_values(array_filter(explode(' ', trim($name))));
  if (count($parts) >= 2) {
    return mb_strtoupper(mb_substr($parts[0], 0, 1) . mb_substr($parts[1], 0, 1));
  }
  return mb_strtoupper(mb_substr($name, 0, 2));
}

function bankColors(): array {
  return [
    'mandiri'      => '#1f4788',
    'bni'          => '#d42b1e',
    'bri'          => '#0c3b6b',
    'btn'          => '#1d5b9e',
    'bca'          => '#003f87',
    'cimb'         => '#7d1b1e',
    'permata'      => '#0d3570',
    'danamon'      => '#003f72',
    'maybank'      => '#f9d41c',
    'ocbc'         => '#006b3d',
    'mega'         => '#003d79',
    'panin'        => '#003f87',
    'bukopin'      => '#003b5c',
    'btpn'         => '#005e9e',
    'jago'         => '#08a05c',
    'bsi'          => '#0b5e3b',
    'dki'          => '#e71e25',
    'bjb'          => '#003f72',
    'jatim'        => '#1c3f6e',
    'jateng'       => '#003f87',
    'aceh'         => '#0b5e3b',
  ];
}

function bankStyle(string $name): array {
  $nameLower = mb_strtolower($name);
  $bg = '#0a2463';
  $fg = '#ffffff';
  $colors = bankColors();
  foreach ($colors as $key => $color) {
    if (str_contains($nameLower, $key)) {
      $bg = $color;
      $fg = in_array($key, ['maybank']) ? '#1f2937' : '#ffffff';
      break;
    }
  }
  return ['bg' => $bg, 'fg' => $fg, 'initials' => bankInitial($name)];
}

function bankInfo(string $name): ?array {
  foreach (getBanks() as $b) {
    if ($b['name'] === $name) return $b;
  }
  return null;
}

function bankLogoHtml(string $name, int $size = 32): string {
  if (!$name) return '';
  $s = $size;
  $local = bankLogoLocalUrl($name);
  $style = bankStyle($name);
  $initials = $style['initials'];
  $bg = $style['bg'];
  $fg = $style['fg'];

  if ($local) {
    return '<span style="display:inline-flex; align-items:center;">'
      . '<img src="' . e($local) . '" alt="' . e($name) . '" style="width:' . $s . 'px; height:' . $s . 'px; object-fit:contain; border-radius:6px;">'
      . '</span>';
  }

  $info = bankInfo($name);
  if ($info) {
    $logoUrl = bankLogoUrl($info['domain']);
    return '<span style="display:inline-flex; align-items:center;">'
      . '<img src="' . e($logoUrl) . '" alt="" style="width:' . $s . 'px; height:' . $s . 'px; object-fit:contain; border-radius:6px;" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'inline-flex\';">'
      . '<span style="display:none; width:' . $s . 'px; height:' . $s . 'px; border-radius:6px; background:' . $bg . '; color:' . $fg . '; font-size:' . max(10, $s/2 - 2) . 'px; font-weight:700; align-items:center; justify-content:center; flex-shrink:0;">' . e($initials) . '</span>'
      . '</span>';
  }

  return '<span style="display:inline-flex; align-items:center;">'
    . '<span style="width:' . $s . 'px; height:' . $s . 'px; border-radius:6px; background:' . $bg . '; color:' . $fg . '; font-size:' . max(10, $s/2 - 2) . 'px; font-weight:700; display:inline-flex; align-items:center; justify-content:center; flex-shrink:0;">' . e($initials) . '</span>'
    . '</span>';
}
