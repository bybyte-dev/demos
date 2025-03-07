"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2, Plus } from "lucide-react";

interface DeliveryPoint {
  id: string;
  name: string;
  address: string;
  coordinates: string;
  contactPerson: string;
  phone: string;
  workingHours: string;
}

const DeliveryPointsAdmin = () => {
  const [points, setPoints] = useState<DeliveryPoint[]>([
    {
      id: "1",
      name: 'Супермаркет "Центральный"',
      address: "ул. Ленина, 45",
      coordinates: "43.238949, 76.889709",
      contactPerson: "Иванов Иван",
      phone: "+7 (777) 123-45-67",
      workingHours: "09:00-21:00",
    },
    {
      id: "2",
      name: 'ТЦ "Мегаполис"',
      address: "пр. Абая, 150",
      coordinates: "43.245678, 76.928592",
      contactPerson: "Петров Петр",
      phone: "+7 (777) 765-43-21",
      workingHours: "10:00-22:00",
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [editingPoint, setEditingPoint] = useState<DeliveryPoint | null>(null);
  const [formData, setFormData] = useState<Partial<DeliveryPoint>>({});
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
  }>({ show: false, message: "" });

  const showNotification = (message: string) => {
    setNotification({ show: true, message });
    setTimeout(() => setNotification({ show: false, message: "" }), 3000);
  };

  const handleAdd = () => {
    setEditingPoint(null);
    setFormData({});
    setIsOpen(true);
  };

  const handleEdit = (point: DeliveryPoint) => {
    setEditingPoint(point);
    setFormData(point);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Вы уверены, что хотите удалить эту точку?")) {
      setPoints(points.filter((p) => p.id !== id));
      showNotification("Точка доставки была успешно удалена");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingPoint) {
      setPoints(
        points.map((p) =>
          p.id === editingPoint.id ? { ...p, ...formData } : p
        )
      );
      showNotification("Данные точки доставки успешно обновлены");
    } else {
      const newPoint = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
      } as DeliveryPoint;
      setPoints([...points, newPoint]);
      showNotification("Новая точка доставки успешно добавлена");
    }

    setIsOpen(false);
  };

  return (
    <div className="container mx-auto py-6">
      {notification.show && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          {notification.message}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Управление точками доставки</h1>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Добавить точку
        </Button>
      </div>

      <div className="border rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Название
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Адрес
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Координаты
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Контактное лицо
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Телефон
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Часы работы
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {points.map((point) => (
                <tr key={point.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{point.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {point.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {point.coordinates}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {point.contactPerson}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{point.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {point.workingHours}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(point)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDelete(point.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingPoint ? "Редактировать точку" : "Добавить новую точку"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Название</Label>
                <Input
                  id="name"
                  value={formData.name || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Адрес</Label>
                <Input
                  id="address"
                  value={formData.address || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="coordinates">Координаты</Label>
                <Input
                  id="coordinates"
                  value={formData.coordinates || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, coordinates: e.target.value })
                  }
                  placeholder="43.238949, 76.889709"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contactPerson">Контактное лицо</Label>
                <Input
                  id="contactPerson"
                  value={formData.contactPerson || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, contactPerson: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input
                  id="phone"
                  value={formData.phone || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+7 (777) 123-45-67"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="workingHours">Часы работы</Label>
                <Input
                  id="workingHours"
                  value={formData.workingHours || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, workingHours: e.target.value })
                  }
                  placeholder="09:00-21:00"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Отмена
              </Button>
              <Button type="submit">
                {editingPoint ? "Сохранить" : "Добавить"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeliveryPointsAdmin;
