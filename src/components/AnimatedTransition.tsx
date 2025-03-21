
import React, { ReactNode, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface AnimatedTransitionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const AnimatedTransition: React.FC<AnimatedTransitionProps> = ({ 
  children, 
  className,
  delay = 0
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [isVisible, setIsVisible] = React.useState(false);
  const [key, setKey] = React.useState(location.pathname);

  useEffect(() => {
    setIsVisible(false);
    
    const timer = setTimeout(() => {
      setKey(location.pathname);
      setIsVisible(true);
    }, 200); // Wait for exit animation

    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    if (isVisible && ref.current) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, delay]);

  return (
    <div
      ref={ref}
      key={key}
      className={cn(
        'transition-all duration-500 ease-out',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        className
      )}
    >
      {children}
    </div>
  );
};

export default AnimatedTransition;
