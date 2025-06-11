"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PlanRedirectPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/sensor-dashboard");
  }, [router]);
  return null;
}
