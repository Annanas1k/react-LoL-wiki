import { useState } from "react"
import { getAbilityVideoUrl } from '../../utils/helpers'
import { useLanguageContext } from '../../hooks/useLanguageContext'


export const ChampionDetailsAbility = ({champion, version}) =>{
    const { t } = useLanguageContext();
    const [selectedIndex, setSelectedIndex] = useState(0)

    const allAbilities = [
        {...champion.passive, type: 'PASSIVE'},
        ...champion.spells.map((spell, i)=> ({...spell, type: ['Q', 'W', 'E', 'R'][i]}))
    ]

    const currentAbility = allAbilities[selectedIndex]


    return(
        <section className="abilities-section py-5 bg-dark text-white">
            <div className="container">
                <h2 className="display-4 italic fw-bold text-center mb-5">{t('abilities')}</h2>

                <div className="row align-items-center">
                    {/* Partea Stângă: Selectorul de Abilități */}
                    <div className="col-lg-5">
                        <div className="d-flex justify-content-between mb-4">
                            {allAbilities.map((ability, index) => (
                                <div 
                                    key={index}
                                    onClick={() => setSelectedIndex(index)}
                                    className={`ability-icon-wrapper ${selectedIndex === index ? 'active' : ''}`}
                                    style={{ cursor: 'pointer', transition: '0.3s' }}
                                >
                                    <img 
                                        src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/${index === 0 ? 'passive' : 'spell'}/${ability.image.full}`}
                                        alt={ability.name}
                                        className="img-fluid border border-2"
                                        style={{ 
                                            width: '64px', 
                                            borderColor: selectedIndex === index ? '#c4b000' : '#333' 
                                        }}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="ability-info">
                            <small className="text-riot-gold fw-bold">{currentAbility.type}</small>
                            <h3 className="fw-bold">{currentAbility.name}</h3>
                            <p className="text-secondary" dangerouslySetInnerHTML={{ __html: currentAbility.description }} />
                        </div>
                    </div>

                    {/* Partea Dreaptă: Video Player */}
                    <div className="col-lg-7">
                        <div className="video-container border border-gold p-1 bg-black">
                            <video 
                                key={currentAbility.name} // 'key' forțează reîncărcarea video-ului la schimbare
                                autoPlay 
                                muted 
                                loop 
                                className="w-100"
                            >
                                <source src={getAbilityVideoUrl(champion.key, selectedIndex)} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}