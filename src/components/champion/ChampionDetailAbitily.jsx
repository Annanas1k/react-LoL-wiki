import { useState } from "react"
import { getAbilityVideoUrl } from '../../utils/helpers'
import { useLanguageContext } from '../../hooks/useLanguageContext'

export const ChampionDetailsAbility = ({ champion, version }) => {
    const { t } = useLanguageContext();
    const [selectedIndex, setSelectedIndex] = useState(0)

    const allAbilities = [
        { ...champion.passive, type: 'P' },
        ...champion.spells.map((spell, i) => ({ ...spell, type: ['Q', 'W', 'E', 'R'][i] }))
    ]

    const currentAbility = allAbilities[selectedIndex]

    return (
        <section className="abilities-lol-container">
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="abilities-main-title">{t('abilities')}</h2>
                    <div className="gold-hr"></div>
                </div>

                <div className="row g-0 align-items-stretch bg-hextech-dark">
                    {/* Selector Vertical de Abilități */}
                    <div className="col-lg-1 d-flex flex-lg-column justify-content-center align-items-center gap-3 p-3 bg-black-gradient">
                        {allAbilities.map((ability, index) => (
                            <div 
                                key={index}
                                onClick={() => setSelectedIndex(index)}
                                className={`ability-selector-item ${selectedIndex === index ? 'active' : ''}`}
                            >
                                <div className="ability-hex-border">
                                    <img 
                                        src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/${index === 0 ? 'passive' : 'spell'}/${ability.image.full}`}
                                        alt={ability.name}
                                        className="ability-icon-img"
                                    />
                                </div>
                                <span className="ability-key-label">{ability.type}</span>
                            </div>
                        ))}
                    </div>

                    {/* Detalii Abilitate */}
                    <div className="col-lg-4 p-4 p-lg-5 d-flex flex-column justify-content-center">
                        <div className="ability-content-box">
                            <span className="ability-type-tag">{currentAbility.type === 'P' ? 'Passive' : `Ability ${currentAbility.type}`}</span>
                            <h3 className="ability-display-name">{currentAbility.name}</h3>
                            <div className="ability-description-scroll">
                                <p className="ability-text" dangerouslySetInnerHTML={{ __html: currentAbility.description }} />
                            </div>
                        </div>
                    </div>

                    {/* Video Display */}
                    <div className="col-lg-7 position-relative overflow-hidden">
                        <div className="video-glow-effect"></div>
                        <video 
                            key={currentAbility.name}
                            autoPlay 
                            muted 
                            loop 
                            className="ability-video-player"
                        >
                            <source src={getAbilityVideoUrl(champion.key, selectedIndex)} type="video/mp4" />
                        </video>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .abilities-lol-container {
                    padding: 50px 0;
                    background: #010a13;
                }

                .abilities-main-title {
                    color: #f0e6d2;
                    text-transform: uppercase;
                    font-weight: 800;
                    font-style: italic;
                    letter-spacing: 4px;
                }

                .gold-hr {
                    width: 60px;
                    height: 2px;
                    background: #c8a84b;
                    margin: 20px auto;
                }

                .bg-hextech-dark {
                    background: #0a1428;
                    border: 1px solid #1e2328;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
                }

                .bg-black-gradient {
                    background: linear-gradient(180deg, #010a13 0%, #0a1428 100%);
                    border-right: 1px solid #1e2328;
                }

                /* Selector Styling */
                .ability-selector-item {
                    position: relative;
                    cursor: pointer;
                    transition: 0.3s;
                    text-align: center;
                }

                .ability-hex-border {
                    width: 60px;
                    height: 60px;
                    padding: 2px;
                    border: 2px solid #3c3c41;
                    transition: 0.3s;
                }

                .ability-selector-item.active .ability-hex-border,
                .ability-selector-item:hover .ability-hex-border {
                    border-color: #c8a84b;
                    box-shadow: 0 0 15px rgba(200, 168, 75, 0.4);
                }

                .ability-icon-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    filter: grayscale(1);
                    transition: 0.3s;
                }

                .ability-selector-item.active .ability-icon-img,
                .ability-selector-item:hover .ability-icon-img {
                    filter: grayscale(0);
                }

                .ability-key-label {
                    display: block;
                    margin-top: 5px;
                    font-size: 0.7rem;
                    color: #a09b8c;
                    font-weight: 800;
                }

                .ability-selector-item.active .ability-key-label {
                    color: #c8a84b;
                }

                /* Info Styling */
                .ability-type-tag {
                    color: #c8a84b;
                    text-transform: uppercase;
                    font-weight: 800;
                    font-size: 0.8rem;
                    letter-spacing: 2px;
                }

                .ability-display-name {
                    color: #f0e6d2;
                    font-size: 2rem;
                    font-weight: 800;
                    font-style: italic;
                    margin: 10px 0 25px 0;
                }

                .ability-description-scroll {
                    max-height: 300px;
                    overflow-y: auto;
                    padding-right: 15px;
                }

                .ability-text {
                    color: #a09b8c;
                    line-height: 1.6;
                    font-size: 1rem;
                }

                .ability-text span, .ability-text font {
                    color: #f0e6d2 !important;
                }

                /* Video Player Styling */
                .ability-video-player {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                }

                .video-glow-effect {
                    position: absolute;
                    inset: 0;
                    box-shadow: inset 0 0 100px rgba(0,0,0,0.8);
                    pointer-events: none;
                    z-index: 2;
                }

                /* Scrollbar Custom */
                .ability-description-scroll::-webkit-scrollbar { width: 4px; }
                .ability-description-scroll::-webkit-scrollbar-track { background: #010a13; }
                .ability-description-scroll::-webkit-scrollbar-thumb { background: #c8a84b; }
            `}} />
        </section>
    )
}