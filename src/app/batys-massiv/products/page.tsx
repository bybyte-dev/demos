"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCw, ExternalLink } from "lucide-react";

const ProductsUpdate = () => {
  const [lastUpdate, setLastUpdate] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleUpdateFromSheets = async () => {
    setIsLoading(true);
    try {
      // Здесь будет логика обновления из Google Sheets
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Имитация загрузки
      setLastUpdate(new Date().toLocaleString("ru-RU"));
    } catch (error) {
      console.error("Ошибка при обновлении:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 p-8">
      <Card className="max-w-md mx-auto p-6 bg-white shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Обновление товаров</h1>

        <div className="space-y-6">
          <Button
            onClick={handleUpdateFromSheets}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Обновление...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Обновить из Google Sheets
              </>
            )}
          </Button>

          {lastUpdate && (
            <div className="text-sm text-gray-600">
              Последнее обновление: {lastUpdate}
            </div>
          )}

          <div className="flex items-center space-x-2 text-sm text-blue-600">
            <ExternalLink className="h-4 w-4" />
            <a
              href="https://docs.google.com/spreadsheets/d/your-sheet-id"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Открыть таблицу Google Sheets
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductsUpdate;
