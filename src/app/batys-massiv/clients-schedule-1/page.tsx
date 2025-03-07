"use client";
import React, { useState } from "react";
import { FileDown, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface Payment {
  id: number;
  project: string;
  product: string;
  description: string; // Новое поле для описания
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
  const [fields] = useState<string[]>([
    "№",
    "Проект (договор)",
    "Товары",
    "Описание",
    "Код Филипс",
    "Код АГСК (скрыть)",
    "Кол-во",
    "Склад",
    "Цена продажи",
    "Сумма продажи",
    "Цена АГСК",
    "Цена закупки (скрыть)",
    "Сумма закупки",
    "Откуда отгрузка",
    "Дата заказа",
    "Дата отгрузки",
    "Дата доставки на СВХ",
    "Дата отгрузки клиенту",
    "Дата доставки клиенту",
    "Дата доставки клиенту по договору",
    "Оплата 1 (Дата)",
    "Оплата 1 (Сумма)",
    "Оплата 2 (Дата)",
    "Оплата 2 (Сумма)",
    "Оплата 3 (Дата)",
    "Оплата 3 (Сумма)",
    "Оплата 4 (Дата)",
    "Оплата 4 (Сумма)",
    "Оплата 5 (Дата)",
    "Оплата 5 (Сумма)",
  ]);

  const [visibleFields, setVisibleFields] = useState(fields);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const [payments, setPayments] = useState<Payment[]>([
    {
      id: 1,
      project: "",
      product: "",
      description: "", // Новое поле
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

  const addEmptyRow = () => {
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
  };

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

  const handleDescriptionChange = (value: string) => {
    if (selectedPayment) {
      handleInputChange(selectedPayment.id, "description", value);
    }
  };

  const deleteRow = (id: number) => {
    setPayments((prevPayments) =>
      prevPayments.filter((payment) => payment.id !== id)
    );
  };

  const toggleFieldVisibility = (field: string) => {
    setVisibleFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
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
    const headers = visibleFields;
    const rows = payments.map((payment) =>
      headers.map((header) => payment[header])
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

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#ffe6f0",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "15px",
          padding: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h1>График Платежей Клиентов</h1>
          <Button onClick={exportToExcel} className="flex items-center gap-2">
            <FileDown size={16} />
            Экспорт в Excel
          </Button>
        </div>

        <div>
          <Button
            onClick={() => {
              const controlBlock = document.getElementById("field-control");
              if (controlBlock) {
                controlBlock.style.display =
                  controlBlock.style.display === "none" ? "block" : "none";
              }
            }}
            variant="outline"
            className="mb-4"
          >
            Показать/Скрыть управление полями
          </Button>
          <div
            id="field-control"
            style={{ display: "none", marginBottom: "20px" }}
            className="grid grid-cols-3 gap-4"
          >
            {fields.map((field, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={visibleFields.includes(field)}
                  onChange={() => toggleFieldVisibility(field)}
                  id={`field-${index}`}
                />
                <label htmlFor={`field-${index}`}>{field}</label>
              </div>
            ))}
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              tableLayout: "fixed",
              minWidth: "1500px",
            }}
          >
            <thead>
              <tr>
                {fields.map(
                  (header, index) =>
                    visibleFields.includes(header) && (
                      <th
                        key={index}
                        style={{
                          border: "1px solid #ddd",
                          padding: "12px",
                          backgroundColor: "#f9f9f9",
                          textAlign: "left",
                          minWidth: "150px",
                        }}
                      >
                        {header}
                      </th>
                    )
                )}
                <th
                  style={{
                    border: "1px solid #ddd",
                    padding: "12px",
                    backgroundColor: "#f9f9f9",
                    textAlign: "left",
                    minWidth: "100px",
                  }}
                >
                  Действия
                </th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={payment.id}>
                  {fields.map(
                    (field, idx) =>
                      visibleFields.includes(field) && (
                        <td
                          key={idx}
                          style={{
                            border: "1px solid #ddd",
                            padding: "8px",
                            position: "relative",
                          }}
                        >
                          {field === "Описание" ? (
                            <div className="flex items-center gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="p-0 h-8"
                                    onClick={() => setSelectedPayment(payment)}
                                  >
                                    <Info size={16} />
                                    {payment.description
                                      ? " Редактировать"
                                      : " Добавить описание"}
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
                                        handleDescriptionChange(e.target.value)
                                      }
                                      className="min-h-[200px]"
                                    />
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          ) : (
                            <input
                              type="text"
                              value={payment[field]}
                              onChange={(e) =>
                                handleInputChange(
                                  payment.id,
                                  field,
                                  e.target.value
                                )
                              }
                              style={{
                                width: "100%",
                                border: "none",
                                background: "transparent",
                                padding: "4px",
                              }}
                            />
                          )}
                        </td>
                      )
                  )}
                  <td
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
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
              <tr>
                <td
                  colSpan={8}
                  style={{
                    border: "1px solid #ddd",
                    padding: "12px",
                    textAlign: "right",
                    fontWeight: "bold",
                  }}
                >
                  Итого по продажам:
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "12px",
                    backgroundColor: "#f9f9f9",
                    fontWeight: "bold",
                  }}
                >
                  {totals.saleTotal}
                </td>
                <td
                  colSpan={2}
                  style={{
                    border: "1px solid #ddd",
                    padding: "12px",
                    textAlign: "right",
                    fontWeight: "bold",
                  }}
                >
                  Итого по закупкам:
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "12px",
                    backgroundColor: "#f9f9f9",
                    fontWeight: "bold",
                  }}
                >
                  {totals.purchaseTotal}
                </td>
                <td
                  colSpan={visibleFields.length - 12}
                  style={{ border: "1px solid #ddd" }}
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
