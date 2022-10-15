import { BottomContent } from "./todo-bottom-content";
import { ListPrint } from "./todo-middle-content";
import { TodoContent } from "./todo-top-content";

const TodoList = () => {
  return (
    <>
      <TodoContent />
      <ListPrint />
      <BottomContent />
    </>
  );
};

export default TodoList;
