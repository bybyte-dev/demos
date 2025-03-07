"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Star, ThumbsUp } from "lucide-react";

interface City {
  id: string;
  name: string;
}

interface Station {
  id: string;
  name: string;
}

interface Issue {
  id: string;
  label: string;
}

type StationsMap = Record<string, Station[]>;

const cities: City[] = [
  { id: "1", name: "Алматы" },
  { id: "2", name: "Астана" },
  { id: "3", name: "Шымкент" },
];

const stations: StationsMap = {
  "1": [
    { id: "1", name: "АЗС №1 - пр. Абая 150" },
    { id: "2", name: "АЗС №2 - ул. Саина 24" },
    { id: "3", name: "АЗС №3 - пр. Райымбека 221" },
  ],
  "2": [
    { id: "1", name: "АЗС №1 - пр. Республики 89" },
    { id: "2", name: "АЗС №2 - ул. Кабанбай батыра 12" },
  ],
  "3": [
    { id: "1", name: "АЗС №1 - ул. Тауке хана 45" },
    { id: "2", name: "АЗС №2 - пр. Кунаева 91" },
  ],
};

const issues: Issue[] = [
  { id: "1", label: "Грубое обслуживание" },
  { id: "2", label: "Долгое ожидание" },
  { id: "3", label: "Качество топлива" },
];

const ReviewPage: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedStation, setSelectedStation] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = (): void => {
    setIsSubmitted(true);
  };

  const handleIssueChange = (issueId: string, checked: boolean): void => {
    setSelectedIssues((prev) =>
      checked ? [...prev, issueId] : prev.filter((id) => id !== issueId)
    );
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center space-y-4">
          <ThumbsUp className="w-16 h-16 mx-auto text-green-500" />
          <h2 className="text-2xl font-bold text-green-700">
            Спасибо за ваш отзыв!
          </h2>
          <p className="text-gray-600">Ваше мнение очень важно для нас</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-green-700">Оставьте отзыв</h1>
          <p className="text-gray-600">Помогите нам стать лучше</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block text-gray-700">
              Выберите город
            </label>
            <Select onValueChange={setSelectedCity}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Выберите город" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city.id} value={city.id}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedCity && (
            <div>
              <label className="text-sm font-medium mb-1 block text-gray-700">
                Выберите АЗС
              </label>
              <Select onValueChange={setSelectedStation}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите АЗС" />
                </SelectTrigger>
                <SelectContent>
                  {stations[selectedCity]?.map((station) => (
                    <SelectItem key={station.id} value={station.id}>
                      {station.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {selectedStation && (
            <div>
              <label className="text-sm font-medium mb-2 block text-gray-700">
                Оцените качество обслуживания
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-8 h-8 cursor-pointer transition-colors ${
                      star <= rating
                        ? "fill-green-500 text-green-500"
                        : "text-gray-300"
                    }`}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
            </div>
          )}

          {rating > 0 && rating < 5 && (
            <div>
              <label className="text-sm font-medium mb-1 block text-gray-700">
                Расскажите подробнее
              </label>
              <Textarea
                placeholder="Ваш комментарий"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          )}

          {rating > 0 && rating < 4 && (
            <div className="space-y-3">
              <label className="text-sm font-medium block text-gray-700">
                Что именно вас не устроило?
              </label>
              {issues.map((issue) => (
                <div key={issue.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={issue.id}
                    checked={selectedIssues.includes(issue.id)}
                    onCheckedChange={(checked: boolean) => {
                      handleIssueChange(issue.id, checked);
                    }}
                  />
                  <label
                    htmlFor={issue.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {issue.label}
                  </label>
                </div>
              ))}
            </div>
          )}

          {rating > 0 && (
            <Button
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={handleSubmit}
            >
              Отправить отзыв
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ReviewPage;
