"use client";
import React, { useState } from "react";
import { MoreHorizontal, FileDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Specification {
  id: number;
  project: string;
  product: string;
  philipsCode: string;
  agskCode: string;
  quantity: string;
  warehouse: string;
  salePrice: string;
  saleSum: string;
  agskPrice: string;
  description: string;
  [key: string]: string | number;
}

interface DescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  description: string;
  onSave: (description: string) => void;
}

const DescriptionModal: React.FC<DescriptionModalProps> = ({
  isOpen,
  onClose,
  description,
  onSave,
}) => {
  const [tempDescription, setTempDescription] = useState(description);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Описание</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            value={tempDescription}
            onChange={(e) => setTempDescription(e.target.value)}
            className="min-h-[200px]"
            placeholder="Введите описание..."
          />
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button
            onClick={() => {
              onSave(tempDescription);
              onClose();
            }}
          >
            Сохранить
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const SpecificationPage = () => {
  const [fields] = useState<string[]>([
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
  ]);

  const [specifications, setSpecifications] = useState<Specification[]>([
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
      description: "",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEditingId, setCurrentEditingId] = useState<number | null>(null);

  const addEmptyRow = () => {
    const newId = specifications.length
      ? specifications[specifications.length - 1].id + 1
      : 1;
    setSpecifications([
      ...specifications,
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
        description: "",
      },
    ]);
  };

  const handleInputChange = (id: number, field: string, value: string) => {
    setSpecifications((prevSpecs) =>
      prevSpecs.map((spec) =>
        spec.id === id ? { ...spec, [field]: value } : spec
      )
    );

    if (id === specifications.length) {
      addEmptyRow();
    }
  };

  const deleteRow = (id: number) => {
    setSpecifications((prevSpecs) =>
      prevSpecs.filter((spec) => spec.id !== id)
    );
  };

  const calculateTotal = () => {
    return specifications
      .reduce((sum, spec) => sum + (parseFloat(spec.saleSum) || 0), 0)
      .toFixed(2);
  };

  const exportToExcel = () => {
    const headers = [...fields, "Описание"];
    const rows = specifications.map((spec) => [
      spec.id,
      spec.project,
      spec.product,
      spec.philipsCode,
      spec.agskCode,
      spec.quantity,
      spec.warehouse,
      spec.salePrice,
      spec.saleSum,
      spec.agskPrice,
      spec.description,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      headers.join(",") +
      "\n" +
      rows.map((row) => row.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "specification.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDescriptionSave = (description: string) => {
    if (currentEditingId !== null) {
      setSpecifications((prevSpecs) =>
        prevSpecs.map((spec) =>
          spec.id === currentEditingId ? { ...spec, description } : spec
        )
      );
    }
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
        <div className="flex justify-between items-center mb-4">
          <h1>Спецификация</h1>
          <Button onClick={exportToExcel} className="flex items-center gap-2">
            <FileDown size={16} />
            Экспорт в Excel
          </Button>
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
                {fields.map((header, index) => (
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
                ))}
                <th
                  style={{
                    border: "1px solid #ddd",
                    padding: "12px",
                    backgroundColor: "#f9f9f9",
                    textAlign: "center",
                    minWidth: "100px",
                  }}
                >
                  Описание
                </th>
                <th
                  style={{
                    border: "1px solid #ddd",
                    padding: "12px",
                    backgroundColor: "#f9f9f9",
                    textAlign: "center",
                    minWidth: "100px",
                  }}
                >
                  Действия
                </th>
              </tr>
            </thead>
            <tbody>
              {specifications.map((spec, index) => (
                <tr key={spec.id}>
                  {fields.map((field, idx) => (
                    <td
                      key={idx}
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                      }}
                    >
                      <input
                        type="text"
                        value={spec[field]}
                        onChange={(e) =>
                          handleInputChange(spec.id, field, e.target.value)
                        }
                        style={{
                          width: "100%",
                          border: "none",
                          background: "transparent",
                          padding: "4px",
                        }}
                      />
                    </td>
                  ))}
                  <td
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setCurrentEditingId(spec.id);
                        setIsModalOpen(true);
                      }}
                    >
                      <MoreHorizontal size={16} />
                    </Button>
                  </td>
                  <td
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    {index !== specifications.length - 1 && (
                      <button
                        onClick={() => deleteRow(spec.id)}
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
              <tr>
                <td
                  colSpan={7}
                  style={{
                    border: "1px solid #ddd",
                    padding: "12px",
                    textAlign: "right",
                    fontWeight: "bold",
                  }}
                >
                  Итого:
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "12px",
                    backgroundColor: "#f9f9f9",
                    fontWeight: "bold",
                  }}
                >
                  {calculateTotal()}
                </td>
                <td colSpan={3} style={{ border: "1px solid #ddd" }}></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <DescriptionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCurrentEditingId(null);
        }}
        description={
          specifications.find((spec) => spec.id === currentEditingId)
            ?.description || ""
        }
        onSave={handleDescriptionSave}
      />
    </div>
  );
};

export default SpecificationPage;
