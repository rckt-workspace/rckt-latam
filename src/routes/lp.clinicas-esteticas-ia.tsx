import { createFileRoute, Outlet } from "@tanstack/react-router";
export const Route = createFileRoute("/lp/clinicas-esteticas-ia")({ staticData: { sitemap: false }, component: () => <Outlet /> });
