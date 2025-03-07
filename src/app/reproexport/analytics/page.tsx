"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
  Area,
  AreaChart,
  ComposedChart,
  Scatter,
  ScatterChart,
} from "recharts";
import {
  Car,
  Route,
  TrendingUp,
  MapPin,
  Clock,
  DollarSign,
} from "lucide-react";

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState("month");

  // Данные о водителях и их машинах
  const driversData = [
    {
      id: 1,
      name: "Алексей",
      car: "Toyota Corolla",
      fuelConsumption: 12,
      fuelType: "92",
      avgPointsPerDay: 8,
      avgDistancePerDay: 120,
      totalPoints: 176,
      totalDistance: 2640,
      fuelCost: 215000,
      carYear: 2018,
      efficiency: 0.85, // точек в час
    },
    {
      id: 2,
      name: "Михаил",
      car: "Daewoo Matiz",
      fuelConsumption: 5,
      fuelType: "92",
      avgPointsPerDay: 12,
      avgDistancePerDay: 95,
      totalPoints: 264,
      totalDistance: 2090,
      fuelCost: 89000,
      carYear: 2015,
      efficiency: 1.2,
    },
    {
      id: 3,
      name: "Сергей",
      car: "Hyundai Accent",
      fuelConsumption: 8,
      fuelType: "95",
      avgPointsPerDay: 10,
      avgDistancePerDay: 110,
      totalPoints: 220,
      totalDistance: 2420,
      fuelCost: 156000,
      carYear: 2020,
      efficiency: 1.0,
    },
    {
      id: 4,
      name: "Андрей",
      car: "Chevrolet Lacetti",
      fuelConsumption: 9,
      fuelType: "92",
      avgPointsPerDay: 9,
      avgDistancePerDay: 105,
      totalPoints: 198,
      totalDistance: 2310,
      fuelCost: 167000,
      carYear: 2016,
      efficiency: 0.95,
    },
  ];

  // Данные по дням для каждого водителя
  const dailyStats = [
    { date: "01.02", driver1: 7, driver2: 11, driver3: 9, driver4: 8 },
    { date: "02.02", driver1: 8, driver2: 13, driver3: 10, driver4: 9 },
    { date: "03.02", driver1: 9, driver2: 12, driver3: 11, driver4: 10 },
    { date: "04.02", driver1: 8, driver2: 11, driver3: 9, driver4: 8 },
    { date: "05.02", driver1: 7, driver2: 12, driver3: 10, driver4: 9 },
    { date: "06.02", driver1: 9, driver2: 13, driver3: 11, driver4: 10 },
    { date: "07.02", driver1: 8, driver2: 12, driver3: 10, driver4: 9 },
  ];

  // Анализ эффективности по расстоянию
  const distanceEfficiency = driversData.map((driver) => ({
    name: driver.name,
    car: driver.car,
    costPer100km: driver.fuelConsumption * 235, // 235 тенге за литр
    pointsPerLiter: driver.avgPointsPerDay / driver.fuelConsumption,
  }));

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Аналитика эффективности</h1>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Выберите период" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Неделя</SelectItem>
            <SelectItem value="month">Месяц</SelectItem>
            <SelectItem value="quarter">Квартал</SelectItem>
            <SelectItem value="year">Год</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPI водителей */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {driversData.map((driver) => (
          <Card key={driver.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold">{driver.name}</h3>
                  <p className="text-sm text-gray-500">{driver.car}</p>
                </div>
                <Car className="h-5 w-5 text-gray-400" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Точек в день:</span>
                  <span className="font-medium">{driver.avgPointsPerDay}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">
                    Расход на 100км:
                  </span>
                  <span className="font-medium">{driver.fuelConsumption}л</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Точек в час:</span>
                  <span className="font-medium">{driver.efficiency}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Графики */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* График точек по дням */}
        <Card>
          <CardHeader>
            <CardTitle>Количество точек по дням</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="driver1"
                    name="Алексей"
                    stroke="#8884d8"
                  />
                  <Line
                    type="monotone"
                    dataKey="driver2"
                    name="Михаил"
                    stroke="#82ca9d"
                  />
                  <Line
                    type="monotone"
                    dataKey="driver3"
                    name="Сергей"
                    stroke="#ffc658"
                  />
                  <Line
                    type="monotone"
                    dataKey="driver4"
                    name="Андрей"
                    stroke="#ff7300"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* График эффективности по расходу */}
        <Card>
          <CardHeader>
            <CardTitle>Эффективность расхода топлива</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={distanceEfficiency}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="costPer100km"
                    name="Стоимость на 100км (₸)"
                    fill="#8884d8"
                  />
                  <Bar
                    dataKey="pointsPerLiter"
                    name="Точек на литр"
                    fill="#82ca9d"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Scatter plot расстояния и точек */}
        <Card>
          <CardHeader>
            <CardTitle>Соотношение расстояния и количества точек</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    type="number"
                    dataKey="avgDistancePerDay"
                    name="Среднее расстояние (км)"
                  />
                  <YAxis
                    type="number"
                    dataKey="avgPointsPerDay"
                    name="Точек в день"
                  />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                  <Legend />
                  <Scatter name="Водители" data={driversData} fill="#8884d8" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Анализ стоимости поездок */}
        <Card>
          <CardHeader>
            <CardTitle>Анализ стоимости поездок</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={driversData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="fuelCost"
                    name="Затраты на топливо (₸)"
                    fill="#8884d8"
                  />
                  <Line
                    type="monotone"
                    dataKey="totalPoints"
                    name="Всего точек"
                    stroke="#82ca9d"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Детальная таблица */}
      <Card>
        <CardHeader>
          <CardTitle>Детальный анализ водителей и машин</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Водитель</th>
                  <th className="text-left py-3 px-4">Машина</th>
                  <th className="text-left py-3 px-4">Год</th>
                  <th className="text-left py-3 px-4">Расход</th>
                  <th className="text-left py-3 px-4">Точек/день</th>
                  <th className="text-left py-3 px-4">Км/день</th>
                  <th className="text-left py-3 px-4">₸/точка</th>
                  <th className="text-left py-3 px-4">Рекомендации</th>
                </tr>
              </thead>
              <tbody>
                {driversData.map((driver) => {
                  const costPerPoint = (
                    driver.fuelCost / driver.totalPoints
                  ).toFixed(0);
                  const recommendation =
                    driver.fuelConsumption < 7
                      ? "Дальние маршруты"
                      : driver.avgPointsPerDay > 10
                      ? "Плотные районы"
                      : "Смешанные маршруты";

                  return (
                    <tr key={driver.id} className="border-b">
                      <td className="py-3 px-4">{driver.name}</td>
                      <td className="py-3 px-4">{driver.car}</td>
                      <td className="py-3 px-4">{driver.carYear}</td>
                      <td className="py-3 px-4">
                        {driver.fuelConsumption}л/100км
                      </td>
                      <td className="py-3 px-4">{driver.avgPointsPerDay}</td>
                      <td className="py-3 px-4">{driver.avgDistancePerDay}</td>
                      <td className="py-3 px-4">{costPerPoint}₸</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs 
                          ${
                            recommendation === "Дальние маршруты"
                              ? "bg-green-100 text-green-800"
                              : recommendation === "Плотные районы"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {recommendation}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
