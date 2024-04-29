import { useTodoStore } from "../store/todoStore";

const Calendar = () => {
  const { todos } = useTodoStore();
  return (
    <div>
      <h1>Calendar</h1>
      {todos.map((todo) => (
        <p>{todo.text}</p>
      ))}
    </div>
  );
};
export default Calendar;
