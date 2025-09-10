import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const sections = [
  { id: "hero", label: "Home" },
  { id: "vision", label: "Vision" },
  { id: "agents", label: "Agents" },
  { id: "consumer", label: "Consumer" },
  { id: "investor", label: "Investor" },
  { id: "pricing", label: "Pricing" },
  { id: "contact", label: "Contact" },
];

export const ScrollNavigation = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    let element;
    
    if (sectionId === 'consumer' || sectionId === 'investor') {
      // For consumer/investor, scroll to the h2 element inside twins
      element = document.getElementById(sectionId);
    } else {
      element = document.getElementById(sectionId);
    }
    
    if (element) {
      element.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120; // Increased offset for better detection
      let activeId = 'hero';
      
      // Get all section elements with their positions
      const sectionElements = [
        { id: 'hero', element: document.getElementById('hero') },
        { id: 'vision', element: document.getElementById('vision') },
        { id: 'agents', element: document.getElementById('agents') },
        { id: 'twins', element: document.getElementById('twins') },
        { id: 'pricing', element: document.getElementById('pricing') },
        { id: 'contact', element: document.getElementById('contact') }
      ].filter(item => item.element);

      // Find the current section
      for (let i = 0; i < sectionElements.length; i++) {
        const current = sectionElements[i];
        const next = sectionElements[i + 1];
        
        const currentTop = current.element.offsetTop;
        const nextTop = next ? next.element.offsetTop : document.body.scrollHeight;
        
        if (scrollPosition >= currentTop && scrollPosition < nextTop) {
          if (current.id === 'twins') {
            // Special handling for twins section
            const consumerEl = document.getElementById('consumer');
            const investorEl = document.getElementById('investor');
            
            if (consumerEl && investorEl) {
              // Get the position of consumer and investor h2 elements relative to page
              const consumerTop = consumerEl.offsetTop + current.element.offsetTop;
              const investorTop = investorEl.offsetTop + current.element.offsetTop;
              
              if (scrollPosition >= investorTop) {
                activeId = 'investor';
              } else if (scrollPosition >= consumerTop) {
                activeId = 'consumer';
              } else {
                activeId = 'consumer'; // Default to consumer if before both
              }
            } else {
              // Fallback: split twins section in half
              const twinsMidpoint = currentTop + (current.element.offsetHeight / 2);
              activeId = scrollPosition >= twinsMidpoint ? 'investor' : 'consumer';
            }
          } else {
            activeId = current.id;
          }
          break;
        }
      }
      
      setActiveSection(activeId);
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial call
    handleScroll();
    
    window.addEventListener("scroll", throttledScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-[hsl(var(--border))]"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="font-display text-xl font-bold text-foreground cursor-pointer"
            onClick={() => scrollToSection("hero")}
          >
            Janus AI
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`nav-link text-sm font-medium font-display ${
                  activeSection === section.id ? "active" : ""
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-foreground hover:text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-4 py-4 border-t border-[hsl(var(--border))]"
          >
            <div className="flex flex-col gap-4">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`text-left nav-link text-sm font-medium font-display ${
                    activeSection === section.id ? "active" : ""
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};