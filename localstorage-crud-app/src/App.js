import { useState, useEffect } from 'react'
import TaskList from './components/TaskList'
import { saveTasksOnLocalstorage } from './logic/storage'
import { useTasks } from './hooks/useTasks'
import './App.css'

const App = () => {
  const { tasks, setTasks } = useTasks();
  const [task, setTask] = useState('');
  const [description, setDescription] = useState(''); // for description
  const [selectedPriority, setSelectedPriority] = useState('Medium'); // Default priority
  const [taskDeadline, setTaskDeadline] = useState(''); // for Task Deadline

  useEffect(() => saveTasksOnLocalstorage(tasks), [tasks])

  const handleTitleChange = (event) => {
    const taskTitle = event.target.value

    setTask(taskTitle)
  }

  const handleDescChange = (event) => {
    const taskDescription = event.target.value

    setDescription(taskDescription)
  }

  const handlePriorityChange = (event) => {
    setSelectedPriority(event.target.value);
  };

  const handleDeadlineChange = (event) => {
    setTaskDeadline(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault()

    if (task === '') return

    const newTask = {
      id: crypto.randomUUID(),
      title: task,
      description: description,
      priority: selectedPriority, // Set the priority
      deadline: taskDeadline,
      completed: false,
    };

    const newTasksList = [...tasks, newTask]
    setTasks(newTasksList);
    setTask('');
    setDescription('');
    setSelectedPriority('Medium'); // Reset priority after adding task
    setTaskDeadline('');
  }

  const onCompleteTask = (id) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) return { ...task, completed: !task.completed }

      return task;
    })

    setTasks(updatedTasks);
  }

  const onEditTask = (id, newTitle, newDesc) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) return { ...task, title: newTitle, description: newDesc }

      return task
    })

    setTasks(updatedTasks)
  }

  const onDeleteTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id)

    setTasks(newTasks)
  }

  

  return (
    <main>
        
      <form onSubmit={handleSubmit} className='px-1 py-4 sm:px-10 md:px-20 lg:px-42  flex justify-around items-center gap-x-2 bg-blue-ribbon-500 dark:bg-blue-ribbon-900'>
        <label htmlFor="title" className='px-1 py-1 font-semibold text-white dark:bg-blue-700 rounded'>Title :</label>
        <input type='text' id='title' placeholder='Write your task title here...' onChange={handleTitleChange} value={task} className='grow p-1 outline-blue-ribbon-400 rounded' />

        <label htmlFor="desc" className='px-1 py-1 font-semibold text-white dark:bg-blue-700 rounded'>Description :</label>
        <input type='text' id='desc' placeholder='Task description here...' onChange={handleDescChange} value={description} className='grow p-1 outline-blue-ribbon-400 rounded' />


        <input
            type='date'
            placeholder='Deadline'
            onChange={handleDeadlineChange}
            value={taskDeadline}
            className='px-1 py-1 bg-blue-ribbon-800 dark:bg-blue-700 hover:bg-blue-ribbon-600 rounded cursor-pointer'
          />

        <select value={selectedPriority} onChange={handlePriorityChange} className='py-1 font-semibold text-white dark:text-gray-200 bg-blue-ribbon-800 dark:bg-blue-700 hover:bg-blue-ribbon-600 rounded cursor-pointer transition-colors'>
            <option value='High'>High</option>
            <option value='Medium'>Medium</option>
            <option value='Low'>Low</option>
        </select>

        {/* Add Task */}
        <input type='submit' value='Add Task' className='px-1 py-1 lg:px-5 font-semibold text-white dark:text-gray-200 bg-blue-ribbon-800 dark:bg-blue-700 hover:bg-blue-ribbon-600 rounded cursor-pointer transition-colors' />
      </form>

      {tasks.length > 0 && (
        <div className='sm:px-10 md:px-20 w-screen'>
          <section className='mt-3 md:mt-5 lg:mt-10 p-1 py-1 sm:mx-auto bg-blue-ribbon-500 dark:bg-blue-ribbon-900 rounded'>
          <TaskList key={task.id} id={task.id} onCompleteTask={onCompleteTask} onEditTask={onEditTask} onDeleteTask={onDeleteTask} />
          </section>
        </div>
      )}
    </main>
  )
}

export default App