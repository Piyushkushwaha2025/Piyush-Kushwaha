import React, { useState, useEffect, useRef } from 'react';
import { Monitor, Smartphone, Play, Video, Share2, Sparkles, ChevronRight, Github, Linkedin, Instagram, Mail, MessageCircle, MapPin, Palette, Bot, X, Send, Youtube } from 'lucide-react';
import heroImage from './assets/piyush-hero.png';

// ─── Theme & Data ──────────────────────────────────────────────────────────────

interface Theme {
  name: string;
  hex: string;
  rgb: string;
}

interface Service {
  title: string;
  desc: string;
  icon: React.ElementType;
}

interface PortfolioProject {
  title: string;
  category: string;
  image?: string;
  youtubeId?: string;
  tech?: string[];
  duration?: string;
  type?: string;
}

const THEMES: Theme[] = [
  { name: 'Orange', hex: '#FF6B00', rgb: '255, 107, 0' },
  { name: 'Green', hex: '#22C55E', rgb: '34, 197, 94' },
  { name: 'Cyan', hex: '#00E5FF', rgb: '0, 229, 255' },
  { name: 'Purple', hex: '#8B5CF6', rgb: '139, 92, 246' },
  { name: 'Pink', hex: '#EC4899', rgb: '236, 72, 153' },
  { name: 'Blue', hex: '#3B82F6', rgb: '59, 130, 246' }
];

const SERVICES: Service[] = [
  { title: 'Digital Architecture', desc: 'High-performance React web applications built for scale, speed, and seamless user experiences.', icon: Monitor },
  { title: 'Cinematic Editing', desc: 'Attention-retaining video edits for YouTube and social media using Premiere Pro & After Effects.', icon: Video },
  { title: 'Visual Identity', desc: 'Premium brand assets, conversion-optimized UI/UX designs, and pixel-perfect retouching.', icon: Palette },
  { title: 'AI Generation', desc: 'Next-gen visual content using Midjourney and Leonardo AI integrated into modern workflows.', icon: Sparkles },
  { title: 'Data Solutions', desc: 'Transforming raw data into actionable insights, automated workflows, and beautiful visualizations.', icon: Share2 },
  { title: 'Responsive Design', desc: 'Mobile-first, fluid interfaces that look pixel-perfect and perform flawlessly across all devices.', icon: Smartphone },
];

const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  { title: 'SaaS Dashboard', category: 'Web Dev', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800', tech: ['React', 'Tailwind', 'Zustand'] },
  { title: 'Fintech Platform', category: 'Web Dev', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800', tech: ['Next.js', 'Framer'] },
  { title: 'Agency Landing Page', category: 'Web Dev', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800', tech: ['HTML5', 'GSAP'] },
  { title: 'AI Storyboard: Scene I', category: 'AI Visuals', youtubeId: 'nbUU_npD6Vo' },
  { title: 'AI Storyboard: Scene III', category: 'AI Visuals', youtubeId: 'boWTXrSLsps' },
  { title: 'AI Storyboard: Scene II', category: 'AI Visuals', youtubeId: 'f-XYxmYIPsc' },
  { title: 'The Pizza Cat Adventure', category: 'AI Visuals', youtubeId: 'zyE2gmuqgfs' },
  { title: 'Educational AI: Animal Rhymes', category: 'AI Visuals', youtubeId: 'L6-jcz6IVLc' },
  { title: 'Dynamic Motion Loop', category: 'AI Visuals', youtubeId: 'Tfo3uHbdi1M' },
  { title: 'Visual Effects Short', category: 'AI Visuals', youtubeId: 'IJ1_uAmVQ6s' },
];

// ─── Hooks ──────────────────────────────────────────────────────────────────────

const useScrollReveal = (): [React.RefObject<HTMLDivElement>, boolean] => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
};

// ─── Custom Cursor ──────────────────────────────────────────────────────────────

const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    const update = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        ['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('interactive-cursor');
      setIsHovering(!!isInteractive);
    };
    
    window.addEventListener('mousemove', update);
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mousemove', update);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);
  
  return (
    <>
      <div 
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999] mix-blend-screen transition-transform duration-75 ease-out hidden md:block"
        style={{ transform: `translate(${pos.x - 6}px, ${pos.y - 6}px) scale(${isHovering ? 0 : 1})`, backgroundColor: 'var(--color-accent)' }}
      />
      <div 
        className="fixed top-0 left-0 w-12 h-12 border border-white/50 rounded-full pointer-events-none z-[9999] transition-all duration-300 ease-out hidden md:block"
        style={{ 
          transform: `translate(${pos.x - 24}px, ${pos.y - 24}px) scale(${isHovering ? 1.5 : 1})`,
          borderColor: isHovering ? 'var(--color-accent)' : 'rgba(255,255,255,0.3)',
          backgroundColor: isHovering ? 'rgba(var(--color-accent-rgb), 0.1)' : 'transparent'
        }}
      />
    </>
  );
};

