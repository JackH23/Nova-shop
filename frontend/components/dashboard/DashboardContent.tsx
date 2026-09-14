"use client";

import PageContainer from "@/components/common/PageContainer";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardStats from "@/components/dashboard/DashboardStats";
import DashboardRecentOrder from "@/components/dashboard/DashboardRecentOrder";
import DashboardDefaultAddress from "@/components/dashboard/DashboardDefaultAddress";

export default function DashboardContent() {
  return (
    <PageContainer>
      <div className="grid grid-cols-1 gap-6 py-8 lg:grid-cols-[220px_1fr]">
        <DashboardSidebar />

        <div className="min-w-0">
          <h1 className="text-3xl font-bold text-slate-900">
            Hello! Welcome back.
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Here is an overview of your recent activity and account status.
          </p>

            <DashboardStats />

            <div className="mt-6 grid gap-4 lg:grid-cols-[2fr_1fr]">
            <DashboardRecentOrder />
            <DashboardDefaultAddress />
            </div>
        </div>
      </div>
    </PageContainer>
  );
}