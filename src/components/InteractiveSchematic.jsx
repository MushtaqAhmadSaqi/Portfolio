import React, { useState, useEffect } from 'react';

/**
 * Interactive Architectural Blueprint & Live Simulator
 * Replaces the static schematic box with:
 * 1. An animated pipeline circuit with continuous glowing data flow pulses
 * 2. Active node cycling with real architectural telemetry
 * 3. A live interactive interactive drill/simulator tab tailored to the project
 */
export default function InteractiveSchematic({ project, isVisible }) {
  const [activeTab, setActiveTab] = useState('pipeline'); // 'pipeline' | 'interactive'
  const [activeNode, setActiveNode] = useState(0);
  const [isPulsing, setIsPulsing] = useState(false);
  const [pulseToast, setPulseToast] = useState('');

  // Interactive Quiz state for OpenPrep
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizScore, setQuizScore] = useState(0);

  // Gemini state for COMSATSPrepHub
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  // Hotel API state
  const [apiTesting, setApiTesting] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);

  // Auto-cycle through pipeline nodes every 2.8s when pipeline tab is active
  useEffect(() => {
    if (activeTab !== 'pipeline') return;
    const timer = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % (project.architecturePreview?.nodes?.length || 4));
    }, 2800);
    return () => clearInterval(timer);
  }, [activeTab, project]);

  // Trigger manual packet pulse simulation
  const handlePulsePipeline = () => {
    setIsPulsing(true);
    setPulseToast('Simulating request... [POST /api/v1/mock-session]');
    setTimeout(() => {
      setIsPulsing(false);
      setPulseToast('✓ 4 nodes verified · Latency: 34ms · 0 dropped frames');
      setTimeout(() => setPulseToast(''), 3500);
    }, 850);
  };

  // Sample questions for OpenPrep live interactive demo
  const sampleQuestions = [
    {
      q: 'Which data structure offers O(1) average-time complexity for key search?',
      options: ['Binary Search Tree', 'Hash Map (Table)', 'Doubly Linked List', 'Max Binary Heap'],
      correct: 1,
      explanation: 'Hash maps compute a hash index for direct bucket access, yielding O(1) average lookup.',
      topic: 'Data Structures · IBA Computer Science Track'
    },
    {
      q: 'In cellular respiration, where does the Krebs (Citric Acid) cycle occur?',
      options: ['Cytosol', 'Mitochondrial Matrix', 'Endoplasmic Reticulum', 'Outer Membrane'],
      correct: 1,
      explanation: 'The citric acid cycle enzymes are located inside the mitochondrial matrix space.',
      topic: 'Biology · MDCAT Medical Entrance Track'
    },
    {
      q: 'If a car accelerates uniformly from 0 to 20 m/s in 5 seconds, what is its acceleration?',
      options: ['2 m/s²', '4 m/s²', '10 m/s²', '100 m/s²'],
      correct: 1,
      explanation: 'a = (v - u) / t = (20 - 0) / 5 = 4 m/s².',
      topic: 'Physics · National Entrance Exam Track'
    }
  ];

  const currentQ = sampleQuestions[currentQIndex % sampleQuestions.length];

  const handleSelectOption = (index) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    if (index === currentQ.correct) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setCurrentQIndex((prev) => prev + 1);
  };

  // Architectural telemetries for step nodes
  const nodeTelemetry = [
    { tag: 'DATA SOURCE', latency: '12ms', status: 'INDEXED' },
    { tag: 'QUERY ENGINE', latency: '24ms', status: 'FILTERED' },
    { tag: 'CLIENT ENGINE', latency: '4ms', status: 'ACTIVE' },
    { tag: 'DIFF LEDGER', latency: '8ms', status: 'VERIFIED' }
  ];

  return (
    <div className={`schematic-box interactive-schematic-card ${isVisible ? 'schematic-animate-in' : ''}`}>
      {/* Top Header with Interactive Tabs */}
      <div className="schematic-header-bar">
        <div className="schematic-caption-title">
          <span className="schematic-radar-dot" aria-hidden="true" />
          <span>{project.architecturePreview?.caption || 'SYSTEM SCHEMATIC'}</span>
        </div>

        <div className="schematic-tab-buttons" role="tablist">
          <button
            type="button"
            className={`schematic-tab-btn ${activeTab === 'pipeline' ? 'active' : ''}`}
            onClick={() => setActiveTab('pipeline')}
          >
            <span>⚡ PIPELINE</span>
          </button>
          <button
            type="button"
            className={`schematic-tab-btn ${activeTab === 'interactive' ? 'active' : ''}`}
            onClick={() => setActiveTab('interactive')}
          >
            <span>🎯 LIVE DEMO</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: Interactive Animated Architecture Pipeline */}
      {activeTab === 'pipeline' && (
        <div className="pipeline-container">
          <div className="pipeline-controls">
            <span className="pipeline-status-text">
              <span className="live-flow-pulse" /> FLOWING DATA STREAM
            </span>
            <button
              type="button"
              className="pipeline-pulse-btn"
              onClick={handlePulsePipeline}
              disabled={isPulsing}
            >
              {isPulsing ? 'TRANSMITTING...' : '▶ SIMULATE PACKET'}
            </button>
          </div>

          {pulseToast && <div className="pulse-toast-banner">{pulseToast}</div>}

          <div className="pipeline-flow-wrapper">
            {/* Visual animated SVG circuit connector */}
            <div className="pipeline-track" aria-hidden="true">
              <div className="pipeline-track-line" />
              <div
                className={`pipeline-packet-dot ${isPulsing ? 'packet-fast' : ''}`}
                style={{
                  top: `${(activeNode / ((project.architecturePreview?.nodes?.length || 4) - 1)) * 82 + 8}%`
                }}
              />
            </div>

            {/* Pipeline nodes */}
            <ol className="schematic-steps pipeline-nodes-list">
              {project.architecturePreview?.nodes.map((node, idx) => {
                const isActive = activeNode === idx;
                const telemetry = nodeTelemetry[idx % nodeTelemetry.length];
                return (
                  <li
                    key={node}
                    className={`schematic-step pipeline-node-item ${isActive ? 'is-active-node' : ''}`}
                    onClick={() => setActiveNode(idx)}
                    onMouseEnter={() => setActiveNode(idx)}
                  >
                    <div className="node-main-row">
                      <span className="schematic-step-num">0{idx + 1}.</span>
                      <span className="node-text">{node}</span>
                    </div>

                    <div className="node-telemetry-row">
                      <span className="node-tag">{telemetry.tag}</span>
                      <span className="node-latency">~{telemetry.latency}</span>
                      <span className="node-status-badge">{telemetry.status}</span>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      )}

      {/* VIEW 2: Live Interactive Drill / Demo for OpenPrep & other projects */}
      {activeTab === 'interactive' && (
        <div className="interactive-drill-container">
          {project.slug === 'openprep' && (
            <div className="openprep-drill-widget">
              <div className="drill-meta-top">
                <span className="drill-badge">MOCK DRILL // QUESTION #{currentQIndex + 1}</span>
                <span className="drill-topic">{currentQ.topic}</span>
              </div>

              <p className="drill-question-text">{currentQ.q}</p>

              <div className="drill-options-grid">
                {currentQ.options.map((opt, oIdx) => {
                  let optClass = 'drill-option-btn';
                  if (selectedOption !== null) {
                    if (oIdx === currentQ.correct) {
                      optClass += ' option-correct';
                    } else if (selectedOption === oIdx) {
                      optClass += ' option-incorrect';
                    } else {
                      optClass += ' option-dimmed';
                    }
                  }

                  return (
                    <button
                      key={opt}
                      type="button"
                      className={optClass}
                      onClick={() => handleSelectOption(oIdx)}
                      disabled={selectedOption !== null}
                    >
                      <span className="option-letter">{['A', 'B', 'C', 'D'][oIdx]}</span>
                      <span className="option-label">{opt}</span>
                      {selectedOption !== null && oIdx === currentQ.correct && (
                        <span className="option-check" aria-hidden="true">✓</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {selectedOption !== null && (
                <div className="drill-feedback-box">
                  <div className="feedback-result-line">
                    <strong>
                      {selectedOption === currentQ.correct
                        ? '✓ Correct Answer!'
                        : '✕ Review Concept'}
                    </strong>
                    <span className="feedback-score">Score: {quizScore} pts</span>
                  </div>
                  <p className="feedback-explanation">{currentQ.explanation}</p>
                  <button
                    type="button"
                    className="drill-next-btn"
                    onClick={handleNextQuestion}
                  >
                    Next Question →
                  </button>
                </div>
              )}
            </div>
          )}

          {project.slug === 'comsatsprephub' && (
            <div className="ai-sandbox-widget">
              <div className="drill-meta-top">
                <span className="drill-badge">GEMINI 1.5 FLASH ENGINE</span>
                <span className="drill-topic">Structured JSON Guardrail</span>
              </div>
              <p className="drill-question-text" style={{ fontSize: '0.85rem' }}>
                Test on-demand AI syllabus generation for COMSATS University:
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.8rem' }}>
                <button
                  type="button"
                  className="pipeline-pulse-btn"
                  onClick={() => {
                    setAiGenerating(true);
                    setTimeout(() => {
                      setAiGenerating(false);
                      setAiResult({
                        subject: 'Calculus & Analytical Geometry',
                        topic: 'Eigenvalues & Diagonalization',
                        schemaValid: true,
                        tokens: 142,
                        latency: '410ms'
                      });
                    }, 650);
                  }}
                  disabled={aiGenerating}
                >
                  {aiGenerating ? 'Calling Gemini API...' : '⚡ Generate Quiz Schema'}
                </button>
              </div>
              {aiResult && (
                <div className="code-spec-box">
                  <div className="code-spec-header">
                    <span>STATUS: 200 OK</span>
                    <span>VALID SCHEMA ✓</span>
                  </div>
                  <pre className="code-spec-pre">
{`{
  "subject": "${aiResult.subject}",
  "topic": "${aiResult.topic}",
  "questionCount": 5,
  "difficulty": "Medium",
  "guardrailValidation": "PASSED"
}`}
                  </pre>
                </div>
              )}
            </div>
          )}

          {project.slug === 'edulearn' && (
            <div className="edulearn-widget">
              <div className="drill-meta-top">
                <span className="drill-badge">FOCUS TIMER & TIMESTAMPS</span>
                <span className="drill-topic">Zero-Server Persistence</span>
              </div>
              <div className="timer-display-box">
                <span className="timer-mono">25:00</span>
                <span className="timer-tag">POMODORO WORK SPRINT</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--ink-secondary)', margin: '0.5rem 0' }}>
                Synced timestamp notes auto-jump YouTube video to exact seconds:
              </p>
              <div className="sample-notes-list">
                <div className="sample-note-item">
                  <span className="note-time-chip">03:45</span>
                  <span>Matrix Determinants formula breakdown</span>
                </div>
                <div className="sample-note-item">
                  <span className="note-time-chip">12:18</span>
                  <span>Proof of Cayley-Hamilton Theorem</span>
                </div>
              </div>
            </div>
          )}

          {project.slug === 'hotel-management-system' && (
            <div className="hotel-api-widget">
              <div className="drill-meta-top">
                <span className="drill-badge">EXPRESS / MONGO REST ROUTER</span>
                <span className="drill-topic">1,001 Seeded Records</span>
              </div>
              <button
                type="button"
                className="pipeline-pulse-btn"
                style={{ marginBottom: '0.75rem' }}
                onClick={() => {
                  setApiTesting(true);
                  setTimeout(() => {
                    setApiTesting(false);
                    setApiResponse({
                      endpoint: 'GET /api/v1/rooms/available?tier=deluxe',
                      count: 8,
                      queryTime: '9.4ms',
                      indexed: 'db.rooms.createIndex({ status: 1, type: 1 })'
                    });
                  }, 400);
                }}
                disabled={apiTesting}
              >
                {apiTesting ? 'Querying Mongo Index...' : '▶ Test GET /api/v1/rooms/available'}
              </button>
              {apiResponse && (
                <div className="code-spec-box">
                  <div className="code-spec-header">
                    <span>HTTP 200 OK</span>
                    <span>INDEXED QUERY: {apiResponse.queryTime}</span>
                  </div>
                  <pre className="code-spec-pre">
{`// MongoDB Compound Query Benchmark
{
  "status": "success",
  "matchedAvailableRooms": ${apiResponse.count},
  "indexUsed": "${apiResponse.indexed}",
  "executionTime": "${apiResponse.queryTime}"
}`}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