// ─── Tilt Card ──────────────────────────────────────────────────────────────────

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const TiltCard = React.forwardRef<HTMLDivElement, TiltCardProps>(({ children, className, style: externalStyle }, ref) => {
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({ opacity: 0 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    
    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease-out'
    });

    const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI) - 90;
    const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
    const opacity = Math.min(distance / centerX, 0.4);

    setGlareStyle({
      background: `linear-gradient(${angle}deg, rgba(255,255,255,${opacity}) 0%, rgba(255,255,255,0) 80%)`,
      opacity: 1,
      transition: 'opacity 0.1s ease',
    });
  };
  
  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s ease-out'
    });
    setGlareStyle({ opacity: 0, transition: 'opacity 0.5s ease' });
  };
  
  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ ...externalStyle, ...style }} className={`${className} relative`}>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit]" style={{ ...glareStyle, borderRadius: 'inherit', zIndex: 90 }} />
      {children}
    </div>
  );
});

TiltCard.displayName = 'TiltCard';

// ─── Typewriter ─────────────────────────────────────────────────────────────────

interface TypewriterProps {
  words: string[];
}

const Typewriter: React.FC<TypewriterProps> = ({ words }) => {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.substring(0, text.length + 1));
        if (text === currentWord) setTimeout(() => setIsDeleting(true), 1500);
      } else {
        setText(currentWord.substring(0, text.length - 1));
        if (text === '') {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 50 : 100);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words]);

  return (
    <span style={{ color: 'var(--color-accent)' }} className="inline-block">
      {text}<span className="animate-pulse">|</span>
    </span>
  );
};

// ─── Section Heading ────────────────────────────────────────────────────────────

interface SectionHeadingProps {
  title: string;
  subtitle: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ title, subtitle }) => {
  const [ref, isVisible] = useScrollReveal();
  return (
    <div ref={ref} className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <h2 style={{ color: 'var(--color-accent)' }} className="text-xs font-bold tracking-[0.3em] uppercase mb-4">{subtitle}</h2>
      <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">{title}</h3>
      <div className="w-24 h-1 mx-auto mt-8 rounded-full opacity-50" style={{ background: `linear-gradient(to right, var(--color-accent), transparent)` }} />
    </div>
  );
};

// ─── Stat Item ──────────────────────────────────────────────────────────────────

interface StatItemProps {
  stat: { value: string; suffix: string; label: string };
  index: number;
}

