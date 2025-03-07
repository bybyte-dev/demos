"use client";
import React, { useState } from "react";

const PaymentSchedule = () => {
  const [fields, setFields] = useState([
    "№",
    "Проект (договор)",
    "Товары",
    "Код Филипс",
    "Код АГСК (скрыть)",
    "Кол-во",
    "Склад",
    "Цена продажи",
    "Сумма продажи",
    "Цена АГСК",
    "Цена закупки (скрыть)",
    "Сумма закупки (скрыть)", // добавляем это поле
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

  const [payments, setPayments] = useState([
    {
      id: 1,
      project: "",
      product: "",
      philipsCode: "",
      agskCode: "",
      quantity: "",
      warehouse: "",
      salePrice: "",
      saleSum: "",
      agskPrice: "",
      purchasePrice: "",
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
        philipsCode: "",
        agskCode: "",
        quantity: "",
        warehouse: "",
        salePrice: "",
        saleSum: "",
        agskPrice: "",
        purchasePrice: "",
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
      prevPayments.map((payment) =>
        payment.id === id ? { ...payment, [field]: value } : payment
      )
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

  const toggleFieldVisibility = (field: string) => {
    setVisibleFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

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
        <h1>График Платежей Клиентов</h1>

        {/* Блок управления видимостью полей */}
        <div>
          <button
            onClick={() => {
              const controlBlock = document.getElementById("field-control");
              if (controlBlock) {
                controlBlock.style.display =
                  controlBlock.style.display === "none" ? "block" : "none";
              }
            }}
            style={{
              marginBottom: "10px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Показать/Скрыть управление полями
          </button>
          <div
            id="field-control"
            style={{ display: "none", marginBottom: "20px" }}
          >
            {fields.map((field, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                <label>
                  <input
                    type="checkbox"
                    checked={visibleFields.includes(field)}
                    onChange={() => toggleFieldVisibility(field)}
                  />{" "}
                  {field}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Таблица с горизонтальным скроллом */}
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
                          }}
                        >
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
                      <button
                        onClick={() => deleteRow(payment.id)}
                        style={{
                          backgroundColor: "#ff4d4d",
                          color: "#fff",
                          border: "none",
                          padding: "5px 10px",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        Удалить
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentSchedule;
