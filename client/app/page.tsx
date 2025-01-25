"use client";
import { useUserContext } from "@/context/userContext";
import useRedirect from "@/hooks/useUserRedirect";
import { useState } from "react";

export default function Home() {
  useRedirect("/login");

  return (
    <main></main>
  );
}
