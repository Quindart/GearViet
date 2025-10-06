"use client";

import MarkdownRenderer, {
  MarkdownRendererBlock,
} from "@rcb-plugins/markdown-renderer";
import React from "react";
import ChatBot, { Flow } from "react-chatbotify";

const MyChatBot = () => {
  const helpOptions = [
    "Đặt hàng & Thanh toán",
    "Vận chuyển & Giao hàng",
    "Đổi trả & Hoàn tiền",
    "Tài khoản & Bảo mật",
    "Sản phẩm & Dịch vụ",
    "Liên hệ hỗ trợ",
  ];

  const flow = {
    start: {
      message:
        "Xin chào! Tôi là trợ lý ảo của GearViet 👋! Tôi ở đây để giúp bạn giải đáp các thắc mắc về sản phẩm và dịch vụ của chúng tôi 😊",
      transition: { duration: 1000 },
      path: "show_options",
    },
    show_options: {
      message:
        "Bạn cần hỗ trợ về vấn đề gì? Hãy chọn một trong các chủ đề dưới đây:",
      options: helpOptions,
      path: "process_options",
      renderMarkdown: ["BOT", "USER"],
    },
    prompt_again: {
      message: "Bạn còn cần hỗ trợ gì khác không?",
      options: helpOptions,
      path: "process_options",
      renderMarkdown: ["BOT", "USER"],
    },
    unknown_input: {
      message:
        "Xin lỗi, tôi không hiểu câu hỏi của bạn 😢! Vui lòng chọn một trong các tùy chọn bên dưới hoặc liên hệ trực tiếp với chúng tôi để được hỗ trợ tốt nhất.",
      options: helpOptions,
      path: "process_options",
      renderMarkdown: ["BOT", "USER"],
    },
    process_options: {
      transition: { duration: 0 },
      chatDisabled: true,
      path: async (params: any) => {
        let response = "";
        switch (params.userInput) {
          case "Đặt hàng & Thanh toán":
            response =
              "🛒 **ĐẶT HÀNG & THANH TOÁN**\n\n" +
              "• **Cách đặt hàng:** Chọn sản phẩm → Thêm vào giỏ → Thanh toán\n" +
              "• **Phương thức thanh toán:** COD, Chuyển khoản, Thẻ tín dụng\n" +
              "• **Thời gian xử lý:** 1-2 ngày làm việc\n" +
              "• **Xác nhận đơn hàng:** Qua email/SMS\n\n" +
              "Bạn có câu hỏi cụ thể nào về đặt hàng không?";
            break;
          case "Vận chuyển & Giao hàng":
            response =
              "🚚 **VẬN CHUYỂN & GIAO HÀNG**\n\n" +
              "• **Phí vận chuyển:** Miễn phí cho đơn hàng từ 500k\n" +
              "• **Thời gian giao hàng:** 2-5 ngày làm việc\n" +
              "• **Khu vực giao hàng:** Toàn quốc\n" +
              "• **Theo dõi đơn hàng:** Qua website hoặc SMS\n" +
              "• **Giao hàng nhanh:** Có sẵn tại TP.HCM và Hà Nội\n\n" +
              "Bạn muốn biết thêm về chính sách giao hàng nào?";
            break;
          case "Đổi trả & Hoàn tiền":
            response =
              "🔄 **ĐỔI TRẢ & HOÀN TIỀN**\n\n" +
              "• **Thời gian đổi trả:** 7 ngày kể từ ngày nhận hàng\n" +
              "• **Điều kiện:** Sản phẩm còn nguyên vẹn, có hóa đơn\n" +
              "• **Phí đổi trả:** Miễn phí nếu lỗi từ phía cửa hàng\n" +
              "• **Hoàn tiền:** 3-5 ngày làm việc\n" +
              "• **Cách thức:** Liên hệ hotline hoặc email\n\n" +
              "Bạn cần hỗ trợ đổi trả sản phẩm nào?";
            break;
          case "Tài khoản & Bảo mật":
            response =
              "🔐 **TÀI KHOẢN & BẢO MẬT**\n\n" +
              "• **Đăng ký tài khoản:** Miễn phí, nhanh chóng\n" +
              "• **Quên mật khẩu:** Reset qua email\n" +
              "• **Bảo mật:** Mã hóa SSL, không lưu thông tin thẻ\n" +
              "• **Thông tin cá nhân:** Được bảo vệ tuyệt đối\n" +
              "• **Tích điểm:** Mỗi đơn hàng tích điểm thưởng\n\n" +
              "Bạn gặp vấn đề gì với tài khoản?";
            break;
          case "Sản phẩm & Dịch vụ":
            response =
              "🛍️ **SẢN PHẨM & DỊCH VỤ**\n\n" +
              "• **Danh mục:** Điện tử, Phụ kiện, Gaming, Công nghệ\n" +
              "• **Chất lượng:** Hàng chính hãng, bảo hành đầy đủ\n" +
              "• **Giá cả:** Cạnh tranh, nhiều ưu đãi\n" +
              "• **Tư vấn:** Đội ngũ chuyên nghiệp\n" +
              "• **Bảo hành:** Theo chính sách nhà sản xuất\n\n" +
              "Bạn quan tâm đến sản phẩm nào cụ thể?";
            break;
          case "Liên hệ hỗ trợ":
            response =
              "📞 **LIÊN HỆ HỖ TRỢ**\n\n" +
              "• **Hotline:** 1900-xxxx (8:00-22:00)\n" +
              "• **Email:** support@gearviet.com\n" +
              "• **Chat trực tuyến:** 24/7\n" +
              "• **Fanpage:** facebook.com/gearviet\n" +
              "• **Địa chỉ:** [Địa chỉ cửa hàng]\n\n" +
              "Chúng tôi luôn sẵn sàng hỗ trợ bạn!";
            break;
          default:
            return "unknown_input";
        }
        await params.injectMessage(response);
        return "repeat";
      },
      renderMarkdown: ["BOT", "USER"],
    },
    repeat: {
      transition: { duration: 2000 },
      path: "prompt_again",
    },
  } as MarkdownRendererBlock;

  return (
    <ChatBot
      settings={{
        chatHistory: {
          storageKey: "gearviet_faq_bot",
        },
        header: {
          title: "Trợ lý Chatbot",
          avatar: "/assets/images/footer-logo.jpeg",
        },
        notification: {
          disabled: true,
        },
        chatWindow: {
          defaultOpen: true,
          autoJumpToBottom: true,
          showMessagePrompt: true,
          showTypingIndicator: true,
        },
        chatInput: {
          disabled: true,
        },
        chatButton: {
          icon: "/assets/images/footer-logo.jpeg",
        },
        general: {
          showInputRow: false,
        },
        tooltip: {
          text: "Bạn cần trợ giúp?",
        },
      }}
      plugins={[MarkdownRenderer()]}
      flow={flow as Flow}
    />
  );
};

export default MyChatBot;
