

const cleanHtml = (html) => {
  if (!html) return ''
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/?[^>]+(>|$)/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

export const RuneDetail = ({ rune, path, color }) => {
  if (!rune) return (
    <div className="rune-detail-empty">
      <div className="rune-detail-empty-icon">
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/img/${path.icon}`}
          alt={path.name}
          style={{ width: 48, height: 48, opacity: 0.2, objectFit: 'contain' }}
        />
      </div>
      <div className="rune-detail-empty-text">Select a rune to see details</div>
    </div>
  )

  const desc = cleanHtml(rune.longDesc || rune.shortDesc || '')
  const paragraphs = desc.split('\n').filter(Boolean)

  return (
    <div className="rune-detail" key={rune.id}>
      <div className="rune-detail-header">
        <div className="rune-detail-img-wrap" style={{ '--accent': color.accent, '--glow': color.glow }}>
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`}
            alt={rune.name}
            className="rune-detail-img"
          />
        </div>
        <div>
          <div className="rune-detail-path" style={{ color: color.accent }}>
            {path.name}
          </div>
          <div className="rune-detail-name">{rune.name}</div>
        </div>
      </div>

      <div className="rune-detail-divider" style={{ background: `linear-gradient(90deg, ${color.accent}60, transparent)` }} />

      {rune.shortDesc && (
        <div className="rune-detail-short" style={{ borderColor: color.accent + '50' }}>
          {cleanHtml(rune.shortDesc)}
        </div>
      )}

      <div className="rune-detail-desc">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </div>
  )
}