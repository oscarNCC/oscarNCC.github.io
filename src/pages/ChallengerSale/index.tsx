import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './ChallengerSale.module.css';

const TAB_DESCRIPTIONS: Record<string, { title: string; body: string }> = {
  dialogue: {
    title: 'Live Dialogue Demo',
    body: 'A realistic conversation between a prospect and an AI Challenger Agent selling WCB coverage in Alberta. Each message is tagged with the Challenger technique being used — Reframe, Teach, Constructive Tension, or Take Control — so you can see exactly how the methodology plays out turn by turn.',
  },
  objections: {
    title: 'Objection Playbook',
    body: 'Pick any common objection a prospect might raise — "I already have WCB", "Too expensive", "I\'ll think about it", or "My broker handles it" — and see a step-by-step Challenger response breakdown: Acknowledge, Teach the blind spot, Create rational drowning, then Take Control with a low-commitment next step.',
  },
  compare: {
    title: 'Challenger vs Relationship Builder',
    body: 'A side-by-side comparison showing why the traditional "relationship builder" approach fails (accepts objections at face value, avoids tension, gets ghosted) versus how the Challenger approach succeeds (probes deeper, teaches new insights, quantifies risk, and controls the next step).',
  },
  flow: {
    title: 'Teaching Choreography',
    body: 'The six-step Challenger teaching flow: start with an industry-specific Warmer, Reframe the prospect\'s assumptions, use Rational Drowning with real data, create Emotional Impact tied to their situation, present A New Way by establishing solution criteria, then map Your Solution to those criteria — so the prospect feels they chose it themselves.',
  },
};

export function ChallengerSale() {
  const [activeTab, setActiveTab] = useState('dialogue');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const tabKeys = Object.keys(TAB_DESCRIPTIONS);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.data?.type === 'challenger-tab' && typeof e.data.tab === 'string') {
        setActiveTab(e.data.tab);
      }
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  const handleTabClick = useCallback((tab: string) => {
    setActiveTab(tab);
    iframeRef.current?.contentWindow?.postMessage(
      { type: 'challenger-set-tab', tab },
      '*',
    );
  }, []);

  const desc = TAB_DESCRIPTIONS[activeTab] ?? TAB_DESCRIPTIONS.dialogue;

  return (
    <main className="main-content">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className={`heading ${styles.title}`}>The Challenger Sale</h2>

        <div className={styles.layout}>
          <div className={styles.iframeWrap}>
            <iframe
              ref={iframeRef}
              src="/challenger_sales_wcb_demo.html"
              title="Challenger Sale Demo"
              className={styles.iframe}
            />
          </div>

          <div className={styles.descCard}>
            <div className={styles.tabList}>
              {tabKeys.map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleTabClick(key)}
                  className={`${styles.tabButton} ${activeTab === key ? styles.tabButtonActive : ''}`}
                >
                  {TAB_DESCRIPTIONS[key].title}
                </button>
              ))}
            </div>
            <h3 className={styles.descTitle}>{desc.title}</h3>
            <p className={styles.descBody}>{desc.body}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
