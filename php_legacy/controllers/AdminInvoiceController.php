<?php
require_once APP_PATH . '/models/Invoice.php';
require_once APP_PATH . '/models/InvoiceItem.php';
require_once APP_PATH . '/models/Setting.php';

class AdminInvoiceController extends Controller {

    public function index(): void {
        $this->requireAdmin();
        $invoice  = new Invoice();
        $invoices = $invoice->all('created_at', 'DESC');
        $this->view('admin.invoice.index', [
            'pageTitle' => 'Invoice',
            'invoices'  => $invoices,
        ], 'admin');
    }

    public function create(): void {
        $this->requireAdmin();
        $invoice = new Invoice();
        $nextNum = $invoice->getNextNumber();

        if ($this->isPost()) {
            try {
                $items = $this->parseItems();
                $data  = $this->getFormData();
                $data['invoice_number'] = $nextNum;

                $invoice->saveWithItems($data, $items);
                $this->setFlash('success', 'Invoice berhasil dibuat.');
                $this->redirect(url('/sso/invoice'));
            } catch (Exception $e) {
                $this->setFlash('error', 'Gagal membuat invoice: ' . $e->getMessage());
            }
        }

        $this->view('admin.invoice.form', [
            'pageTitle'    => 'Buat Invoice Baru',
            'nextNum'      => $nextNum,
            'inv'          => null,
        ], 'admin');
    }

    public function edit(int $id): void {
        $this->requireAdmin();
        $invoice = new Invoice();
        $inv     = $invoice->getWithItems($id);

        if (!$inv) {
            http_response_code(404);
            $this->view('errors.404', [], 'admin');
            return;
        }

        if ($this->isPost()) {
            try {
                $items = $this->parseItems();
                $data  = $this->getFormData();
                $data['invoice_number'] = $inv['invoice_number'];

                $invoice->updateWithItems($id, $data, $items);
                $this->setFlash('success', 'Invoice berhasil diperbarui.');
                $this->redirect(url('/sso/invoice'));
            } catch (Exception $e) {
                $this->setFlash('error', 'Gagal mengupdate invoice: ' . $e->getMessage());
            }
        }

        $this->view('admin.invoice.form', [
            'pageTitle' => 'Edit Invoice',
            'nextNum'   => $inv['invoice_number'],
            'inv'       => $inv,
        ], 'admin');
    }

    public function show(int $id): void {
        $this->requireAdmin();
        $invoice = new Invoice();
        $inv     = $invoice->getWithItems($id);

        if (!$inv) {
            http_response_code(404);
            $this->view('errors.404', [], 'admin');
            return;
        }

        $setting = new Setting();
        $this->view('admin.invoice.show', [
            'pageTitle' => 'Invoice — ' . $inv['invoice_number'],
            'inv'       => $inv,
            'settings'  => $setting->getAll(),
        ], 'admin');
    }

    public function printInvoice(int $id): void {
        $this->requireAdmin();
        $invoice = new Invoice();
        $inv     = $invoice->getWithItems($id);

        if (!$inv) {
            http_response_code(404);
            $this->view('errors.404', [], 'admin');
            return;
        }

        $setting = new Setting();
        $this->view('admin.invoice.print', [
            'inv'      => $inv,
            'settings' => $setting->getAll(),
        ], 'blank');
    }

    public function delete(int $id): void {
        $this->requireAdmin();
        if (!$this->isPost()) {
            $this->redirect(url('/sso/invoice'));
            return;
        }
        $inv = new Invoice();
        $inv->delete($id);
        $this->setFlash('success', 'Invoice berhasil dihapus.');
        $this->redirect(url('/sso/invoice'));
    }

    private function parseItems(): array {
        $items = [];
        $descriptions = $this->input('item_description', []);
        $details     = $this->input('item_details', []);
        $qtys        = $this->input('item_qty', []);
        $prices      = $this->input('item_price', []);

        if (!is_array($descriptions)) return $items;

        foreach ($descriptions as $i => $desc) {
            $desc = trim($desc);
            if (empty($desc)) continue;

            $itemDetails = [];
            if (isset($details[$i]) && is_string($details[$i])) {
                $lines = explode("\n", $details[$i]);
                foreach ($lines as $line) {
                    $line = trim($line);
                    if (!empty($line)) $itemDetails[] = $line;
                }
            }

            $qty   = max(1, (int) ($qtys[$i] ?? 1));
            $price = max(0, (int) str_replace(['.', ','], '', $prices[$i] ?? '0'));

            $items[] = [
                'description' => $desc,
                'details'     => $itemDetails,
                'qty'         => $qty,
                'price'       => $price,
                'total'       => $qty * $price,
            ];
        }

        return $items;
    }

    private function getFormData(): array {
        return [
            'invoice_date'     => $this->input('invoice_date', date('Y-m-d')),
            'client_name'      => $this->sanitize($this->input('client_name', '')),
            'client_address'   => $this->clean($this->input('client_address', '')),
            'client_email'     => $this->sanitize($this->input('client_email', '')),
            'client_phone'     => $this->sanitize($this->input('client_phone', '')),
            'project_name'     => $this->sanitize($this->input('project_name', '')),
            'project_package'  => $this->sanitize($this->input('project_package', '')),
            'project_duration' => $this->sanitize($this->input('project_duration', '')),
            'payment_method'   => $this->sanitize($this->input('payment_method', '')),
            'subtotal'         => (int) str_replace(['.', ','], '', $this->input('subtotal', '0')),
            'discount'         => (int) str_replace(['.', ','], '', $this->input('discount', '0')),
            'total'            => (int) str_replace(['.', ','], '', $this->input('total', '0')),
            'bank_name'        => $this->sanitize($this->input('bank_name', '')),
            'bank_account'     => $this->sanitize($this->input('bank_account', '')),
            'bank_holder'      => $this->sanitize($this->input('bank_holder', '')),
            'bank_type'        => $this->sanitize($this->input('bank_type', '')),
            'notes'            => $this->input('notes', []),
            'status'           => $this->input('status', 'draft'),
        ];
    }

    public function terbilang(int $number): string {
        $angka = ['', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan', 'sepuluh', 'sebelas'];
        if ($number < 12) return $angka[$number];
        if ($number < 20) return ($number === 10 ? 'sepuluh' : $angka[$number - 10] . ' belas');
        if ($number < 100) return $angka[intval($number / 10)] . ' puluh ' . $angka[$number % 10];
        if ($number < 200) return 'seratus ' . $this->terbilang($number - 100);
        if ($number < 1000) return $angka[intval($number / 100)] . ' ratus ' . $this->terbilang($number % 100);
        if ($number < 2000) return 'seribu ' . $this->terbilang($number - 1000);
        if ($number < 1000000) return $this->terbilang(intval($number / 1000)) . ' ribu ' . $this->terbilang($number % 1000);
        if ($number < 1000000000) return $this->terbilang(intval($number / 1000000)) . ' juta ' . $this->terbilang($number % 1000000);
        if ($number < 1000000000000) return $this->terbilang(intval($number / 1000000000)) . ' miliar ' . $this->terbilang($number % 1000000000);
        return '';
    }
}
