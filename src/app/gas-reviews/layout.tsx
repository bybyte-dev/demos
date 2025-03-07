"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { projects } from "@/lib/projects";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Menu, Home } from "lucide-react";
import { useState } from "react";

const project = projects.find((p) => p.slug === "gas-reviews");

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const currentPage = project?.pages.find((page) => page.path === pathname);

  return (
    <div className="h-screen max-h-screen overflow-hidden bg-[#e5e5e5] flex">
      {/* Сайдбар */}
      <aside
        className={cn(
          "bg-white h-screen flex flex-col shadow-md",
          sidebarOpen ? "w-64" : "w-16"
        )}
      >
        {/* Лого */}
        <div className="h-16 min-h-[4rem] border-b flex items-center px-4">
          <Link href="/" className="flex items-center space-x-2">
            <Home className="h-6 w-6 text-slate-600" />
            {sidebarOpen && (
              <span className="font-bold text-slate-800">bybytedemos</span>
            )}
          </Link>
        </div>

        {/* Навигация */}
        <div className="flex-1 py-4 px-2 overflow-y-auto">
          {project?.pages.map((page) => {
            const Icon = page.icon;
            const isActive = pathname === page.path;

            return (
              <Link
                key={page.path}
                href={page.path}
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors mb-1",
                  isActive
                    ? "bg-slate-800 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {sidebarOpen && <span>{page.title}</span>}
              </Link>
            );
          })}
        </div>

        {/* Кнопка сворачивания */}
        <div className="border-t p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center text-slate-600 hover:text-slate-800"
          >
            {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
          </Button>
        </div>
      </aside>

      {/* Основной контент */}
      <div className="flex-1 flex flex-col h-screen max-h-screen overflow-hidden">
        {/* Хедер */}
        <header className="bg-white shadow-md">
          <div className="flex h-16 min-h-[4rem] items-center px-6 gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-semibold text-slate-800">{project?.title}</h1>
              {currentPage && (
                <p className="text-sm text-slate-500">{currentPage.title}</p>
              )}
            </div>
          </div>
        </header>

        {/* Контент страницы */}
        <main className="flex-1 bg-white m-4 shadow-md p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}