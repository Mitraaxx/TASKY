"use client";
import { useTasks } from '@/context/TaskContext';
import { useUserContext } from '@/context/userContext'
import { github, moon, profile } from '@/utils/Icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import React, { use } from 'react'

function Header() {

  const {user} = useUserContext();
  const {activeTasks, openModalAdd} = useTasks();

  const router = useRouter();
  const {name} = user;

  const userId = user._id;


  return (
    <header className="px-6 my-4 w-full flex items-center justify-between bg-[#f9f9f9]">
      <div>
        <h1 className='text-lg font-medium'>
          <span role="img" aria-label="wave">
          ✌️
          </span>
          {userId ? `Welcome, ${name}` : "Welcome to TASKY"}
        </h1>
        <p className='text-sm'>
          {userId ? (
            <>
              You have <span className="font-bold text-[#3aafae]">
                {activeTasks.length}
                </span>&nbsp;active tasks
            </>
          ) : (
            "Please login or register to view your tasks"
          )}
        </p>
      </div>


      <div className="h-[50px] flex items-center gap-[10.4rem]">
        <button className="px-8 py-3 bg-[#024950] text-white rounded-[50px]
          hover:bg-[#024a50d9] hover:text-white transition-all duration-200 ease-in-out"
          onClick={() => {
            if(userId){
              openModalAdd();
            } else{
              router.push("/login");
            }
          }}
          >
            {userId ? "Add Task" : "Login/Register"}
        </button>

        <div className='flex gap-4 items-center'>
          <Link href= "https://github.com/Mitraaxx/TASKY"
            passHref
            target='_blank'
            rel='noopener noreferrer'
            className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]">
              {github}
            </Link>

            <Link href= "https://github.com/Mitraaxx/TASKY"
            passHref
            target='_blank'
            rel='noopener noreferrer'
            className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]">
              {moon}
            </Link>

            <Link href= "https://github.com/Mitraaxx/TASKY"
            passHref
            target='_blank'
            rel='noopener noreferrer'
            className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]">
              {profile}
            </Link>
        </div>
      </div>
    </header>
  )
}

export default Header