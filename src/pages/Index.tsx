import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import TodoInput from '@/components/TodoInput';
import TodoList from '@/components/TodoList';
import TaskStats from '@/components/TaskStats';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: string;
}

const Index = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string, priority: string) => {
    setTodos([
      ...todos,
      {
        id: crypto.randomUUID(),
        text,
        completed: false,
        priority,
      },
    ]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-green-500">Task Manager</h1>
          <Button 
            onClick={handleLogout} 
            variant="outline"
            className="border-green-500 text-green-500 hover:bg-green-500/10"
          >
            Logout
          </Button>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="bg-gray-800 border-green-500/20">
            <CardHeader>
              <CardTitle className="text-green-500">Task Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <TaskStats todos={todos} />
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-green-500/20">
            <CardHeader>
              <CardTitle className="text-green-500">Add New Task</CardTitle>
            </CardHeader>
            <CardContent>
              <TodoInput onAdd={addTodo} />
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gray-800 border-green-500/20">
          <CardHeader>
            <CardTitle className="text-green-500">Your Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <TodoList
              todos={todos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;