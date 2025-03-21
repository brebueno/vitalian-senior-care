
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Home, Pill, Map, User, Activity, Utensils } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const NavItem = ({ 
  to,
  label,
  icon: Icon,
  onClick,
}: {
  to: string;
  label: string;
  icon: React.ElementType;
  onClick?: () => void;
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) => cn(
        "flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-200",
        isActive 
          ? "bg-primary text-primary-foreground shadow-sm" 
          : "text-foreground/70 hover:text-foreground hover:bg-secondary"
      )}
    >
      <Icon size={20} />
      <span>{label}</span>
    </NavLink>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const navLinks = [
    { path: '/', label: 'Início', icon: Home },
    { path: '/medicamentos', label: 'Medicamentos', icon: Pill },
    { path: '/farmacias', label: 'Farmácias', icon: Map },
    { path: '/nutricao', label: 'Nutrição', icon: Utensils },
    { path: '/bem-estar', label: 'Bem-estar', icon: Activity },
    { path: '/perfil', label: 'Perfil', icon: User },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center space-x-2">
              <span className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">V</span>
              </span>
              <span className="font-display font-semibold text-lg tracking-tight">VitaCheck</span>
            </NavLink>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavItem 
                key={link.path} 
                to={link.path} 
                label={link.label} 
                icon={link.icon} 
              />
            ))}
          </nav>
          
          {/* Mobile Navigation Toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary/30"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 pb-4 pt-2 animate-slide-up">
            {navLinks.map((link) => (
              <NavItem 
                key={link.path} 
                to={link.path} 
                label={link.label} 
                icon={link.icon}
                onClick={() => setIsOpen(false)}
              />
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
