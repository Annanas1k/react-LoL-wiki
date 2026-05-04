const FILTER_TAGS = [
  { label: "Attack Damage", value: "Damage" },
  { label: "Critical Strike", value: "CriticalStrike" },
  { label: "Attack Speed", value: "AttackSpeed" },
  { label: "On-Hit Effects", value: "OnHit" },
  { label: "Armor Penetration", value: "ArmorPenetration" },
  { label: "Ability Power", value: "SpellDamage" },
  { label: "Mana & Regeneration", value: "Mana" },
  { label: "Magic Penetration", value: "MagicPenetration" },
  { label: "Health & Regeneration", value: "Health" },
  { label: "Armor", value: "Armor" },
  { label: "Magic Resistance", value: "SpellBlock" },
  { label: "Ability Haste", value: "CooldownReduction" },
  { label: "Movement", value: "Boots" },
  { label: "Life Steal & Vamp", value: "LifeSteal" },
]

export const ItemSidebar = ({ selectedTags, onTagToggle, onClear }) => {
  return (
    <div className="item-sidebar">
      <style>{`
        .item-sidebar {
          padding: 20px 16px 20px 20px;
          font-family: 'Syne', 'Rajdhani', sans-serif;
        }

        .sidebar-clear {
          display: flex;
          align-items: center;
          gap: 6px;
          background: none;
          border: none;
          color: rgba(200,50,50,0.7);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          padding: 0;
          margin-bottom: 18px;
          font-family: inherit;
          transition: color 0.15s;
        }

        .sidebar-clear:hover { color: #e05555; }

        .sidebar-tags {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .sidebar-tag-row {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 7px 0;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          cursor: pointer;
          transition: background 0.15s;
          border-radius: 3px;
          padding-left: 2px;
        }

        .sidebar-tag-row:hover {
          background: rgba(200,170,85,0.04);
        }

        .sidebar-checkbox {
          width: 13px;
          height: 13px;
          border: 1px solid rgba(200,170,85,0.3);
          border-radius: 2px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color 0.15s, background 0.15s;
          background: transparent;
        }

        .sidebar-checkbox.checked {
          background: rgba(200,170,85,0.2);
          border-color: rgba(200,170,85,0.7);
        }

        .sidebar-checkbox.checked::after {
          content: '';
          width: 6px;
          height: 4px;
          border-left: 1.5px solid #c8aa55;
          border-bottom: 1.5px solid #c8aa55;
          transform: rotate(-45deg) translateY(-1px);
          display: block;
        }

        .sidebar-tag-label {
          font-size: 12px;
          color: rgba(200,190,165,0.65);
          letter-spacing: 0.02em;
          font-weight: 500;
          transition: color 0.15s;
          line-height: 1;
        }

        .sidebar-tag-row:hover .sidebar-tag-label,
        .sidebar-tag-row.active .sidebar-tag-label {
          color: #c8aa55;
        }
      `}</style>

      <button className="sidebar-clear" onClick={onClear}>
        ✕ CLEAR
      </button>

      <div className="sidebar-tags">
        {FILTER_TAGS.map(tag => {
          const checked = selectedTags.has(tag.value)
          return (
            <div
              key={tag.value}
              className={`sidebar-tag-row${checked ? ' active' : ''}`}
              onClick={() => onTagToggle(tag.value)}
            >
              <div className={`sidebar-checkbox${checked ? ' checked' : ''}`} />
              <span className="sidebar-tag-label">{tag.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}