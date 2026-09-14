"use client";

import { useParams } from "next/navigation";
import OrderDetailContent from "@/components/dashboard/OrderDetailContent";

export default function OrderDetailPage() {
  const params = useParams();

  const orderId = Number(params.id);

  return <OrderDetailContent orderId={orderId} />;
}