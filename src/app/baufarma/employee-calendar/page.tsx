import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { CheckCircle, Clock, Filter } from "lucide-react";

interface Task {
  id: string;
  title: string;
  category: string;
  hours: number;
  completed: boolean;
  date?: string; // если задача назначена на день
}

const TaskCalendar = () => {
  const [tasks, setTasks] = useState<Task[]>([
    // Беклог
    {
      id: "1",
      title: "Оформить чертежи на ДЕРЕВО",
      category: "Дерево",
      hours: 4,
      completed: false,
    },
    {
      id: "2",
      title: "Собрать ТЗ на ДЕРЕВО",
      category: "Дерево",
      hours: 4,
      completed: false,
    },
    {
      id: "3",
      title: "Контроль производства ДЕРЕВО",
      category: "Дерево",
      hours: 3,
      completed: false,
    },
    // Назначенные задачи
    {
      id: "4",
      title: "Организация доставки ДЕРЕВО (Аптека 1)",
      category: "Дерево",
      hours: 4,
      completed: false,
      date: "2025-01-01",
    },
    {
      id: "5",
      title: "Еженедельный контроль ДЕРЕВО",
      category: "Дерево",
      hours: 2,
      completed: true,
      date: "2025-01-02",
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState<Date>(
    new Date("2025-01-01")
  );

  // Получаем задачи для беклога (без даты)
  const backlogTasks = tasks.filter(
    (task) =>
      !task.date &&
      (selectedCategory === "all" || task.category === selectedCategory)
  );

  // Получаем задачи для выбранного дня
  const getTasksForDate = (date: string) => {
    return tasks.filter(
      (task) =>
        task.date === date &&
        (selectedCategory === "all" || task.category === selectedCategory)
    );
  };

  // Обработка перетаскивания
  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const newTasks = [...tasks];
    const [movedTask] = newTasks.splice(result.source.index, 1);

    if (result.destination.droppableId === "backlog") {
      movedTask.date = undefined;
    } else {
      movedTask.date = result.destination.droppableId;
    }

    newTasks.splice(result.destination.index, 0, movedTask);
    setTasks(newTasks);
  };

  // Переключение статуса выполнения
  const toggleTaskComplete = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const formatDate = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex gap-6">
          {/* Левая колонка - Беклог и фильтры */}
          <div className="w-80">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Беклог</span>
                  <Filter className="h-5 w-5" />
                </CardTitle>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все категории</SelectItem>
                    <SelectItem value="Дерево">Дерево</SelectItem>
                    <SelectItem value="Металл">Металл</SelectItem>
                    <SelectItem value="Стекло">Стекло</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent>
                <Droppable droppableId="backlog">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="space-y-2"
                    >
                      {backlogTasks.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="p-3 bg-white border rounded-lg shadow-sm"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-medium">
                                  {task.title}
                                </span>
                                <Badge variant="secondary">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {task.hours}ч
                                </Badge>
                              </div>
                              <Badge className="mt-2" variant="outline">
                                {task.category}
                              </Badge>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </CardContent>
            </Card>
          </div>

          {/* Правая колонка - Календарь */}
          <div className="flex-1">
            <Card>
              <CardHeader>
                <CardTitle>Календарь задач</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1">
                  {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day) => (
                    <div key={day} className="text-center font-medium p-2">
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: 35 }).map((_, index) => {
                    const date = new Date(2025, 0, index + 1);
                    const dateStr = formatDate(date);
                    const dayTasks = getTasksForDate(dateStr);
                    const totalHours = dayTasks.reduce(
                      (sum, task) => sum + task.hours,
                      0
                    );

                    return (
                      <Droppable key={dateStr} droppableId={dateStr}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={`min-h-[120px] p-2 border rounded-lg ${
                              totalHours > 8
                                ? "bg-red-50"
                                : totalHours > 0
                                ? "bg-blue-50"
                                : "bg-gray-50"
                            }`}
                          >
                            <div className="text-right text-sm text-gray-500">
                              {date.getDate()}
                            </div>
                            {dayTasks.map((task, idx) => (
                              <Draggable
                                key={task.id}
                                draggableId={task.id}
                                index={idx}
                              >
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`p-2 mb-1 rounded-md text-sm ${
                                      task.completed
                                        ? "bg-green-100"
                                        : "bg-white"
                                    }`}
                                  >
                                    <div className="flex items-center gap-2">
                                      <Checkbox
                                        checked={task.completed}
                                        onCheckedChange={() =>
                                          toggleTaskComplete(task.id)
                                        }
                                      />
                                      <span
                                        className={
                                          task.completed ? "line-through" : ""
                                        }
                                      >
                                        {task.title}
                                      </span>
                                    </div>
                                    <Badge variant="secondary" className="mt-1">
                                      {task.hours}ч
                                    </Badge>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default TaskCalendar;
