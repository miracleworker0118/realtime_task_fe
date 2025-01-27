import { useCallback } from "react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { completeTask, removeTask, TaskItem } from "../store/task";
import { useSocket } from "../context/SocketContext";
import { useAppDispatch } from "../hooks/store";

const TaskListItem = ({ task }: { task: TaskItem }) => {
  const socket = useSocket()!;
  const dispatch = useAppDispatch();

  //Send deleteTask event to server with task id
  const handleDeleteClick = useCallback(() => {
    dispatch(removeTask(task.id));
    socket.emit("deleteTask", task.id);
  }, [dispatch, socket, task.id]);

  //Send completeTask event to server with task id and status
  const handleCompleteClick = useCallback(() => {
    dispatch(completeTask({ id: task.id, status: !task.completed }));
    socket.emit("completeTask", { id: task.id, status: !task.completed });
  }, [dispatch, socket, task.completed, task.id]);

  return (
    <div className="flex flex-row rounded-xl border-gray-600 border px-4 py-2 w-full gap-2">
      <div className="text-xl">{task.name}</div>
      <div className="grow" />
      <button onClick={handleCompleteClick}>
        <CheckIcon
          className={`${
            task.completed
              ? "text-green-500 stroke-2 font-bold"
              : "text-yellow-500"
          } cursor-pointer size-6`}
        />
      </button>
      <button onClick={handleDeleteClick}>
        <XMarkIcon className="text-red-900 size-6 cursor-pointer" />
      </button>
    </div>
  );
};

export default TaskListItem;
