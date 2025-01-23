import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  priority: string;
  onToggle: () => void;
  onDelete: () => void;
}

const TodoItem = ({ text, completed, priority, onToggle, onDelete }: TodoItemProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-priority-high text-white';
      case 'medium':
        return 'bg-priority-medium text-white';
      case 'low':
        return 'bg-priority-low text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <Card className="p-4 flex items-center justify-between gap-4 group hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4 flex-1">
        <Checkbox checked={completed} onCheckedChange={onToggle} />
        <span className={`flex-1 ${completed ? 'line-through text-muted-foreground' : ''}`}>
          {text}
        </span>
        <Badge className={`${getPriorityColor(priority)} capitalize`}>
          {priority}
        </Badge>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onDelete}
        className="opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </Card>
  );
};

export default TodoItem;