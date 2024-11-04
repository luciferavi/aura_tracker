import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskManager = () => {
  
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const token = localStorage.getItem('token'); // Assuming you store the token here

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/tasks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, [token]);

  const addTask = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/tasks',
        { taskText: taskInput },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
     // console.log('Response data:', response.data); 

      setTasks([...tasks, response.data]);
      setTaskInput('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const editTask = async (id, newText) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/tasks/${id}`,
        { taskText: newText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  return (
    <div>
      <input
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        placeholder="New task"
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <input
              value={task.taskText}
              onChange={(e) => editTask(task._id, e.target.value)}
            />
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
