"use client";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

// Типы для рабочих мест
interface Workspace {
  id: string;
  name: string;
  seats: number;
  shape: "rectangle" | "round" | "lshape";
  position: { x: number; y: number };
  rotation: number;
  isBooked: boolean;
}

// Моковые данные рабочих мест
const workspaces: Workspace[] = [
  {
    id: "1",
    name: "Стол A",
    seats: 4,
    shape: "rectangle",
    position: { x: 50, y: 50 },
    rotation: 0,
    isBooked: false,
  },
  {
    id: "2",
    name: "Стол B",
    seats: 6,
    shape: "round",
    position: { x: 200, y: 50 },
    rotation: 0,
    isBooked: true,
  },
  {
    id: "3",
    name: "Стол C",
    seats: 8,
    shape: "lshape",
    position: { x: 50, y: 200 },
    rotation: 90,
    isBooked: false,
  },
  // Добавьте больше столов по необходимости
];

const OpenSpaceBooking = () => {
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(
    null
  );
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlot, setTimeSlot] = useState<string>("");

  const WorkspaceShape = ({ workspace }: { workspace: Workspace }) => {
    const baseClasses = `cursor-pointer transition-colors ${
      workspace.isBooked ? "fill-orange-200" : "fill-white"
    } stroke-orange-500 hover:fill-orange-100`;

    switch (workspace.shape) {
      case "round":
        return (
          <circle
            cx={workspace.position.x}
            cy={workspace.position.y}
            r="30"
            className={baseClasses}
            onClick={() => setSelectedWorkspace(workspace)}
          />
        );
      case "rectangle":
        return (
          <rect
            x={workspace.position.x - 40}
            y={workspace.position.y - 25}
            width="80"
            height="50"
            className={baseClasses}
            onClick={() => setSelectedWorkspace(workspace)}
          />
        );
      case "lshape":
        return (
          <path
            d={`M ${workspace.position.x},${workspace.position.y} 
               l 80,0 
               l 0,50 
               l -50,0 
               l 0,30 
               l -30,0 
               z`}
            className={baseClasses}
            onClick={() => setSelectedWorkspace(workspace)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Бронирование рабочих мест</h1>

      <div className="flex gap-6">
        <Card className="p-4 flex-1">
          <h2 className="text-lg font-semibold mb-4">Карта опенспейса</h2>
          <div className="border border-orange-200 rounded-lg p-4 bg-white">
            <svg width="400" height="300" className="w-full h-full">
              {workspaces.map((workspace) => (
                <WorkspaceShape key={workspace.id} workspace={workspace} />
              ))}
            </svg>
          </div>
        </Card>

        <Card className="p-4 w-80">
          <h2 className="text-lg font-semibold mb-4">Бронирование</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Выбранное место</h3>
              <p className="text-orange-600">
                {selectedWorkspace ? selectedWorkspace.name : "Не выбрано"}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Дата</h3>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Время</h3>
              <Select onValueChange={setTimeSlot}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите время" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="09:00">09:00 - 13:00</SelectItem>
                  <SelectItem value="13:00">13:00 - 17:00</SelectItem>
                  <SelectItem value="17:00">17:00 - 21:00</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              className="w-full bg-orange-500 hover:bg-orange-600"
              disabled={!selectedWorkspace || !date || !timeSlot}
            >
              Забронировать
            </Button>
          </div>
        </Card>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="mt-4">
            Показать мои бронирования
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Мои бронирования</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            {/* Здесь можно добавить список бронирований */}
            <p className="text-sm text-gray-500">
              У вас пока нет активных бронирований
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OpenSpaceBooking;
