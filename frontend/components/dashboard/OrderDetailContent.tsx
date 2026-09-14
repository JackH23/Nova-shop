"use client";

import { useOrderDetail } from "@/composables/useOrderDetail";
import PageContainer from "@/components/common/PageContainer";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import OrderHeader from "@/components/dashboard/OrderHeader";
import OrderProgress from "@/components/dashboard/OrderProgress";
import OrderItems from "@/components/dashboard/OrderItems";
import OrderShipping from "@/components/dashboard/OrderShipping";

type OrderDetailContentProps = {
  orderId: number;
};

export default function OrderDetailContent({
  orderId,
}: OrderDetailContentProps) {
  const { order, loading, error } = useOrderDetail(orderId);

  if (loading) {
    return <div>Loading order...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <PageContainer>
      <div className="grid grid-cols-1 gap-6 py-8 lg:grid-cols-[220px_1fr]">
        <DashboardSidebar />

        <div className="min-w-0 space-y-6">
          <OrderHeader
            orderNo={order.order_no}
            status={order.status}
          />

          <OrderProgress status={order.status} />

          <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
            <OrderItems items={order.items} />

            <OrderShipping
              delivery={order.delivery}
            />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}