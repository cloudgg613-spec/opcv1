"use client";

import { useState } from "react";
import { Phone, Mail, Send, CheckCircle2, Globe, AlertCircle } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      // Send to /api/contact API route (handles Resend / Formspree automatically)
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Gửi email thất bại. Vui lòng thử lại sau!");
      }
    } catch (err) {
      console.error("Contact Form error:", err);
      setStatus("error");
      setErrorMessage("Không thể kết nối đến máy chủ. Vui lòng nhắn Zalo trực tiếp!");
    }
  };

  return (
    <section id="contact" className="py-20 bg-black border-t border-slate-800 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#1e293b]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Thông tin liên hệ OPC Store
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Shop không tích hợp giỏ hàng hay thanh toán online trực tiếp. Quý khách xem sản phẩm và liên hệ để chốt đơn & nhận tư vấn chi tiết!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* (a) Thông Tin Tĩnh (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-[#09090b] border border-slate-800 shadow-xl space-y-6">
              <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <Globe className="w-5 h-5 text-slate-400" /> Thông Tin Shop
              </h3>

              <div className="space-y-4">
                {/* Phone / Zalo */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="p-3 rounded-xl bg-slate-900 text-slate-300 border border-slate-800">
                    <Phone className="w-5 h-5 text-slate-300" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase">SĐT & Zalo Trực Tiếp:</h4>
                    <p className="text-slate-100 font-extrabold text-lg">0987 654 321</p>
                    <a
                      href="https://zalo.me"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-400 hover:underline font-semibold"
                    >
                      → Nhắn tin trực tiếp qua Zalo
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase">Email:</h4>
                    <p className="text-slate-100 font-bold text-base">opcstore0@outlook.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* (b) Form Gửi Email Tự Động (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-3xl bg-[#09090b] border border-slate-800 shadow-xl space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-100">Gửi Tin Nhắn Đặt Mua & Tư Vấn</h3>
              </div>

              {status === "success" ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3 animate-fadeIn">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h4 className="text-xl font-bold text-white">Gửi Email Thành Công!</h4>
                  <p className="text-slate-300 text-sm">
                    Cảm ơn bạn đã liên hệ. Shop đã nhận được email và sẽ liên hệ lại qua SĐT/Zalo trong thời gian sớm nhất.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase transition-all"
                  >
                    Gửi Tin Nhắn Khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-300 uppercase">Họ & Tên *</label>
                      <input
                        type="text"
                        required
                        placeholder="Nguyễn Văn A"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-slate-500 text-sm transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-300 uppercase">Số Điện Thoại / Zalo *</label>
                      <input
                        type="tel"
                        required
                        placeholder="0912345678"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-slate-500 text-sm transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 uppercase">Email Phản Hồi</label>
                    <input
                      type="email"
                      placeholder="khachhang@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-slate-500 text-sm transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 uppercase">Sản Phẩm Cần Tư Vấn / Đặt Mua *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Ví dụ: Tôi muốn hỏi giá và đặt mua thẻ bài Monkey D. Luffy OP05 Secret Parallel..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-slate-500 text-sm transition-all resize-none"
                    />
                  </div>

                  {status === "error" && (
                    <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-base border border-slate-700 shadow-xl transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                  >
                    <Send className="w-5 h-5 text-slate-300" />
                    {status === "submitting" ? "Đang Gửi..." : "Gửi Email Liên Hệ"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
