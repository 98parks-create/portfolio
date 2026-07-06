import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section id="contact" style={{
      padding: '120px 48px 80px', borderTop: '1px solid #1A1A1A',
      minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center'
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%' }}>
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
            04 / CONTACT
          </motion.span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            fontFamily: "'Bebas Neue'", fontSize: 'clamp(48px, 8vw, 120px)',
            letterSpacing: 4, lineHeight: 0.9, marginBottom: 48
          }}
        >
          LET'S<br />
          <span style={{ color: '#C8B89A' }}>WORK</span><br />
          TOGETHER
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ color: '#666', fontSize: 29, lineHeight: 1.8, maxWidth: 480, marginBottom: 56 }}
        >
          새로운 기회, 협업 제안은<br></br>
          아래 링크를 통해 언제든지 연락해 주세요.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}
        >
          {[
            { label: 'GitHub', url: 'https://github.com/98parks-create', icon: '↗' },
            { label: 'Notion', url: 'https://app.notion.com/p/37b7a32d071c80acb99fd64329e16f8c?v=37b7a32d071c80f0a9d8000ce04feadf&source=copy_link', icon: '↗' },
          ].map(({ label, url, icon }) => (
            <motion.a
              key={label}
              href={url} target="_blank" rel="noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '25px 50px', border: '1px solid #1A1A1A',
                fontFamily: "'Noto Sans KR'", fontSize: 20, color: '#888',
                letterSpacing: 1
              }}
              whileHover={{ borderColor: '#C8B89A', color: '#C8B89A', background: 'rgba(200,184,154,0.04)' }}
              transition={{ duration: 0.2 }}
              className="hover-target"
            >
              {label} <span>{icon}</span>
            </motion.a>
          ))}
        </motion.div>

        {/* 푸터 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          style={{
            marginTop: 120, paddingTop: 40, borderTop: '1px solid #1A1A1A',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: 16
          }}
        >
          <span style={{ fontFamily: "'Bebas Neue'", fontSize: 18, letterSpacing: 4, color: '#C8B89A' }}>
            INSEO PARK
          </span>
          <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 11, color: '#333', letterSpacing: 1 }}>
            © 2026 박인서. All rights reserved.
          </span>
        </motion.div>
      </div>
    </section>
  );
}
