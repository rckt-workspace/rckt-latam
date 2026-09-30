import { createFileRoute, Outlet } from "@tanstack/react-router";
export const Route = createFileRoute("/lp/sales-flow-clinicas-bogota-b")({ staticData: { sitemap: false }, component: () => <Outlet /> });
