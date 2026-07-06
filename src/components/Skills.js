import { motion } from 'framer-motion';
import { useRef } from 'react';
import { skills } from '../data/projects';

const categories = [
  { key: 'frontend', label: 'Frontend', color: '#4A9EFF' },
  { key: 'backend', label: 'Backend', color: '#C8B89A' },
  { key: 'ai', label: 'AI / API', color: '#A855F7' },
  { key: 'tools', label: 'Tools', color: '#22C55E' },
];

function SkillTag({ name, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -2, borderColor: color }}
      style={{
        padding: '8px 16px', border: '1px solid #222',
        fontFamily: "'JetBrains Mono'", fontSize: 16,
        color: '#A0A0A0', cursor: 'default',
        transition: 'border-color 0.2s, color 0.2s',
        letterSpacing: 0.5
      }}
      className="hover-target"
    >
      {name}
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);

  return (
    <section id="skills" ref={ref} style={{
      padding: '120px 48px', borderTop: '1px solid #1A1A1A'
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* 섹션 헤더 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 80 }}>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 40 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ height: 1, background: '#C8B89A', flexShrink: 0 }}
          />
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ fontFamily: "'JetBrains Mono'", fontSize: 12, color: '#C8B89A', letterSpacing: 3 }}
          >
            02 / SKILLS
          </motion.span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            fontFamily: "'Bebas Neue'", fontSize: 'clamp(48px, 7vw, 96px)',
            letterSpacing: 4, marginBottom: 64, lineHeight: 0.9
          }}
        >
          TECH<br />
          <span style={{ color: '#C8B89A' }}>STACK</span>
        </motion.h2>

        {/* 스킬 카테고리 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 48 }}>
          {categories.map(({ key, label, color }) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div style={{
                display: 'flex', alignItems: 'center', gap: 12,
                marginBottom: 20, paddingBottom: 16,
                borderBottom: `1px solid ${color}22`
              }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }} />
                <span style={{ fontFamily: "'Bebas Neue'", fontSize: 18, letterSpacing: 3, color: color }}>
                  {label}
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {skills[key].map((s, i) => (
                  <SkillTag key={s} name={s} color={color} delay={i * 0.05} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 자격증 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ marginTop: 80, padding: 40, border: '1px solid #1A1A1A', background: '#0E0E0E' }}
        >
          <div style={{ fontFamily: "'Bebas Neue'", fontSize: 16, letterSpacing: 3, color: '#C8B89A', marginBottom: 24 }}>
            CERTIFICATIONS (자격증)
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {skills.cert.map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#555', flexShrink: 0 }} />
                <span style={{ fontFamily: "'Noto Sans KR'", fontSize: 12, color: '#666', lineHeight: 1.5 }}>{c}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
