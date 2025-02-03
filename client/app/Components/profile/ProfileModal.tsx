"use client";
import { useTasks } from '@/context/TaskContext';
import { useUserContext } from '@/context/userContext';
import useDetectOutside from '@/hooks/useDetectOutside';
import React from 'react'
import Image from 'next/image';


function ProfileModal() {

    const ref = React.useRef(null);

    const {closeModal} = useTasks();
    const {user, updateUser, handleUserInput, userState, changePassword} = useUserContext();

    useDetectOutside({
        ref,
        callback: () => {
            closeModal();
        },
    });

    const {name , email, photo} = user;

  return (
    <div className="fixed left-0 top-0 z-50 h-full w-full bg-[#333]/30 overflow-hidden">
        <div
            ref = {ref}
            className="py-5 px-6 max-w-[520px] w-full flex flex-col gap-3 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-md border-2 border-white"
        >
            <div className="absolute left-0 top-0 w-full h-[80px] bg-[#323232]/10 rounded-tr-md rounded-tl-md">

                <div className="mt-4 relative flex justify-between">
                <div className="relative inline-block">
                    <Image
                        src = "./glass-bg.png"
                        alt = "profile"
                        width = {80}
                        height = {80}
                        className = "rounded-full"
                    />
                </div>
                </div>

            </div>

        </div>
    </div>
  )
}

export default ProfileModal