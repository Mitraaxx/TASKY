"use client";
import { useTasks } from "@/context/TaskContext";
import useRedirect from "@/hooks/useUserRedirect";



export default function Home() {
  useRedirect("/login");

  
  return (
    <main></main>
  );
}
