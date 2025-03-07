import {
  LayoutDashboard,
  Package,
  Calendar,
  Users,
  Truck,
  LucideIcon,
  Cuboid,
  FlaskConical,
  LineChart,
  QrCode,
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
      {
        title: "График клиентов 2",
        path: "/batys-massiv/clients-schedule-2",
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
  {
    slug: "reproexport",
    title: "Reproexport",
    description: "Система управления маршрутами",
    icon: Truck,
    pages: [
      {
        title: "Добавление маршрута",
        path: "/reproexport/add-route",
        icon: Package,
      },
      {
        title: "Добавление точки",
        path: "/reproexport/add-point",
        icon: Package,
      },
      {
        title: "Аналитика",
        path: "/reproexport/analytics",
        icon: FlaskConical,
      },
      {
        title: "Дашборд поездок",
        path: "/reproexport/trips-dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    slug: "gas-reviews",
    title: "АЗС Отзывы",
    description: "Система агрегации и анализа отзывов сети АЗС",
    icon: LayoutDashboard,
    pages: [
      {
        title: "Аналитика",
        path: "/gas-reviews/analytics",
        icon: LineChart,
      },
      {
        title: "QR система",
        path: "/gas-reviews/qr",
        icon: QrCode,
      },
    ],
  },

  {  slug: "imservice",
    title: "IMservice",
    description: "Система управления рекламными контрагентами",
    icon: Users,
    pages: [
      {
        title: "Рекламодатели",
        path: "/imservice/advertisers",
        icon: Users,
      },
      {
        title: "Рекламные агентства",
        path: "/imservice/agencies",
        icon: Users,
      },
      {
        title: "Договора",
        path: "/imservice/contracts",
        icon: Package,
      },
      {
        title: "Отчеты",
        path: "/imservice/reports",
        icon: LineChart,
      },
      {
        title: "АВР",
        path: "/imservice/avr",
        icon: Package,
      },
      {
        title: "Счета",
        path: "/imservice/invoices",
        icon: Package,
      },
    ],
  },
  {
    slug: "baufarma",
    title: "Бауфарма",
    description: "Система управления проектами и тайм-трекинг",
    icon: Calendar,
    pages: [
      {
        title: "Общий тайминг",
        path: "/baufarma/general-timing",
        icon: Calendar,
      },
      {
        title: "Проект",
        path: "/baufarma/project",
        icon: LayoutDashboard,
      },
      {
        title: "Календарь сотрудника",
        path: "/baufarma/employee-calendar",
        icon: Calendar,
      },
      {
        title: "Аналитика загруженности",
        path: "/baufarma/workload-analytics",
        icon: LineChart,
      },
    ],
  },
  {
    slug: "op-survey",
    title: "Опросник ОП",
    description: "Система опросов",
    icon: Package,
    pages: [
      {
        title: "Опросник",
        path: "/op-survey/questionnaire",
        icon: Package,
      },
    ],
  },
  {
    slug: "openspace-booking",
    title: "Бронь Опенспейса",
    description: "Система бронирования рабочих мест",
    icon: LayoutDashboard,
    pages: [
      {
        title: "Бронирование",
        path: "/openspace-booking/booking",
        icon: Calendar,
      },
    ],
  }
];
