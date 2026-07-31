import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { questionAPI, studentAPI } from '../../services/api';
import toast from 'react-hot-toast';
import { Clock, AlertCircle, ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';

export default function QuizPage() {
  const { subject } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, [subject]);

  const fetchQuestions = async () => {
    try {

      const { data } = await questionAPI.getForExam(subject);

      if (data.length === 0) {
        toast.error('No questions found for this subject.');
        navigate('/student/dashboard');
        return;
      }
      setQuestions(data);

      const savedKey = `exam_state_${subject}`;
      const savedState = localStorage.getItem(savedKey);

      if (savedState) {
        try {
          const parsed = JSON.parse(savedState);

          if (parsed && parsed.timeLeft > 0) {
            setAnswers(parsed.answers || {});
            setCurrentIdx(parsed.currentIdx || 0);
            setTimeLeft(parsed.timeLeft);
            toast.success('Resumed your exam progress!');
            return;
          }
        } catch (e) {
          console.error('Error parsing saved exam state', e);
        }
      }

      setTimeLeft(data.length * 60);
      setAnswers({});
      setCurrentIdx(0);
    } catch (err) {
      toast.error('Failed to load exam');
      navigate('/student/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const submitExam = useCallback(async (autoSubmit = false) => {
    if (isSubmitting) return;

    if (!autoSubmit && !window.confirm('Are you sure you want to submit? You cannot change your answers.')) return;

    setIsSubmitting(true);
    try {

      const { data } = await studentAPI.submitExam({ subject, answers });

      localStorage.removeItem(`exam_state_${subject}`);

      toast.success('Exam submitted successfully!');

      navigate('/student/result', { state: { result: data, markedAnswers: answers, examQuestions: questions } });
    } catch (err) {
      toast.error('Failed to submit exam');
      setIsSubmitting(false);
    }
  }, [answers, isSubmitting, navigate, subject, questions]);

  useEffect(() => {
    if (loading || isSubmitting || questions.length === 0) return;
    const savedKey = `exam_state_${subject}`;

    localStorage.setItem(savedKey, JSON.stringify({
      answers,
      currentIdx,
      timeLeft
    }));
  }, [answers, currentIdx, timeLeft, loading, isSubmitting, questions, subject]);

  useEffect(() => {
    if (loading || isSubmitting) return;

    if (timeLeft <= 0) {
      submitExam(true);
      return;
    }

    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);

    return () => clearInterval(timer);
  }, [timeLeft, loading, isSubmitting, submitExam]);

  const handleSelectOption = (opt) => {

    setAnswers(prev => ({ ...prev, [questions[currentIdx].id]: opt }));
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  if (loading) return <div className="flex-center" style={{ minHeight: '100vh', background: '#F8FAFC' }}><div className="spinner" /></div>;

  const currentQ = questions[currentIdx];
  const progress = ((Object.keys(answers).length) / questions.length) * 100;

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', display: 'flex', flexDirection: 'column' }}>

      <div style={{ background: '#fff', borderBottom: '1px solid #E2E8F0', padding: '16px 24px', position: 'sticky', top: 0, zIndex: 50, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--dark)' }}>{subject} Exam</h2>
          <div style={{ fontSize: 13, color: 'var(--slate)', display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
            <AlertCircle size={14} /> Do not refresh or leave the page.
          </div>
        </div>

        <div className={`timer ${timeLeft < 60 ? 'danger' : ''}`}>
          <Clock size={18} />
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="progress" style={{ borderRadius: 0, height: 4 }}><div className="progress-bar" style={{ width: `${progress}%` }} /></div>

      <div className="container" style={{ display: 'flex', gap: 24, padding: '32px 24px', flex: 1, maxWidth: 1200 }}>

        <div style={{ flex: 1 }}>
          <motion.div key={currentIdx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="card" style={{ padding: 40, minHeight: 400, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--primary)', background: 'var(--soft-blue)', padding: '4px 12px', borderRadius: 50 }}>Question {currentIdx + 1} of {questions.length}</span>

              <span className={`badge ${currentQ.difficultyLevel === 'EASY' ? 'badge-green' : currentQ.difficultyLevel === 'HARD' ? 'badge-red' : 'badge-yellow'}`}>
                {currentQ.difficultyLevel}
              </span>
            </div>

            <h3 style={{ fontSize: 22, fontWeight: 600, color: 'var(--dark)', marginBottom: 32, lineHeight: 1.5 }}>
              {currentQ.questionTitle}
            </h3>

            <div style={{ flex: 1 }}>
              {['optionA', 'optionB', 'optionC', 'optionD'].map((optKey, i) => {
                const label = String.fromCharCode(65 + i);
                const isSelected = answers[currentQ.id] === optKey;
                return (
                  <button key={optKey} className={`option-btn ${isSelected ? 'selected' : ''}`} onClick={() => handleSelectOption(optKey)}>
                    <div className="option-label">{label}</div>
                    <span>{currentQ[optKey]}</span>
                  </button>
                );
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32, paddingTop: 24, borderTop: '1px solid #E2E8F0' }}>
              <button className="btn btn-outline" disabled={currentIdx === 0} onClick={() => setCurrentIdx(prev => prev - 1)}>
                <ChevronLeft size={18} /> Previous
              </button>

              {currentIdx === questions.length - 1 ? (
                <button className="btn btn-primary" style={{ background: 'var(--success)', borderColor: 'var(--success)' }} onClick={() => submitExam()} disabled={isSubmitting}>
                  <CheckCircle2 size={18} /> Submit Exam
                </button>
              ) : (
                <button className="btn btn-primary" onClick={() => setCurrentIdx(prev => prev + 1)}>
                  Next <ChevronRight size={18} />
                </button>
              )}
            </div>
          </motion.div>
        </div>

        <div style={{ width: 280, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card" style={{ padding: 24 }}>
            <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--dark)', marginBottom: 16 }}>Question Palette</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {questions.map((q, i) => {
                const isAnswered = !!answers[q.id];
                const isCurrent = currentIdx === i;
                return (
                  <button key={q.id}
                    className={`palette-btn ${isCurrent ? 'current' : isAnswered ? 'answered' : ''}`}
                    onClick={() => setCurrentIdx(i)}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>

            <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid #E2E8F0', fontSize: 13, color: 'var(--slate)', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 12, height: 12, borderRadius: 3, background: 'var(--success)' }}/> Answered</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 12, height: 12, borderRadius: 3, background: 'var(--primary)' }}/> Current</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 12, height: 12, borderRadius: 3, border: '1px solid #CBD5E1', background: '#fff' }}/> Not Answered</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