const StatItem: React.FC<StatItemProps> = ({ stat, index }) => {
  const [ref, isVisible] = useScrollReveal();
  return (
    <div ref={ref} className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${index * 100}ms` }}>
      <div className="text-5xl md:text-7xl font-black text-white mb-2 tracking-tighter">{stat.value}<span style={{ color: 'var(--color-accent)' }}>{stat.suffix}</span></div>
      <div className="text-[10px] font-bold tracking-[0.2em] text-neutral-500 uppercase">{stat.label}</div>
    </div>
  );
};

// ─── Service Item ───────────────────────────────────────────────────────────────

interface ServiceItemProps {
  srv: Service;
  index: number;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ srv, index }) => {
  const [ref, isVisible] = useScrollReveal();
  return (
    <TiltCard
      ref={ref}
      className={`group p-8 rounded-[2rem] bg-[#0a0a0a] border border-neutral-900 hover:border-neutral-700 transition-all duration-500 interactive-cursor transform-style-3d ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="w-14 h-14 rounded-2xl bg-black border border-neutral-800 flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform duration-500 transform-style-3d" style={{ transform: 'translateZ(40px)' }}>
        <srv.icon size={24} style={{ color: 'var(--color-accent)' }} />
      </div>
      <h3 className="text-2xl font-bold text-white mb-4 tracking-tight" style={{ transform: 'translateZ(30px)' }}>{srv.title}</h3>
      <p className="text-neutral-400 leading-relaxed font-light" style={{ transform: 'translateZ(20px)' }}>
        {srv.desc}
      </p>
    </TiltCard>
  );
};

// ─── Contact Form ───────────────────────────────────────────────────────────────

const ContactForm: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => setStatus('success'), 2000);
  };

  return (
    <div className="relative w-full h-full min-h-[400px] flex flex-col justify-center">
      {status === 'success' ? (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0a0a0a] rounded-3xl border border-neutral-800 p-8 text-center animate-fade-in-up">
          <div className="w-20 h-20 rounded-full bg-black border border-neutral-800 flex items-center justify-center mb-6 transition-all duration-500 shadow-[0_0_30px_rgba(var(--color-accent-rgb),0.3)]">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h3 className="text-3xl font-black text-white mb-2 tracking-tight">TRANSMISSION SENT</h3>
          <p className="text-neutral-400 mb-8 font-light">Your message has been successfully beamed to my database. I will initiate contact shortly.</p>
          <button 
            onClick={() => setStatus('idle')}
            className="px-8 py-3 rounded-full font-bold text-white bg-transparent border border-neutral-700 hover:border-white transition-all duration-300 interactive-cursor text-xs tracking-widest uppercase"
          >
            Send Another
          </button>
        </div>
      ) : null}

      <form 
        className={`flex flex-col gap-5 transition-all duration-500 relative z-10 ${
          status === 'success' ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`} 
        onSubmit={handleSubmit}
      >
        <div className="group relative">
          <input required type="text" id="name" placeholder=" " className="peer w-full bg-[#111] border border-neutral-800 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-transparent transition-all interactive-cursor text-sm tracking-wide font-light placeholder-transparent z-10 relative bg-transparent" />
          <div className="absolute inset-0 rounded-xl border-2 border-transparent peer-focus:border-[var(--color-accent)] opacity-50 pointer-events-none transition-all duration-300"></div>
          <label htmlFor="name" className="absolute left-5 top-4 text-neutral-600 text-sm tracking-wide font-light transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-neutral-600 peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-[var(--color-accent)] peer-focus:bg-[#0a0a0a] peer-focus:px-2 peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest peer-focus:z-20 peer-valid:-top-3 peer-valid:text-[10px] peer-valid:text-neutral-400 peer-valid:bg-[#0a0a0a] peer-valid:px-2 peer-valid:font-bold peer-valid:uppercase peer-valid:tracking-widest peer-valid:z-20 z-0 pointer-events-none">Your Name</label>
        </div>
        
        <div className="group relative">
          <input required type="email" id="email" placeholder=" " className="peer w-full bg-[#111] border border-neutral-800 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-transparent transition-all interactive-cursor text-sm tracking-wide font-light placeholder-transparent z-10 relative bg-transparent" />
          <div className="absolute inset-0 rounded-xl border-2 border-transparent peer-focus:border-[var(--color-accent)] opacity-50 pointer-events-none transition-all duration-300"></div>
          <label htmlFor="email" className="absolute left-5 top-4 text-neutral-600 text-sm tracking-wide font-light transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-neutral-600 peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-[var(--color-accent)] peer-focus:bg-[#0a0a0a] peer-focus:px-2 peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest peer-focus:z-20 peer-valid:-top-3 peer-valid:text-[10px] peer-valid:text-neutral-400 peer-valid:bg-[#0a0a0a] peer-valid:px-2 peer-valid:font-bold peer-valid:uppercase peer-valid:tracking-widest peer-valid:z-20 z-0 pointer-events-none">Email Address</label>
        </div>

        <div className="group relative">
          <textarea required id="message" rows={4} placeholder=" " className="peer w-full bg-[#111] border border-neutral-800 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-transparent transition-all interactive-cursor text-sm tracking-wide font-light placeholder-transparent resize-none z-10 relative bg-transparent"></textarea>
          <div className="absolute inset-0 rounded-xl border-2 border-transparent peer-focus:border-[var(--color-accent)] opacity-50 pointer-events-none transition-all duration-300"></div>
          <label htmlFor="message" className="absolute left-5 top-4 text-neutral-600 text-sm tracking-wide font-light transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-neutral-600 peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-[var(--color-accent)] peer-focus:bg-[#0a0a0a] peer-focus:px-2 peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest peer-focus:z-20 peer-valid:-top-3 peer-valid:text-[10px] peer-valid:text-neutral-400 peer-valid:bg-[#0a0a0a] peer-valid:px-2 peer-valid:font-bold peer-valid:uppercase peer-valid:tracking-widest peer-valid:z-20 z-0 pointer-events-none">Project Details</label>
        </div>
        
        <button 
          disabled={status === 'submitting'}
          className="w-full py-4 rounded-xl font-bold text-black hover:shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.4)] transition-all interactive-cursor text-sm tracking-widest uppercase hover:scale-[1.02] flex items-center justify-center gap-3 disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed" 
          style={{ backgroundColor: 'var(--color-accent)' }}
        >
          {status === 'submitting' ? (
            <>
              <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
              Processing...
            </>
          ) : 'Initialize Sequence'}
        </button>
      </form>
    </div>
  );
};

