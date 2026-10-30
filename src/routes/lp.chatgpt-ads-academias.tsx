import { createFileRoute, Outlet } from "@tanstack/react-router";
export const Route = createFileRoute("/lp/chatgpt-ads-academias")({ staticData: { sitemap: false }, component: () => <Outlet /> });
