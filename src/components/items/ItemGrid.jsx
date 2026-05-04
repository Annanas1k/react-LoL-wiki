import { useState, useRef, useEffect } from 'react'

const ItemPopover = ({ item, version, anchorRef, onClose }) => {
  const popRef = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (popRef.current && !popRef.current.contains(e.target) &&
          anchorRef.current && !anchorRef.current.contains(e.target)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [onClose, anchorRef])

  useEffect(() => {
    if (!popRef.current || !anchorRef.current) return
    const anchor = anchorRef.current.getBoundingClientRect()
    const pop = popRef.current
    const viewportW = window.innerWidth
    const viewportH = window.innerHeight
    const popW = 280
    const popH = pop.offsetHeight

    let left = anchor.right + 10
    let top = anchor.top

    if (left + popW > viewportW - 16) {
      left = anchor.left - popW - 10
    }
    if (top + popH > viewportH - 16) {
      top = viewportH - popH - 16
    }
    if (top < 8) top = 8

    pop.style.left = left + 'px'
    pop.style.top = top + 'px'
  }, [anchorRef])

  const cleanDescription = (html) => {
    if (!html) return ''
    return html.replace(/<[^>]*>/g, ' ').replace(/\s\s+/g, ' ').trim()
  }

  return (
    <div ref={popRef} className="item-popover">
      <style>{`
        .item-popover {
          position: fixed;
          z-index: 9999;
          width: 280px;
          background: #0d0c09;
          border: 1px solid rgba(200,170,85,0.35);
          border-radius: 8px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,0,0,0.5);
          padding: 16px;
          font-family: 'Syne', 'Rajdhani', sans-serif;
          animation: popIn 0.15s cubic-bezier(0.34,1.56,0.64,1);
        }

        @keyframes popIn {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }

        .pop-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(200,170,85,0.12);
        }

        .pop-img {
          width: 48px;
          height: 48px;
          border: 1px solid rgba(200,170,85,0.3);
          border-radius: 4px;
          flex-shrink: 0;
        }

        .pop-name {
          font-size: 14px;
          font-weight: 700;
          color: #e8e0cc;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          line-height: 1.2;
        }

        .pop-gold {
          font-size: 13px;
          color: #c8aa55;
          font-weight: 600;
          margin-top: 3px;
        }

        .pop-gold span {
          color: rgba(200,170,85,0.45);
          font-weight: 400;
          font-size: 11px;
          margin-left: 3px;
        }

        .pop-plaintext {
          font-size: 12px;
          color: rgba(255,255,255,0.4);
          font-style: italic;
          margin-bottom: 10px;
          padding-left: 8px;
          border-left: 2px solid rgba(180,30,30,0.5);
          line-height: 1.5;
        }

        .pop-desc {
          font-size: 12px;
          color: rgba(120,190,220,0.85);
          line-height: 1.6;
        }

        .pop-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-top: 10px;
          padding-top: 10px;
          border-top: 1px solid rgba(200,170,85,0.08);
        }

        .pop-tag {
          font-size: 10px;
          color: rgba(200,170,85,0.6);
          background: rgba(200,170,85,0.08);
          border: 1px solid rgba(200,170,85,0.15);
          border-radius: 3px;
          padding: 2px 6px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
      `}</style>

      <div className="pop-header">
        <img
          className="pop-img"
          src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item.image.full}`}
          alt={item.name}
        />
        <div>
          <div className="pop-name">{item.name}</div>
          <div className="pop-gold">
            {item.gold?.total ?? 0}<span>Gold</span>
            {item.gold?.base ? ` · ${item.gold.base} base` : ''}
          </div>
        </div>
      </div>

      {item.plaintext && (
        <div className="pop-plaintext">{item.plaintext}</div>
      )}

      {item.description && (
        <div className="pop-desc">{cleanDescription(item.description)}</div>
      )}

      {item.tags?.length > 0 && (
        <div className="pop-tags">
          {item.tags.map(t => (
            <span key={t} className="pop-tag">{t}</span>
          ))}
        </div>
      )}
    </div>
  )
}

const ItemCell = ({ item, version }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  return (
    <>
      <div
        ref={ref}
        className={`item-cell${open ? ' active' : ''}`}
        onClick={() => setOpen(v => !v)}
      >
        <div className="item-cell-img-wrap">
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item.image.full}`}
            alt={item.name}
            className="item-cell-img"
            draggable={false}
          />
        </div>
        <div className="item-cell-gold">
          {item.gold?.total > 0 ? item.gold.total : 'Free'}
        </div>
      </div>

      {open && (
        <ItemPopover
          item={item}
          version={version}
          anchorRef={ref}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}

export const ItemGrid = ({ items, version }) => {
  return (
    <div className="item-grid-wrap">
      <style>{`
        .item-grid-wrap {
          display: grid;
          grid-template-columns: repeat(4, 64px);
          gap: 8px;
        }

        .item-cell {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          cursor: pointer;
          border-radius: 5px;
          padding: 4px;
          transition: background 0.15s;
          user-select: none;
        }

        .item-cell:hover,
        .item-cell.active {
          background: rgba(200,170,85,0.1);
        }

        .item-cell-img-wrap {
          width: 54px;
          height: 54px;
          border: 1px solid rgba(200,170,85,0.2);
          border-radius: 4px;
          overflow: hidden;
          transition: border-color 0.15s, box-shadow 0.15s;
          background: rgba(0,0,0,0.3);
        }

        .item-cell:hover .item-cell-img-wrap,
        .item-cell.active .item-cell-img-wrap {
          border-color: rgba(200,170,85,0.6);
          box-shadow: 0 0 10px rgba(200,170,85,0.2);
        }

        .item-cell-img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }

        .item-cell-gold {
          font-size: 11px;
          color: rgba(200,170,85,0.7);
          font-weight: 600;
          letter-spacing: 0.03em;
          font-family: 'Syne', 'Rajdhani', sans-serif;
        }
      `}</style>

      {items.map(item => (
        <ItemCell key={item.id} item={item} version={version} />
      ))}
    </div>
  )
}