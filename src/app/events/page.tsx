"use client";

import Image from "next/image";
import { MapPin, Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

export default function EventsPage() {

    const eventDate = useMemo(() => new Date("2025-10-21T07:45:00"), []);

    const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = eventDate.getTime() - now.getTime();

      if (diff <= 0) {
        setCountdown("🎉 Buổi lễ đã diễn ra!");
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setCountdown(
        `${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [eventDate]);

  return (
    <div className="min-h-screen py-0 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-5 text-center">
        🎓 Lễ Tốt Nghiệp của Tôi
      </h1>
      {/* Bộ đếm thời gian */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-lg text-blue-600 font-medium mb-2 text-center"
      >
        ⏳ Còn lại: {countdown}
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full max-w-4xl">
        {/* BÊN TRÁI: Ảnh thư mời */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/graduation.png"
            alt="Thư mời lễ tốt nghiệp"
            width={600}
            height={400}
            className="rounded-2xl shadow-lg object-cover w-full"
          />
        </motion.div>

        {/* BÊN PHẢI: Nội dung chi tiết */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-semibold">Thông tin sự kiện</h2>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <span><strong>Ngày:</strong> Thứ 3, 21 tháng 10, 2025</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <span><strong>Giờ:</strong> 07:45 sáng – 11:30 trưa</span>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <p><strong>Địa điểm:</strong> Hội trường Phượng Vỹ PV100 – Đại học Nông Lâm, TP.HCM</p>
            </div>
          </div>

          <p className="mt-4 text-gray-600 leading-relaxed">
            🎉 Hân hoan chào đón bạn bè và gia đình đến tham dự buổi lễ tốt nghiệp –
            cột mốc quan trọng trong hành trình học tập của tôi.
          </p>
        </motion.div>
      </div>
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="w-full max-w-5xl mt-10 px-4"
      >
        <h3 className="text-xl font-semibold mb-4 text-center">
          📍 Vị trí tổ chức
        </h3>

        <div className="rounded-2xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4551.5060631724045!2d106.78928226938162!3d10.870891634288782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d980ac634043%3A0x7632b090edb4cec9!2zR2nhuqNuZyDEkcaw4budbmcgUGjGsOG7o25nIFbEqQ!5e1!3m2!1svi!2s!4v1760779066597!5m2!1svi!2s"
            width="100%"
            height="350"
            loading="lazy"
            allowFullScreen
            className="border-0 w-full h-[350px]"
          ></iframe>
        </div>
      </motion.div>
    </div>
  );
}
