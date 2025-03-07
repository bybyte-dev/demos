import {
  LayoutDashboard,
  Package,
  Calendar,
  Users,
  Truck,
  LucideIcon,
  Cuboid,
  FlaskConical,
} from "lucide-react";

export interface ProjectPage {
  title: string;
  path: string;
  icon: LucideIcon;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  pages: ProjectPage[];
}

export const projects: Project[] = [
  {
    slug: "batys-massiv",
    title: "Батыс Массив",
    description: "Система управления поставками и спецификациями",
    icon: LayoutDashboard,
    pages: [
      {
        title: "Товары",
        path: "/batys-massiv/products",
        icon: Package,
      },
      {
        title: "График спецификации",
        path: "/batys-massiv/spec-schedule",
        icon: Calendar,
      },
      {
        title: "График поставщиков",
        path: "/batys-massiv/suppliers-schedule",
        icon: Truck,
      },
      {
        title: "График клиентов",
        path: "/batys-massiv/clients-schedule",
        icon: Users,
      },
      {
        title: "График клиентов 1",
        path: "/batys-massiv/clients-schedule-1",
        icon: Users,
      },
    ],
  },
  {
    slug: "neochim",
    title: "Неохим",
    description: "3D визуализация краски",
    icon: FlaskConical,
    pages: [
      {
        title: "Краска v0.1",
        path: "/neochim/paint-v0.1",
        icon: Cuboid,
      },
    ],
  },
];
