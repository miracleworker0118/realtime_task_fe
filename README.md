# Real-Time Task Collaboration App Frontend

This Project is front-end part for Real-Time Task Collaboration App.

Users can create and manage tasks in real time. They can mark completed for each task and delete task.

This projects utilized WebSocket using Socket.IO-client library for sharing task contents between server.

Removed unnecessary content during communication, implement synchronization by sharing state update.

Used Redux-Toolkit for state management and Implemented basic styling with Tailwindcss.

## Running Project

```bash
npm install
npm run dev
```

Project Environment:

- Node.js 18+
- Vite 6.0
- React 18.0+
- Tailwindcss 4.0
- Redux Toolkit 2.5

## Project Structure

Socket.IO-client instance is shared by SocketContext using React's Context API.

Components can access to Socket.IO instance by calling

```typescript
export const useSocket = () => {
  return useContext(SocketContext);
};
```

When socket connection is established, client update store by `init` Events emitted by server.

```typescript
//Listen for init event to initialize tasks
newSocket.on("init", (tasks) => {
  dispatch(setTasks(tasks));
});
```

After initialization, server sent events when other client update the state. Client listens for each event and update local state by parameters.

For example, for `addTask` event

```javascript
//Listen for update event to update tasks
newSocket.on("addTask", (task) => {
  dispatch(addTask(task));
});
```

When user edit the Task, client update local storage first and emit the event to update all other client's state.

```javascript
//Send deleteTask event to server with task id
const handleDeleteClick = useCallback(() => {
	dispatch(removeTask(task.id));
	socket.emit("deleteTask", task.id);
}, [dispatch, socket, task.id]);
```

Type definition of Task which is stored in store is same as following code.

```typescript
interface TaskItem {
  id: string; //UUID v7
  name: string; //Task name
  completed: boolean; //Boolean to indicate task completion
}
```

Used UUIDv7 to identify each task.



