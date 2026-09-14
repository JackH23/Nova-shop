"use client";

import PageContainer from "@/components/common/PageContainer";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import ProfileSettings from "@/components/dashboard/ProfileSettings";
import SecuritySettings from "@/components/dashboard/SecuritySettings";

export default function SettingsContent() {
  return (
    <PageContainer>
      <div className="grid grid-cols-1 gap-6 py-8 lg:grid-cols-[220px_1fr]">
        <DashboardSidebar />

        <div className="min-w-0">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-slate-950">
              Account Settings
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage your profile and account security.
            </p>
          </div>

          <div className="mt-4 border-t border-slate-200" />

          {/* Settings */}
          <div className="mt-6 space-y-6">
            <ProfileSettings />

            <SecuritySettings />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}