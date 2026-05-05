import { useState, useEffect } from 'react';
import { useChampContext } from '../../hooks/useChampContext';
import { useLanguageContext } from '../../hooks/useLanguageContext'; //
import { fetchSummonerSpells } from '../../services/api'; //
import itemsData from '../../data/itemsData.json';

export const AbilitiesSection = () => {
  const { version } = useChampContext();
  const { locale, t } = useLanguageContext(); //
  const [activeTab, setActiveTab] = useState('summoners');
  const [summoners, setSummoners] = useState([]);

  const cleanDescription = (text) => text.replace(/<[^>]*>?/gm, '');

  useEffect(() => {
    const getSummoners = async () => {
      try {
        if (!version) return;
        
        // Fetch direct de la Riot pentru a primi descrierile traduse
        const data = await fetchSummonerSpells(version, locale);
        
        const relevantIds = ['SummonerFlash', 'SummonerDot', 'SummonerTeleport', 'SummonerSmite', 'SummonerHeal', 'SummonerExhaust'];
        const filtered = Object.values(data).filter(s => relevantIds.includes(s.id));
        setSummoners(filtered);
      } catch (err) {
        console.error("Failed to fetch summoners:", err);
      }
    };

    getSummoners();
  }, [version, locale]); // Se declanșează la schimbarea limbii

  return (
    <section className="abilities-section py-5" style={{ background: '#010a13', color: '#f0e6d2' }}>
      <div className="container">
        {/* Header Tradus */}
        <div className="text-center mb-5">
            <h2 className="display-4 fw-bold text-uppercase italic" style={{ color: '#c8a84b', fontStyle: 'italic' }}>
                {t('abilities_title')} <span className="text-light">{t('abilities_accent')}</span>
            </h2>
        </div>

        {/* Tab Navigation Tradus */}
        <div className="d-flex justify-content-center gap-3 mb-5">
          <button
            onClick={() => setActiveTab('summoners')}
            className={`btn px-4 py-2 text-uppercase fw-bold ${activeTab === 'summoners' ? 'btn-warning active' : 'btn-outline-secondary text-light'}`}
          >
            {t('tab_summoners')}
          </button>
          <button
            onClick={() => setActiveTab('items')}
            className={`btn px-4 py-2 text-uppercase fw-bold ${activeTab === 'items' ? 'btn-warning active' : 'btn-outline-secondary text-light'}`}
          >
            {t('tab_items')}
          </button>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            {activeTab === 'summoners' && (
              <div className="row g-4">
                {summoners.map(s => (
                  <div key={s.id} className="col-md-6">
                    <div className="d-flex align-items-start gap-3 p-3 h-100 rounded" 
                         style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(200, 168, 75, 0.2)' }}>
                      <img 
                        src={`https://ddragon.leagueoflegends.com/cdn/${version || '14.9.1'}/img/spell/${s.image.full}`} 
                        alt={s.name} 
                        className="rounded border border-warning" 
                        width="54" height="54" 
                      />
                      <div>
                        <div className="fw-bold text-warning text-uppercase mb-1" style={{ fontSize: '0.9rem' }}>{s.name}</div>
                        <div className="small opacity-75" style={{ fontSize: '0.8rem', lineHeight: '1.4' }}>
                          {cleanDescription(s.description)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'items' && (
              <div className="items-view animate-fade-in">
                  <div className="row g-4">
                    {itemsData.phases.map(phase => {
                      // Generăm slug-ul pentru cheia de traducere (ex: "Starter Items" -> "starter_items")
                      const phaseKey = phase.name.toLowerCase().replace(/ /g, '_');
                      
                      return (
                        <div key={phase.name} className="col-md-4">
                          <div className="p-4 rounded h-100 text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #333' }}>
                            <div className="display-6 mb-3">{phase.icon}</div>
                            
                            <h5 className="text-uppercase fw-bold" style={{ color: phase.color }}>
                              {t(`phase_${phaseKey}_name`)}
                            </h5>
                            
                            <p className="small opacity-50 mt-2">
                              {t(`phase_${phaseKey}_desc`)}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-5 row justify-content-center">
                    {itemsData.goldSources.map((source, index) => (
                      <div key={index} className="col-auto px-4 border-end border-secondary last-border-none">
                        <span className="text-warning fw-bold">{source.val}</span>
                        <span className="ms-2 opacity-75 small">
                          {source.src} 
                        </span>
                      </div>
                    ))}
                  </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};