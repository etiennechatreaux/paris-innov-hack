'use client';

import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Payment, formatCurrency, formatDate } from '@/lib/earnings-data';

interface PaymentsTableProps {
  payments: Payment[];
  onDownloadReport?: () => void;
}

function StatusBadge({ status }: { status: Payment['status'] }) {
  const styles = {
    Paid: 'bg-emerald-100 text-emerald-700',
    Pending: 'bg-amber-100 text-amber-700',
    Processing: 'bg-blue-100 text-blue-700',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export function PaymentsTable({ payments, onDownloadReport }: PaymentsTableProps) {
  return (
    <Card>
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Payments</h2>
          <Button
            variant="primary"
            onClick={onDownloadReport}
            className="bg-[#6366f1] hover:bg-[#5558e3]"
          >
            Download Payment Report
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left py-3 px-4 text-sm font-medium text-[var(--muted)]">
                  Payout date
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[var(--muted)]">
                  Type
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[var(--muted)]">
                  Description
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[var(--muted)]">
                  Status
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-[var(--muted)]">
                  Hours
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-[var(--muted)]">
                  Earned
                </th>
              </tr>
            </thead>
            <tbody>
              {payments.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-12 text-[var(--muted)]"
                  >
                    No payments yet
                  </td>
                </tr>
              ) : (
                payments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--accent)] transition-colors"
                  >
                    <td className="py-4 px-4 text-sm">
                      {formatDate(payment.payoutDate)}
                    </td>
                    <td className="py-4 px-4 text-sm">{payment.type}</td>
                    <td className="py-4 px-4 text-sm max-w-xs truncate">
                      {payment.description}
                    </td>
                    <td className="py-4 px-4">
                      <StatusBadge status={payment.status} />
                    </td>
                    <td className="py-4 px-4 text-sm text-right">
                      {payment.hours > 0 ? `${payment.hours}h` : '-'}
                    </td>
                    <td className="py-4 px-4 text-sm text-right font-medium">
                      {formatCurrency(payment.earned)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
