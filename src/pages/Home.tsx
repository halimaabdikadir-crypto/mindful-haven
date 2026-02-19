import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingHearts from "@/components/FloatingHearts";
import Chatbot from "@/components/Chatbot";
import heroHomeImg from "@/assets/hero-home.jpg";
import meditationStudentImg from "@/assets/meditation-student.jpg";
import studentsStudyingImg from "@/assets/students-studying.jpg";

const features = [
  {
    icon: "🧘",
    title: "Stress Relief Hub",
    desc: "Guided breathing exercises, mindfulness tools, and calming techniques designed for IB students.",
    color: "bg-primary/10 border-primary/20",
  },
  {
    icon: "⏰",
    title: "Time Management",
    desc: "Smart planning strategies, Pomodoro techniques, and deadline management to stay on top of your workload.",
    color: "bg-secondary/60 border-secondary",
  },
  {
    icon: "💬",
    title: "Community Forum",
    desc: "Share experiences anonymously, ask for advice, and support fellow IB students in a safe space.",
    color: "bg-accent/60 border-accent",
  },
  {
    icon: "💚",
    title: "Emotional Support",
    desc: "Guided reflections, journaling prompts, and wellness check-ins to process your feelings healthily.",
    color: "bg-primary/10 border-primary/20",
  },
  {
    icon: "🤖",
    title: "Zevi Chatbot",
    desc: "24/7 wellness companion ready to listen, give coping strategies, and cheer you on anytime.",
    color: "bg-secondary/60 border-secondary",
  },
  {
    icon: "📚",
    title: "IB Resources",
    desc: "Curated guides, PDFs, videos and tips tailored to MYP and DP students facing the IB grind.",
    color: "bg-accent/60 border-accent",
  },
];

const testimonials = [
  { text: "ZEVINA helped me get through my EE deadline without having a breakdown. The chatbot at 2 AM was everything.", name: "DP2 Student", emoji: "💜" },
  { text: "The community forum made me feel so much less alone. Everyone just *gets* the IB struggle.", name: "MYP5 Student", emoji: "🌿" },
  { text: "I used the breathing exercises before every exam. My anxiety dropped so much!", name: "DP1 Student", emoji: "✨" },
];

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingHearts />
      <Header />
      <Chatbot />

      {/* Hero Section — blurry image background */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 overflow-hidden">
        {/* Blurry background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroHomeImg})`, filter: "blur(6px)", transform: "scale(1.05)" }}
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-background/55" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold text-secondary-foreground mb-6 border border-secondary/50 shadow">
            <span>💜</span> For every IB student who's ever felt overwhelmed
          </div>

          <h1 className="text-foreground mb-6 leading-tight drop-shadow-lg">
            Welcome back,{" "}
            <span className="text-primary">{user?.name?.split(" ")[0] || "Friend"}</span>
            <br />
            <span className="text-foreground/90">You've got this. 🌿</span>
          </h1>

          <p className="text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow">
            ZEVINA is your safe space to breathe, reflect, and connect — because your mental wellbeing
            matters just as much as your grades.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/know-more" className="btn-primary px-8 py-3.5 text-base inline-block shadow-xl">
              Start Your Wellness Journey ✨
            </Link>
            <Link
              to="/forum"
              className="btn-lavender px-8 py-3.5 text-base inline-block shadow-xl"
            >
              Join the Community 💬
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-16">
            {[
              { num: "2,400+", label: "Students Supported" },
              { num: "500+", label: "Forum Posts Shared" },
              { num: "24/7", label: "Zevi is Available" },
            ].map((s) => (
              <div key={s.label} className="text-center bg-card/70 backdrop-blur-md px-6 py-4 rounded-2xl border border-border/50 shadow-lg">
                <p className="text-3xl font-black text-primary" style={{ fontFamily: "Merienda, cursive" }}>{s.num}</p>
                <p className="text-sm text-muted-foreground font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Multimedia Feature Section */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-foreground mb-3">Everything You Need to Thrive 💚</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Built specifically for MYP and DP students who deserve more than just academic support.
          </p>
        </div>

        {/* Visual intro row with images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="relative rounded-2xl overflow-hidden shadow-xl group">
            <img
              src={meditationStudentImg}
              alt="Student practicing mindfulness and journaling"
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent flex items-end p-6">
              <div>
                <h3 className="text-foreground text-xl mb-1">Mindfulness & Journaling</h3>
                <p className="text-muted-foreground text-sm">Daily reflections to keep you grounded</p>
              </div>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-xl group">
            <img
              src={studentsStudyingImg}
              alt="Students studying together in a supportive environment"
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent flex items-end p-6">
              <div>
                <h3 className="text-foreground text-xl mb-1">Peer Support Community</h3>
                <p className="text-muted-foreground text-sm">Connect with students who understand the IB journey</p>
              </div>
            </div>
          </div>
        </div>

        {/* Embedded YouTube Video */}
        <div className="mb-12 rounded-2xl overflow-hidden shadow-xl border border-border">
          <div className="bg-muted px-6 py-4 flex items-center gap-3 border-b border-border">
            <span className="text-2xl">🎬</span>
            <div>
              <h3 className="text-foreground text-lg">Featured: Managing IB Stress</h3>
              <p className="text-muted-foreground text-sm">A guided session from our wellness partners</p>
            </div>
          </div>
          <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/inpok4MKVLM"
              title="5-Minute Mindfulness Meditation for Stress Relief"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className={`zevina-card p-6 border ${f.color}`}>
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-foreground mb-2 text-xl">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quote Banner */}
      <section className="py-16 px-4 sm:px-6 bg-primary/5 border-y border-primary/10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-5xl mb-6 block">🌸</span>
          <blockquote className="text-2xl sm:text-3xl text-foreground font-semibold leading-relaxed" style={{ fontFamily: "Merienda, cursive" }}>
            "You are not behind. You are not a failure. You are a human being doing something incredibly hard."
          </blockquote>
          <p className="text-muted-foreground mt-4 font-medium">— A message from ZEVINA 💜</p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-foreground mb-3">What Students Are Saying {`💬`}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="zevina-card p-6 border border-border">
              <p className="text-3xl mb-3">{t.emoji}</p>
              <p className="text-foreground italic leading-relaxed mb-4 text-sm">"{t.text}"</p>
              <p className="text-muted-foreground text-xs font-bold">— {t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-4 sm:px-6 mx-4 sm:mx-6 mb-8 rounded-3xl bg-primary/10 border border-primary/20 max-w-7xl lg:mx-auto">
        <div className="text-center">
          <h2 className="text-foreground mb-4">Ready to feel less alone? 🌿</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Join thousands of IB students who've found their calm with ZEVINA.
          </p>
          <Link to="/forum" className="btn-primary px-10 py-3.5 text-base inline-block">
            Go to Community Forum 💜
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
