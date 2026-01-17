'use client';

import { EarningsHeader } from '@/components/earnings/EarningsHeader';
import { EarningsChartCard } from '@/components/earnings/EarningsChartCard';
import { PaymentsTable } from '@/components/earnings/PaymentsTable';
import {
  mockPayments,
  mockChartData,
  mockContracts,
  mockSummary,
} from '@/lib/earnings-data';

export default function EarningsPage() {
  const handleConnectProvider = () => {
    // TODO: Implement connect provider flow
    console.log('Connect provider clicked');
  };

  const handleDownloadReport = () => {
    // TODO: Implement download report
    console.log('Download report clicked');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <EarningsHeader
        totalEarnings={mockSummary.totalEarnings}
        hasPaymentMethod={false}
        onConnectProvider={handleConnectProvider}
      />

      {/* Earnings Chart */}
      <div className="mb-6">
        <EarningsChartCard
          data={mockChartData}
          contracts={mockContracts}
          summary={mockSummary}
        />
      </div>

      {/* Payments Table */}
      <PaymentsTable
        payments={mockPayments}
        onDownloadReport={handleDownloadReport}
      />
    </div>
  );
}
