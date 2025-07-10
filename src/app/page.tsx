"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function IndexPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) router.replace("/home");
    else if (user.role === "admin") router.replace("/admin/dashboard");
    else if (user.role === "instructor") router.replace("/instructor/dashboard");
    else if (user.role === "learner") router.replace("/learner/dashboard");
  }, [user, loading, router]);

  return null;
}
