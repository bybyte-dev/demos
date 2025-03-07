"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";

const RouteCreator = () => {
  const [selectedPoints, setSelectedPoints] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const mockLocations = [
    { name: 'Супермаркет "Центральный"', address: "ул. Ленина, 45" },
    { name: 'ТЦ "Мегаполис"', address: "пр. Абая, 150" },
    { name: 'Бизнес центр "Нурлы"', address: "ул. Достык, 12" },
    { name: 'Магазин "Светлый"', address: "ул. Жандосова, 58" },
    { name: 'Аптека "Здоровье"', address: "ул. Тимирязева, 42" },
    { name: 'Ресторан "Восток"', address: "ул. Сейфуллина, 168" },
    { name: 'Отель "Премиум"', address: "пр. Аль-Фараби, 77" },
    { name: "Школа №25", address: "ул. Байтурсынова, 126" },
  ];

  return (
    <div className="w-[500px] bg-white rounded-lg shadow-lg p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Добавление маршрута</h2>
        <button className="text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Марка машины:</Label>
          <Select defaultValue="honda">
            <SelectTrigger>
              <SelectValue placeholder="Выберите машину" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="honda">Honda Civic</SelectItem>
              <SelectItem value="toyota">Toyota Camry</SelectItem>
              <SelectItem value="kia">Kia Rio</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Водитель:</Label>
          <Select defaultValue="ivan">
            <SelectTrigger>
              <SelectValue placeholder="Выберите водителя" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ivan">Иванов Иван</SelectItem>
              <SelectItem value="petr">Петров Петр</SelectItem>
              <SelectItem value="alex">Александров Александр</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Гос. номер:</Label>
          <Select defaultValue="001">
            <SelectTrigger>
              <SelectValue placeholder="Выберите номер" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="001">A001AA</SelectItem>
              <SelectItem value="002">B002BB</SelectItem>
              <SelectItem value="003">C003CC</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Расход топлива (л/100км):</Label>
          <Input type="number" defaultValue="8.5" className="w-full" />
        </div>

        <div>
          <Label>Время доставки:</Label>
          <Select defaultValue="morning">
            <SelectTrigger>
              <SelectValue placeholder="Выберите время" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morning">Утро</SelectItem>
              <SelectItem value="day">День</SelectItem>
              <SelectItem value="evening">Вечер</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ScrollArea className="h-[300px] border rounded-md p-4">
          <div className="grid grid-cols-2 gap-4">
            {mockLocations.map((location, index) => (
              <Card
                key={index}
                className={`cursor-pointer ${
                  selectedPoints.includes(location.name)
                    ? "border-blue-500"
                    : ""
                }`}
                onClick={() => {
                  if (selectedPoints.includes(location.name)) {
                    setSelectedPoints(
                      selectedPoints.filter((p) => p !== location.name)
                    );
                  } else {
                    setSelectedPoints([...selectedPoints, location.name]);
                  }
                }}
              >
                <CardContent className="p-4">
                  <div className="font-medium">{location.name}</div>
                  <div className="text-sm text-gray-500">
                    {location.address}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>

        <div className="flex items-center space-x-2">
          <Switch id="return-office" />
          <Label htmlFor="return-office">Конец маршрута в офисе</Label>
        </div>

        <Button className="w-full" onClick={() => setShowResult(true)}>
          Рассчитать маршрут
        </Button>

        {showResult && (
          <div className="mt-4 p-4 border rounded-md bg-gray-50">
            <h3 className="font-medium text-green-600 mb-2">
              Маршрут успешно создан!
            </h3>
            <div className="space-y-2">
              <p>Общее расстояние: 24.5 км</p>
              <p>Расход топлива: 2.08 л</p>
              <p>
                Маршрут: Офис → ТЦ Мегаполис → Школа №25 → Аптека Здоровье →
                Офис
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RouteCreator;
