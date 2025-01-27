import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from ".";

//Type definition for TaskItem
export interface TaskItem {
  id: string; //UUID v7
  name: string; //Task name
  completed: boolean; //Boolean to indicate task completion
}

interface TaskState {
  tasks: TaskItem[];
}

const initialState: TaskState = { tasks: [] };

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    //Update whole tasks state with new tasks in payload
    setTasks: (state, action: PayloadAction<TaskItem[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<TaskItem>) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    completeTask: (
      state,
      action: PayloadAction<{ id: string; status: boolean }>
    ) => {
      const task = state.tasks.find((v) => v.id === action.payload.id);
      if (task !== undefined) {
        task.completed = action.payload.status;
      }
    },
  },
});

export const { setTasks, addTask, removeTask, completeTask } =
  taskSlice.actions;

export const selectTask = (state: RootState) => state.task.tasks;

export default taskSlice.reducer;
