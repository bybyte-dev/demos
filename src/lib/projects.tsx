import {
  LayoutDashboard,
  Package,
  Calendar,
  Users,
  Truck,
  LucideIcon,
  
  Cuboid, FlaskConical
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
      {
        title: "Краска v0.2",
        path: "/neochim/paint-v0.2",
        icon: Cuboid,
      },
      {
        title: "Краска v0.3",
        path: "/neochim/paint-v0.3",
        icon: Cuboid,
      },
      {
        title: "Краска v0.4",
        path: "/neochim/paint-v0.4",
        icon: Cuboid,
      },
      {
        title: "Краска v0.5",
        path: "/neochim/paint-v0.5",
        icon: Cuboid,
      },
      {
        title: "Краска v0.6",
        path: "/neochim/paint-v0.6",
        icon: Cuboid,
      },
      {
        title: "Краска v0.7",
        path: "/neochim/paint-v0.7",
        icon: Cuboid,
      },
      {
        title: "Краска v0.8",
        path: "/neochim/paint-v0.8",
        icon: Cuboid,
      },
      {
        title: "Краска v0.9",
        path: "/neochim/paint-v0.9",
        icon: Cuboid,
      },
      {
        title: "Краска v1.0",
        path: "/neochim/paint-v1.0",
        icon: Cuboid,
      },
    ],
  },
];
