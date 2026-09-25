import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/lp/sales-flow")({ staticData: { sitemap: false }, component: () => <Outlet /> });