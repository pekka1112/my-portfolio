"use client";
import { useState, useEffect } from "react";
import {X} from "lucide-react";

export default function AdPopup() {
  const [show, setShow] = useState(true);
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="relative bg-white p-4 rounded-xl shadow-xl">
        <img
          src="/graduation.png"
          alt="Advertisement"
          className="w-[300px] h-auto rounded-lg"
        />
        <button
          onClick={() => setShow(false)}
          className="absolute top-0 right-1 text-gray-700 hover:text-red-500"
        >
            <X size={24}/> 
        </button>
      </div>
    </div>
  );
}
