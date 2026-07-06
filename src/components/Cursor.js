import { useEffect, useRef } from 'react';

export default function Cursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };
    window.addEventListener('mousemove', move);

    let raf;
    const follow = () => {
      followerPos.current.x += (pos.current.x - followerPos.current.x) * 0.12;
      followerPos.current.y += (pos.current.y - followerPos.current.y) * 0.12;
      if (followerRef.current) {
        followerRef.current.style.transform = `translate(${followerPos.current.x - 18}px, ${followerPos.current.y - 18}px)`;
      }
      raf = requestAnimationFrame(follow);
    };
    raf = requestAnimationFrame(follow);

    const addHover = () => {
      if (followerRef.current) followerRef.current.classList.add('hovered');
    };
    const removeHover = () => {
      if (followerRef.current) followerRef.current.classList.remove('hovered');
    };
    const els = document.querySelectorAll('a, button, .hover-target');
    els.forEach(el => { el.addEventListener('mouseenter', addHover); el.addEventListener('mouseleave', removeHover); });

    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} style={{
        position: 'fixed', top: 0, left: 0, width: 8, height: 8,
        background: '#C8B89A', borderRadius: '50%', pointerEvents: 'none',
        zIndex: 9999, transition: 'opacity 0.2s'
      }} />
      <div ref={followerRef} style={{
        position: 'fixed', top: 0, left: 0, width: 36, height: 36,
        border: '1px solid rgba(200,184,154,0.5)', borderRadius: '50%',
        pointerEvents: 'none', zIndex: 9998
      }} />
      <style>{`.hovered { transform: scale(1.8) !important; border-color: rgba(200,184,154,0.9) !important; }`}</style>
    </>
  );
}
