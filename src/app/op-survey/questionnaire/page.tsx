"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Clock, Gauge } from "lucide-react";
import { useState, useEffect } from "react";

// Типы данных
interface Answer {
  id: string;
  text: string;
  timeEstimate: number; // в часах
  complexity: "easy" | "medium" | "hard";
}

interface Question {
  id: string;
  text: string;
  answers: Answer[];
}

interface Category {
  id: string;
  title: string;
  icon: string;
  questions: Question[];
}

// Моковые данные (в реальности должны загружаться из JSON)
const surveyData: Category[] = [
  {
    id: "general",
    title: "Общие вопросы",
    icon: "🎯",
    questions: [
      {
        id: "users",
        text: "Сколько пользователей будет работать с системой?",
        answers: [
          {
            id: "u1",
            text: "До 10 пользователей",
            timeEstimate: 20,
            complexity: "easy",
          },
          {
            id: "u2",
            text: "10-50 пользователей",
            timeEstimate: 40,
            complexity: "medium",
          },
          {
            id: "u3",
            text: "Более 50 пользователей",
            timeEstimate: 80,
            complexity: "hard",
          },
        ],
      },
      {
        id: "deployment",
        text: "Где будет размещаться система?",
        answers: [
          {
            id: "d1",
            text: "Облачный хостинг",
            timeEstimate: 8,
            complexity: "easy",
          },
          {
            id: "d2",
            text: "Собственный сервер",
            timeEstimate: 16,
            complexity: "medium",
          },
          {
            id: "d3",
            text: "Гибридное размещение",
            timeEstimate: 24,
            complexity: "hard",
          },
        ],
      },
    ],
  },
  {
    id: "1c",
    title: "Интеграция с 1С",
    icon: "💼",
    questions: [
      {
        id: "1c_version",
        text: "Какая версия 1С используется?",
        answers: [
          {
            id: "1cv1",
            text: "1С:Предприятие 8.3",
            timeEstimate: 20,
            complexity: "easy",
          },
          {
            id: "1cv2",
            text: "1С:Предприятие 8.2",
            timeEstimate: 30,
            complexity: "medium",
          },
          {
            id: "1cv3",
            text: "Другая версия",
            timeEstimate: 40,
            complexity: "hard",
          },
        ],
      },
      {
        id: "1c_api",
        text: "Есть ли готовые API для интеграции?",
        answers: [
          {
            id: "1ca1",
            text: "Да, есть документация",
            timeEstimate: 16,
            complexity: "easy",
          },
          {
            id: "1ca2",
            text: "Нет, нужно разработать",
            timeEstimate: 40,
            complexity: "hard",
          },
          {
            id: "1ca3",
            text: "Частично готовы",
            timeEstimate: 24,
            complexity: "medium",
          },
        ],
      },
    ],
  },
  {
    id: "bitrix",
    title: "Интеграция с Битрикс24",
    icon: "🔄",
    questions: [
      {
        id: "bitrix_type",
        text: "Какой тип интеграции требуется?",
        answers: [
          {
            id: "b1",
            text: "Только REST API",
            timeEstimate: 16,
            complexity: "easy",
          },
          {
            id: "b2",
            text: "Webhook + REST API",
            timeEstimate: 24,
            complexity: "medium",
          },
          {
            id: "b3",
            text: "Полная синхронизация",
            timeEstimate: 40,
            complexity: "hard",
          },
        ],
      },
    ],
  },
];

const OpSurvey = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});
  const [totalEstimate, setTotalEstimate] = useState(0);
  const [complexity, setComplexity] = useState<"easy" | "medium" | "hard">(
    "easy"
  );

  const updateEstimates = () => {
    let timeSum = 0;
    let complexityPoints = { easy: 0, medium: 0, hard: 0 };

    Object.entries(selectedAnswers).forEach(([questionId, answerId]) => {
      surveyData.forEach((category) => {
        category.questions.forEach((question) => {
          if (question.id === questionId) {
            const answer = question.answers.find((a) => a.id === answerId);
            if (answer) {
              timeSum += answer.timeEstimate;
              complexityPoints[answer.complexity]++;
            }
          }
        });
      });
    });

    setTotalEstimate(timeSum);

    // Определение общей сложности
    if (
      complexityPoints.hard >
      complexityPoints.medium + complexityPoints.easy
    ) {
      setComplexity("hard");
    } else if (complexityPoints.medium > complexityPoints.easy) {
      setComplexity("medium");
    } else {
      setComplexity("easy");
    }
  };

  useEffect(() => {
    updateEstimates();
  }, [selectedAnswers]);

  const handleAnswerSelect = (questionId: string, answerId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Опросник по разработке</h1>

        <Card className="mb-4">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-500" />
                  <span>Оценка времени: </span>
                  <span className="font-bold">{totalEstimate} часов</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gauge className="h-5 w-5 text-orange-500" />
                  <span>Сложность: </span>
                  <Badge className={getComplexityColor(complexity)}>
                    {complexity === "easy"
                      ? "Легко"
                      : complexity === "medium"
                      ? "Средне"
                      : "Сложно"}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue={surveyData[0].id}>
          <TabsList className="mb-4">
            {surveyData.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.icon} {category.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {surveyData.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <Card>
                <CardContent className="pt-6">
                  {category.questions.map((question) => (
                    <div key={question.id} className="mb-6">
                      <h3 className="font-medium mb-3">{question.text}</h3>
                      <RadioGroup
                        value={selectedAnswers[question.id]}
                        onValueChange={(value) =>
                          handleAnswerSelect(question.id, value)
                        }
                      >
                        {question.answers.map((answer) => (
                          <div
                            key={answer.id}
                            className="flex items-center space-x-2 mb-2"
                          >
                            <RadioGroupItem value={answer.id} id={answer.id} />
                            <Label htmlFor={answer.id} className="flex-1">
                              {answer.text}
                            </Label>
                            <div className="flex gap-2">
                              <Badge variant="outline">
                                {answer.timeEstimate}ч
                              </Badge>
                              <Badge
                                className={getComplexityColor(
                                  answer.complexity
                                )}
                              >
                                {answer.complexity === "easy"
                                  ? "Легко"
                                  : answer.complexity === "medium"
                                  ? "Средне"
                                  : "Сложно"}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default OpSurvey;
