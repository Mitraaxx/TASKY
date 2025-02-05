"use client"
import { useTasks } from '@/context/TaskContext'
import useDetectOutside from '@/hooks/useDetectOutside';
import React, { useEffect } from 'react'

function Modal() {
    const {task,
        handleInput,
        createTask,
        isEditing,
        closeModal,
        modalMode,
        activeTask,
        updateTask  
    } = useTasks();
    const ref = React.useRef(null);

    useDetectOutside({
        ref,
        callback: () => {
            if(isEditing){
                closeModal();
            }
        },
    });

    useEffect(() => {
        if(modalMode === "edit" && activeTask){
            handleInput("setTask")(activeTask);
        }
    }, [modalMode, activeTask]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(modalMode == 'edit'){
            updateTask(task);
        }else if(modalMode === "add"){
            createTask(task);
        }
        closeModal();
    };

    return (
    <div className="fixed left-0 top-0 z-50 h-full w-full bg-[#333]/50 overflow-hidden flex items-center justify-center">
        <form
        action=""
        className="py-6 px-8 max-w-[520px] w-full flex flex-col gap-5 bg-[#F1F3F4] rounded-2xl shadow-xl transform transition-all duration-300 ease-out"
        onSubmit={handleSubmit}
        ref={ref}
        >
            <div className='flex flex-col gap-3'>
                <label htmlFor='title' className="text-Black text-lg font-semibold">Title</label>
                <input
                    className='bg-[#F1F3F4] p-3 rounded-lg border-2 border-[#B0B0B0] focus:outline-none focus:ring-2 focus:ring-[#0074f1] transition-all'
                    type='text'
                    id='title'
                    placeholder='Task Title'
                    name='title'
                    value={task.title}
                    onChange={(e) => handleInput("title")(e)}
                />
            </div>

            <div className='flex flex-col gap-3'>
                <label htmlFor='description' className="text-black text-lg font-semibold">Description</label>
                <textarea
                    className='bg-[#F1F3F4] p-3 rounded-lg border-2 border-[#B0B0B0] focus:outline-none focus:ring-2 focus:ring-[#0074f1] transition-all'
                    name='description'
                    placeholder='Task Description'
                    rows={4}
                    value={task.description}
                    onChange={(e) => handleInput("description")(e)}
                />
            </div>

            <div className='flex flex-col gap-3'>
                <label htmlFor='priority' className="text-black text-lg font-semibold">Select Priority</label>
                <select
                    className='bg-[#F1F3F4] p-3 rounded-lg border-2 border-[#B0B0B0] focus:outline-none focus:ring-2 focus:ring-[#0074f1] transition-all cursor-pointer'
                    name='priority'
                    value={task.priority}
                    onChange={(e) => handleInput("priority")(e)}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>

            <div className='flex flex-col gap-3'>
                <label htmlFor='dueDate' className="text-black text-lg font-semibold">Due Date</label>
                <input
                    className='bg-[#F1F3F4] p-3 rounded-lg border-2 border-[#B0B0B0] focus:outline-none focus:ring-2 focus:ring-[#0074f1] transition-all'
                    name='dueDate'
                    type='date'
                    value={task.dueDate}
                    onChange={(e) => handleInput("dueDate")(e)}
                />
            </div>

            <div className="flex flex-col gap-3">
                <label htmlFor="completed" className="text-black text-lg font-semibold">Task Completed</label>
                <div className="flex items-center justify-between bg-[#F1F3F4] p-3 rounded-lg border-2 border-[#B0B0B0] focus:outline-none focus:ring-2 focus:ring-[#0074f1] transition-all">
                    <label htmlFor="completed" className="text-gray-600 font-medium">Completed</label>
                    <div>
                        <select
                            className="bg-[#F1F3F4] p-3 rounded-lg border-2 border-[#B0B0B0] focus:outline-none focus:ring-2 focus:ring-[#0074f1] transition-all cursor-pointer"
                            name="completed"
                            value={task.completed ? "true" : "false"}
                            onChange={(e) => handleInput("completed")(e)}
                        >
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className='mt-6'>
                <button type='submit'
                className={`text-white py-3 rounded-lg w-full text-lg font-semibold transition-all duration-300 ease-in-out ${modalMode === "edit" ? "bg-[#FF6F61]" : "bg-[#4CAF50]"} hover:opacity-90`}
                >
                    {modalMode === "edit" ? "Update Task" : "Create Task"}
                </button>
            </div>

        </form>
    </div>
    )
}

export default Modal;
