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
      const scrollPosition = window.scrollY + 100;
      let activeId = 'hero';
      
      // Check sections in order, including twins section handling
      const allSections = ['hero', 'vision', 'agents', 'twins', 'pricing', 'contact'];
      
      for (const sectionId of allSections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            if (sectionId === 'twins') {
              // We're in the twins section, determine if consumer or investor
              const consumerEl = document.getElementById('consumer');
              const investorEl = document.getElementById('investor');
              
              if (consumerEl && investorEl) {
                const consumerTop = consumerEl.offsetTop;
                const investorTop = investorEl.offsetTop;
                
                // Use the actual positions of the h2 elements
                if (scrollPosition >= investorTop) {
                  activeId = 'investor';
                } else if (scrollPosition >= consumerTop) {
                  activeId = 'consumer';
                }
              } else {
                // Fallback to middle split
                const twinsMiddle = offsetTop + (offsetHeight / 2);
                activeId = scrollPosition < twinsMiddle ? 'consumer' : 'investor';
              }
            } else {
              activeId = sectionId;
            }
            break;
          }
        }
      }
      
      setActiveSection(activeId);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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