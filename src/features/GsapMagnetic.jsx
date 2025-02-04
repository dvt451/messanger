import gsap from 'gsap';
import React, { useEffect, useRef, useCallback } from 'react';

export default function GsapMagnetic({ children }) {
  const ref = useRef(null);

  const mouseMove = useCallback((e) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    gsap.to(ref.current, { x: x, y: y });
  }, []);

  const mouseLeave = useCallback(() => {
    gsap.to(ref.current, { x: 0, y: 0 });
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      element.addEventListener('mousemove', mouseMove);
      element.addEventListener('mouseleave', mouseLeave);
    }

    return () => {
      if (element) {
        element.removeEventListener('mousemove', mouseMove);
        element.removeEventListener('mouseleave', mouseLeave);
      }
    };
  }, [mouseMove, mouseLeave]);

  return React.cloneElement(children, { ref });
}
