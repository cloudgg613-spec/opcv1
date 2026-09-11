"use client";

import { useState } from "react";
import Script from "next/script";
import { MessageSquareCode, X, Bot, Sparkles, Send } from "lucide-react";

export default function DifyChatbot() {
  // Tạm thời ẩn Chatbot
  return null;

  const [isOpen, setIsOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "bot" | "user"; text: string }>>([
    {
      sender: "bot",
      text: "Xin chào! Tôi là Trợ Lý AI của OPC Store (Powered by Dify). Bạn cần tư vấn lá bài hay sản phẩm One Piece & Pokémon nào hôm nay?",
    },
  ]);
  const [inputVal, setInputVal] = useState("");

  const difyEmbedUrl = process.env.NEXT_PUBLIC_DIFY_EMBED_URL || "";
  const difyScriptUrl = process.env.NEXT_PUBLIC_DIFY_SCRIPT_URL || "";
  const difyToken = process.env.NEXT_PUBLIC_DIFY_TOKEN || "";

  const handleSendMessage = (customText?: string) => {
    const textToSend = customText || inputVal;
    if (!textToSend.trim()) return;

    setChatMessages((prev) => [...prev, { sender: "user", text: textToSend }]);
    if (!customText) setInputVal("");

    // Simulated Dify Bot Response fallback
    setTimeout(() => {
      let botReply = "Cảm ơn bạn đã quan tâm! Bạn có thể xem chi tiết sản phẩm trên web hoặc nhắn trực tiếp Zalo 0987 654 321 để chốt đơn nhanh nhất nhé!";
      const lower = textToSend.toLowerCase();
      if (lower.includes("one piece") || lower.includes("luffy")) {
        botReply = "OPC Store đang có sẵn thẻ Monkey D. Luffy Parallel OP05 và Booster Box OP07! Bạn có thể mở mục One Piece trên menu để xem nhé.";
      } else if (lower.includes("pokémon") || lower.includes("pokemon") || lower.includes("charizard")) {
        botReply = "Bộ sưu tập Pokémon đang hot nhất lá Charizard ex SAR (151) và Elite Trainer Box Scarlet & Violet đấy ạ!";
      } else if (lower.includes("giá") || lower.includes("mua")) {
        botReply = "Giá từng sản phẩm được niêm yết công khai trên web. Bạn click vào sản phẩm để mở popup xem chi tiết và nhắn Zalo mua hàng nhé!";
      }

      setChatMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    }, 600);
  };

  return (
    <>
      {/* 1. Optional External Dify Script Injection */}
      {difyScriptUrl && (
        <Script
          src={difyScriptUrl}
          id={difyToken}
          strategy="afterInteractive"
        />
      )}

      {/* 2. Floating Dify Chatbot Widget */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {/* Expanded Dify Chat Window */}
        {isOpen && (
          <div className="w-[350px] sm:w-[400px] h-[520px] mb-4 bg-[#09090b] border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-slideUp">
            {/* Window Header */}
            <div className="px-5 py-4 bg-black border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-slate-900 text-slate-300 border border-slate-800">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-100 flex items-center gap-1.5">
                    OPC Bot Assistant
                    <Sparkles className="w-3.5 h-3.5 text-slate-400" />
                  </h4>
                  <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Dify Self-Hosted Active
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
                aria-label="Close Dify Chatbot"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 bg-slate-950 p-4 overflow-y-auto space-y-3">
              {difyEmbedUrl ? (
                <iframe
                  src={difyEmbedUrl}
                  className="w-full h-full border-none rounded-xl"
                  allow="microphone"
                  title="Dify AI Chatbot Embed"
                />
              ) : (
                <>
                  {/* Message List */}
                  {chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[82%] px-4 py-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                          msg.sender === "user"
                            ? "bg-slate-800 text-white border border-slate-700 font-semibold rounded-br-none shadow-md"
                            : "bg-slate-900 text-slate-200 border border-slate-800 rounded-bl-none shadow-md"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}

                  {/* Sample Chips */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    <button
                      onClick={() => handleSendMessage("Tư vấn thẻ bài One Piece")}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 font-medium transition-all"
                    >
                      ⚓ Thẻ One Piece
                    </button>
                    <button
                      onClick={() => handleSendMessage("Tư vấn Pokémon Card")}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 font-medium transition-all"
                    >
                      ⚡ Pokémon Card
                    </button>
                    <button
                      onClick={() => handleSendMessage("Cách thức mua hàng?")}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 font-medium transition-all"
                    >
                      🛒 Mua hàng
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Input Bar (If not using full iframe) */}
            {!difyEmbedUrl && (
              <div className="p-3 bg-black border-t border-slate-800 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Nhập tin nhắn..."
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-slate-500 transition-all"
                />
                <button
                  onClick={() => handleSendMessage()}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all border border-slate-700 shadow-md"
                >
                  <Send className="w-4 h-4 text-slate-300" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Floating Trigger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 shadow-2xl shadow-slate-950/80 hover:scale-110 active:scale-95 transition-all duration-300"
          aria-label="Toggle Dify Chatbot"
        >
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-slate-950"></span>
          </span>

          {isOpen ? <X className="w-7 h-7" /> : <MessageSquareCode className="w-7 h-7" />}
        </button>
      </div>
    </>
  );
}
