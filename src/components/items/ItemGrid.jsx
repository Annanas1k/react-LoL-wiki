import { useState, useRef, useEffect } from 'react'

// ── Recursiv: construieste tree-ul de componente ──────────────────────────
const buildTree = (item, allItemsMap, depth = 0) => {
  if (!item || depth > 4) return null
  const children = (item.from || [])
    .map(id => allItemsMap[id])
    .filter(Boolean)
    .map(child => buildTree(child, allItemsMap, depth + 1))
    .filter(Boolean)
  return { item, children }
}

// ── SVG connector lines pentru tree ──────────────────────────────────────
const NODE_W = 52
const NODE_H = 68  // img + gold text
const H_GAP  = 12
const V_GAP  = 32

const measureTree = (node) => {
  if (!node) return 0
  if (node.children.length === 0) return NODE_W
  const childrenW = node.children.reduce((sum, c) => sum + measureTree(c) + H_GAP, -H_GAP)
  return Math.max(NODE_W, childrenW)
}

const ItemTreeNode = ({ node, version, x, y, parentX, parentY, isRoot }) => {
  if (!node) return null
  const totalW = measureTree(node)
  const centerX = x + totalW / 2

  // pozitionam copiii
  let childX = x
  const childY = y + NODE_H + V_GAP
  const childPositions = node.children.map(child => {
    const cw = measureTree(child)
    const pos = { x: childX, centerX: childX + cw / 2 }
    childX += cw + H_GAP
    return pos
  })

  return (
    <g>
      {/* linie catre parinte */}
      {!isRoot && (
        <line
          x1={centerX} y1={y}
          x2={parentX} y2={parentY + NODE_H}
          stroke="rgba(200,170,85,0.3)"
          strokeWidth="1"
          strokeDasharray={isRoot ? "none" : "3,2"}
        />
      )}

      {/* nodul curent */}
      <foreignObject x={centerX - NODE_W / 2} y={y} width={NODE_W} height={NODE_H}>
        <div xmlns="http://www.w3.org/1999/xhtml" style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4
        }}>
          <div style={{
            width: 44, height: 44,
            border: isRoot ? '1.5px solid rgba(200,170,85,0.7)' : '1px solid rgba(200,170,85,0.25)',
            borderRadius: 4,
            overflow: 'hidden',
            background: 'rgba(0,0,0,0.4)',
            boxShadow: isRoot ? '0 0 12px rgba(200,170,85,0.25)' : 'none'
          }}>
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${node.item.image.full}`}
              alt={node.item.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              title={node.item.name}
            />
          </div>
          <span style={{
            fontSize: 10,
            color: isRoot ? 'rgba(200,170,85,0.9)' : 'rgba(200,170,85,0.55)',
            fontWeight: 600,
            fontFamily: 'inherit'
          }}>
            {node.item.gold?.total > 0 ? node.item.gold.total : 'Free'}
          </span>
        </div>
      </foreignObject>

      {/* copii */}
      {node.children.map((child, i) => (
        <ItemTreeNode
          key={child.item.id}
          node={child}
          version={version}
          x={childPositions[i].x}
          y={childY}
          parentX={centerX}
          parentY={y}
          isRoot={false}
        />
      ))}
    </g>
  )
}

const ItemTree = ({ item, allItemsMap, version }) => {
  const tree = buildTree(item, allItemsMap)
  if (!tree || tree.children.length === 0) return null

  const totalW = Math.max(measureTree(tree), 200)
  const depth  = getDepth(tree)
  const totalH = depth * (NODE_H + V_GAP) + NODE_H + 16

  return (
    <div style={{ marginTop: 14, borderTop: '1px solid rgba(200,170,85,0.1)', paddingTop: 14 }}>
      <div style={{
        fontSize: 9, letterSpacing: '0.18em', color: 'rgba(200,170,85,0.4)',
        textTransform: 'uppercase', marginBottom: 10, fontFamily: 'inherit'
      }}>
        Recipe
      </div>
      <div style={{ overflowX: 'auto' }}>
        <svg
          width={totalW}
          height={totalH}
          style={{ display: 'block', overflow: 'visible' }}
        >
          <ItemTreeNode
            node={tree}
            version={version}
            x={0}
            y={0}
            parentX={totalW / 2}
            parentY={0}
            isRoot={true}
          />
        </svg>
      </div>
    </div>
  )
}

const getDepth = (node) => {
  if (!node || node.children.length === 0) return 1
  return 1 + Math.max(...node.children.map(getDepth))
}

// ── Popover ───────────────────────────────────────────────────────────────
const ItemPopover = ({ item, version, anchorRef, onClose, allItemsMap }) => {
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
    const popW = 300
    const popH = pop.offsetHeight

    let left = anchor.right + 10
    let top  = anchor.top

    if (left + popW > viewportW - 16) left = anchor.left - popW - 10
    if (top + popH > viewportH - 16)  top  = viewportH - popH - 16
    if (top < 8) top = 8

    pop.style.left = left + 'px'
    pop.style.top  = top  + 'px'
  }, [anchorRef])

const cleanDescription = (html) => {
  if (!html) return [];
  return html
    .split(/<br\s*\/?>|<li>|<\/li>|<stats>|<\/stats>/gi)
    .map(point => point.replace(/<[^>]*>/g, '').trim())
    .filter(point => point.length > 0); 
};

  return (
    <div ref={popRef} className="item-popover">
      <style>{`
        .item-popover {
          position: fixed;
          z-index: 9999;
          width: 400px;
          background: #0d0c09;
          border: 1px solid rgba(200,170,85,0.35);
          border-radius: 8px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,0,0,0.5);
          padding: 16px;
          font-family: 'Syne', 'Rajdhani', sans-serif;
          animation: popIn 0.15s cubic-bezier(0.34,1.56,0.64,1);
          max-height: 90vh;
          overflow-y: auto;
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }
        .pop-header {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 12px; padding-bottom: 12px;
          border-bottom: 1px solid rgba(200,170,85,0.12);
        }
        .pop-img {
          width: 48px; height: 48px;
          border: 1px solid rgba(200,170,85,0.3);
          border-radius: 4px; flex-shrink: 0;
        }
        .pop-name {
          font-size: 13px; font-weight: 700; color: #e8e0cc;
          letter-spacing: 0.05em; text-transform: uppercase; line-height: 1.2;
        }
        .pop-gold {
          font-size: 13px; color: #c8aa55; font-weight: 600; margin-top: 3px;
        }
        .pop-gold span {
          color: rgba(200,170,85,0.45); font-weight: 400;
          font-size: 11px; margin-left: 3px;
        }
        .pop-plaintext {
          font-size: 12px; color: rgba(255,255,255,0.4);
          font-style: italic; margin-bottom: 10px;
          padding-left: 8px; border-left: 2px solid rgba(180,30,30,0.5);
          line-height: 1.5;
        }
        .pop-desc {
          font-size: 12px; color: rgba(120,190,220,0.85); line-height: 1.6;
        }
        .pop-tags {
          display: flex; flex-wrap: wrap; gap: 5px;
          margin-top: 10px; padding-top: 10px;
          border-top: 1px solid rgba(200,170,85,0.08);
        }
        .pop-tag {
          font-size: 10px; color: rgba(200,170,85,0.6);
          background: rgba(200,170,85,0.08);
          border: 1px solid rgba(200,170,85,0.15);
          border-radius: 3px; padding: 2px 6px;
          letter-spacing: 0.06em; text-transform: uppercase;
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
        <ul className="pop-desc">
          {cleanDescription(item.description).map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      )}

      {item.tags?.length > 0 && (
        <div className="pop-tags">
          {item.tags.map(t => <span key={t} className="pop-tag">{t}</span>)}
        </div>
      )}

      {/* ── Recipe Tree ── */}
      <ItemTree item={item} allItemsMap={allItemsMap} version={version} />
    </div>
  )
}

