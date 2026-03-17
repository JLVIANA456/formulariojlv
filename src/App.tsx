/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Question {
  id: number;
  text: string;
  description: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Em 2025 você recebeu rendimentos tributáveis acima de R$ 35.584,00?",
    description: "Exemplos: salários, pró-labore, aposentadoria, pensão, aluguel e demais rendimentos tributáveis."
  },
  {
    id: 2,
    text: "Em 2025 você recebeu rendimentos isentos, não tributáveis ou tributados exclusivamente na fonte acima de R$ 200.000,00?",
    description: "Exemplos: dividendos, FGTS, rendimentos de poupança, indenizações e aplicações com tributação exclusiva."
  },
  {
    id: 3,
    text: "Em 2025 você teve ganho de capital na venda de bens ou direitos?",
    description: "Exemplos: imóvel, veículo, participação societária ou outros bens com lucro na alienação."
  },
  {
    id: 4,
    text: "Em 2025 você operou em bolsa e vendeu mais de R$ 40.000,00, ou teve ganho líquido tributável?",
    description: "Inclui bolsa de valores, mercadorias, futuros e assemelhadas."
  },
  {
    id: 5,
    text: "Em 2025 você teve atividade rural com receita bruta acima de R$ 177.920,00, ou pretende compensar prejuízos rurais?",
    description: "Considere a receita bruta da atividade rural e eventual compensação de prejuízos de anos anteriores ou do próprio ano."
  },
  {
    id: 6,
    text: "Em 31/12/2025 você possuía bens ou direitos em valor total superior a R$ 800.000,00?",
    description: "Exemplos: imóveis, veículos, aplicações, participações societárias e demais bens e direitos."
  },
  {
    id: 7,
    text: "Em 2025 você passou à condição de residente no Brasil e permaneceu nessa condição até 31/12/2025?",
    description: "Aplica-se a quem adquiriu residência fiscal no Brasil durante 2025."
  },
  {
    id: 8,
    text: "Em 2025 você vendeu imóvel residencial e utilizou a isenção por reinvestimento na compra de outro imóvel residencial em até 180 dias?",
    description: "A utilização dessa isenção é um dos critérios de obrigatoriedade de entrega."
  },
  {
    id: 9,
    text: "Em 2025 você possuía aplicações financeiras no exterior ou recebeu rendimentos desses investimentos?",
    description: "Inclui rendimentos e variações patrimoniais relacionados a aplicações financeiras no exterior."
  },
  {
    id: 10,
    text: "Em 2025 você possuía trust, entidade controlada no exterior, ou recebeu rendimentos, lucros ou dividendos do exterior?",
    description: "Inclui estruturas no exterior com impacto nas regras de obrigatoriedade da declaração."
  }
];

