import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TasksProvider } from './context/Tasks';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TasksProvider>
    <App />
  </TasksProvider>

);

