import { useState, useRef, useEffect } from "react";

interface Message {
  role: "bot" | "user";
  text: string;
}

const responses: { keywords: string[]; reply: string }[] = [
  { keywords: ["stress", "stressed", "overwhelmed", "burnout"], reply: "I hear you 💜 Stress is really hard. Try the 4-7-8 breathing technique: inhale for 4 counts, hold for 7, exhale for 8. Would you like more coping strategies?" },
  { keywords: ["time", "deadline", "schedule", "manage", "procrastinat"], reply: "Time management can feel overwhelming! Try breaking big tasks into 25-minute Pomodoro sessions. Want me to share a planning template?" },
  { keywords: ["anxiety", "anxious", "panic", "worry"], reply: "Anxiety is tough 🌿 Ground yourself with the 5-4-3-2-1 technique: name 5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste." },
  { keywords: ["sleep", "tired", "exhausted", "insomnia"], reply: "Sleep deprivation worsens everything 😴 Aim for 7-9 hours. Try: no screens 1 hour before bed, keep a consistent schedule, and write tomorrow's to-do list before sleeping." },
  { keywords: ["motivation", "unmotivated", "give up", "hopeless"], reply: "You've come so far already 🌟 Remember: IB is designed to be challenging, and choosing to take it shows incredible courage. One day at a time. What subject feels hardest right now?" },
  { keywords: ["ia", "ee", "tok", "extended essay", "internal assessment"], reply: "IB assessments are intense! Break them into phases: research, outline, draft, review. Set mini-deadlines for each phase. Check the Know More page for time management guides 📖" },
  { keywords: ["friend", "lonely", "alone", "isolated"], reply: "Feeling isolated during IB is so common 💜 The community forum is a great place to connect with peers who understand exactly what you're going through. You're not alone!" },
  { keywords: ["grade", "fail", "score", "mark"], reply: "Your grade does not define your worth 🌿 One assessment does not predict your future. Focus on what you can control right now — talk to your teacher or counselor if you're struggling." },
  { keywords: ["hello", "hi", "hey", "start"], reply: "Hello! I'm Zevi, your ZEVINA wellness bot 🌿💜 I'm here to help with stress, time management, emotional support, and more. What's on your mind today?" },
  { keywords: ["help", "what can you do", "support"], reply: "I can help you with: 🧘 Stress & anxiety relief\n⏰ Time management tips\n😴 Sleep advice\n💪 Motivation boosts\n📚 IB-specific support\n\nJust type what you're feeling!" },
];

const getReply = (msg: string): string => {
  const lower = msg.toLowerCase();
  for (const r of responses) {
    if (r.keywords.some((k) => lower.includes(k))) return r.reply;
  }
  return "Thank you for sharing that with me 💜 Remember, it's okay to take things one step at a time. Would you like breathing exercises, time management tips, or just someone to talk to?";
};

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hi! I'm Zevi 🌿💜 Your ZEVINA wellness companion. How are you feeling today?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const userMsg: Message = { role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", text: getReply(trimmed) }]);
    }, 600);
  };

  const reset = () => {
    setMessages([{ role: "bot", text: "Fresh start! 🌿 I'm Zevi. How can I support you today?" }]);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-white shadow-lg hover:scale-110 active:scale-95 transition-transform flex items-center justify-center text-2xl"
        aria-label="Open chatbot"
        style={{ boxShadow: "0 6px 24px hsl(108 38% 52% / 0.4)" }}
      >
        {open ? "✕" : "💬"}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 h-[480px] chatbot-window flex flex-col">
          {/* Header */}
          <div className="bg-primary px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌿</span>
              <div>
                <p className="text-primary-foreground font-bold text-sm" style={{ fontFamily: "Merienda, cursive" }}>
                  Zevi – Wellness Bot
                </p>
                <p className="text-primary-foreground/70 text-xs">Always here for you 💜</p>
              </div>
            </div>
            <button onClick={reset} className="text-primary-foreground/70 hover:text-primary-foreground text-xs underline">
              New chat
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages flex-1 overflow-y-auto">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "bot" ? "chat-msg-bot" : "chat-msg-user"}>
                {m.role === "bot" && <span className="text-xs font-bold text-primary block mb-1">Zevi 🌿</span>}
                <p style={{ whiteSpace: "pre-line" }}>{m.text}</p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          <div className="px-3 py-2 border-t border-border flex gap-2 overflow-x-auto">
            {["I'm stressed 😔", "Help with time ⏰", "Motivation 💪"].map((s) => (
              <button
                key={s}
                onClick={() => { setInput(s); }}
                className="shrink-0 text-xs px-3 py-1.5 rounded-full bg-sage-light text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-colors border border-primary/20"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="px-3 py-3 border-t border-border flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type how you feel..."
              className="flex-1 px-3 py-2 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            <button
              onClick={send}
              className="btn-primary px-3 py-2 text-sm rounded-xl"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
