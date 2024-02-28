import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import Task from "./Task";

const TaskList = ({ onCompleteTask, onEditTask, onDeleteTask }) => {
  const { tasks } = useTasks();
  const [searchTerm, setSearchTerm] = useState("");
  // const [selectedPriority, setSelectedPriority] = useState('All');
  const [filter, setFilter] = useState('All'); // Default filter

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) 
    // && (selectedPriority === 'All' || task.priority === selectedPriority)
    &&
      (filter === 'All' ||
        (filter === 'Completed' && task.completed) ||
        (filter === 'Pending' && !task.completed) ||
        (filter === 'InProgress' && !task.completed))
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // const handlePriorityChange = (e) => {
  //   setSelectedPriority(e.target.value);
  // };

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  return (
    <div className="p-1">
      <input
        type="text"
        placeholder="Search here..."
        value={searchTerm}
        onChange={handleSearch}
        className="mt-2 mb-4 w-full grow p-1 outline-blue-ribbon-400 rounded"
      />

      {/* <select value={selectedPriority} onChange={handlePriorityChange}>
        <option value="All">All</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select> */}
      <div className='ml-4 py-2 sm:px-10 md:px-30 flex gap-x-1 bg-blue-ribbon-500 dark:bg-blue-ribbon-900 justify-center'>
          <p className='px-2 text-white bg-violet-800 rounded'>Status :</p>
          <button className='px-2 text-gray hover:text-white bg-violet-600 hover:bg-violet-700 rounded' onClick={() => handleFilterChange('All')}>All</button>
          <button className='px-2 text-gray hover:text-white bg-violet-600 hover:bg-violet-700 rounded' onClick={() => handleFilterChange('Completed')}>Completed</button>
          <button className='px-2 text-gray hover:text-white bg-violet-600 hover:bg-violet-700 rounded' onClick={() => handleFilterChange('Pending')}>Pending</button>
          <button className='px-2 text-gray hover:text-white bg-violet-600 hover:bg-violet-700 rounded' onClick={() => handleFilterChange('InProgress')}>InProgress</button>
        </div>  

      <ul className="flex flex-col gap-y-2 py-4">
        {filteredTasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            priority={task.priority}
            deadline={task.deadline}
            filter={task.completed ? 'Completed' : 'Pending'}
            completed={task.completed}
            onCompleteTask={onCompleteTask}
            onEditTask={onEditTask}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
