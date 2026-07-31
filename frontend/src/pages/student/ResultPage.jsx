import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from '../../components/Sidebar';
import { CheckCircle2, XCircle, Award, Target, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const result = location.state?.result;
  const markedAnswers = location.state?.markedAnswers || {};
  const examQuestions = location.state?.examQuestions || [];

  const [showReview, setShowReview] = useState(false);

  useEffect(() => {

    if (!result) {
      navigate('/student/dashboard');
      return;
    }

    if (result.percentage >= 60) {
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {

        confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: ['var(--primary)', 'var(--success)', 'var(--warning)'] });
        confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ['var(--primary)', 'var(--success)', 'var(--warning)'] });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [result, navigate]);

  useEffect(() => {
    console.log("=== Review Diagnostics ===");
    console.log("result:", result);
    console.log("markedAnswers:", markedAnswers);
    console.log("examQuestions:", examQuestions);
  }, [result, markedAnswers, examQuestions]);

  if (!result) return null;

  const isPass = result.percentage >= 60;

  const normalize = (ans) => {
    if (!ans) return "";
    const clean = ans.trim().toLowerCase();

    return clean.startsWith("option") ? clean.substring(6).toUpperCase() : clean.toUpperCase();
  };

  return (
    <div className="dashboard-layout">

      <Sidebar role="STUDENT" />

      <div className="main-content">

        <div className="topbar">
          <div className="topbar-greeting">
            <h2>Exam Results</h2>
            <p>Here's how you performed in {result.subject}</p>
          </div>
          <button className="btn btn-outline" onClick={() => navigate('/student/dashboard')}>
            <ArrowLeft size={16} /> Back to Dashboard
          </button>
        </div>

        {/* Page Content Panel */}
        <div className="page-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>

          {/* Main Score Card summary */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card" style={{ maxWidth: 800, width: '100%', padding: 0, overflow: 'hidden' }}>

            {/* Colored Banner section (Green for pass, Red for fail) */}
            <div style={{ background: isPass ? 'linear-gradient(135deg, var(--success), #059669)' : 'linear-gradient(135deg, var(--danger), #DC2626)', padding: '40px 32px', textAlign: 'center', color: '#fff' }}>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 12, delay: 0.2 }} style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                {isPass ? <Award size={40} color="#fff" /> : <Target size={40} color="#fff" />}
              </motion.div>
              <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>{result.percentage}%</h2>
              <p style={{ fontSize: 18, opacity: 0.9, fontWeight: 500 }}>{result.performanceMessage}</p>
              <div style={{ marginTop: 16, display: 'inline-block', background: 'rgba(255,255,255,0.2)', padding: '4px 16px', borderRadius: 50, fontSize: 14, fontWeight: 700 }}>
                Grade: {result.grade}
              </div>
            </div>

            {/* Score Breakdown Numbers */}
            <div style={{ padding: 40 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--dark)', marginBottom: 24, textAlign: 'center' }}>Score Breakdown</h3>

              <div className="grid-3 mb-6">
                {/* Metric 1: Total questions in the subject */}
                <div style={{ background: 'var(--light-gray)', padding: 20, borderRadius: 12, textAlign: 'center', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--dark)' }}>{result.totalQuestions}</div>
                  <div style={{ fontSize: 13, color: 'var(--slate)', fontWeight: 500 }}>Total Questions</div>
                </div>
                {/* Metric 2: Count of correct answers evaluated */}
                <div style={{ background: '#F0FDF4', padding: 20, borderRadius: 12, textAlign: 'center', border: '1px solid #BBF7D0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 4 }}>
                    <CheckCircle2 size={18} color="var(--success)" />
                    <div style={{ fontSize: 24, fontWeight: 800, color: '#065F46' }}>{result.correctAnswers}</div>
                  </div>
                  <div style={{ fontSize: 13, color: '#047857', fontWeight: 500 }}>Correct Answers</div>
                </div>
                {/* Metric 3: Count of incorrect/unanswered questions */}
                <div style={{ background: '#FEF2F2', padding: 20, borderRadius: 12, textAlign: 'center', border: '1px solid #FECACA' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 4 }}>
                    <XCircle size={18} color="var(--danger)" />
                    <div style={{ fontSize: 24, fontWeight: 800, color: '#991B1B' }}>{result.wrongAnswers}</div>
                  </div>
                  <div style={{ fontSize: 13, color: '#B91C1C', fontWeight: 500 }}>Wrong Answers</div>
                </div>
              </div>

              {/* Lower Actions Section */}
              <div style={{ textAlign: 'center', marginTop: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                <p style={{ fontSize: 14, color: 'var(--slate)' }}>Exam taken on {new Date(result.examDate).toLocaleString()}</p>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
                  <button className="btn btn-primary btn-lg" onClick={() => navigate('/student/dashboard')}>
                    Return to Dashboard
                  </button>
                  {/* Shows Review answers button only if questions context exists in navigation state */}
                  {examQuestions.length > 0 && (
                    <button className="btn btn-outline btn-lg" onClick={() => setShowReview(!showReview)}>
                      {showReview ? <><EyeOff size={18} /> Hide Review</> : <><Eye size={18} /> Review Answers</>}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Detailed Question Review List */}
          {showReview && examQuestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ maxWidth: 800, width: '100%', display: 'flex', flexDirection: 'column', gap: 24 }}
            >
              <h3 style={{ fontSize: 22, fontWeight: 800, color: 'var(--dark)', marginBottom: 8, borderBottom: '2px solid var(--border)', paddingBottom: 12 }}>
                Question-by-Question Review
              </h3>

              {examQuestions.map((q, idx) => {
                const selectedOpt = markedAnswers[q.id]; // selected option key (e.g. "optionB")
                // read correct option key mapping returned securely by backend payload
                const correctOpt = result.correctAnswersMap?.[q.id] || result.correctAnswersMap?.[String(q.id)];

                const correctOptLetter = normalize(correctOpt); // letter (e.g. "B")
                const selectedOptLetter = normalize(selectedOpt); // letter (e.g. "B" or "")

                // Compare letters to evaluate correctness for this review card
                const isCorrect = correctOptLetter === selectedOptLetter;

                return (
                  <div key={q.id} className="card" style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--primary)', background: 'var(--soft-blue)', padding: '4px 12px', borderRadius: 50 }}>
                        Question {idx + 1}
                      </span>
                      {/* Displays evaluation correctness label next to question number */}
                      <span className={`badge ${isCorrect ? 'badge-green' : 'badge-red'}`}>
                        {isCorrect ? 'Correct' : selectedOpt ? 'Wrong Answer' : 'Not Answered'}
                      </span>
                    </div>

                    <h4 style={{ fontSize: 17, fontWeight: 600, color: 'var(--dark)', lineHeight: 1.5 }}>
                      {q.questionTitle}
                    </h4>

                    {/* Displays option choices, color-coded based on correct/selected states */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {['optionA', 'optionB', 'optionC', 'optionD'].map((optKey, i) => {
                        const optLetter = String.fromCharCode(65 + i); // maps 0-3 index to A, B, C, D
                        const isThisCorrect = correctOptLetter === optLetter; // check if this option is the correct answer
                        const isThisSelected = selectedOptLetter === optLetter; // check if this option was chosen by student

                        let style = {
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                          padding: '14px 18px',
                          borderRadius: '10px',
                          border: '1.5px solid var(--border)',
                          fontSize: 14,
                          fontWeight: 500,
                          transition: 'all 0.2s',
                          background: '#fff',
                          color: '#475569'
                        };

                        // Apply GREEN styling if this option is correct
                        if (isThisCorrect) {
                          style.border = '1.5px solid var(--success)';
                          style.background = '#F0FDF4';
                          style.color = '#15803D';
                          style.fontWeight = '600';
                        // Apply RED styling if this option was selected but is incorrect
                        } else if (isThisSelected) {
                          style.border = '1.5px solid var(--danger)';
                          style.background = '#FEF2F2';
                          style.color = '#B91C1C';
                          style.fontWeight = '600';
                        }

                        return (
                          <div key={optKey} style={style}>
                            {/* Inner circle badge letter */}
                            <div style={{
                              width: 26, height: 26, borderRadius: '50%',
                              background: isThisCorrect ? 'var(--success)' : isThisSelected ? 'var(--danger)' : '#F1F5F9',
                              color: isThisCorrect || isThisSelected ? '#fff' : 'var(--slate)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700
                            }}>
                              {optLetter}
                            </div>
                            <span style={{ flex: 1 }}>{q[optKey]}</span>
                            {/* Text label annotations */}
                            {isThisCorrect && (
                              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--success)', display: 'flex', alignItems: 'center', gap: 4 }}>
                                ✓ Correct Option
                              </span>
                            )}
                            {isThisSelected && !isThisCorrect && (
                              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: 4 }}>
                                ✗ Your Choice
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
