import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { useAppDispatch } from "../hooks/store";
import { addTask, completeTask, removeTask, setTasks } from "../store/task";

const SocketContext = createContext<Socket | null>(null);

//Define SocketProvider for sharing single socket instance with multiple components
export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    //Create a new socket instance from environment variable
    const newSocket = io(import.meta.env.VITE_API_URL);
    setSocket(newSocket);

    newSocket.on("init", (tasks) => {
      dispatch(setTasks(tasks));
    });

    newSocket.on("addTask", (task) => {
      dispatch(addTask(task));
    });

    newSocket.on("completeTask", ({ id, status }) => {
      dispatch(completeTask({ id, status }));
    });

    newSocket.on("deleteTask", (id: string) => {
      dispatch(removeTask(id));
    });

    return () => {
      newSocket.off("init");
      newSocket.off("update");
      newSocket.disconnect();
    };
  }, [dispatch]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = () => {
  return useContext(SocketContext);
};
