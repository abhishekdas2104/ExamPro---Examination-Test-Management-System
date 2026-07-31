import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import {
  GraduationCap, Brain, BarChart3, Shield, Star, Users, HelpCircle,
  Clock, ArrowRight, CheckCircle2, Sparkles, BookOpen, Zap
} from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

export default function Home() {
  return (
    <div style={{ background: '#fff' }}>
      <Navbar />

      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        background: 'linear-gradient(135deg, var(--soft-blue) 0%, #EEF2FF 30%, #fff 100%)',
        paddingTop: 80, position: 'relative', overflow: 'hidden',
      }}>

        <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 5, repeat: Infinity }}
          style={{ position: 'absolute', top: '15%', right: '8%', width: 80, height: 80, borderRadius: 20, background: 'rgba(79,70,229,0.08)', transform: 'rotate(15deg)' }} />
        <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 6, repeat: Infinity }}
          style={{ position: 'absolute', bottom: '20%', left: '5%', width: 60, height: 60, borderRadius: 50, background: 'rgba(99,102,241,0.08)' }} />
        <motion.div animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }} transition={{ duration: 7, repeat: Infinity }}
          style={{ position: 'absolute', top: '40%', right: '20%', width: 40, height: 40, borderRadius: 10, background: 'rgba(79,70,229,0.06)' }} />

        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--soft-blue)', padding: '6px 16px', borderRadius: 99, marginBottom: 20, border: '1px solid rgba(79,70,229,0.15)' }}>
              <Sparkles size={14} color="var(--primary)" />
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--primary)' }}>AI-Powered Examination Platform</span>
            </motion.div>
            <motion.h1 variants={fadeUp} style={{ fontSize: 52, fontWeight: 800, lineHeight: 1.1, color: 'var(--dark)', letterSpacing: '-0.03em', marginBottom: 20 }}>
              Ace Your Exams<br />with <span style={{ color: 'var(--primary)' }}>Confidence</span>
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: 18, color: 'var(--slate)', lineHeight: 1.7, maxWidth: 500, marginBottom: 32 }}>
              Experience the future of online examinations. Smart question delivery, real-time analytics, and instant results — all in one premium platform.
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link to="/register" className="btn btn-primary btn-lg">
                Get Started <ArrowRight size={18} />
              </Link>
              <Link to="/about" className="btn btn-outline btn-lg">
                Learn More
              </Link>
            </motion.div>
            <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 32 }}>
              {[{ icon: CheckCircle2, text: 'Free to start' }, { icon: Shield, text: 'Secure testing' }, { icon: Zap, text: 'Instant results' }].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <item.icon size={16} color="var(--success)" />
                  <span style={{ fontSize: 13, color: 'var(--slate)', fontWeight: 500 }}>{item.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.6 }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <div style={{ position: 'relative', width: 420, height: 420 }}>

              <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity }}
                style={{ position: 'absolute', top: 30, left: 30, right: 30, bottom: 30,
                  background: 'linear-gradient(135deg, var(--primary), var(--primary-light))',
                  borderRadius: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 20px 60px rgba(79,70,229,0.3)',
                }}>
                <GraduationCap size={100} color="#fff" strokeWidth={1.5} />
              </motion.div>

              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                style={{ position: 'absolute', top: 0, right: 0, background: '#fff', borderRadius: 16, padding: '12px 18px',
                  boxShadow: 'var(--shadow-lg)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ background: '#D1FAE5', borderRadius: 8, padding: 6 }}><CheckCircle2 size={16} color="var(--success)" /></div>
                <div><div style={{ fontSize: 12, fontWeight: 700, color: 'var(--dark)' }}>98%</div><div style={{ fontSize: 10, color: 'var(--slate)' }}>Pass Rate</div></div>
              </motion.div>
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                style={{ position: 'absolute', bottom: 10, left: -10, background: '#fff', borderRadius: 16, padding: '12px 18px',
                  boxShadow: 'var(--shadow-lg)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ background: 'var(--soft-blue)', borderRadius: 8, padding: 6 }}><Users size={16} color="var(--primary)" /></div>
                <div><div style={{ fontSize: 12, fontWeight: 700, color: 'var(--dark)' }}>10K+</div><div style={{ fontSize: 10, color: 'var(--slate)' }}>Students</div></div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <style>{`@media(max-width:900px){section .container{grid-template-columns:1fr!important;text-align:center;}section .container>div:last-child{display:none!important;}}`}</style>
      </section>

      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
        style={{ padding: '64px 0', background: '#fff', borderTop: '1px solid #F1F5F9', borderBottom: '1px solid #F1F5F9' }}>
        <div className="container grid-4">
          {[
            { num: '10,000+', label: 'Active Students', icon: Users, color: 'var(--primary)', bg: 'var(--soft-blue)' },
            { num: '500+', label: 'Questions Bank', icon: HelpCircle, color: '#8B5CF6', bg: '#EDE9FE' },
            { num: '98%', label: 'Pass Rate', icon: BarChart3, color: 'var(--success)', bg: '#D1FAE5' },
            { num: '24/7', label: 'Available', icon: Clock, color: 'var(--warning)', bg: '#FEF3C7' },
          ].map((s, i) => (
            <motion.div key={i} variants={fadeUp} style={{
              textAlign: 'center', padding: 28,
            }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                <s.icon size={22} color={s.color} />
              </div>
              <div style={{ fontSize: 30, fontWeight: 800, color: 'var(--dark)', letterSpacing: '-0.02em' }}>{s.num}</div>
              <div style={{ fontSize: 14, color: 'var(--slate)', fontWeight: 500, marginTop: 4 }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
        style={{ padding: '96px 0', background: 'var(--light-gray)' }}>
        <div className="container">
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={{ background: 'var(--soft-blue)', color: 'var(--primary)', padding: '6px 16px', borderRadius: 99, fontSize: 13, fontWeight: 600 }}>Features</span>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: 'var(--dark)', marginTop: 16, letterSpacing: '-0.02em' }}>
              Everything You Need to Succeed
            </h2>
            <p style={{ fontSize: 16, color: 'var(--slate)', marginTop: 12, maxWidth: 500, margin: '12px auto 0' }}>
              Our platform provides a complete ecosystem for online examinations
            </p>
          </motion.div>
          <div className="grid-3">
            {[
              { icon: Brain, color: 'var(--primary)', bg: 'var(--soft-blue)', title: 'AI-Powered Questions', desc: 'Intelligently curated question banks spanning multiple subjects and difficulty levels, ensuring comprehensive assessment.' },
              { icon: BarChart3, color: '#8B5CF6', bg: '#EDE9FE', title: 'Real-time Analytics', desc: 'Get instant results with detailed performance breakdown, score analytics, and personalized improvement insights.' },
              { icon: Shield, color: 'var(--success)', bg: '#D1FAE5', title: 'Secure Platform', desc: 'Enterprise-grade security with JWT authentication, encrypted data transmission, and role-based access control.' },
            ].map((f, i) => (
              <motion.div key={i} variants={fadeUp} className="card-glass" style={{ padding: 32, cursor: 'default' }}
                whileHover={{ y: -6, boxShadow: '0 20px 50px rgba(79,70,229,0.08)' }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  <f.icon size={24} color={f.color} />
                </div>
                <h3 style={{ fontSize: 19, fontWeight: 700, color: 'var(--dark)', marginBottom: 10 }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--slate)', lineHeight: 1.7 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
        style={{ padding: '96px 0', background: '#fff' }}>
        <div className="container">
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={{ background: 'var(--soft-blue)', color: 'var(--primary)', padding: '6px 16px', borderRadius: 99, fontSize: 13, fontWeight: 600 }}>Testimonials</span>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: 'var(--dark)', marginTop: 16 }}>Loved by Students</h2>
          </motion.div>
          <div className="grid-3">
            {[
              { name: 'Priya Sharma', role: 'B.Tech Student', quote: 'ExamPro completely transformed my exam preparation. The instant results and detailed analytics helped me identify weak areas instantly.' },
              { name: 'Rahul Verma', role: 'MCA Student', quote: 'The interface is so clean and professional. Timer and progress tracking features kept me focused during exams. Highly recommended!' },
              { name: 'Sneha Patel', role: 'BCA Student', quote: 'Best online exam platform I have used. The question quality is excellent, and the scoring system is very transparent and fair.' },
            ].map((t, i) => (
              <motion.div key={i} variants={fadeUp} className="card" style={{ padding: 28 }}
                whileHover={{ y: -4 }}>
                <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                  {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="#F59E0B" color="#F59E0B" />)}
                </div>
                <p style={{ fontSize: 14, color: 'var(--slate)', lineHeight: 1.8, marginBottom: 20, fontStyle: 'italic' }}>"{t.quote}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 50,
                    background: `linear-gradient(135deg, ${['var(--primary)', '#8B5CF6', '#10B981'][i]}, ${['var(--primary-light)', '#A78BFA', '#34D399'][i]})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontWeight: 700, fontSize: 14,
                  }}>{t.name[0]}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--dark)' }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--slate)' }}>{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <section style={{
        padding: '80px 0',
        background: 'linear-gradient(135deg, var(--primary-dark), var(--primary), var(--primary-light))',
        textAlign: 'center',
      }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="container">
          <h2 style={{ fontSize: 38, fontWeight: 800, color: '#fff', marginBottom: 16, letterSpacing: '-0.02em' }}>
            Ready to Start Your Journey?
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.85)', marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
            Join thousands of students already excelling with ExamPro
          </p>
          <Link to="/register" className="btn btn-lg" style={{ background: '#fff', color: 'var(--primary)', fontWeight: 700, boxShadow: '0 8px 30px rgba(0,0,0,0.15)' }}>
            Register Now <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>

      <footer style={{ background: 'var(--light-gray)', borderTop: '1px solid var(--border)', padding: '48px 0 32px' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 40 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 32, height: 32, background: 'var(--primary)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <GraduationCap size={16} color="#fff" />
              </div>
              <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--dark)' }}>Exam<span style={{ color: 'var(--primary)' }}>Pro</span></span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--slate)', maxWidth: 260, lineHeight: 1.6 }}>
              Premium online examination platform trusted by thousands of students.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 56, flexWrap: 'wrap' }}>
            {[
              { title: 'Platform', links: ['Home', 'About', 'Features'] },
              { title: 'Account', links: ['Login', 'Register', 'Dashboard'] },
              { title: 'Support', links: ['Help Center', 'Contact', 'Privacy'] },
            ].map((col, i) => (
              <div key={i}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--dark)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>{col.title}</div>
                {col.links.map((l, j) => (
                  <div key={j} style={{ fontSize: 13, color: 'var(--slate)', marginBottom: 8, cursor: 'pointer' }}>{l}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="container" style={{ marginTop: 32, paddingTop: 20, borderTop: '1px solid var(--border)', textAlign: 'center' }}>
          <p style={{ fontSize: 12, color: 'var(--slate)' }}>© {new Date().getFullYear()} ExamPro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
