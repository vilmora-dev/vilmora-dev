import { useState, useEffect, useRef } from "react";

export function useTypewriter(
  text: string, 
  speed = 50, 
  options?: { delay?: number; loop?: boolean; cursor?: string; showCursor?: boolean }
) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [showBlinkingCursor, setShowBlinkingCursor] = useState(true);
  const hasStarted = useRef(false);

  const cursor = options?.cursor || '|';
  const showCursor = options?.showCursor !== false;

  // Blinking cursor effect
  useEffect(() => {
    if (!text || hasStarted.current || isComplete) return;

    const blinkInterval = setInterval(() => {
      setShowBlinkingCursor(prev => !prev);
    }, 350); // Standard cursor blink rate

    return () => clearInterval(blinkInterval);
  }, [showCursor, isComplete]);

  useEffect(() => {
    if (!text || hasStarted.current) return;
    
    hasStarted.current = true;
    let i = 0;
    setDisplayText('');
    setIsComplete(false);
  
    const startTyping = () => {
      const typingInterval = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typingInterval);
          setIsComplete(true);
          
          if (options?.loop) {
            setTimeout(() => {
              i = 0;
              setDisplayText('');
              setIsComplete(false);
              hasStarted.current = false;
            }, options.delay || 1000);
          }
        }
      }, speed);
      
      return typingInterval;
    };
  
    const timeout = setTimeout(() => {
      startTyping();
    }, options?.delay || 0);
  
    return () => {
      clearTimeout(timeout);
      hasStarted.current = false;
    };
  }, [text]);

  const textWithCursor = showCursor && !isComplete && showBlinkingCursor
    ? displayText + cursor 
    : displayText;

  return { displayText: textWithCursor, isComplete };
}