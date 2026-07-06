import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';

function ProjectCard({ project, index, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(project)}
      style={{
        border: `1px solid ${hovered ? project.color + '55' : '#1E1E1E'}`,
        padding: '32px', cursor: 'pointer',
        background: hovered ? '#0D0D0D' : '#0A0A0A',
        transition: 'all 0.3s ease', position: 'relative',
        overflow: 'hidden', height: '100%', boxSizing: 'border-box',
        display: 'flex', flexDirection: 'column'
      }}
      className="hover-target"
    >
      <div style={{
        fontSize: 64,
        color: hovered ? project.color + '14' : 'rgba(255,255,255,0.02)',
        position: 'absolute', top: 12, right: 20,
        lineHeight: 1, transition: 'color 0.3s', userSelect: 'none', pointerEvents: 'none'
      }}>
        {String(index + 1).padStart(2, '0')}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 14, color: project.color, letterSpacing: 2, marginBottom: 6 }}>
            {project.period}
          </div>
          <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, letterSpacing: 2, color: '#FFF', lineHeight: 1, marginBottom: 4, fontWeight: 700 }}>
            {project.title}
          </h3>
          <div style={{ color: '#666', fontSize: 15 }}>{project.subtitle}</div>
        </div>
        <motion.div animate={{ x: hovered ? 0 : 8, opacity: hovered ? 1 : 0 }}
          style={{ color: project.color, fontSize: 20, flexShrink: 0, marginTop: 4 }}>
          →
        </motion.div>
      </div>

      <p style={{ color: '#666', fontSize: 14, lineHeight: 1.85, marginBottom: 20, flex: 1 }}>
        {project.description}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
        {project.highlights.slice(0, 3).map((h, i) => (
          <span key={i} style={{
            fontSize: 12, padding: '4px 10px',
            border: `1px solid ${project.color}33`, color: project.color, letterSpacing: 0.5
          }}>{h}</span>
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {project.tech.slice(0, 5).map((t) => (
          <span key={t} style={{
            fontSize: 11, padding: '3px 8px',
            background: '#141414', color: '#555', letterSpacing: 0.5
          }}>{t}</span>
        ))}
      </div>

      <motion.div
        animate={{ width: hovered ? '100%' : '0%' }}
        transition={{ duration: 0.35 }}
        style={{ position: 'absolute', bottom: 0, left: 0, height: 1, background: project.color }}
      />
    </motion.div>
  );
}

function CodeBlock({ block, color }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <div style={{ width: 3, height: 22, background: color, flexShrink: 0 }} />
        <span style={{ fontSize: 17, fontWeight: 700, color: '#FFF' }}>
          {block.title}
        </span>
      </div>
      <div style={{
        background: `${color}0D`, border: `1px solid ${color}22`,
        padding: '14px 18px', marginBottom: 14, borderRadius: 2
      }}>
        <div style={{ fontSize: 11, color: color, letterSpacing: 2, marginBottom: 8, fontWeight: 700 }}>
          WHY THIS CODE
        </div>
        <p style={{ fontSize: 14, color: '#999', lineHeight: 1.85, margin: 0 }}>{block.why}</p>
      </div>
      <div style={{ background: '#060606', border: '1px solid #1A1A1A', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: 12, right: 16,
          fontSize: 10, color: '#333', letterSpacing: 2, textTransform: 'uppercase'
        }}>
          {block.language}
        </div>
        <div style={{ display: 'flex', gap: 6, padding: '14px 16px 0' }}>
          {['#FF5F57', '#FFBD2E', '#28C840'].map(c => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.7 }} />
          ))}
        </div>
        <pre style={{
          fontSize: 13, color: '#C8C8C8',
          lineHeight: 1.8, margin: 0, padding: '14px 20px 20px',
          overflowX: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-word'
        }}>
          <code>{block.code}</code>
        </pre>
      </div>
    </div>
  );
}

