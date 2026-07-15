import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const words = ['DEVELOPER', 'CREATOR', 'BUILDER', 'ATHLETE'];

export default function Hero() {
  const wordRef = useRef(null);
  const indexRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % words.length;
      if (wordRef.current) {
        wordRef.current.style.opacity = '0';
        wordRef.current.style.transform = 'translateY(-16px)';
        setTimeout(() => {
          if (wordRef.current) {
            wordRef.current.textContent = words[indexRef.current];
            wordRef.current.style.opacity = '1';
            wordRef.current.style.transform = 'translateY(0)';
          }
        }, 300);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      padding: '100px 48px 80px', position: 'relative', overflow: 'hidden'
    }}>
      {/* 배경 그리드 */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(200,184,154,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(200,184,154,0.03) 1px, transparent 1px)',
        backgroundSize: '80px 80px'
      }} />

      <div style={{
        maxWidth: 1200, width: '100%', margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 60, position: 'relative', zIndex: 1, flexWrap: 'wrap'
      }}>
        {/* 왼쪽 텍스트 */}
        <div style={{ flex: '1 1 500px', minWidth: 0 }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 16,
              marginBottom: 28, color: '#C8B89A',
              fontFamily: "'JetBrains Mono'", fontSize: 12, letterSpacing: 3
            }}
          >
            <div style={{ width: 40, height: 1, background: '#C8B89A', flexShrink: 0 }} />
            FRONTEND · BACKEND · AI
          </motion.div>

          {/* 이름 — overflow visible로 잘림 방지 */}
          <div style={{ overflow: 'visible', marginBottom: 6 }}>
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              style={{
                fontFamily: "'Bebas Neue'",
                fontSize: 'clamp(72px, 9vw, 130px)',
                lineHeight: 1, letterSpacing: 4, color: '#FFFFFF',
                whiteSpace: 'nowrap'
              }}
            >
              박인서
            </motion.h1>
          </div>

          {/* 영어 + 롤링 */}
          <div style={{ overflow: 'visible', marginBottom: 44, display: 'flex', alignItems: 'baseline', gap: 16, flexWrap: 'wrap' }}>
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(24px, 3.5vw, 48px)', color: '#444', letterSpacing: 3 }}
            >
              FULLSTACK
            </motion.div>
            <div ref={wordRef} style={{
              fontFamily: "'Bebas Neue'", fontSize: 'clamp(24px, 3.5vw, 48px)',
              color: '#C8B89A', letterSpacing: 3,
              transition: 'opacity 0.3s ease, transform 0.3s ease'
            }}>
              DEVELOPER
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ maxWidth: 500, color: '#888', fontSize: 20, lineHeight: 1.9, fontWeight: 300, marginBottom: 48 }}
          >
            20년간의 축구선수 생활을 마치고 <br></br>IT 개발자로 전환했습니다.
            기획부터 배포까지 직접 구현하며,<br></br> AI와 공공데이터를 활용한<br></br>
            실용적인 서비스를 만드는 풀스택 개발자입니다.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
          >
            <motion.button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                padding: '25px 50px', background: '#C8B89A', color: '#0A0A0A',
                border: 'none', fontFamily: "'Noto Sans KR'", fontSize: 20,
                fontWeight: 700, letterSpacing: 2, cursor: 'pointer'
              }}
              whileHover={{ background: '#D4C4A8', scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="hover-target"
            >
              프로젝트 보기
            </motion.button>
            <motion.a
              href="https://github.com/98parks-create/98parks-create"
              target="_blank" rel="noreferrer"
              style={{
                padding: '25px 50px', background: 'transparent', color: '#C8B89A',
                border: '1px solid #C8B89A', fontFamily: "'Noto Sans KR'", fontSize: 20,
                fontWeight: 400, letterSpacing: 2, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 8
              }}
              whileHover={{ background: 'rgba(200,184,154,0.08)' }}
              className="hover-target"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </motion.a>
            <motion.a
              href="https://app.notion.com/p/37b7a32d071c80acb99fd64329e16f8c?v=37b7a32d071c80f0a9d8000ce04feadf&source=copy_link"
              target="_blank" rel="noreferrer"
              style={{
                padding: '25px 50px', background: 'transparent', color: '#888',
                border: '1px solid #333', fontFamily: "'Noto Sans KR'", fontSize: 20,
                fontWeight: 400, letterSpacing: 2, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 8
              }}
              whileHover={{ borderColor: '#C8B89A', color: '#C8B89A' }}
              className="hover-target"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"/>
              </svg>
              Notion
            </motion.a>
          </motion.div>
        </div>

        {/* 오른쪽 프로필 사진 */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ flex: '0 0 auto', position: 'relative' }}
        >
          <div style={{
            width: 'clamp(240px, 28vw, 340px)',
            height: 'clamp(300px, 35vw, 420px)',
            position: 'relative'
          }}>
            {/* 골드 테두리 데코 */}
            <div style={{
              position: 'absolute', top: 16, left: 16, right: -16, bottom: -16,
              border: '1px solid #C8B89A', zIndex: 0, opacity: 0.4
            }} />
            <img
              src="/profile.jpg"
              alt="박인서"
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover', objectPosition: 'center top',
                filter: 'grayscale(20%)',
                position: 'relative', zIndex: 1
              }}
            />
            {/* 하단 정보 오버레이 */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 2,
              background: 'linear-gradient(transparent, rgba(10,10,10,0.95))',
              padding: '40px 20px 20px'
            }}>
              <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 10, color: '#C8B89A', letterSpacing: 2, marginBottom: 4 }}>
                FULLSTACK DEVELOPER
              </div>
              <div style={{ fontFamily: "'Noto Sans KR'", fontSize: 12, color: '#888' }}>
                전 축구선수 → IT 개발자
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 스크롤 인디케이터 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{ position: 'absolute', bottom: 40, left: 48, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, transparent, #C8B89A)' }} />
        </motion.div>
        <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 9, color: '#444', letterSpacing: 3, writingMode: 'vertical-rl' }}>SCROLL</span>
      </motion.div>
    </section>
  );
}
