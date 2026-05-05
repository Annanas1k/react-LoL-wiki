import { useState, useEffect } from 'react';
import summonersData from '../../data/summoner.json'; 
import itemsData from '../../data/itemsData.json';
import { useChampContext } from '../../hooks/useChampContext';
export const AbilitiesSection = () => {
  const { version } = useChampContext()
  const [activeTab, setActiveTab] = useState('summoners');
  const [summoners, setSummoners] = useState([]);

  // Curățarea descrierilor de tag-uri HTML (ex: <br>, <stats>)
  const cleanDescription = (text) => text.replace(/<[^>]*>?/gm, '');

  useEffect(() => {
    // Extragem spell-urile relevante din fișierul JSON importat
    const relevantIds = ['SummonerFlash', 'SummonerDot', 'SummonerTeleport', 'SummonerSmite', 'SummonerHeal', 'SummonerExhaust'];
    const filtered = Object.values(summonersData.data).filter(s => relevantIds.includes(s.id));
    setSummoners(filtered);
  }, []);

  return (
    <section className="abilities-section py-5" style={{ background: '#010a13', color: '#f0e6d2' }}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
            <h2 className="display-4 fw-bold text-uppercase italic" style={{ color: '#c8a84b', fontStyle: 'italic' }}>
                Master Your <span className="text-light">Tools</span>
            </h2>
        </div>

        {/* Tab Navigation */}
        <div className="d-flex justify-content-center gap-3 mb-5">
          {['summoners', 'items'].map(id => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`btn px-4 py-2 text-uppercase fw-bold ${activeTab === id ? 'btn-warning active' : 'btn-outline-secondary text-light'}`}
            >
              {id === 'summoners' ? 'Summoner Spells' : 'Items & Gold'}
            </button>
          ))}
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
                    {/* Presupunând că itemsData are o structură similară cu cea din context */}
                    {itemsData.phases.map(phase => (
                      <div key={phase.name} className="col-md-4">
                        <div className="p-4 rounded h-100 text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #333' }}>
                          <div className="display-6 mb-3">{phase.icon}</div>
                          <h5 className="text-uppercase fw-bold" style={{ color: phase.color }}>{phase.name}</h5>
                          <p className="small opacity-50 mt-2">{phase.desc}</p>
                        </div>
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