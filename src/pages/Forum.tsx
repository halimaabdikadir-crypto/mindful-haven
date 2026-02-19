import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingHearts from "@/components/FloatingHearts";
import Chatbot from "@/components/Chatbot";
import { useAuth } from "@/contexts/AuthContext";
import heroForumImg from "@/assets/hero-forum.jpg";

interface Post {
  id: string;
  author: string;
  avatar: string;
  topic: string;
  content: string;
  timestamp: string;
  likes: number;
  likedByMe: boolean;
  comments: { author: string; text: string; ts: string }[];
}

const topics = [
  { id: "stress", label: "Coping with Academic Stress", icon: "😤", color: "bg-primary/10 text-primary border-primary/20" },
  { id: "time", label: "Time Management Tips", icon: "⏰", color: "bg-secondary/60 text-secondary-foreground border-secondary" },
  { id: "emotional", label: "Emotional Wellbeing & Peer Support", icon: "💚", color: "bg-accent/60 text-accent-foreground border-accent" },
  { id: "motivation", label: "Motivation & Success Stories", icon: "🌟", color: "bg-primary/10 text-primary border-primary/20" },
];

const seedPosts: Post[] = [
  { id: "1", author: "Anonymous Student", avatar: "🌸", topic: "stress", content: "I have 3 IAs, my EE draft, and TOK presentation all due within 2 weeks. I'm genuinely scared. Anyone else surviving this?", timestamp: "2 hours ago", likes: 24, likedByMe: false, comments: [{ author: "Anonymous", text: "You're not alone! Make a priority list — what's due first?", ts: "1 hour ago" }, { author: "Anonymous", text: "I was in your exact position last month. You can do this 💜", ts: "45 min ago" }] },
  { id: "2", author: "Anonymous Student", avatar: "🌿", topic: "time", content: "Started using the Pomodoro technique and genuinely my productivity went up 60%. 25 min study, 5 min break. Game changer for me!", timestamp: "5 hours ago", likes: 41, likedByMe: false, comments: [{ author: "Anonymous", text: "Which app do you use for the timer?", ts: "4 hours ago" }] },
  { id: "3", author: "Anonymous Student", avatar: "💜", topic: "motivation", content: "I got a 6 in Math HL after getting a 3 on my mock exam. If I can do it, so can you. The journey matters more than where you start.", timestamp: "1 day ago", likes: 87, likedByMe: false, comments: [{ author: "Anonymous", text: "This is exactly what I needed to read today 🌟", ts: "20 hours ago" }] },
  { id: "4", author: "Anonymous Student", avatar: "🌙", topic: "emotional", content: "I've been crying every night for a week. I know it sounds dramatic but the workload is crushing me. Does anyone else feel like this?", timestamp: "3 hours ago", likes: 52, likedByMe: false, comments: [{ author: "Anonymous", text: "That doesn't sound dramatic at all. Please talk to your counselor — you deserve support 💜", ts: "2 hours ago" }] },
];

const socialLinks = [
  { icon: "📘", label: "Facebook Community", url: "#", color: "hover:bg-blue-100" },
  { icon: "📸", label: "Instagram", url: "#", color: "hover:bg-pink-100" },
  { icon: "🐦", label: "Twitter/X", url: "#", color: "hover:bg-sky-100" },
  { icon: "💬", label: "Discord Server", url: "#", color: "hover:bg-indigo-100" },
  { icon: "▶️", label: "YouTube Channel", url: "#", color: "hover:bg-red-100" },
];

