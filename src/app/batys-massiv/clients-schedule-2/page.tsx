"use client";
import React, { useState, useEffect, useCallback } from "react";
import { FileDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

// Конфигурация полей
const defaultFieldsConfig = {
  fields: [
    { id: "id", name: "№", visible: true },
    { id: "project", name: "Проект (договор)", visible: true },
    { id: "product", name: "Товары", visible: true },
    { id: "philipsCode", name: "Код Филипс", visible: true },
    { id: "agskCode", name: "Код АГСК", visible: false },
    { id: "quantity", name: "Кол-во", visible: true },
    { id: "warehouse", name: "Склад", visible: true },
    { id: "salePrice", name: "Цена продажи", visible: true },
    { id: "saleSum", name: "Сумма продажи", visible: true },
    { id: "agskPrice", name: "Цена АГСК", visible: true },
    { id: "purchasePrice", name: "Цена закупки", visible: false },
    { id: "purchaseSum", name: "Сумма закупки", visible: false },
    { id: "shipmentFrom", name: "Откуда отгрузка", visible: false },
    { id: "orderDate", name: "Дата заказа", visible: false },
    { id: "shipmentDate", name: "Дата отгрузки", visible: false },
    { id: "deliveryToWarehouse", name: "Дата доставки на СВХ", visible: false },
    { id: "clientShipmentDate", name: "Дата отгрузки клиенту", visible: false },
    { id: "clientDeliveryDate", name: "Дата доставки клиенту", visible: false },
    {
      id: "contractDeliveryDate",
      name: "Дата доставки клиенту по договору",
      visible: true,
    },
    { id: "payment1Date", name: "Оплата 1 (Дата)", visible: true },
    { id: "payment1Sum", name: "Оплата 1 (Сумма)", visible: true },
    { id: "payment2Date", name: "Оплата 2 (Дата)", visible: true },
    { id: "payment2Sum", name: "Оплата 2 (Сумма)", visible: true },
    { id: "payment3Date", name: "Оплата 3 (Дата)", visible: false },
    { id: "payment3Sum", name: "Оплата 3 (Сумма)", visible: false },
    { id: "payment4Date", name: "Оплата 4 (Дата)", visible: false },
    { id: "payment4Sum", name: "Оплата 4 (Сумма)", visible: false },
    { id: "payment5Date", name: "Оплата 5 (Дата)", visible: false },
    { id: "payment5Sum", name: "Оплата 5 (Сумма)", visible: false },
    { id: "description", name: "Описание", visible: true },
  ],
};

interface FieldConfig {
  id: string;
  name: string;
  visible: boolean;
}

interface Payment {
  id: number;
  project: string;
  product: string;
  description: string;
  philipsCode: string;
  agskCode: string;
  quantity: string;
  warehouse: string;
  salePrice: string;
  saleSum: string;
  agskPrice: string;
  purchasePrice: string;
  purchaseSum: string;
  shipmentFrom: string;
  orderDate: string;
  shipmentDate: string;
  deliveryToWarehouse: string;
  clientShipmentDate: string;
  clientDeliveryDate: string;
  contractDeliveryDate: string;
  payment1Date: string;
  payment1Sum: string;
  payment2Date: string;
  payment2Sum: string;
  payment3Date: string;
  payment3Sum: string;
  payment4Date: string;
  payment4Sum: string;
  payment5Date: string;
  payment5Sum: string;
  [key: string]: string | number;
}

const PaymentSchedule = () => {
  const [fieldsConfig, setFieldsConfig] = useState<FieldConfig[]>(
    defaultFieldsConfig.fields
  );
  const [showFieldsConfig, setShowFieldsConfig] = useState(false);
  const [, setSelectedPayment] = useState<Payment | null>(null);

  const visibleFields = fieldsConfig
    .filter((field) => field.visible)
    .map((field) => field.name);

  const [payments, setPayments] = useState<Payment[]>([
    {
      id: 1,
      project: "",
      product: "",
      description: "",
      philipsCode: "",
      agskCode: "",
      quantity: "",
      warehouse: "",
      salePrice: "",
      saleSum: "",
      agskPrice: "",
      purchasePrice: "",
      purchaseSum: "",
      shipmentFrom: "",
      orderDate: "",
      shipmentDate: "",
      deliveryToWarehouse: "",
      clientShipmentDate: "",
      clientDeliveryDate: "",
      contractDeliveryDate: "",
      payment1Date: "",
      payment1Sum: "",
      payment2Date: "",
      payment2Sum: "",
      payment3Date: "",
      payment3Sum: "",
      payment4Date: "",
      payment4Sum: "",
      payment5Date: "",
      payment5Sum: "",
    },
  ]);

  const addEmptyRow = useCallback(() => {
    const newId = payments.length ? payments[payments.length - 1].id + 1 : 1;
    setPayments([
      ...payments,
      {
        id: newId,
        project: "",
        product: "",
        description: "",
        philipsCode: "",
        agskCode: "",
        quantity: "",
        warehouse: "",
        salePrice: "",
        saleSum: "",
        agskPrice: "",
        purchasePrice: "",
        purchaseSum: "",
        shipmentFrom: "",
        orderDate: "",
        shipmentDate: "",
        deliveryToWarehouse: "",
        clientShipmentDate: "",
        clientDeliveryDate: "",
        contractDeliveryDate: "",
        payment1Date: "",
        payment1Sum: "",
        payment2Date: "",
        payment2Sum: "",
        payment3Date: "",
        payment3Sum: "",
        payment4Date: "",
        payment4Sum: "",
        payment5Date: "",
        payment5Sum: "",
      },
    ]);
  }, [payments]);

  const handleInputChange = (id: number, field: string, value: string) => {
    setPayments((prevPayments) =>
      prevPayments.map((payment) => {
        if (payment.id === id) {
          const updatedPayment = { ...payment, [field]: value };

          // Автоматический расчет суммы продажи
          if (field === "quantity" || field === "salePrice") {
            const quantity = parseFloat(updatedPayment.quantity) || 0;
            const salePrice = parseFloat(updatedPayment.salePrice) || 0;
            updatedPayment.saleSum = (quantity * salePrice).toString();
          }

          // Автоматический расчет суммы закупки
          if (field === "quantity" || field === "purchasePrice") {
            const quantity = parseFloat(updatedPayment.quantity) || 0;
            const purchasePrice = parseFloat(updatedPayment.purchasePrice) || 0;
            updatedPayment.purchaseSum = (quantity * purchasePrice).toString();
          }

          return updatedPayment;
        }
        return payment;
      })
    );

    if (id === payments.length) {
      addEmptyRow();
    }
  };

  const deleteRow = (id: number) => {
    setPayments((prevPayments) =>
      prevPayments.filter((payment) => payment.id !== id)
    );
  };

  const toggleFieldVisibility = (fieldId: string) => {
    setFieldsConfig((prevConfig) =>
      prevConfig.map((field) =>
        field.id === fieldId ? { ...field, visible: !field.visible } : field
      )
    );
  };

  const calculateTotals = () => {
    const saleTotal = payments
      .reduce((sum, payment) => sum + (parseFloat(payment.saleSum) || 0), 0)
      .toFixed(2);

    const purchaseTotal = payments
      .reduce((sum, payment) => sum + (parseFloat(payment.purchaseSum) || 0), 0)
      .toFixed(2);

    return { saleTotal, purchaseTotal };
  };

  const exportToExcel = () => {
    const visibleFieldConfigs = fieldsConfig.filter((field) => field.visible);
    const headers = visibleFieldConfigs.map((field) => field.name);
    const fieldIds = visibleFieldConfigs.map((field) => field.id);

    const rows = payments.map((payment) =>
      fieldIds.map((fieldId) => payment[fieldId])
    );

    const csvContent =
      "data:text/csv;charset=utf-8," +
      headers.join(",") +
      "\n" +
      rows.map((row) => row.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "payment-schedule.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totals = calculateTotals();

  // Эффект для добавления пустой строки при инициализации
  useEffect(() => {
    if (payments.length === 0) {
      addEmptyRow();
    }
  }, [payments.length, addEmptyRow]);

  return (
    <div className="p-5 min-h-screen bg-[#ffe6f0]">
      <div className="bg-white rounded-xl p-5 shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">График Платежей Клиентов</h1>
          <div className="flex gap-2">
            <Button
              onClick={() => setShowFieldsConfig(!showFieldsConfig)}
              variant="outline"
            >
              Настройка полей
            </Button>
            <Button onClick={exportToExcel} className="flex items-center gap-2">
              <FileDown size={16} />
              Экспорт в Excel
            </Button>
          </div>
        </div>

        {/* Конфигурация полей */}
        {showFieldsConfig && (
          <div className="mb-4 p-4 border rounded-lg">
            <h2 className="text-lg font-semibold mb-3">
              Настройка видимости полей
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {fieldsConfig.map((field) => (
                <div key={field.id} className="flex items-center gap-2">
                  <Checkbox
                    id={field.id}
                    checked={field.visible}
                    onCheckedChange={() => toggleFieldVisibility(field.id)}
                  />
                  <label htmlFor={field.id} className="text-sm">
                    {field.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Таблица */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[1500px]">
            <thead>
              <tr>
                {fieldsConfig
                  .filter((field) => field.visible)
                  .map((field, index) => (
                    <th
                      key={index}
                      className="border border-gray-200 p-3 bg-gray-50 text-left"
                    >
                      {field.name}
                    </th>
                  ))}
                <th className="border border-gray-200 p-3 bg-gray-50 text-left">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={payment.id}>
                  {fieldsConfig
                    .filter((field) => field.visible)
                    .map((field, idx) => (
                      <td
                        key={idx}
                        className="border border-gray-200 p-2 relative"
                      >
                        {field.id === "description" ? (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="w-full justify-start"
                                onClick={() => setSelectedPayment(payment)}
                              >
                                <MoreHorizontal size={16} />
                                {/* {payment.description ? " Просмотр" : " Добавить"} */}
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Описание товара</DialogTitle>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <Textarea
                                  placeholder="Введите описание товара..."
                                  value={payment.description}
                                  onChange={(e) =>
                                    handleInputChange(
                                      payment.id,
                                      "description",
                                      e.target.value
                                    )
                                  }
                                  className="min-h-[200px]"
                                />
                              </div>
                            </DialogContent>
                          </Dialog>
                        ) : (
                          <input
                            type="text"
                            value={payment[field.id]}
                            onChange={(e) =>
                              handleInputChange(
                                payment.id,
                                field.id,
                                e.target.value
                              )
                            }
                            className="w-full border-none bg-transparent p-1"
                          />
                        )}
                      </td>
                    ))}
                  <td className="border border-gray-200 p-2 text-center">
                    {index !== payments.length - 1 && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteRow(payment.id)}
                      >
                        Удалить
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
              {/* Итоговая строка */}
              <tr>
                <td
                  colSpan={8}
                  className="border border-gray-200 p-3 text-right font-bold"
                >
                  Итого по продажам:
                </td>
                <td className="border border-gray-200 p-3 bg-gray-50 font-bold">
                  {totals.saleTotal}
                </td>
                <td
                  colSpan={2}
                  className="border border-gray-200 p-3 text-right font-bold"
                >
                  Итого по закупкам:
                </td>
                <td className="border border-gray-200 p-3 bg-gray-50 font-bold">
                  {totals.purchaseTotal}
                </td>
                <td
                  colSpan={visibleFields.length - 12}
                  className="border border-gray-200"
                ></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentSchedule;
