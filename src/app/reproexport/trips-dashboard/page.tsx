"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Filter, Car, Fuel, MapPin, Clock, User } from "lucide-react";

interface Trip {
  id: string;
  date: string;
  driver: string;
  route: string[];
  distance: number;
  fuelUsed: number;
  fuelCost: number;
  startTime: string;
  endTime: string;
  status: "completed" | "in-progress" | "cancelled";
}

const TripsDashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [selectedDriver, setSelectedDriver] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);

  // Моковые данные
  const trips: Trip[] = [
    {
      id: "1",
      date: "2025-02-01",
      driver: "Алексей Иванов",
      route: ['ТЦ "Мега"', 'Рынок "Зеленый базар"', 'ТЦ "Достык Плаза"'],
      distance: 45.2,
      fuelUsed: 4.8,
      fuelCost: 1250,
      startTime: "09:00",
      endTime: "12:30",
      status: "completed",
    },
    {
      id: "2",
      date: "2025-02-02",
      driver: "Михаил Петров",
      route: ["Склад №1", 'Магазин "Рамстор"', 'ТЦ "Азия Парк"'],
      distance: 38.7,
      fuelUsed: 4.2,
      fuelCost: 1092,
      startTime: "10:15",
      endTime: "13:45",
      status: "completed",
    },
    // Добавьте больше поездок по необходимости
  ];

  const drivers = ["Алексей Иванов", "Михаил Петров", "Сергей Николаев"];
  const months = [
    { value: "01", label: "Январь" },
    { value: "02", label: "Февраль" },
    { value: "03", label: "Март" },
    // ... остальные месяцы
  ];

  const filterTrips = (trips: Trip[]) => {
    return trips.filter((trip) => {
      const matchesMonth =
        selectedMonth === "all" || trip.date.includes(`-${selectedMonth}-`);
      const matchesDriver =
        selectedDriver === "all" || trip.driver === selectedDriver;
      const matchesSearch =
        searchQuery === "" ||
        trip.route.some((point) =>
          point.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        trip.driver.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesMonth && matchesDriver && matchesSearch;
    });
  };

  const getStatusColor = (status: Trip["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const calculateStats = (trips: Trip[]) => {
    const filteredTrips = filterTrips(trips);
    return {
      totalTrips: filteredTrips.length,
      totalDistance: filteredTrips.reduce(
        (sum, trip) => sum + trip.distance,
        0
      ),
      totalFuel: filteredTrips.reduce((sum, trip) => sum + trip.fuelUsed, 0),
      totalCost: filteredTrips.reduce((sum, trip) => sum + trip.fuelCost, 0),
    };
  };

  const stats = calculateStats(trips);

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Журнал поездок</h1>
        <Button onClick={() => setShowFilters(!showFilters)}>
          <Filter className="mr-2 h-4 w-4" />
          Фильтры
        </Button>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Всего поездок</p>
                <p className="text-2xl font-bold">{stats.totalTrips}</p>
              </div>
              <Car className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Общий километраж</p>
                <p className="text-2xl font-bold">
                  {stats.totalDistance.toFixed(1)} км
                </p>
              </div>
              <MapPin className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Расход топлива</p>
                <p className="text-2xl font-bold">
                  {stats.totalFuel.toFixed(1)} л
                </p>
              </div>
              <Fuel className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Затраты на топливо</p>
                <p className="text-2xl font-bold">
                  {stats.totalCost.toFixed(0)} ₸
                </p>
              </div>
              <Clock className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Фильтры */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите месяц" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все месяцы</SelectItem>
              {months.map((month) => (
                <SelectItem key={month.value} value={month.value}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedDriver} onValueChange={setSelectedDriver}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите водителя" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все водители</SelectItem>
              {drivers.map((driver) => (
                <SelectItem key={driver} value={driver}>
                  {driver}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            placeholder="Поиск по маршруту..."
            value={searchQuery}
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setSearchQuery(e.target.value)}
          />
        </div>
      )}

      {/* Карточки поездок */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filterTrips(trips).map((trip) => (
          <Card key={trip.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">
                      {new Date(trip.date).toLocaleDateString("ru-RU")}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{trip.driver}</span>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                    trip.status
                  )}`}
                >
                  {trip.status === "completed"
                    ? "Завершен"
                    : trip.status === "in-progress"
                    ? "В процессе"
                    : "Отменен"}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="text-sm text-gray-600">
                  <strong>Маршрут:</strong>
                  <div className="ml-4">
                    {trip.route.map((point, index) => (
                      <div key={index} className="flex items-center">
                        <span className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-xs mr-2">
                          {index + 1}
                        </span>
                        {point}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Расстояние</p>
                  <p className="font-medium">{trip.distance} км</p>
                </div>
                <div>
                  <p className="text-gray-500">Расход топлива</p>
                  <p className="font-medium">{trip.fuelUsed} л</p>
                </div>
                <div>
                  <p className="text-gray-500">Время</p>
                  <p className="font-medium">
                    {trip.startTime} - {trip.endTime}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Стоимость топлива</p>
                  <p className="font-medium">{trip.fuelCost} ₸</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TripsDashboard;
