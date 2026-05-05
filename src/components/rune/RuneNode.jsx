


export const RuneNode = ({ rune, isKeystone, color, isSelected, onClick }) => (
  <div
    className={`rune-node${isKeystone ? ' keystone' : ''}${isSelected ? ' selected' : ''}`}
    onClick={() => onClick(rune)}
    style={{ '--accent': color.accent, '--glow': color.glow, '--dim': color.dim }}
    title={rune.name}
  >
    <div className="rune-node-ring">
      <img
        src={`https://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`}
        alt={rune.name}
        className="rune-node-img"
      />
    </div>
    {isSelected && <div className="rune-node-pulse" />}
  </div>
)