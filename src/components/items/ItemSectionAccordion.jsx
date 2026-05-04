import { useRef, useEffect } from 'react'
import { ItemGrid } from './ItemGrid'

export const ItemSectionAccordion = ({ section, version, isOpen, onToggle }) => {
  const bodyRef = useRef(null)

  useEffect(() => {
    const el = bodyRef.current
    if (!el) return
    if (isOpen) {
      el.style.maxHeight = el.scrollHeight + 'px'
    } else {
      el.style.maxHeight = '0px'
    }
  }, [isOpen, section.items])

  return (
    <div className="section-accordion">
      <style>{`
        .section-accordion {
          border-bottom: 1px solid rgba(200,170,85,0.1);
        }

        .section-trigger {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 14px 0;
          background: none;
          border: none;
          cursor: pointer;
          color: #e8e0cc;
          font-family: inherit;
          font-size: 13px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 600;
          transition: color 0.2s;
          text-align: left;
        }

        .section-trigger:hover {
          color: #c8aa55;
        }

        .section-trigger.open {
          color: #c8aa55;
        }

        .section-trigger-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .section-gold-bar {
          width: 3px;
          height: 14px;
          background: #c8aa55;
          border-radius: 2px;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .section-trigger.open .section-gold-bar,
        .section-trigger:hover .section-gold-bar {
          opacity: 1;
        }

        .section-count {
          font-size: 10px;
          color: rgba(200,170,85,0.5);
          font-weight: 400;
          letter-spacing: 0.05em;
          margin-left: 4px;
        }

        .section-chevron {
          transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
          opacity: 0.4;
          flex-shrink: 0;
        }

        .section-trigger.open .section-chevron {
          transform: rotate(180deg);
          opacity: 0.8;
        }

        .section-body {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.4,0,0.2,1);
        }

        .section-body-inner {
          padding: 4px 0 20px 0;
        }

        .section-empty {
          font-size: 12px;
          color: rgba(255,255,255,0.2);
          letter-spacing: 0.05em;
          padding: 8px 0;
          font-style: italic;
        }
      `}</style>

      <button
        className={`section-trigger${isOpen ? ' open' : ''}`}
        onClick={onToggle}
      >
        <span className="section-trigger-left">
          <span className="section-gold-bar" />
          {section.header}
          <span className="section-count">({section.items.length})</span>
        </span>
        <svg className="section-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <div className="section-body" ref={bodyRef}>
        <div className="section-body-inner">
          {section.items.length === 0 ? (
            <div className="section-empty">No items match current filters</div>
          ) : (
            <ItemGrid items={section.items} version={version} />
          )}
        </div>
      </div>
    </div>
  )
}