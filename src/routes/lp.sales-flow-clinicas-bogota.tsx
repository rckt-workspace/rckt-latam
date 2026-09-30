import { createFileRoute, Outlet } from "@tanstack/react-router";
export const Route = createFileRoute("/lp/sales-flow-clinicas-bogota")({ staticData: { sitemap: false }, component: () => <Outlet /> });
