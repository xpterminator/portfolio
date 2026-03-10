import React, { useState, useEffect, useRef } from 'react';
import { 
  Briefcase, 
  Play, 
  ArrowRight, 
  Menu, 
  X, 
  MonitorPlay, 
  Smartphone, 
  Image as ImageIcon,
  Instagram,
  Phone,
  Linkedin,
  Youtube,
  Facebook
} from 'lucide-react';

import img1 from './images/2.jpg'
import img2 from './images/5.jpg'
import img3 from './images/7.jpg'

// ==========================================
// MOCK DATA & ASSETS
// ==========================================
const MOCK_VIDEOS = [
  "https://youtu.be/bHM_Hv7yolw?si=JQq4_1erK12qVsxR",
  "https://www.youtube.com/watch?v=Ixz00Ey_6nc&t=78s",
  "https://youtu.be/UvnN5SYCTmc?si=J5zLVP4ihUMBqh86"
];

const getYoutubeId = (url) => {
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const PORTFOLIO_LONG = [
  { id: 1, title: "Cinematic Tech Vlog", url: "https://youtu.be/C-uaW1JUQ1E?si=eUrF0ns8C5vZuo4p" },
  { id: 2, title: "Tech Review Masterpiece", url: "https://www.youtube.com/watch?v=bHM_Hv7yolw&t=1s" },
  { id: 3, title: "Tips And Trick", url: "https://www.youtube.com/watch?v=qDNmB2yJVF8&t=23s" }
];

const PORTFOLIO_SHORT = [
  { id: 1, title: "Instagram Viral Edit", url: "https://www.instagram.com/reel/DU0oEaMkc2E/?igsh=MWkwbG9vNDcxN28xcw==", img: "https://images.unsplash.com/photo-1726066012685-f5ccd26b6f55?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 2, title: "Event Edits", url: "https://www.instagram.com/reel/DGgTBUoTen5/?igsh=bmFtb2p3ZmExOWlz", img: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 3, title: "Explainatory Reels", url: "https://www.instagram.com/reel/DFXpy4avTGX/?igsh=MXgza3JpbmxyZW9obw==", img: "https://images.unsplash.com/photo-1649920442906-3c8ef428fb6e?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 4, title: "Cinematic Reels", url: "https://www.instagram.com/reel/DFr5nGKPUb4/?igsh=ZGJ6eXZzZHliMDNq", img: "https://images.unsplash.com/photo-1736295691485-9765a16c5d77?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
];

const PORTFOLIO_THUMBNAILS = [
  { id: 1, title: "MrBeast Style", img: img1 },
  { id: 2, title: "Podcast Thumbnail", img: img2 },
  { id: 3, title: "Tech Review", img: img3 },
];

// ==========================================
// UTILS & HOOKS
// ==========================================
const useScrollReveal = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

const FadeInSection = ({ children, className = "", delay = 0 }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// ==========================================
// COMPONENTS
// ==========================================

// --- Navbar.jsx ---
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/60 backdrop-blur-md border-b border-[#00f8f8]/20 py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-black text-white tracking-wider cursor-pointer transition-all duration-300 hover:text-[#00f8f8] hover:drop-shadow-[0_0_10px_#00f8f8]">
          XpTerminator
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {["Home", "Work", "About Us"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className="text-gray-300 font-medium text-sm relative group transition-colors hover:text-white"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#00f8f8] transition-all duration-300 group-hover:w-full shadow-[0_0_8px_#00f8f8]"></span>
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <button className="flex items-center gap-2 bg-[#00f8f8] text-black px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 hover:bg-white hover:shadow-[0_0_20px_#00f8f8] hover:-translate-y-0.5">
            <Briefcase size={16} />
            Hire Us
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-[#00f8f8]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-[#00f8f8]/20 flex flex-col items-center py-6 space-y-6">
          {["Home", "Work", "About Us"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              onClick={() => setMobileMenuOpen(false)}
              className="text-white text-lg font-medium hover:text-[#00f8f8]"
            >
              {item}
            </a>
          ))}
          <button className="flex items-center gap-2 bg-[#00f8f8] text-black px-8 py-3 rounded-full font-bold transition-all shadow-[0_0_15px_#00f8f8]">
            <Briefcase size={18} />
            Hire Us
          </button>
        </div>
      )}
    </nav>
  );
};

// --- Hero.jsx ---
const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-24 overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div className="hero-gradient absolute inset-0 opacity-40"></div>
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center text-center mt-12">
        <FadeInSection>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight max-w-5xl tracking-tight">
            Turning raw footage into your brand's <span className="text-[#00f8f8] drop-shadow-[0_0_15px_rgba(0,248,248,0.6)]">best story.</span>
          </h1>
        </FadeInSection>

        {/* Hero Video Carousel */}
        <FadeInSection delay={200} className="w-full mt-16 mb-12">
          <div className="flex overflow-x-auto gap-6 pb-8 hide-scrollbar snap-x snap-mandatory px-4 md:px-0">
            {MOCK_VIDEOS.map((src, idx) => {
              const videoId = getYoutubeId(src);
              const thumbUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '';
              
              return (
                <a 
                  key={idx} 
                  href={src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative min-w-[280px] md:min-w-[400px] h-[180px] md:h-[240px] rounded-2xl overflow-hidden snap-center group cursor-pointer border border-transparent transition-all duration-500 hover:scale-[1.03] hover:border-[#00f8f8] hover:shadow-[0_0_30px_rgba(0,248,248,0.3)] block"
                >
                  <img src={thumbUrl} alt="Sample work" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors duration-300">
                    <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:border-[#00f8f8] group-hover:text-[#00f8f8] transition-all duration-300">
                      <Play className="ml-1" size={20} fill="currentColor" />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </FadeInSection>

        <FadeInSection delay={400}>
          <a 
            href="https://www.youtube.com/@TECHMONK-7/videos" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full border border-[#00f8f8] text-[#00f8f8] font-bold text-lg overflow-hidden transition-all duration-300 hover:text-black hover:shadow-[0_0_25px_#00f8f8]"
          >
            <span className="relative z-10">Explore More</span>
            <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-[#00f8f8] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
          </a>
        </FadeInSection>
      </div>
    </section>
  );
};

// --- About.jsx ---
const About = () => {
  return (
    <section id="about-us" className="relative h-auto py-24 md:h-[500px] flex items-center justify-center overflow-hidden">
      {/* Radial Glow Background */}
      <div className="absolute inset-0 z-0 bg-black">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00f8f8] opacity-[0.07] blur-[120px] rounded-full pointer-events-none"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <FadeInSection>
          <h2 className="text-3xl md:text-5xl font-black text-[#00f8f8] mb-8 tracking-wide drop-shadow-[0_0_10px_rgba(0,248,248,0.4)]">
            About Me
          </h2>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light">
            I am a professional video editor specializing in transforming ordinary clips into <strong className="text-white font-semibold">cinematic experiences</strong>. With a deep understanding of storytelling and modern branding, I help creators and agencies elevate their content. Whether it's fast-paced engaging shorts or compelling long-form documentaries, my creative direction ensures <strong className="text-white font-semibold">fast delivery</strong> without compromising on the <strong className="text-[#00f8f8] font-semibold">premium, high-end visual standard</strong> your brand deserves.
          </p>
        </FadeInSection>
      </div>
    </section>
  );
};

// --- PortfolioCategories.jsx ---
const LongVideoSection = () => (
  <div className="mb-20">
    <div className="flex items-center gap-3 mb-6">
      <MonitorPlay className="text-[#00f8f8]" size={28} />
      <div>
        <h3 className="text-2xl font-bold text-[#00f8f8]">Long Video</h3>
        <p className="text-sm text-gray-400">Cinematic vlogs, Tech Reviews, and full-length features.</p>
      </div>
    </div>
    <div className="flex overflow-x-auto gap-8 pb-8 hide-scrollbar snap-x snap-mandatory">
      {PORTFOLIO_LONG.map((item) => {
        const videoId = getYoutubeId(item.url);
        const thumbUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '';
        
        return (
          <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" className="relative min-w-[320px] md:min-w-[600px] aspect-video rounded-2xl overflow-hidden snap-center group cursor-pointer block">
            <img src={thumbUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6 opacity-80 group-hover:opacity-100 transition-opacity">
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                <div className="w-16 h-16 rounded-full bg-[#00f8f8]/90 text-black flex items-center justify-center shadow-[0_0_30px_#00f8f8] backdrop-blur-md">
                  <Play className="ml-1" size={32} fill="currentColor" />
                </div>
              </div>
              <h4 className="text-xl font-bold text-white relative z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{item.title}</h4>
            </div>
          </a>
        );
      })}
    </div>
  </div>
);

const ShortVideoSection = () => (
  <div className="mb-20">
    <div className="flex items-center gap-3 mb-6">
      <Smartphone className="text-[#00f8f8]" size={28} />
      <div>
        <h3 className="text-2xl font-bold text-[#00f8f8]">Short Video</h3>
        <p className="text-sm text-gray-400">High-retention Reels, Cinematics Reels, and Shorts.</p>
      </div>
    </div>
    <div className="flex overflow-x-auto gap-6 pb-8 hide-scrollbar snap-x snap-mandatory">
      {PORTFOLIO_SHORT.map((item) => (
        <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" className="relative min-w-[200px] md:min-w-[280px] aspect-[9/16] rounded-2xl overflow-hidden snap-center group cursor-pointer border border-[#00f8f8]/0 hover:border-[#00f8f8]/50 hover:shadow-[0_0_20px_rgba(0,248,248,0.2)] transition-all duration-500 block">
          <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-5">
            <h4 className="text-lg font-bold text-white">{item.title}</h4>
          </div>
          <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center">
            <Play size={14} fill="white" />
          </div>
        </a>
      ))}
    </div>
  </div>
);

const ThumbnailDesignSection = () => (
  <div className="mb-10">
    <div className="flex items-center gap-3 mb-6">
      <ImageIcon className="text-[#00f8f8]" size={28} />
      <div>
        <h3 className="text-2xl font-bold text-[#00f8f8]">Thumbnail Design</h3>
        <p className="text-sm text-gray-400">High-CTR, visually striking YouTube thumbnails.</p>
      </div>
    </div>
    <div className="flex overflow-x-auto gap-8 pb-12 hide-scrollbar snap-x snap-mandatory pt-4">
      {PORTFOLIO_THUMBNAILS.map((item) => (
        <div 
          key={item.id} 
          className="relative min-w-[300px] md:min-w-[450px] aspect-video rounded-xl overflow-hidden snap-center cursor-pointer transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02] hover:rotate-1 hover:shadow-[0_15px_30px_rgba(0,248,248,0.2)] group"
        >
          <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
            <span className="bg-black text-[#00f8f8] font-bold px-6 py-2 rounded-full border border-[#00f8f8] tracking-wider">
              VIEW FULL
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Portfolio = () => {
  return (
    <section id="work" className="relative py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <FadeInSection>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-16 text-center">
            Selected <span className="text-[#00f8f8]">Works</span>
          </h2>
        </FadeInSection>

        <FadeInSection delay={100}>
          <LongVideoSection />
        </FadeInSection>
        
        <FadeInSection delay={200}>
          <ShortVideoSection />
        </FadeInSection>
        
        <FadeInSection delay={300}>
          <ThumbnailDesignSection />
        </FadeInSection>
      </div>
    </section>
  );
};

// --- Footer.jsx ---
const Footer = () => (
  <footer className="border-t border-[#00f8f8]/20 bg-black py-12 px-6 flex flex-col items-center text-center">
    <h2 className="text-2xl font-black text-white tracking-wider mb-8">
      Xp<span className="text-[#00f8f8] drop-shadow-[0_0_8px_#00f8f8]">Terminator</span>
    </h2>
    
    {/* Social Links Section */}
    <div className="flex items-center justify-center gap-6 mb-8">
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#00f8f8] transition-colors duration-300 transform hover:scale-110">
        <Instagram size={24} />
      </a>
      
      {/* Call Button with Tooltip */}
      <div className="relative group cursor-pointer text-gray-400 hover:text-[#00f8f8] transition-colors duration-300 transform hover:scale-110">
        <a href="tel:9810864002" className="block">
          <Phone size={24} />
        </a>
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black border border-[#00f8f8] text-[#00f8f8] font-bold text-xs py-1.5 px-3 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-[0_0_10px_rgba(0,248,248,0.3)] pointer-events-none">
          9810864002
          {/* Arrow pointing down */}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-black border-b border-r border-[#00f8f8] rotate-45"></div>
        </div>
      </div>

      <a href="https://www.linkedin.com/in/shahrafealam/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#00f8f8] transition-colors duration-300 transform hover:scale-110">
        <Linkedin size={24} />
      </a>
      <a href="https://www.youtube.com/@TECHMONK-7/videos" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#00f8f8] transition-colors duration-300 transform hover:scale-110">
        <Youtube size={24} />
      </a>
      <a href="https://www.facebook.com/shah.rafe.1" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#00f8f8] transition-colors duration-300 transform hover:scale-110">
        <Facebook size={24} />
      </a>
    </div>

    <p className="text-gray-500 text-sm">© {new Date().getFullYear()} XpTerminator. Video Editor.</p>
  </footer>
);

// --- App.jsx (Main Container) ---
export default function App() {
  return (
    <div className="bg-[#000000] min-h-screen text-white font-mono selection:bg-[#00f8f8] selection:text-black">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400;600;700&display=swap');
        
        body {
          font-family: 'Roboto Mono', monospace;
          background-color: #000000;
          overflow-x: hidden;
        }

        /* Hide Scrollbar for Horizontal Carousels */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Hero Animated Gradient */
        .hero-gradient {
          background: linear-gradient(120deg, #000000, #004d4d, #00f8f8, #000000);
          background-size: 300% 300%;
          animation: gradientMove 15s ease infinite;
        }

        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}} />

      <Navbar />
      <Hero />
      <About />
      <Portfolio />
      <Footer />
    </div>
  );
}