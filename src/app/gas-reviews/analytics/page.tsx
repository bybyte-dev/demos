"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Calendar } from "@/components/ui/calendar";
import { Star, MessageSquare, Users, Fuel } from "lucide-react";

// Моковые данные для демонстрации
const mockChartData = [
  { date: "2024-01", rating: 4.2, reviews: 45 },
  { date: "2024-02", rating: 4.5, reviews: 52 },
  { date: "2024-03", rating: 4.1, reviews: 38 },
];

const mockReviews = [
  {
    id: 1,
    source: "CRMSensor",
    date: "2024-03-07",
    station: "АЗС №1",
    rating: 4,
    text: "Хорошее обслуживание, но очереди большие",
  },
  // ... другие отзывы
];

const mockStations = [
  {
    id: 1,
    name: "АЗС №1",
    avgRating: 4.5,
    reviewCount: 156,
    trend: "up",
  },
  // ... другие станции
];

const AnalyticsDashboard = () => {
  const [dateRange] = useState({
    from: new Date(),
    to: new Date(),
  });
  const [selectedSource, setSelectedSource] = useState("all");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Верхняя панель с фильтрами */}
      <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
        <h1 className="text-2xl font-bold text-green-700">
          Аналитика отзывов АЗС
        </h1>

        <div className="flex gap-4">
          <Select value={selectedSource} onValueChange={setSelectedSource}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Источник данных" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все источники</SelectItem>
              <SelectItem value="crmsensor">CRMSensor</SelectItem>
              <SelectItem value="2gis">2GIS</SelectItem>
              <SelectItem value="qr">QR отзывы</SelectItem>
            </SelectContent>
          </Select>

          <Calendar
            mode="range"
            selected={dateRange}
            // onSelect={setDateRange}
            className="rounded-md border"
          />
        </div>
      </div>

      {/* Карточки с основными метриками */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Средний рейтинг</p>
              <h3 className="text-2xl font-bold text-green-700">4.3</h3>
            </div>
            <Star className="h-8 w-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Всего отзывов</p>
              <h3 className="text-2xl font-bold text-green-700">1,234</h3>
            </div>
            <MessageSquare className="h-8 w-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Активных АЗС</p>
              <h3 className="text-2xl font-bold text-green-700">42</h3>
            </div>
            <Fuel className="h-8 w-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Сотрудников</p>
              <h3 className="text-2xl font-bold text-green-700">156</h3>
            </div>
            <Users className="h-8 w-8 text-green-500" />
          </div>
        </Card>
      </div>

      {/* Основной контент */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* График трендов */}
        <Card className="lg:col-span-2 p-4">
          <h3 className="text-lg font-semibold mb-4">Динамика оценок</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="rating" stroke="#16a34a" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Топ проблемных АЗС */}
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">Проблемные АЗС</h3>
          <div className="space-y-4">
            {mockStations.map((station) => (
              <div
                key={station.id}
                className="flex items-center justify-between p-2 border-b"
              >
                <div>
                  <p className="font-medium">{station.name}</p>
                  <p className="text-sm text-gray-500">
                    {station.reviewCount} отзывов
                  </p>
                </div>
                <Badge
                  variant={station.avgRating >= 4 ? "default" : "secondary"}
                >
                  {station.avgRating}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Таблица последних отзывов */}
      <Card className="mt-6 p-4">
        <h3 className="text-lg font-semibold mb-4">Последние отзывы</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Источник</TableHead>
              <TableHead>Дата</TableHead>
              <TableHead>АЗС</TableHead>
              <TableHead>Оценка</TableHead>
              <TableHead>Отзыв</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockReviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell>
                  <Badge variant="outline">{review.source}</Badge>
                </TableCell>
                <TableCell>{review.date}</TableCell>
                <TableCell>{review.station}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Star
                      className={`w-4 h-4 ${
                        review.rating >= 4 ? "text-green-500" : "text-gray-400"
                      }`}
                    />
                    {review.rating}
                  </div>
                </TableCell>
                <TableCell className="max-w-xs truncate">
                  {review.text}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
