import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import { Target, Eye, Award, Users, BookOpen, ShieldCheck, ArrowRight, GraduationCap } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

export default function About() {
  return (
    <div style={{ background: '#fff' }}>
      <Navbar />

      <section style={{ paddingTop: 140, paddingBottom: 80, background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 50%, #fff 100%)', textAlign: 'center' }}>
        <motion.div initial="hidden" animate="visible" variants={stagger} className="container">
          <motion.span variants={fadeUp} style={{ background: '#EFF6FF', color: '#2563EB', padding: '6px 16px', borderRadius: 99, fontSize: 13, fontWeight: 600, border: '1px solid #DBEAFE' }}>About ExamPro</motion.span>
          <motion.h1 variants={fadeUp} style={{ fontSize: 46, fontWeight: 800, color: '#1E293B', marginTop: 20, letterSpacing: '-0.03em' }}>
            Transforming Online<br />Education <span style={{ color: '#2563EB' }}>Assessment</span>
          </motion.h1>
          <motion.p variants={fadeUp} style={{ fontSize: 17, color: '#64748B', maxWidth: 580, margin: '16px auto 0', lineHeight: 1.7 }}>
            ExamPro is a premium online examination system built for modern education, providing a seamless, secure, and intelligent testing experience.
          </motion.p>
        </motion.div>
      </section>

      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
        style={{ padding: '80px 0', background: '#fff' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
          {[
            { icon: Target, color: '#2563EB', bg: '#DBEAFE', title: 'Our Mission', text: 'To democratize quality education assessment by providing an accessible, reliable, and intelligent online examination platform that empowers both students and educators.' },
            { icon: Eye, color: '#8B5CF6', bg: '#EDE9FE', title: 'Our Vision', text: 'To become the leading EdTech assessment platform globally, where every student can demonstrate their knowledge in a fair, secure, and engaging environment.' },
          ].map((item, i) => (
            <motion.div key={i} variants={fadeUp} className="card" style={{ padding: 36 }} whileHover={{ y: -4 }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <item.icon size={24} color={item.color} />
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: '#1E293B', marginBottom: 12 }}>{item.title}</h3>
              <p style={{ fontSize: 15, color: '#64748B', lineHeight: 1.7 }}>{item.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
        style={{ padding: '80px 0', background: '#F8FAFC' }}>
        <div className="container">
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 34, fontWeight: 800, color: '#1E293B' }}>Why Choose ExamPro?</h2>
            <p style={{ color: '#64748B', marginTop: 10 }}>Built with cutting-edge technology for the best experience</p>
          </motion.div>
          <div className="grid-3">
            {[
              { icon: ShieldCheck, color: '#10B981', bg: '#D1FAE5', title: 'Enterprise Security', desc: 'JWT authentication, encrypted data, and role-based access control ensure complete safety.' },
              { icon: BookOpen, color: '#2563EB', bg: '#DBEAFE', title: 'Rich Question Bank', desc: 'Multiple subjects, difficulty levels, and intelligent question delivery for comprehensive testing.' },
              { icon: Award, color: '#F59E0B', bg: '#FEF3C7', title: 'Instant Analytics', desc: 'Real-time scoring with detailed grade breakdown, performance messages, and progress tracking.' },
              { icon: Users, color: '#8B5CF6', bg: '#EDE9FE', title: 'Multi-Role System', desc: 'Dedicated dashboards and workflows for both administrators and students.' },
              { icon: Target, color: '#EF4444', bg: '#FEE2E2', title: 'Smart Timer', desc: 'Auto-submit on timeout, progress indicators, and question navigation palette.' },
              { icon: GraduationCap, color: '#2563EB', bg: '#DBEAFE', title: 'Modern UI/UX', desc: 'Glassmorphism design, smooth animations, and fully responsive across all devices.' },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="card" style={{ padding: 28 }} whileHover={{ y: -4 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <item.icon size={20} color={item.color} />
                </div>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginBottom: 8 }}>{item.title}</h4>
                <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.7 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <section style={{ padding: '80px 0', background: 'linear-gradient(135deg, #1D4ED8, #2563EB)', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="container">
          <h2 style={{ fontSize: 34, fontWeight: 800, color: '#fff', marginBottom: 16 }}>Start Your Journey Today</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: 28, fontSize: 16 }}>Join thousands of students and excel in your exams</p>
          <Link to="/register" className="btn btn-lg" style={{ background: '#fff', color: '#2563EB', fontWeight: 700 }}>
            Get Started <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>

      <footer style={{ background: '#F8FAFC', borderTop: '1px solid #E2E8F0', padding: '32px 0', textAlign: 'center' }}>
        <p style={{ fontSize: 12, color: '#94A3B8' }}>© {new Date().getFullYear()} ExamPro. All rights reserved.</p>
      </footer>

      <style>{`@media(max-width:768px){.grid-2{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}
