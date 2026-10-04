"use client";

import PageContainer from "@/components/common/PageContainer";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardStats from "@/components/dashboard/DashboardStats";
import DashboardRecentOrder from "@/components/dashboard/DashboardRecentOrder";
import DashboardDefaultAddress from "@/components/dashboard/DashboardDefaultAddress";
import { useDashboard } from "@/composables/useDashboard";
import PageHeader from "@/components/common/PageHeader";

export default function DashboardContent() {
  const { summary, loading, error } = useDashboard();

  return (
    <PageContainer>
      <div className="grid grid-cols-1 gap-6 py-8 lg:grid-cols-[220px_1fr]">
        <DashboardSidebar />

        <div className="min-w-0">
          <PageHeader
            title="Hello! Welcome back."
            breadcrumb="Home / Dashboard"
            description="Here is an overview of your recent activity and account status."
          />

          <DashboardStats
            totalOrders={summary?.totalOrders ?? 0}
            ordersThisMonth={summary?.ordersThisMonth ?? 0}
            totalSpending={summary?.totalSpending ?? 0}
          />

          <div className="mt-6 grid gap-4 lg:grid-cols-[2fr_1fr]">
            <DashboardRecentOrder order={summary?.recentOrder ?? null} />

            <DashboardDefaultAddress
              address={summary?.defaultAddress ?? null}
            />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