export default function App() {
  const [step, setStep] = useState<number>(0); // 0: Welcome, 1-10: Questions, 11: Result
  const [answers, setAnswers] = useState<Record<number, 'sim' | 'nao'>>({});

  const currentQuestion = QUESTIONS[step - 1];
  const progress = (step / QUESTIONS.length) * 100;

  const handleAnswer = (value: 'sim' | 'nao') => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
    if (step < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      setStep(11);
    }
  };

  const goBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const reset = () => {
    setAnswers({});
    setStep(0);
  };

  const positives = QUESTIONS.filter(q => answers[q.id] === 'sim').map(q => q.id);
  const isObligatory = positives.length > 0;

  return (
    <div className="min-h-screen bg-bg selection:bg-accent/5 selection:text-accent font-sans font-light">
      <div className="max-w-2xl mx-auto px-6 py-16 min-h-screen flex flex-col">
        {/* Header */}
        <header className="mb-20 flex justify-center">
          {/* Logo removed */}
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-10"
              >
                <div className="border border-border p-12 text-center bg-white shadow-sm">
                  <div className="inline-flex items-center gap-2 px-3 py-1 border border-border text-muted text-[10px] uppercase tracking-[0.2em] mb-12">
                    <ShieldCheck size={12} />
                    Triagem IRPF 2026
                  </div>
                  <h1 className="text-4xl font-extralight tracking-tight mb-8 leading-tight">
                    IRPF 2026 <br />
                    Verifique sua obrigatoriedade <br />
                    de forma <span className="text-accent">simples.</span>
                  </h1>
                  <p className="text-muted text-sm mb-12 max-w-sm mx-auto leading-relaxed font-light">
                    Responda 10 questões rápidas sobre o ano-base 2025 para identificar se você precisa declarar o Imposto de Renda.
                  </p>
                  <button 
                    onClick={() => setStep(1)}
                    className="btn-primary px-12 py-4 flex items-center gap-4 mx-auto group text-xs uppercase tracking-[0.2em]"
                  >
                    Iniciar Verificação
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}

            {step > 0 && step <= 10 && (
              <motion.div
                key={`question-${step}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col"
              >
                <div className="border border-border p-12 bg-white shadow-sm">
                  <div className="mb-12">
                    <div className="flex justify-between items-end mb-4">
                      <span className="text-[10px] text-muted uppercase tracking-[0.2em]">Questão {step} de {QUESTIONS.length}</span>
                      <span className="text-[10px] text-muted uppercase tracking-[0.2em]">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full h-px bg-border">
                      <motion.div 
                        className="h-full bg-accent"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-light tracking-tight mb-6 leading-snug text-text">
                    {currentQuestion.text}
                  </h2>
                  <p className="text-muted text-sm mb-16 leading-relaxed font-light">
                    {currentQuestion.description}
                  </p>

                  <div className="grid grid-cols-1 gap-4">
                    <button
                      onClick={() => handleAnswer('sim')}
                      className="h-16 border border-border hover:border-accent text-xs uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center group"
                    >
                      <span className="group-hover:text-accent">Sim</span>
                    </button>
                    <button
                      onClick={() => handleAnswer('nao')}
                      className="h-16 border border-border hover:border-text text-xs uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center group"
                    >
                      <span className="group-hover:text-text">Não</span>
                    </button>
                  </div>

                  <div className="mt-12 flex justify-start">
                    <button 
                      onClick={goBack}
                      className="text-[10px] uppercase tracking-[0.2em] text-muted hover:text-text flex items-center gap-2 transition-colors"
                    >
                      <ArrowLeft size={12} />
                      Anterior
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 11 && (
              <motion.div
                key="result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-6"
              >
                <div className="border border-border p-12 bg-white shadow-sm">
                  <div className={`w-16 h-16 mx-auto flex items-center justify-center mb-10 border ${
                    isObligatory ? 'border-accent text-accent' : 'border-emerald-500 text-emerald-500'
                  }`}>
                    {isObligatory ? <AlertCircle size={32} /> : <CheckCircle2 size={32} />}
                  </div>

                  <h2 className="text-4xl font-light tracking-tight mb-6 leading-tight">
                    {isObligatory ? 'Você PRECISA declarar' : 'Você NÃO precisa declarar'}
                  </h2>
                  <p className="text-muted text-base mb-12 leading-relaxed max-w-sm mx-auto font-light">
                    {isObligatory 
                      ? 'Com base nas suas respostas, você é obrigado a entregar a declaração de Imposto de Renda em 2026.'
                      : 'De acordo com as informações fornecidas, você não se enquadra nos critérios de obrigatoriedade para 2026.'}
                  </p>

                  {isObligatory && (
                    <div className="border-l border-accent/20 pl-6 mb-12 text-left">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-accent mb-4">Critérios Detectados</p>
                      <div className="flex flex-wrap gap-x-6 gap-y-2">
                        {positives.map(id => (
                          <span key={id} className="text-[10px] text-muted uppercase tracking-widest">
                            Questão {id}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col gap-4">
                    <a 
                      href="https://wa.me/5511940033954" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-primary py-4 flex items-center justify-center gap-4 text-xs uppercase tracking-[0.2em]"
                    >
                      <MessageCircle size={18} />
                      Consultar Especialista
                    </a>
                    <button 
                      onClick={reset}
                      className="btn-secondary py-4 flex items-center justify-center gap-4 text-xs uppercase tracking-[0.2em]"
                    >
                      <RotateCcw size={16} />
                      Reiniciar Teste
                    </button>
                  </div>

                  <div className="mt-20 pt-10 border-t border-border flex flex-col sm:flex-row justify-between gap-6 text-[10px] uppercase tracking-[0.2em] text-muted">
                    <div className="text-left">
                      <p className="mb-1">Jefferson Viana</p>
                      <a href="tel:+5511940033954" className="hover:text-accent transition-colors">(11) 94003-3954</a>
                    </div>
                    <div className="text-right">
                      <p className="mb-1">E-mail</p>
                      <a href="mailto:contabilidade@jlviana.com.br" className="hover:text-accent transition-colors">contabilidade@jlviana.com.br</a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="mt-20 text-center text-[9px] text-muted uppercase tracking-[0.3em]">
          <p>© 2026 JLVIANA CONSULTORIA CONTÁBIL</p>
        </footer>
      </div>
    </div>
  );
}
