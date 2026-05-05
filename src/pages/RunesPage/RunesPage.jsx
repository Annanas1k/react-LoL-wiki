import { useNavigate } from 'react-router'
import { useChampContext } from '../../hooks/useChampContext'
import { useLanguageContext } from '../../hooks/useLanguageContext'
import { LoadingSpinner } from '../NotFound/LoadingSpinner'


const PATH_SUBTITLES = {
  Precision: 'Become a legend',
  Domination: 'Hunt and eliminate prey',
  Sorcery: 'Unleash destruction',
  Resolve: 'Live forever',
  Inspiration: 'Outwit mere mortals',
}

const PATH_COLORS = {
  Precision:   { accent: '#c8a84b', glow: 'rgba(200,168,75,0.25)',  bg: 'rgba(200,168,75,0.06)' },
  Domination:  { accent: '#c0374a', glow: 'rgba(192,55,74,0.25)',   bg: 'rgba(192,55,74,0.06)' },
  Sorcery:     { accent: '#7b57cc', glow: 'rgba(123,87,204,0.25)',  bg: 'rgba(123,87,204,0.06)' },
  Resolve:     { accent: '#4caa6e', glow: 'rgba(76,170,110,0.25)',  bg: 'rgba(76,170,110,0.06)' },
  Inspiration: { accent: '#4abfcf', glow: 'rgba(74,191,207,0.25)', bg: 'rgba(74,191,207,0.06)' },
}

export const RunesPage = () => {
  const { runes: paths, loading, } = useChampContext()
  const navigate = useNavigate()
   const { t } = useLanguageContext();


  if (loading) return <LoadingSpinner />

  return (
    <div className="runes-overview">
      <style>{`

        .runes-overview {
          min-height: 100vh;
          background: #05070a;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 24px;
          font-family: 'Syne', 'Rajdhani', sans-serif;
        }

        .runes-title {
          font-size: 11px;
          letter-spacing: 0.35em;
          color: rgba(200,168,75,0.5);
          text-transform: uppercase;
          margin-bottom: 8px;
          text-align: center;
        }

        .runes-heading {
          font-size: 32px;
          font-weight: 700;
          color: #e8e0cc;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-align: center;
          margin-bottom: 64px;
        }

        .runes-heading span {
          color: #c8a84b;
        }

        .runes-paths {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
          max-width: 1100px;
        }

        .path-card {
          width: 190px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 10px;
          padding: 32px 20px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1),
                      border-color 0.25s, background 0.25s, box-shadow 0.25s;
          position: relative;
          overflow: hidden;
        }

        .path-card::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.25s;
        }

        .path-card:hover {
          transform: translateY(-6px);
        }

        .path-icon-ring {
          width: 88px;
          height: 88px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          background: rgba(0,0,0,0.4);
          transition: border-color 0.25s, box-shadow 0.25s;
          position: relative;
          z-index: 1;
        }

        .path-card:hover .path-icon-ring {
          border-color: var(--accent);
          box-shadow: 0 0 24px var(--glow), inset 0 0 12px rgba(0,0,0,0.5);
        }

        .path-icon {
          width: 52px;
          height: 52px;
          object-fit: contain;
          filter: brightness(0.75) saturate(0.8);
          transition: filter 0.25s;
        }

        .path-card:hover .path-icon {
          filter: brightness(1.1) saturate(1.1);
        }

        .path-name {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #c8bfa0;
          margin-bottom: 6px;
          text-align: center;
          position: relative;
          z-index: 1;
          transition: color 0.25s;
        }

        .path-card:hover .path-name {
          color: var(--accent);
        }

        .path-subtitle {
          font-size: 10px;
          letter-spacing: 0.08em;
          color: rgba(200,190,165,0.35);
          text-align: center;
          text-transform: uppercase;
          position: relative;
          z-index: 1;
          margin-bottom: 24px;
        }

        .path-keystones {
          display: flex;
          gap: 8px;
          justify-content: center;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }

        .path-keystone-img {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.1);
          object-fit: cover;
          background: rgba(0,0,0,0.3);
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .path-card:hover .path-keystone-img {
          border-color: var(--accent);
          box-shadow: 0 0 8px var(--glow);
        }

        .path-divider {
          width: 40px;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--accent), transparent);
          margin: 0 auto 20px;
          opacity: 0;
          transition: opacity 0.25s;
          position: relative;
          z-index: 1;
        }

        .path-card:hover .path-divider {
          opacity: 1;
        }

        .runes-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background: #05070a;
          color: rgba(200,168,75,0.5);
          font-size: 12px;
          letter-spacing: 0.2em;
          gap: 16px;
          font-family: 'Syne', sans-serif;
        }

        .runes-loading-bar {
          width: 180px;
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

      <div className="runes-title">
        {t('runes_title')}
      </div>
      <div className="runes-heading">
        {t('runes_path_start')} <span>{t('runes_path_accent')}</span>
      </div>

      <div className="runes-paths">
        {paths.map(path => {
          const color = PATH_COLORS[path.name] || PATH_COLORS.Precision
          const keystones = path.slots[0]?.runes || []
          return (
            <div
              key={path.id}
              className="path-card"
              style={{
                '--accent': color.accent,
                '--glow': color.glow,
              }}
              onClick={() => navigate(`/runes/${path.id}/${encodeURIComponent(path.name.toLowerCase())}`)}
              onMouseEnter={e => {
                e.currentTarget.style.background = color.bg
                e.currentTarget.style.borderColor = color.accent + '40'
                e.currentTarget.style.boxShadow = `0 16px 48px ${color.glow}`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div className="path-icon-ring">
                <img
                  className="path-icon"
                  src={`https://ddragon.leagueoflegends.com/cdn/img/${path.icon}`}
                  alt={path.name}
                />
              </div>

              <div className="path-name">{path.name}</div>
              <div className="path-subtitle">{PATH_SUBTITLES[path.name] || ''}</div>

              <div className="path-divider" />

              <div className="path-keystones">
                {keystones.map(rune => (
                  <img
                    key={rune.id}
                    className="path-keystone-img"
                    src={`https://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`}
                    alt={rune.name}
                    title={rune.name}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}