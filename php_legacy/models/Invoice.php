<?php
class Invoice extends Model {
    protected string $table = 'invoices';

    public function getWithItems(int $id): array|false {
        $data = $this->find($id);
        if (!$data) return false;

        $stmt = $this->db->prepare("SELECT * FROM invoice_items WHERE invoice_id = ? ORDER BY sort_order ASC");
        $stmt->execute([$id]);
        $items = $stmt->fetchAll();

        foreach ($items as &$item) {
            $item['details'] = $item['details'] ? json_decode($item['details'], true) : [];
        }
        unset($item);

        $data['items'] = $items;
        $data['notes'] = $data['notes'] ? explode("\n", $data['notes']) : [];

        return $data;
    }

    public function getNextNumber(): string {
        $year  = date('Y');
        $month = date('m');
        $stmt = $this->db->prepare("SELECT invoice_number FROM invoices WHERE invoice_number LIKE ? ORDER BY id DESC LIMIT 1");
        $stmt->execute(["INV/{$year}/{$month}/%"]);
        $last = $stmt->fetchColumn();
        if ($last) {
            $parts = explode('/', $last);
            $num   = (int) end($parts) + 1;
        } else {
            $num = 1;
        }
        return sprintf('INV/%s/%s/%03d', $year, $month, $num);
    }

    public function saveWithItems(array $data, array $items): int {
        $this->db->beginTransaction();
        try {
            $notes = '';
            if (!empty($data['notes']) && is_array($data['notes'])) {
                $notes = implode("\n", array_filter($data['notes']));
            } elseif (!empty($data['notes']) && is_string($data['notes'])) {
                $notes = $data['notes'];
            }

            $invoiceId = $this->create([
                'invoice_number'   => $data['invoice_number'],
                'invoice_date'     => $data['invoice_date'],
                'client_name'      => $data['client_name'],
                'client_address'   => $data['client_address'] ?? '',
                'client_email'     => $data['client_email'] ?? '',
                'client_phone'     => $data['client_phone'] ?? '',
                'project_name'     => $data['project_name'],
                'project_package'  => $data['project_package'] ?? '',
                'project_duration' => $data['project_duration'] ?? '',
                'payment_method'   => $data['payment_method'] ?? '',
                'subtotal'         => $data['subtotal'],
                'discount'         => $data['discount'] ?? 0,
                'total'            => $data['total'],
                'bank_name'        => $data['bank_name'] ?? '',
                'bank_account'     => $data['bank_account'] ?? '',
                'bank_holder'      => $data['bank_holder'] ?? '',
                'bank_type'        => $data['bank_type'] ?? '',
                'notes'            => $notes,
                'signatory_name'   => $data['signatory_name'] ?? '',
                'signatory_role'   => $data['signatory_role'] ?? '',
                'status'           => $data['status'] ?? 'draft',
            ]);

            $itemModel = new InvoiceItem();
            foreach ($items as $i => $item) {
                $details = !empty($item['details']) ? json_encode($item['details']) : '';
                $itemModel->create([
                    'invoice_id'  => $invoiceId,
                    'description' => $item['description'],
                    'details'     => $details,
                    'qty'         => (int) ($item['qty'] ?? 1),
                    'price'       => (int) ($item['price'] ?? 0),
                    'total'       => (int) ($item['qty'] ?? 1) * (int) ($item['price'] ?? 0),
                    'sort_order'  => $i,
                ]);
            }

            $this->db->commit();
            return $invoiceId;
        } catch (Exception $e) {
            $this->db->rollBack();
            throw $e;
        }
    }

    public function updateWithItems(int $id, array $data, array $items): bool {
        $this->db->beginTransaction();
        try {
            $notes = '';
            if (!empty($data['notes']) && is_array($data['notes'])) {
                $notes = implode("\n", array_filter($data['notes']));
            } elseif (!empty($data['notes']) && is_string($data['notes'])) {
                $notes = $data['notes'];
            }

            $this->update($id, [
                'invoice_number'   => $data['invoice_number'],
                'invoice_date'     => $data['invoice_date'],
                'client_name'      => $data['client_name'],
                'client_address'   => $data['client_address'] ?? '',
                'client_email'     => $data['client_email'] ?? '',
                'client_phone'     => $data['client_phone'] ?? '',
                'project_name'     => $data['project_name'],
                'project_package'  => $data['project_package'] ?? '',
                'project_duration' => $data['project_duration'] ?? '',
                'payment_method'   => $data['payment_method'] ?? '',
                'subtotal'         => $data['subtotal'],
                'discount'         => $data['discount'] ?? 0,
                'total'            => $data['total'],
                'bank_name'        => $data['bank_name'] ?? '',
                'bank_account'     => $data['bank_account'] ?? '',
                'bank_holder'      => $data['bank_holder'] ?? '',
                'bank_type'        => $data['bank_type'] ?? '',
                'notes'            => $notes,
                'signatory_name'   => $data['signatory_name'] ?? '',
                'signatory_role'   => $data['signatory_role'] ?? '',
                'status'           => $data['status'] ?? 'draft',
            ]);

            $this->db->prepare("DELETE FROM invoice_items WHERE invoice_id = ?")->execute([$id]);

            $itemModel = new InvoiceItem();
            foreach ($items as $i => $item) {
                $details = !empty($item['details']) ? json_encode($item['details']) : '';
                $itemModel->create([
                    'invoice_id'  => $id,
                    'description' => $item['description'],
                    'details'     => $details,
                    'qty'         => (int) ($item['qty'] ?? 1),
                    'price'       => (int) ($item['price'] ?? 0),
                    'total'       => (int) ($item['qty'] ?? 1) * (int) ($item['price'] ?? 0),
                    'sort_order'  => $i,
                ]);
            }

            $this->db->commit();
            return true;
        } catch (Exception $e) {
            $this->db->rollBack();
            throw $e;
        }
    }
}