// ─── AI Assistant ───────────────────────────────────────────────────────────────

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi! I'm Piyush's AI Assistant. Ask me anything about his skills, projects, or how to hire him." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const apiKey = ""; // Add your Gemini API key here for production
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      
      const systemPrompt = `You are the AI assistant for Piyush Kushwaha's premium freelance portfolio website. 
      Piyush is a Full Stack Web Developer, Data Science Enthusiast, Video Editor, and AI Visual Artist. 
      He is currently a 2nd Year Computer Science Engineering student at Chandigarh University, based in Unnao, UP, India.
      His tech stack includes React, Tailwind, Next.js, Python, Premiere Pro, Midjourney, and more. 
      He has 3+ years of creative experience and over 50 completed projects.
      Your goal is to answer visitor questions professionally, keep answers concise (1-2 paragraphs max), and actively encourage them to hire Piyush or contact him at piyushkushwaha203@gmail.com. 
      Respond in a confident, futuristic, and premium tone. Do not invent fake projects.`;

      const chatHistory = messages.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));
      chatHistory.push({ role: 'user', parts: [{ text: currentInput }] });

      const payload = {
        contents: chatHistory,
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        },
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      
      if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
        setMessages(prev => [...prev, { role: 'model', text: result.candidates[0].content.parts[0].text }]);
      } else {
        setMessages(prev => [...prev, { role: 'model', text: "Systems are currently offline. Please try contacting Piyush directly via the contact form." }]);
      }
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Connection anomaly detected. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.3)] hover:scale-110 transition-all duration-300 z-50 interactive-cursor ${isOpen ? 'opacity-0 pointer-events-none scale-75' : 'opacity-100'}`}
        style={{ backgroundColor: 'var(--color-accent)' }}
      >
        <Bot size={24} className="text-black" />
        <span className="absolute top-0 right-0 w-3 h-3 bg-white rounded-full animate-ping"></span>
        <span className="absolute top-0 right-0 w-3 h-3 bg-white rounded-full"></span>
      </button>

      <div 
        className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 w-[calc(100vw-3rem)] md:w-96 h-[500px] max-h-[80vh] bg-[#0a0a0a]/95 backdrop-blur-2xl border border-neutral-800 rounded-2xl shadow-2xl flex flex-col z-50 transition-all duration-500 origin-bottom-right overflow-hidden ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-neutral-800 bg-[#111]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-black border border-neutral-700 flex items-center justify-center">
              <Bot size={16} style={{ color: 'var(--color-accent)' }} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-wide">Piyush AI</h4>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">Online</span>
              </div>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 text-neutral-500 hover:text-white transition-colors interactive-cursor">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'rounded-tr-sm text-black font-medium' 
                    : 'bg-[#111] border border-neutral-800 text-neutral-300 rounded-tl-sm'
                }`}
                style={msg.role === 'user' ? { backgroundColor: 'var(--color-accent)' } : {}}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-[#111] border border-neutral-800 p-3 rounded-2xl rounded-tl-sm flex gap-1.5">
                <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="p-3 bg-[#111] border-t border-neutral-800 flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI about my work..." 
            className="flex-1 bg-black border border-neutral-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[var(--color-accent)] transition-colors interactive-cursor"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isLoading}
            className="w-10 h-10 rounded-xl bg-black border border-neutral-800 flex items-center justify-center disabled:opacity-50 hover:border-[var(--color-accent)] transition-colors interactive-cursor"
          >
            <Send size={16} style={{ color: 'var(--color-accent)' }} />
          </button>
        </form>
      </div>
    </>
  );
};

