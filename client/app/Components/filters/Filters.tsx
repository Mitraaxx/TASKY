
import { useTasks } from '@/context/TaskContext';
import React from 'react'



function Filters() {
    const {priority, setPriority} = useTasks();

    const [activeIndex, setActiveIndex] = React.useState(0);


    const priorities = ["All", "Low" , "Medium", "High"];
   
    return (
    <div className="relative py-2 px-2 grid grid-cols-4 items-center gap-3 bg-[#F9F9F9] border-2 border-white rounded-md">
    <span></span>
    {priorities.map((p,index) =>(
        <button
        key={index}
        className={`relative px-1 z-10 font-medium text-sm ${
          activeIndex === index ? "text-[#3aafae] " : "text-gray-500"
        }`}
        onClick={() => {
          setActiveIndex(index);
          setPriority(priority.toLowerCase());
        }}
      >
        {priority}
      </button>
    ))}  
    </div>
  )
}

export default Filters