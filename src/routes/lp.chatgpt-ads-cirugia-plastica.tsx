import { createFileRoute, Outlet } from "@tanstack/react-router";
export const Route = createFileRoute("/lp/chatgpt-ads-cirugia-plastica")({ staticData: { sitemap: false }, component: () => <Outlet /> });
