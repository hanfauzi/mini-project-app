// app/_guards/withAuthGuard.tsx
"use client";

import Loading from "@/components/Loading";
import { useAuthStore } from "@/stores/auth";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { JSX } from "react/jsx-dev-runtime";

interface WithAuthOptions {
  allowedRoles?: string[];         // optional: peran yang diizinkan
  redirectTo?: string;             // jika belum login, redirect ke sini
  unauthorizedTo?: string;         // jika tidak punya role yang sesuai
}

export function withAuthGuard<P extends JSX.IntrinsicAttributes>(
  Component: React.ComponentType<P>,
  options: WithAuthOptions = {}
) {
  const {
    allowedRoles = [],
    redirectTo = "/",
    unauthorizedTo = "/unauthorized",
  } = options;

  const Wrapper = (props: P) => {
    const user = useAuthStore((state) => state.user);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
      // Karena zustand persist akan hydrate async, beri delay pendek
      const timeout = setTimeout(() => {
        setIsChecking(false);
      }, 100); // 100ms cukup di kebanyakan kasus

      return () => clearTimeout(timeout);
    }, []);

    if (isChecking) {
      return <Loading />;
    }

    if (!user) {
      redirect(redirectTo);
      return null;
    }

    if (
      allowedRoles.length > 0 &&
      (!user.role || !allowedRoles.includes(user.role))
    ) {
      redirect(unauthorizedTo);
      return null;
    }

    return <Component {...props} />;
  };

  return Wrapper;
}