// ─── Main App ───────────────────────────────────────────────────────────────────

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');
  const [activeTheme, setActiveTheme] = useState(THEMES[0]);
  const [isThemePaletteOpen, setIsThemePaletteOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  useEffect(() => {
    if (isThemePaletteOpen) {
      const timer = setTimeout(() => setIsThemePaletteOpen(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isThemePaletteOpen]);

  // 3D Warp Field Canvas Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    
    const stars = Array.from({ length: 150 }, () => ({
      x: (Math.random() - 0.5) * w * 2,
      y: (Math.random() - 0.5) * h * 2,
      z: Math.random() * w
    }));
    
    let mouseX = 0; let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - w / 2) * 0.05;
      mouseY = (e.clientY - h / 2) * 0.05;
    };
    window.addEventListener('mousemove', onMouseMove);

    let animationId: number;

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.fillRect(0, 0, w, h);
      
      const cx = w / 2;
      const cy = h / 2;
      
      stars.forEach((star, i) => {
        star.z -= 2;
        if (star.z <= 0) {
          star.z = w;
          star.x = (Math.random() - 0.5) * w * 2;
          star.y = (Math.random() - 0.5) * h * 2;
        }
        
        const x = cx + star.x * (w / star.z) + mouseX;
        const y = cy + star.y * (w / star.z) + mouseY;
        const s = (1 - star.z / w) * 3;
        
        ctx.fillStyle = `rgba(${activeTheme.rgb}, ${1 - star.z/w})`;
        ctx.beginPath();
        ctx.arc(x, y, s, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < stars.length; j++) {
          const star2 = stars[j];
          const x2 = cx + star2.x * (w / star2.z) + mouseX;
          const y2 = cy + star2.y * (w / star2.z) + mouseY;
          
          const dx = x - x2;
          const dy = y - y2;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const opacity = (1 - dist / 120) * (1 - star.z/w) * 0.4;
            ctx.strokeStyle = `rgba(${activeTheme.rgb}, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        }
      });
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [activeTheme]);

  const categories = ['All', ...new Set(PORTFOLIO_PROJECTS.map(p => p.category))];
  const filteredProjects = activeTab === 'All' ? PORTFOLIO_PROJECTS : PORTFOLIO_PROJECTS.filter(p => p.category === activeTab);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-t-2 border-l-2 rounded-full animate-spin" style={{ borderColor: activeTheme.hex }}></div>
          <div className="absolute inset-2 border-b-2 border-r-2 rounded-full animate-spin border-white/20" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          <div className="absolute inset-0 flex items-center justify-center font-black text-2xl text-white tracking-tighter">PK</div>
        </div>
        <p className="mt-8 text-neutral-500 font-bold tracking-[0.3em] text-xs uppercase animate-pulse">Initializing Protocol</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-neutral-300 font-sans selection:bg-neutral-800 selection:text-white relative overflow-hidden">
      
      <style>{`
        :root {
          --color-accent: ${activeTheme.hex};
          --color-accent-rgb: ${activeTheme.rgb};
        }
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .text-stroke-accent {
          -webkit-text-stroke: 1px var(--color-accent);
          color: transparent;
        }
        .text-stroke-white {
          -webkit-text-stroke: 1px rgba(255,255,255,0.2);
          color: transparent;
        }
        @media (min-width: 768px) {
          body, a, button, input, select, textarea { cursor: none !important; }
        }
        .theme-btn:hover { box-shadow: 0 0 15px var(--color-accent); transform: scale(1.1); }
        
        @keyframes spin-3d {
          0% { transform: rotateX(65deg) rotateZ(0deg); }
          100% { transform: rotateX(65deg) rotateZ(360deg); }
        }
      `}</style>

      <CustomCursor />
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-40" />

      {/* Theme Switcher */}
      <div 
        className="fixed top-24 right-4 md:right-8 z-50 flex flex-col items-center gap-3 p-3 rounded-full bg-[#0a0a0a]/80 backdrop-blur-xl border border-neutral-800 shadow-2xl transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setIsThemePaletteOpen(true)}
        onClick={() => setIsThemePaletteOpen(true)}
      >
        {!isThemePaletteOpen ? (
          <Palette className="w-5 h-5 text-neutral-400" />
        ) : (
          THEMES.map(theme => (
            <button
              key={theme.name}
              onClick={(e) => { e.stopPropagation(); setActiveTheme(theme); setIsThemePaletteOpen(false); }}
              className={`w-4 h-4 rounded-full transition-all duration-300 theme-btn ${activeTheme.name === theme.name ? 'scale-125 ring-2 ring-white/50 ring-offset-2 ring-offset-black' : 'opacity-50 hover:opacity-100'}`}
              style={{ backgroundColor: theme.hex }}
              title={theme.name}
            />
          ))
        )}
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 flex justify-between items-center">
          <div className="text-2xl font-black text-white tracking-tighter interactive-cursor">
            PIYUSH<span style={{ color: 'var(--color-accent)' }}>.</span>
          </div>
          <div className="hidden md:flex gap-8">
            {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-semibold tracking-wider text-neutral-400 hover:text-white uppercase transition-colors interactive-cursor">
                {link}
              </a>
            ))}
          </div>
          <a href="#contact" className="px-6 py-2.5 rounded-full font-bold text-black interactive-cursor text-sm tracking-wider uppercase transition-transform hover:scale-105" style={{ backgroundColor: 'var(--color-accent)' }}>
            Hire Me
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-24 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-12 items-center w-full">
          
          <div className="flex flex-col items-start z-20">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#0a0a0a] border border-neutral-800 backdrop-blur-md mb-8 animate-fade-in-up shadow-2xl">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: 'var(--color-accent)' }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: 'var(--color-accent)' }} />
              </span>
              <span className="text-[10px] font-bold text-neutral-300 tracking-[0.2em] uppercase">Accepting New Projects</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.95] tracking-tighter mb-6">
              DIGITAL <br />
              <span className="text-stroke-accent">INNOVATOR.</span>
            </h1>
            
            <div className="h-16 md:h-12 mb-4">
              <h2 className="text-xl md:text-3xl font-semibold text-neutral-200 tracking-tight">
                I am Piyush, a <Typewriter words={['Full Stack Web Developer', 'Data Science Enthusiast', 'Creative Video Editor', 'AI Visual Artist']} />
              </h2>
            </div>

            <p className="text-lg md:text-xl text-neutral-400 mb-10 max-w-xl leading-relaxed font-light">
              I architect high-performance websites, direct cinematic visuals, and engineer data-driven solutions for ambitious brands and creators ready to scale.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <a href="#contact" className="px-8 py-4 rounded-full font-bold text-white shadow-lg hover:shadow-[0_0_30px_rgba(var(--color-accent-rgb),0.4)] hover:-translate-y-1 transition-all duration-300 interactive-cursor text-sm tracking-wider uppercase inline-block" style={{ backgroundColor: 'var(--color-accent)' }}>
                Start a Project
              </a>
              <a href="#portfolio" className="px-8 py-4 rounded-full font-bold text-white bg-transparent border-2 border-neutral-800 hover:border-white transition-all duration-300 interactive-cursor flex items-center gap-2 text-sm tracking-wider uppercase">
                Explore Work
              </a>
            </div>
            
            <div className="flex items-center gap-6">
              {[
                { Icon: Github, href: 'https://github.com/Piyushkushwaha2025', title: 'GitHub' },
                { Icon: Linkedin, href: 'https://www.linkedin.com/in/piyush-kushwaha-42911a392', title: 'LinkedIn' },
                { Icon: Instagram, href: 'https://www.instagram.com/baby_fun_2025', title: 'AI Visuals' },
                { Icon: Instagram, href: 'https://www.instagram.com/alf.reddanger', title: 'Personal Instagram' },
                { Icon: Youtube, href: '#', title: 'YouTube' },
                { Icon: Mail, href: 'mailto:piyushkushwaha203@gmail.com', title: 'Email' },
              ].map(({ Icon, href, title }, i) => (
                <a key={i} href={href} target={href === '#' ? '_self' : '_blank'} rel="noreferrer" title={title} className="text-neutral-500 hover:text-white transition-colors interactive-cursor">
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>

          {/* Right Content (3D Parallax Card) */}
          <div className="relative flex justify-center items-center mt-12 lg:mt-0 z-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20 blur-[100px] rounded-full pointer-events-none transition-colors duration-500" style={{ backgroundColor: 'var(--color-accent)' }} />
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[500px] md:h-[500px] border-2 border-dashed rounded-full pointer-events-none opacity-30 transition-colors duration-500" style={{ borderColor: 'var(--color-accent)', animation: 'spin-3d 20s linear infinite', transformStyle: 'preserve-3d' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] md:w-[650px] md:h-[650px] border border-solid rounded-full pointer-events-none opacity-20 transition-colors duration-500" style={{ borderColor: 'var(--color-accent)', animation: 'spin-3d 30s linear infinite reverse', transformStyle: 'preserve-3d' }} />

            <TiltCard className="relative w-72 h-[26rem] md:w-96 md:h-[36rem] rounded-[2.5rem] border border-neutral-800 bg-[#0a0a0a] shadow-2xl z-10 group interactive-cursor transform-style-3d overflow-visible">
              <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden" style={{ transform: 'translateZ(0px)' }}>
                <img 
                  src={heroImage}
                  alt="Piyush Kushwaha" 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 opacity-80 grayscale group-hover:grayscale-0 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 pointer-events-none" />
              </div>

              {[
                { text: 'React', style: { top: '10%', right: '-10%' } as React.CSSProperties },
                { text: 'Design', style: { bottom: '20%', right: '-5%' } as React.CSSProperties },
                { text: 'Python', style: { bottom: '10%', left: '-10%' } as React.CSSProperties },
                { text: 'AI Gen', style: { top: '20%', left: '-5%' } as React.CSSProperties },
              ].map((badge, i) => (
                <div 
                  key={i}
                  className="absolute px-4 py-2 bg-[#111]/90 backdrop-blur-md border border-neutral-700 rounded-xl flex items-center justify-center shadow-xl z-30 pointer-events-none text-xs font-bold text-white tracking-wider uppercase"
                  style={{ ...badge.style, transform: 'translateZ(80px)' }}
                >
                  <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: 'var(--color-accent)' }} />
                  {badge.text}
                </div>
              ))}
            </TiltCard>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-neutral-900 bg-black relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Years of Mastery', value: '3+', suffix: '' },
            { label: 'Technical Arsenal', value: '10+', suffix: '' },
            { label: 'Client Success Rate', value: '100', suffix: '%' },
            { label: 'Deployed Projects', value: '50+', suffix: '' }
          ].map((stat, i) => (
            <StatItem key={i} stat={stat} index={i} />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 relative z-10 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeading title="The Architect" subtitle="Behind The Code" />
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-8 tracking-tight">
              Bridging the gap between <span className="italic font-light text-neutral-400">aesthetic design</span> and <span style={{ color: 'var(--color-accent)' }}>ruthless performance.</span>
            </h3>
            <p className="text-lg text-neutral-500 leading-relaxed mb-6 font-light">
              As a Computer Science Engineering student at Chandigarh University, I refuse to be boxed into a single discipline. I am a rare hybrid: a developer who understands narrative, an editor who understands code, and an analyst who understands art.
            </p>
            <p className="text-lg text-neutral-500 leading-relaxed font-light">
              Over the past 3 years, I've leveraged bleeding-edge technologies and AI-powered workflows to deliver digital experiences that don't just look pretty—they convert, perform, and scale.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 relative z-10 bg-black border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeading title="Capabilities" subtitle="Arsenal & Expertise" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((srv, i) => <ServiceItem key={i} srv={srv} index={i} />)}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-32 relative z-10 bg-[#050505] border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeading title="Featured Vault" subtitle="Selected Masterpieces" />
          
          <div className="flex flex-wrap justify-center gap-2 mb-16">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 interactive-cursor ${
                  activeTab === category 
                    ? 'bg-white text-black shadow-lg' 
                    : 'bg-transparent text-neutral-500 hover:text-white border border-neutral-800 hover:border-neutral-500'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, i) => (
              <TiltCard key={i} className="group relative rounded-[2rem] overflow-hidden bg-[#0a0a0a] border border-neutral-900 interactive-cursor transform-style-3d">
                <div className="relative aspect-video overflow-hidden">
                  {project.youtubeId ? (
                    <button onClick={() => setActiveVideo(project.youtubeId!)} className="block w-full h-full interactive-cursor">
                      <img src={`https://img.youtube.com/vi/${project.youtubeId}/maxresdefault.jpg`} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm pointer-events-none">
                        <div className="p-4 bg-white text-black rounded-full shadow-xl" style={{ transform: 'translateZ(40px)' }}>
                          <Play fill="black" size={24} />
                        </div>
                      </div>
                    </button>
                  ) : (
                    <>
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 pointer-events-none" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm pointer-events-none">
                        <div className="p-4 bg-white text-black rounded-full shadow-xl" style={{ transform: 'translateZ(40px)' }}>
                          <Play fill="black" size={24} />
                        </div>
                      </div>
                    </>
                  )}
                </div>
                
                <div className="p-8 pointer-events-none" style={{ transform: 'translateZ(20px)' }}>
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-2xl font-bold text-white tracking-tight">{project.title}</h4>
                  </div>
                  
                  {project.tech && (
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map(t => (
                        <span key={t} className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase border border-neutral-800 px-3 py-1 rounded-full">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative z-10 bg-black border-t border-neutral-900">
        <div className="max-w-5xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-6xl md:text-8xl font-black text-stroke-white tracking-tighter uppercase mb-4 opacity-10">Initiate</h2>
          <SectionHeading title="Let's Build The Future." subtitle="System Comm Link" />
          
          <div className="bg-[#0a0a0a] p-8 md:p-12 rounded-[2.5rem] border border-neutral-800 shadow-2xl text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 opacity-5 blur-[100px] rounded-full pointer-events-none transition-colors duration-500" style={{ backgroundColor: 'var(--color-accent)' }} />
            
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 relative z-10 items-center">
              <div>
                <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Drop a transmission.</h3>
                <p className="text-neutral-400 mb-10 font-light leading-relaxed">Whether it's a massive scalable web app, a cinematic edit, or a data-driven model—if you have the vision, I have the architecture. Let's engineer it.</p>
                
                <div className="space-y-4">
                  <a href="https://wa.me/919559032779" target="_blank" rel="noreferrer" className="group flex items-center gap-5 p-4 rounded-2xl bg-[#111] border border-neutral-800 hover:border-neutral-600 transition-all cursor-pointer interactive-cursor">
                    <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center border border-neutral-800 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(var(--color-accent-rgb),0.3)] transition-all">
                      <MessageCircle size={20} style={{ color: 'var(--color-accent)' }} />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-1 group-hover:text-neutral-400 transition-colors">WhatsApp / Phone</div>
                      <div className="font-semibold text-white tracking-wide group-hover:text-[var(--color-accent)] transition-colors">+91 9559032779</div>
                    </div>
                  </a>
                  
                  <a href="mailto:piyushkushwaha203@gmail.com" className="group flex items-center gap-5 p-4 rounded-2xl bg-[#111] border border-neutral-800 hover:border-neutral-600 transition-all cursor-pointer interactive-cursor">
                    <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center border border-neutral-800 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(var(--color-accent-rgb),0.3)] transition-all">
                      <Mail size={20} style={{ color: 'var(--color-accent)' }} />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-1 group-hover:text-neutral-400 transition-colors">Direct Email</div>
                      <div className="font-semibold text-white tracking-wide truncate max-w-[200px] sm:max-w-none group-hover:text-[var(--color-accent)] transition-colors">piyushkushwaha203@gmail.com</div>
                    </div>
                  </a>
                  
                  <div className="group flex items-center gap-5 p-4 rounded-2xl bg-[#111] border border-neutral-800 hover:border-neutral-600 transition-all interactive-cursor">
                    <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center border border-neutral-800 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(var(--color-accent-rgb),0.3)] transition-all">
                      <MapPin size={20} style={{ color: 'var(--color-accent)' }} />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-1 group-hover:text-neutral-400 transition-colors">Base of Operations</div>
                      <div className="font-semibold text-white tracking-wide group-hover:text-[var(--color-accent)] transition-colors">Nawabganj, Unnao, UP, India</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-neutral-900 bg-black relative z-10 text-center">
        <p className="text-neutral-500 text-sm font-semibold tracking-wider">
          &copy; {new Date().getFullYear()} <span className="text-white">PIYUSH KUSHWAHA</span>. ALL SYSTEMS ONLINE.
        </p>
      </footer>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-12 animate-in fade-in duration-300">
          <div className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
            <button 
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white backdrop-blur-md transition-colors"
            >
              <X size={24} />
            </button>
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0&modestbranding=1`}
              title="Video Player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
      
      <AIAssistant />
    </div>
  );
}
