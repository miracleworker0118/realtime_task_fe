import { TaskItem } from "../store/task";
import TaskListItem from "./TaskListItem";

//Display TaskListItem for each task in tasks
const TaskList = ({ tasks }: { tasks: TaskItem[] }) => {
  return (
    <div className="flex flex-col gap-2">
      {tasks.map((task) => (
        <TaskListItem task={task} key={task.id} />
      ))}
    </div>
  );
};

export default TaskList;
