import { PROJECT_TABS } from '../data/projects';
import type { ProjectTabId } from '../types';
import styles from './ProjectTabs.module.css';

type ProjectTabsProps = {
  activeTab: ProjectTabId;
  onTabChange: (tab: ProjectTabId) => void;
  /** 供首頁／專案頁對齊用 */
  className?: string;
};

export function ProjectTabs({ activeTab, onTabChange, className }: ProjectTabsProps) {
  const listClass = [styles.tabList, className].filter(Boolean).join(' ');

  return (
    <ul className={listClass} role="tablist" aria-label="Project categories">
      {PROJECT_TABS.map((tab) => {
        const selected = activeTab === tab.id;
        return (
          <li key={tab.id} role="presentation">
            <button
              type="button"
              role="tab"
              id={`project-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls="project-tab-panel"
              className={`${styles.tab} ${selected ? styles.tabActive : ''}`}
              onClick={() => onTabChange(tab.id)}
            >
              {tab.label}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
