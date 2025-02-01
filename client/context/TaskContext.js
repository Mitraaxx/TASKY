"use client";
import axios from "axios";
import React, { createContext, useEffect} from 'react';
import { useUserContext } from './userContext';
import toast from "react-hot-toast";


const TasksContext = createContext();

const serverUrl = "http://localhost:8000/api/v1";

export const TasksProvider = ({children}) =>{

    const userid = useUserContext().user._id;

    const [tasks, setTasks] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [isEditing, setIsEditing] = React.useState(false);
    const[task, setTask] = React.useState({});
    const[priority, setPriority] = React.useState("all");
    const [activeTask, setActiveTask] = React.useState(null);
    const [modalMode, setModalMode] = React.useState("");
    const [profileModal, setProfileModal] = React.useState(false);


    const openModalAdd = () => {
        setModalMode("add");
        setIsEditing(true);
        setTask({});
    };

    const openModalEdit = (task) => {
        setModalMode("edit");
        setIsEditing(true);
        setActiveTask(task);
    };

    const openProfileModal = () => {
        setProfileModal(true);
    };

    const closeModal = () => {
        setIsEditing(false);
        setProfileModal(false);
        setModalMode("");
        setActiveTask(null);
        setTask({});
    }

    // get tasks
         const getTasks = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${serverUrl}/tasks`);
    
          setTasks(response.data.tasks);
        } catch (error) {
          console.log("Error getting tasks", error);
        }
        setLoading(false);
      };
    

    // get task
    const getTask = async (taskId) =>{
        setLoading(true);
        try{
            const response = await axios.get(`${serverUrl}/task/${taskId}`);

            setTask(response.data);
        }
        catch(error){
            console.log("Error getting task",error);
        }
        setLoading(false);
    };

    // create Task
    const createTask = async (task) =>{
        setLoading(true);
        try{
            const res = await axios.post(`${serverUrl}/task/create`, task);
            setTasks([...tasks, res.data]);
            toast.success("Task created successfully");
        }
        catch(error){
            console.log("Error creating task",error);
        }
        setLoading(false);
    };

    // update task
    const updateTask = async (task) => {
        setLoading(true);
        try{
            const res = await axios.patch(`${serverUrl}/task/${task._id}`, task);
            
            const newTasks = tasks.map((tsk) => {
                return tsk._id === res.data._id ? res.data : tsk;
            });

            toast.success("Task updaated successfully");

            setTasks(newTasks);
        } catch(error){
            console.log("Error updating task", error);
        }
    };
  
    // delete task
    const deleteTask = async (taskId) => {
        setLoading(true);
        try{
            await axios.delete(`${serverUrl}/task/${taskId}`);

            const newTasks = tasks.filter((tsk) => tsk._id !== taskId);

            setTask(newTasks);
        }
        catch(error){
            console.log("Error deleting task", error);
      }
    };
    
    const handleInput = (name) => (e) => {
        if(name === 'setTask'){
            setTask(e);
        }
        else{
            setTask({...task, [name]: e.target.value});
        }
    };

    // get completed tasks
    const completedTasks = tasks.filter((task) => task.completed);

    // get pending tasks
    const activeTasks = tasks.filter((task) => !task.completed);     

    useEffect(() => {
        getTasks();
    }, [userid]);

    return(
     <TasksContext.Provider
    value={{
        tasks,
        loading,
        task,
        tasks,
        getTask,
        createTask,
        updateTask,
        deleteTask,
        priority,
        setPriority,
        handleInput,
        isEditing,
        setIsEditing,
        openModalAdd,
        openModalEdit,
        openProfileModal,
        activeTask,
        setActiveTask,
        closeModal,
        modalMode,
        activeTasks,
        completedTasks
    }}
    >
        {children}
    </TasksContext.Provider>
    );
};

export const useTasks = () => {
    return React.useContext(TasksContext);
  };