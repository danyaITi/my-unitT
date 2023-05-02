import { useSelector, useDispatch } from "react-redux";
import { selectTodos } from "../../store/selectors/todoSelector";
import { removeTodo, toggleComplete } from "../../store/slices/todoSlice";

const TodoList = () => {
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();

  if (!todos.length) {
    return <span>Список Todos пуст!</span>;
  }

  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.text}</span>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch(toggleComplete(todo.id))}
            />
            <button onClick={() => dispatch(removeTodo(todo.id))}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