// ── ItemCell ──────────────────────────────────────────────────────────────
const ItemCell = ({ item, version, allItemsMap }) => {
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
          allItemsMap={allItemsMap}
        />
      )}
    </>
  )
}

// ── ItemGrid ──────────────────────────────────────────────────────────────
export const ItemGrid = ({ items, version, allItemsMap }) => {
  return (
    <div className="item-grid-wrap">
      <style>{`
        .item-grid-wrap {
          display: grid;
          grid-template-columns: repeat(4, 64px);
          gap: 8px;
        }
        .item-cell {
          display: flex; flex-direction: column; align-items: center;
          gap: 4px; cursor: pointer; border-radius: 5px; padding: 4px;
          transition: background 0.15s; user-select: none;
        }
        .item-cell:hover, .item-cell.active {
          background: rgba(200,170,85,0.1);
        }
        .item-cell-img-wrap {
          width: 54px; height: 54px;
          border: 1px solid rgba(200,170,85,0.2);
          border-radius: 4px; overflow: hidden;
          transition: border-color 0.15s, box-shadow 0.15s;
          background: rgba(0,0,0,0.3);
        }
        .item-cell:hover .item-cell-img-wrap,
        .item-cell.active .item-cell-img-wrap {
          border-color: rgba(200,170,85,0.6);
          box-shadow: 0 0 10px rgba(200,170,85,0.2);
        }
        .item-cell-img { width: 100%; height: 100%; display: block; object-fit: cover; }
        .item-cell-gold {
          font-size: 11px; color: rgba(200,170,85,0.7); font-weight: 600;
          letter-spacing: 0.03em; font-family: 'Syne', 'Rajdhani', sans-serif;
        }
      `}</style>

      {items.map(item => (
        <ItemCell key={item.id} item={item} version={version} allItemsMap={allItemsMap} />
      ))}
    </div>
  )
}