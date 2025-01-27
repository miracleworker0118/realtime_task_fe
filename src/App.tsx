import { useCallback, useState } from "react";
import { v7 as uuidv7 } from "uuid";
import { useAppDispatch, useAppSelector } from "./hooks/store";
import { addTask, selectTask } from "./store/task";
import TaskList from "./component/TaskList";
import { useSocket } from "./context/SocketContext";

const App = () => {
  const socket = useSocket()!;
  const [newTaskName, setNewTaskName] = useState<string>("");
  const tasks = useAppSelector(selectTask);
  const dispatch = useAppDispatch();

  const handleAddTask = useCallback(() => {
    //Trim the new task name and ignore if it is already in tasks
    const name = newTaskName.trim();
    if (name === "" || tasks.findIndex((v) => v.name === name) !== -1) {
      return;
    }
    setNewTaskName("");
    //Create new task object and emit addTask event to server
    const newTask = {
      id: uuidv7(),
      name,
      completed: false,
    };
    dispatch(addTask(newTask));
    socket.emit("addTask", newTask);
  }, [dispatch, newTaskName, socket, tasks]);

  return (
    <div className="min-h-screen h-full bg-slate-200">
      <div className="container mx-auto py-4">
        <div className="flex flex-row gap-8 mb-4">
          <input
            type="text"
            className="w-96 border border-stone-900 appearance-none outline-none text-xl rounded-lg px-4 py-2"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.currentTarget.value)}
          />
          <button
            className="bg-blue-600 hover:bg-blue-500 cursor-pointer px-6 rounded-lg text-white"
            onClick={handleAddTask}
          >
            Add Task
          </button>
        </div>
        <div>
          <TaskList tasks={tasks} />
        </div>
      </div>
    </div>
  );
};

export default App;