const Forum = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem("zevina_forum_posts");
    return saved ? JSON.parse(saved) : seedPosts;
  });
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [newPost, setNewPost] = useState("");
  const [isAnon, setIsAnon] = useState(true);
  const [selectedPostTopic, setSelectedPostTopic] = useState("stress");
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [commentTexts, setCommentTexts] = useState<Record<string, string>>({});

  useEffect(() => {
    localStorage.setItem("zevina_forum_posts", JSON.stringify(posts));
  }, [posts]);

  const submitPost = () => {
    if (!newPost.trim()) return;
    const post: Post = {
      id: Date.now().toString(),
      author: isAnon ? "Anonymous Student" : (user?.name || "You"),
      avatar: ["🌸", "🌿", "💜", "🌙", "⭐", "🦋"][Math.floor(Math.random() * 6)],
      topic: selectedPostTopic,
      content: newPost.trim(),
      timestamp: "just now",
      likes: 0,
      likedByMe: false,
      comments: [],
    };
    setPosts((prev) => [post, ...prev]);
    setNewPost("");
  };

  const toggleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, likes: p.likedByMe ? p.likes - 1 : p.likes + 1, likedByMe: !p.likedByMe }
          : p
      )
    );
  };

  const addComment = (postId: string) => {
    const text = commentTexts[postId]?.trim();
    if (!text) return;
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, comments: [...p.comments, { author: isAnon ? "Anonymous" : (user?.name || "You"), text, ts: "just now" }] }
          : p
      )
    );
    setCommentTexts((prev) => ({ ...prev, [postId]: "" }));
  };

  const filtered = selectedTopic === "all" ? posts : posts.filter((p) => p.topic === selectedTopic);
  const topicMap = Object.fromEntries(topics.map((t) => [t.id, t]));

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingHearts />
      <Header />
      <Chatbot />

      {/* Hero — blurry image background */}
      <section className="relative pt-28 pb-16 px-4 sm:px-6 text-center overflow-hidden min-h-[400px] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroForumImg})`, filter: "blur(8px)", transform: "scale(1.08)" }}
        />
        <div className="absolute inset-0 bg-background/60" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="text-5xl block mb-4">💬</span>
          <h1 className="text-foreground mb-4 drop-shadow-lg">Community Forum</h1>
          <p className="text-lg text-foreground/80 leading-relaxed mb-6 drop-shadow">
            A safe, judgment-free space for IB students to share, support, and grow together.
          </p>
          <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-md px-5 py-3 rounded-2xl border border-border/60 shadow text-sm text-muted-foreground">
            🔒 <strong className="text-foreground">100% anonymous posting available.</strong> Your privacy is our priority.
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          {/* Topics Filter */}
          <div className="zevina-card p-5 border border-border">
            <h3 className="text-foreground mb-4 text-lg">Forum Topics</h3>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedTopic("all")}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${selectedTopic === "all" ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground"}`}
              >
                🌐 All Topics ({posts.length})
              </button>
              {topics.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTopic(t.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${selectedTopic === t.id ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground"}`}
                >
                  {t.icon} {t.label.split(" ").slice(0, 2).join(" ")} ({posts.filter((p) => p.topic === t.id).length})
                </button>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="zevina-card p-5 border border-border">
            <h3 className="text-foreground mb-4 text-lg">Follow Us 🌍</h3>
            <div className="space-y-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold text-foreground transition-colors ${s.color} border border-transparent hover:border-border`}
                >
                  <span className="text-xl">{s.icon}</span> {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="zevina-card p-5 border border-border bg-secondary/30">
            <h4 className="font-bold text-foreground mb-2 text-sm" style={{ fontFamily: "Merienda, cursive" }}>🛡️ Community Guidelines</h4>
            <ul className="text-xs text-muted-foreground space-y-1.5 leading-relaxed">
              <li>✅ Be kind and supportive</li>
              <li>✅ Respect anonymity choices</li>
              <li>✅ No personal attacks or bullying</li>
              <li>✅ Share responsibly</li>
              <li>⚠️ ZEVINA doesn't replace professional counseling</li>
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3 space-y-6">
          {/* New Post Form */}
          <div className="zevina-card p-6 border border-border">
            <h3 className="text-foreground mb-4">Share Your Thoughts ✍️</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {topics.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedPostTopic(t.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${selectedPostTopic === t.id ? "bg-primary text-primary-foreground border-primary" : `${t.color} border`}`}
                >
                  {t.icon} {t.label.split("&")[0].trim()}
                </button>
              ))}
            </div>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's on your mind? Share your experience, ask for advice, or celebrate a win... 💜"
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none text-sm leading-relaxed"
            />
            <div className="flex items-center justify-between mt-3 flex-wrap gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <div
                  onClick={() => setIsAnon(!isAnon)}
                  className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${isAnon ? "bg-primary" : "bg-muted"}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${isAnon ? "translate-x-5" : "translate-x-0.5"}`} />
                </div>
                <span className="text-sm font-semibold text-foreground">{isAnon ? "🎭 Posting anonymously" : `✅ Posting as ${user?.name?.split(" ")[0]}`}</span>
              </label>
              <button
                onClick={submitPost}
                disabled={!newPost.trim()}
                className="btn-primary px-6 py-2 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Post to Community 🌿
              </button>
            </div>
          </div>

          {/* Posts */}
          <div className="space-y-4">
            {filtered.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <span className="text-5xl block mb-3">🌱</span>
                <p>No posts in this topic yet. Be the first to share!</p>
              </div>
            )}
            {filtered.map((post) => {
              const topic = topicMap[post.topic];
              return (
                <div key={post.id} className="forum-post">
                  {/* Post Header */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-2xl shrink-0">
                      {post.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-foreground text-sm">{post.author}</span>
                        {topic && (
                          <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${topic.color}`}>
                            {topic.icon} {topic.label.split(" ").slice(0, 2).join(" ")}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <p className="text-foreground text-sm leading-relaxed mb-4">{post.content}</p>

                  {/* Actions */}
                  <div className="flex items-center gap-4 mb-3">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`like-btn flex items-center gap-1.5 text-sm font-semibold transition-colors ${post.likedByMe ? "text-red-500" : "text-muted-foreground hover:text-red-400"}`}
                    >
                      {post.likedByMe ? "❤️" : "🤍"} {post.likes}
                    </button>
                    <button
                      onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                      className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
                    >
                      💬 {post.comments.length} {post.comments.length === 1 ? "reply" : "replies"}
                    </button>
                  </div>

                  {/* Comments */}
                  {expandedPost === post.id && (
                    <div className="border-t border-border pt-3 space-y-3">
                      {post.comments.map((c, ci) => (
                        <div key={ci} className="flex gap-2">
                          <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center text-sm shrink-0">💬</div>
                          <div className="flex-1 bg-muted rounded-xl px-3 py-2">
                            <p className="text-xs font-bold text-foreground mb-0.5">{c.author} · {c.ts}</p>
                            <p className="text-sm text-foreground">{c.text}</p>
                          </div>
                        </div>
                      ))}
                      <div className="flex gap-2 mt-3">
                        <input
                          value={commentTexts[post.id] || ""}
                          onChange={(e) => setCommentTexts((prev) => ({ ...prev, [post.id]: e.target.value }))}
                          onKeyDown={(e) => e.key === "Enter" && addComment(post.id)}
                          placeholder="Write a supportive reply..."
                          className="flex-1 px-3 py-2 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                        />
                        <button onClick={() => addComment(post.id)} className="btn-primary px-4 py-2 text-sm">Reply</button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Forum;
