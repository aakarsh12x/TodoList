import { TransitionGroup, CSSTransition } from 'react-transition-group';
import TodoItem from './TodoItem';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: string;
}

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoList = ({ todos, onToggle, onDelete }: TodoListProps) => {
  return (
    <div className="space-y-4">
      <TransitionGroup>
        {todos.map((todo) => (
          <CSSTransition key={todo.id} timeout={300} classNames="task">
            <TodoItem
              {...todo}
              onToggle={() => onToggle(todo.id)}
              onDelete={() => onDelete(todo.id)}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default TodoList;