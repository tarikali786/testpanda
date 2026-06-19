"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, X } from "lucide-react";

export function PaymentSuccessBanner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (searchParams.get("payment") === "success") {
      setShow(true);
      // Clean URL without reload
      router.replace("/dashboard", { scroll: false });
    }
  }, [searchParams, router]);

  if (!show) return null;

  return (
    <div className="flex items-center justify-between gap-4 px-6 py-4 mb-6 border border-green-200 bg-green-50 text-green-800">
      <div className="flex items-center gap-3">
        <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
        <p className="text-sm font-medium">Payment successful! Your subscription is now active.</p>
      </div>
      <button onClick={() => setShow(false)} className="shrink-0 text-green-600 hover:text-green-800">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