function Modal({ project, onClose }) {
  const [tab, setTab] = useState('overview');
  if (!project) return null;

  const tabs = [
    { id: 'overview', label: '개요' },
    { id: 'code', label: `주요 코드 (${project.codeBlocks?.length || 0})` },
    { id: 'trouble', label: '트러블슈팅' },
    { id: 'tools', label: '협업 툴' },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)',
          zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 24, backdropFilter: 'blur(12px)'
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 48, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 32 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onClick={e => e.stopPropagation()}
          style={{
            background: '#111', border: `1px solid ${project.color}33`,
            maxWidth: 820, width: '100%', maxHeight: '90vh',
            overflowY: 'auto', display: 'flex', flexDirection: 'column'
          }}
        >
          <div style={{ padding: '36px 40px 0', borderBottom: '1px solid #1A1A1A' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
              <div>
                <div style={{ fontSize: 13, color: project.color, letterSpacing: 2, marginBottom: 8 }}>
                  {project.period} · {project.role}
                </div>
                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 46, letterSpacing: 2, color: '#FFF', lineHeight: 1, fontWeight: 700 }}>
                  {project.title}
                </h2>
                <div style={{ color: '#666', fontSize: 15, marginTop: 6 }}>{project.subtitle}</div>
              </div>
              <button onClick={onClose} style={{
                background: 'none', border: '1px solid #2A2A2A', color: '#666',
                width: 38, height: 38, cursor: 'pointer', fontSize: 16, flexShrink: 0
              }}>✕</button>
            </div>

            <div style={{ display: 'flex', gap: 0 }}>
              {tabs.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)} style={{
                  padding: '12px 20px', background: 'none', border: 'none',
                  borderBottom: `2px solid ${tab === t.id ? project.color : 'transparent'}`,
                  color: tab === t.id ? project.color : '#555',
                  fontSize: 13, letterSpacing: 1, cursor: 'pointer',
                  transition: 'all 0.2s', whiteSpace: 'nowrap'
                }} className="hover-target">
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ padding: '32px 40px 40px', flex: 1 }}>

            {tab === 'overview' && (
              <div>
                <p style={{ color: '#999', fontSize: 15, lineHeight: 1.9, marginBottom: 32 }}>
                  {project.description}
                </p>
                <div style={{ marginBottom: 32 }}>
                  <div style={{ fontSize: 12, color: project.color, letterSpacing: 2, marginBottom: 16, fontWeight: 700 }}>
                    HIGHLIGHTS
                  </div>
                  {project.highlights.map((h, i) => (
                    <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 12 }}>
                      <div style={{ width: 5, height: 5, borderRadius: '50%', background: project.color, flexShrink: 0 }} />
                      <span style={{ color: '#BBB', fontSize: 15 }}>{h}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginBottom: 32 }}>
                  <div style={{ fontSize: 12, color: project.color, letterSpacing: 2, marginBottom: 16, fontWeight: 700 }}>
                    TECH STACK
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                    {project.tech.map((t) => (
                      <span key={t} style={{
                        fontSize: 13, padding: '7px 14px',
                        border: `1px solid ${project.color}44`, color: project.color
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  {project.url && project.url !== '#' && (
                    <motion.a href={project.url} target="_blank" rel="noreferrer"
                      style={{
                        padding: '13px 28px', background: project.color, color: '#0A0A0A',
                        fontSize: 14, fontWeight: 700, letterSpacing: 1, display: 'inline-block'
                      }}
                      whileHover={{ opacity: 0.85 }} className="hover-target"
                    >사이트 방문 →</motion.a>
                  )}
                  {project.github && (
                    <motion.a href={project.github} target="_blank" rel="noreferrer"
                      style={{
                        padding: '13px 28px', background: 'transparent', color: '#888',
                        border: '1px solid #2A2A2A', fontSize: 14, letterSpacing: 1, display: 'inline-block'
                      }}
                      whileHover={{ borderColor: '#C8B89A', color: '#C8B89A' }} className="hover-target"
                    >GitHub →</motion.a>
                  )}
                </div>
              </div>
            )}

            {tab === 'code' && (
              <div>
                <div style={{ fontSize: 12, color: project.color, letterSpacing: 2, marginBottom: 28, fontWeight: 700 }}>
                  MAIN CODE — 스크롤하여 모든 코드 확인
                </div>
                {project.codeBlocks?.map((block, i) => (
                  <CodeBlock key={i} block={block} color={project.color} />
                ))}
              </div>
            )}

            {tab === 'trouble' && (
              <div>
                <div style={{ fontSize: 12, color: project.color, letterSpacing: 2, marginBottom: 28, fontWeight: 700 }}>
                  TROUBLESHOOTING
                </div>
                {project.troubleshooting.map((t, i) => (
                  <div key={i} style={{
                    border: '1px solid #1E1E1E', padding: '24px',
                    marginBottom: 18, background: '#0A0A0A'
                  }}>
                    <div style={{ fontSize: 11, color: project.color, letterSpacing: 2, marginBottom: 16, fontWeight: 700 }}>
                      CASE {String(i + 1).padStart(2, '0')}
                    </div>
                    {[
                      { label: 'WHAT', value: t.what, color: '#E05555' },
                      { label: 'WHY', value: t.why, color: '#E09A55' },
                      { label: 'HOW', value: t.how, color: '#5590E0' },
                      { label: 'RESULT', value: t.result, color: '#55C07A' },
                    ].map(({ label, value, color }) => (
                      <div key={label} style={{ display: 'flex', gap: 18, marginBottom: 14, alignItems: 'flex-start' }}>
                        <span style={{
                          fontSize: 10, color, letterSpacing: 2,
                          flexShrink: 0, paddingTop: 3, minWidth: 56, fontWeight: 700
                        }}>
                          {label}
                        </span>
                        <span style={{ color: '#999', fontSize: 14, lineHeight: 1.75 }}>{value}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {tab === 'tools' && (
              <div>
                <div style={{ fontSize: 12, color: project.color, letterSpacing: 2, marginBottom: 28, fontWeight: 700 }}>
                  COLLABORATION TOOLS
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginBottom: 32 }}>
                  {project.tools.map((tool, i) => (
                    <div key={i} style={{
                      padding: '16px 26px', border: `1px solid ${project.color}33`,
                      background: '#0A0A0A', display: 'flex', alignItems: 'center', gap: 12
                    }}>
                      <div style={{ width: 7, height: 7, borderRadius: '50%', background: project.color }} />
                      <span style={{ fontSize: 15, color: '#BBB' }}>{tool}</span>
                    </div>
                  ))}
                </div>
                <div style={{ padding: '22px 26px', border: '1px solid #1A1A1A', background: '#0A0A0A' }}>
                  <div style={{ fontSize: 11, color: '#444', letterSpacing: 2, marginBottom: 12, fontWeight: 700 }}>TEAM ROLE</div>
                  <div style={{ color: '#999', fontSize: 15, lineHeight: 1.85 }}>{project.role}</div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="projects" style={{ padding: '120px 48px', borderTop: '1px solid #141414' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 72 }}>
          <motion.div
            initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ height: 1, background: '#C8B89A', flexShrink: 0 }}
          />
          <motion.span
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{ fontSize: 13, color: '#C8B89A', letterSpacing: 3 }}
          >
            03 / PROJECTS
          </motion.span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px, 7vw, 96px)', letterSpacing: 4, marginBottom: 56, lineHeight: 0.9, fontWeight: 700 }}
        >
          SELECTED<br /><span style={{ color: '#C8B89A' }}>WORKS</span>
        </motion.h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px',
          background: '#1A1A1A'
        }}>
          {projects.map((p, i) => (
            <div key={p.id} style={{ background: '#0A0A0A' }}>
              <ProjectCard project={p} index={i} onClick={setSelected} />
            </div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginTop: 24, fontSize: 12, color: '#333', letterSpacing: 2 }}
        >
          클릭하면 상세 정보를 확인할 수 있습니다
        </motion.p>
      </div>
      <Modal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}