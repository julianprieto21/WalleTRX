import Breadcrumbs from "@components/Breadcrumbs";
import { dict } from "@lib/dictionaries";
import { Suspense } from "react";
import { Dashboard, DashboardSkeleton } from "./components/Dashboard";

export default async function DashboardPage() {
  const { nav: text } = dict;
  return (
    <main className="page px-4 sm:px-12 py-10 sm:pb-10 sm:pt-16">
      <Breadcrumbs
        breadcrumbs={[
          { label: text.home, href: "/" },
          { label: text.dashboard, href: "/dashboard", active: true },
        ]}
      />
      <Suspense fallback={<DashboardSkeleton />}>
        <Dashboard />
      </Suspense>
    </main>
  );
}
