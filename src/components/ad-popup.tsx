"use client";
import { useState, useEffect } from "react";
import {X} from "lucide-react";
import Image from "next/image";

export default function AdPopup() {
  const [show, setShow] = useState(true);
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="relative bg-white p-4 rounded-xl shadow-xl">
        <Image
          src="/graduation.png"
          alt="Advertisement"
          width={300}      // ✅ Bắt buộc phải có
          height={300}     // ✅ Bắt buộc phải có
          priority         // (tùy chọn) giúp load sớm hơn nếu ảnh quan trọng
          className="rounded-lg" // nếu bạn có className
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
