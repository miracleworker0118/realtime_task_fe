# Real-Time Task Collaboration App Frontend

This Project is front-end part for Real-Time Task Collaboration App.
Users can create and manage tasks in real time. They can mark completed for each task and delete task.

This projects utilized WebSocket using Socket.IO-client library for sharing task contents between server.
And used Redux-Toolkit for state management.
Implemented basic styling with Tailwindcss.

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

## Structure of the Project

Socket.IO-client instance is shared by SocketContext using React's Context API.

Type definition of Task which is stored in store is same as following code.

```typescript
interface TaskItem {
  id: string; //UUID v7
  name: string; //Task name
  completed: boolean; //Boolean to indicate task completion
}
```

Used UUIDv7 to identify each task.
