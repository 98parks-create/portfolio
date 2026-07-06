import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const links = ['About', 'Skills', 'Projects', 'Contact'];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    // setOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 48px', height: 72,
          background: scrolled ? 'rgba(10,10,10,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid #1A1A1A' : 'none',
          transition: 'all 0.4s ease'
        }}
      >
        <motion.div
          style={{ fontFamily: "'Bebas Neue'", fontSize: 26, letterSpacing: 4, color: '#C8B89A', cursor: 'pointer' }}
          whileHover={{ scale: 1.02 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          INSEO PARK
        </motion.div>

        {/* 데스크톱 링크 */}
        <div style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
          {links.map((link) => (
            <motion.button
              key={link}
              onClick={() => scrollTo(link)}
              style={{
                background: 'none', border: 'none', color: '#A0A0A0',
                fontFamily: "'Noto Sans KR'", fontSize: 13, fontWeight: 400,
                cursor: 'pointer', letterSpacing: 1, padding: '4px 0',
                position: 'relative'
              }}
              whileHover={{ color: '#FFFFFF' }}
              className="hover-target"
            >
              {link}
              <motion.div
                style={{
                  position: 'absolute', bottom: 0, left: 0, height: 1,
                  background: '#C8B89A', width: 0
                }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.2 }}
              />
            </motion.button>
          ))}
          <motion.a
            href="https://github.com/98parks-create"
            target="_blank"
            rel="noreferrer"
            style={{
              padding: '8px 20px', border: '1px solid #C8B89A',
              color: '#C8B89A', fontFamily: "'Noto Sans KR'", fontSize: 12,
              letterSpacing: 1, cursor: 'pointer'
            }}
            whileHover={{ background: '#C8B89A', color: '#0A0A0A' }}
            transition={{ duration: 0.2 }}
            className="hover-target"
          >
            GitHub
          </motion.a>
        </div>
      </motion.nav>
    </>
  );
}
