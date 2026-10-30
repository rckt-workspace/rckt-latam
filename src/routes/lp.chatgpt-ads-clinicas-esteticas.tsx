import { createFileRoute, Outlet } from "@tanstack/react-router";
export const Route = createFileRoute("/lp/chatgpt-ads-clinicas-esteticas")({ staticData: { sitemap: false }, component: () => <Outlet /> });
