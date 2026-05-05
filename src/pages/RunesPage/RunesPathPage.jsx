import { useState, useMemo, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useChampContext } from '../../hooks/useChampContext'
import { RuneDetail } from '../../components/rune/RuneDetail'
import { RuneNode } from '../../components/rune/RuneNode'

const PATH_COLORS = {
  Precision:   { accent: '#c8a84b', glow: 'rgba(200,168,75,0.3)',  dim: 'rgba(200,168,75,0.12)', ring: '#c8a84b' },
  Domination:  { accent: '#d04455', glow: 'rgba(208,68,85,0.3)',   dim: 'rgba(208,68,85,0.12)',  ring: '#d04455' },
  Sorcery:     { accent: '#9b72e0', glow: 'rgba(155,114,224,0.3)', dim: 'rgba(155,114,224,0.12)',ring: '#9b72e0' },
  Resolve:     { accent: '#4caa6e', glow: 'rgba(76,170,110,0.3)',  dim: 'rgba(76,170,110,0.12)', ring: '#4caa6e' },
  Inspiration: { accent: '#4abfcf', glow: 'rgba(74,191,207,0.3)',  dim: 'rgba(74,191,207,0.12)', ring: '#4abfcf' },
}





export const RunePathPage = () => {
  const { pathId, runeName } = useParams()
  const navigate = useNavigate()
  const { runes: allPaths, loading, } = useChampContext()
  const path = useMemo(
    () => allPaths.find(p => String(p.id) === String(pathId)),
    [allPaths, pathId]
  )

  const [selectedRune, setSelectedRune] = useState(null)

  // Sync selectedRune from URL param
  useEffect(() => {
    if (!path || !runeName) return
    for (const slot of path.slots) {
      const found = slot.runes.find(
        r => r.name.toLowerCase() === decodeURIComponent(runeName).toLowerCase()
      )
      if (found) { setSelectedRune(found); return }
    }
  }, [path, runeName])

  const handleSelectRune = (rune) => {
    setSelectedRune(rune)
    navigate(`/runes/${pathId}/${encodeURIComponent(rune.name.toLowerCase())}`, { replace: true })
  }

  const color = path ? (PATH_COLORS[path.name] || PATH_COLORS.Precision) : PATH_COLORS.Precision

  if (loading) return (
    <div className="runes-loading">
      <div className="runes-loading-bar" />
      <span>LOADING...</span>
    </div>
  )

  if (!path) return (
    <div className="runes-loading">
      <span>Path not found</span>
    </div>
  )

  return (
    <div className="runepath-page" style={{ '--accent': color.accent, '--glow': color.glow, '--dim': color.dim }}>
      <style>{`
        .runepath-page {
          min-height: 100vh;
          background: #05070a;
          display: flex;
          flex-direction: column;
          font-family: 'Syne', 'Rajdhani', sans-serif;
        }

        /* ── TOP NAV ── */
        .runepath-nav {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px 32px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .runepath-back {
          background: none;
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(200,190,165,0.5);
          font-family: inherit;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 7px 14px;
          border-radius: 4px;
          cursor: pointer;
          transition: color 0.15s, border-color 0.15s;
        }

        .runepath-back:hover {
          color: var(--accent);
          border-color: var(--accent);
        }

        .runepath-path-tabs {
          display: flex;
          gap: 10px;
          flex: 1;
          justify-content: center;
        }

        .path-tab {
          display: flex;
          align-items: center;
          gap: 7px;
          background: none;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 6px;
          padding: 6px 14px;
          cursor: pointer;
          font-family: inherit;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(200,190,165,0.4);
          transition: all 0.2s;
        }

        .path-tab img {
          width: 20px;
          height: 20px;
          object-fit: contain;
          opacity: 0.5;
          transition: opacity 0.2s;
        }

        .path-tab:hover {
          color: rgba(200,190,165,0.8);
          border-color: rgba(255,255,255,0.15);
        }

        .path-tab:hover img { opacity: 0.8; }

        .path-tab.active {
          border-color: var(--accent);
          color: var(--accent);
          background: var(--dim);
        }

        .path-tab.active img { opacity: 1; }

        /* ── MAIN LAYOUT ── */
        .runepath-body {
          display: flex;
          flex: 1;
          gap: 0;
        }

        /* ── TREE PANEL ── */
        .runepath-tree {
          flex: 0 0 420px;
          padding: 40px 32px 40px 48px;
          border-right: 1px solid rgba(255,255,255,0.05);
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .tree-path-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 40px;
        }

        .tree-path-ring {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 2px solid var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.5);
          box-shadow: 0 0 20px var(--glow);
          flex-shrink: 0;
        }

        .tree-path-ring img {
          width: 36px;
          height: 36px;
          object-fit: contain;
        }

        .tree-path-name {
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent);
        }

        .tree-slot {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 8px;
          position: relative;
        }

        .tree-slot-label {
          font-size: 9px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
          margin-bottom: 4px;
        }

        .tree-slot-runes {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .tree-connector {
          width: 1px;
          height: 28px;
          background: linear-gradient(180deg, var(--accent), transparent);
          margin: 0 auto;
          opacity: 0.2;
        }

        /* ── RUNE NODES ── */
        .rune-node {
          position: relative;
          cursor: pointer;
          transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1);
        }

        .rune-node:hover { transform: scale(1.12); }
        .rune-node.selected { transform: scale(1.08); }

        .rune-node-ring {
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.45);
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          overflow: hidden;
        }

        .rune-node:hover .rune-node-ring,
        .rune-node.selected .rune-node-ring {
          border-color: var(--accent);
          box-shadow: 0 0 16px var(--glow);
          background: var(--dim);
        }

        .rune-node.keystone .rune-node-ring {
          width: 72px;
          height: 72px;
          border-radius: 50%;
        }

        .rune-node:not(.keystone) .rune-node-ring {
          width: 52px;
          height: 52px;
        }

        .rune-node.keystone .rune-node-img {
          width: 52px;
          height: 52px;
        }

        .rune-node:not(.keystone) .rune-node-img {
          width: 38px;
          height: 38px;
        }

        .rune-node-img {
          object-fit: cover;
          filter: brightness(0.7) saturate(0.7);
          transition: filter 0.2s;
        }

        .rune-node:hover .rune-node-img,
        .rune-node.selected .rune-node-img {
          filter: brightness(1.1) saturate(1.1);
        }

        .rune-node-pulse {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 1px solid var(--accent);
          opacity: 0.5;
          animation: pulse 1.8s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.12); opacity: 0; }
        }

        /* ── DETAIL PANEL ── */
        .runepath-detail {
          flex: 1;
          padding: 48px 48px;
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
        }

        .rune-detail {
          max-width: 480px;
          animation: fadeUp 0.25s ease;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .rune-detail-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 24px;
        }

        .rune-detail-img-wrap {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 2px solid var(--accent);
          box-shadow: 0 0 28px var(--glow);
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.5);
          flex-shrink: 0;
          overflow: hidden;
        }

        .rune-detail-img {
          width: 58px;
          height: 58px;
          object-fit: cover;
        }

        .rune-detail-path {
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-bottom: 6px;
          font-weight: 600;
        }

        .rune-detail-name {
          font-size: 24px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #e8e0cc;
        }

        .rune-detail-divider {
          height: 1px;
          margin-bottom: 20px;
          border: none;
        }

        .rune-detail-short {
          font-size: 13px;
          color: rgba(232,224,204,0.7);
          border-left: 2px solid;
          padding: 8px 14px;
          margin-bottom: 20px;
          font-style: italic;
          line-height: 1.6;
          background: rgba(255,255,255,0.02);
          border-radius: 0 4px 4px 0;
        }

        .rune-detail-desc {
          font-size: 14px;
          color: rgba(232,224,204,0.55);
          line-height: 1.75;
        }

        .rune-detail-desc p {
          margin: 0 0 12px;
        }

        .rune-detail-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          gap: 16px;
          opacity: 0.4;
        }

        .rune-detail-empty-text {
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(200,190,165,0.5);
        }

        /* ── LOADING ── */
        .runes-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background: #05070a;
          color: rgba(200,168,75,0.5);
          font-size: 11px;
          letter-spacing: 0.2em;
          gap: 14px;
          font-family: 'Syne', sans-serif;
        }

        .runes-loading-bar {
          width: 160px;
          height: 1px;
          background: rgba(200,168,75,0.1);
          position: relative;
          overflow: hidden;
        }

        .runes-loading-bar::after {
          content: '';
          position: absolute;
          left: -60%;
          top: 0;
          width: 60%;
          height: 100%;
          background: linear-gradient(90deg, transparent, #c8a84b, transparent);
          animation: shimmer 1.2s ease-in-out infinite;
        }

        @keyframes shimmer { to { left: 100%; } }
      `}</style>

      {/* TOP NAV */}
      <div className="runepath-nav">
        <button className="runepath-back" onClick={() => navigate('/runes')}>
          ← Rune Paths
        </button>
        <div className="runepath-path-tabs">
          {allPaths.map(p => {
            const c = PATH_COLORS[p.name] || PATH_COLORS.Precision
            return (
              <button
                key={p.id}
                className={`path-tab${String(p.id) === String(pathId) ? ' active' : ''}`}
                style={String(p.id) === String(pathId)
                  ? { '--accent': c.accent, '--glow': c.glow, '--dim': c.dim }
                  : {}
                }
                onClick={() => {
                  setSelectedRune(null)
                  navigate(`/runes/${p.id}/${encodeURIComponent(p.name.toLowerCase())}`)
                }}
              >
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/img/${p.icon}`}
                  alt={p.name}
                />
                {p.name}
              </button>
            )
          })}
        </div>
      </div>

      {/* BODY */}
      <div className="runepath-body">
        {/* LEFT: TREE */}
        <div className="runepath-tree">
          <div className="tree-path-header">
            <div className="tree-path-ring">
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/img/${path.icon}`}
                alt={path.name}
              />
            </div>
            <div className="tree-path-name">{path.name}</div>
          </div>

          {path.slots.map((slot, slotIdx) => (
            <div key={slotIdx}>
              {slotIdx > 0 && <div className="tree-connector" />}
              <div className="tree-slot">
                <div className="tree-slot-label">
                  {slotIdx === 0 ? 'Keystone' : `Slot ${slotIdx}`}
                </div>
                <div className="tree-slot-runes">
                  {slot.runes.map(rune => (
                    <RuneNode
                      key={rune.id}
                      rune={rune}
                      isKeystone={slotIdx === 0}
                      color={color}
                      isSelected={selectedRune?.id === rune.id}
                      onClick={handleSelectRune}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: DETAIL */}
        <div className="runepath-detail">
          <RuneDetail rune={selectedRune} path={path} color={color} />
        </div>
      </div>
    </div>
  )
}