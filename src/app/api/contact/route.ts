import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: "Vui lòng điền đầy đủ các thông tin bắt buộc (Họ tên, SĐT, Nội dung)." },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const formspreeUrl = process.env.NEXT_PUBLIC_FORMSPREE_URL || "https://formspree.io/f/xkjnbqzo";

    // 1. If Resend API Key is provided, use Resend REST API
    if (resendApiKey) {
      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: "OPC Store Contact Form <onboarding@resend.dev>",
          to: ["opcstore0@outlook.com"], // Or owner email
          subject: `[OPC Store] Yêu cầu tư vấn mới từ ${name}`,
          html: `
            <h2>Thông tin liên hệ từ khách hàng OPC Store</h2>
            <p><strong>Họ & Tên:</strong> ${name}</p>
            <p><strong>Số điện thoại / Zalo:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email || "Không cung cấp"}</p>
            <p><strong>Nội dung:</strong></p>
            <blockquote style="background: #f1f5f9; padding: 12px; border-left: 4px solid #f59e0b;">${message}</blockquote>
          `,
        }),
      });

      if (resendRes.ok) {
        return NextResponse.json({ success: true, provider: "resend" });
      }
    }

    // 2. Fallback to Formspree endpoint
    const formspreeRes = await fetch(formspreeUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, message }),
    });

    if (formspreeRes.ok) {
      return NextResponse.json({ success: true, provider: "formspree" });
    }

    return NextResponse.json(
      { error: "Không thể gửi email tự động lúc này. Vui lòng liên hệ Zalo trực tiếp." },
      { status: 500 }
    );
  } catch (error) {
    console.error("API Contact Error:", error);
    return NextResponse.json(
      { error: "Đã xảy ra lỗi máy chủ khi gửi tin nhắn." },
      { status: 500 }
    );
  }
}
