import { useMemo, useState } from "react"
import { useChampContext } from "../../hooks/useChampContext"
import {ChampionCard} from '../../components/champion/ChampionCard'
import {ChampionSkeleton} from '../../components/skeletons/ChampionSkeleton'
import { useSearchParams } from "react-router"

import roles from "../../data/roles.json"
import { ChampionListItem } from "../../components/champion/ChampionListItem"
import { useLanguageContext } from '../../hooks/useLanguageContext'


export const ChampionPage = () =>{
    const { t } = useLanguageContext();
    const {champions, loading, version} = useChampContext()
    const [searchParams, setSearchParams] = useSearchParams()
    const [viewMode, setViewMode] = useState(()=>{
        return localStorage.getItem("viewMode") || "grid"
    })

    const query = searchParams.get("search") || ""
    const activeRole = searchParams.get("role") || "All"
    
    const updateFilter = (key, value) => {
        const newParams = new URLSearchParams(searchParams);
        if (value === "All" && key === "role") {
            newParams.delete("role");
        } else {
            newParams.set(key, value);
        }
        setSearchParams(newParams);
    }

    const filteredChampions = useMemo(() => {
        return champions.filter(champ => {
            const matchesSearch = champ.name.toLowerCase().includes(query.toLowerCase());
            const matchesRole = activeRole === "All" || champ.tags.includes(activeRole);
            return matchesSearch && matchesRole;
        });
    }, [champions, query, activeRole])

    const renderedChampions = useMemo(()=>{
        return filteredChampions.map(champ => (
            viewMode === "grid" ? (
                <ChampionCard key={champ.id} champion={champ} />
            ) : (

                <ChampionListItem key={champ.id} champion={champ} version={version} />
            )
        ))
    }, [version, filteredChampions, viewMode])

    const handleViewChange = (mode) =>{
        setViewMode(mode)
        localStorage.setItem("viewMode", mode)
    }

    return (
        <div className="container-fluid py-5" style={{ maxWidth: '1400px' }}>
            <div className="text-center mb-5">
                <h1 className="display-4 fw-bold italic text-riot-gold">
                    {t('page_champions_title')}
                </h1>
                                <div style={{ marginBottom: '20px' }}>
                    <button 
                        className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                        onClick={() => handleViewChange('grid')}
                    >
                        Grid
                    </button>                    
                    <button 
                        className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                        onClick={() => handleViewChange('lsit')}
                    >
                        List
                    </button>
                </div>

                <div className="mt-4">
                    <input
                        type="text"
                        placeholder={t('search_placeholder')}
                        value={query}
                        onChange={(e) => updateFilter("search", e.target.value)}
                    />
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px', flexWrap: 'wrap' }}>
                    
                    <div 
                        onClick={() => updateFilter("role", "All")}
                        style={{ cursor: 'pointer', opacity: activeRole === "All" ? 1 : 0.5 }}
                    >
                        <div style={{ fontWeight: activeRole === "All" ? 'bold' : 'normal' }}>
                            {t('role_all')}
                        </div>
                    </div>

                    {roles.map(role => (
                        <div key={role.id} onClick={() => updateFilter("role", role.slug)} style={{ cursor: 'pointer', textAlign: 'center', opacity: activeRole === role.slug ? 1 : 0.5 }}>
                            <img src={role.iconUrl} alt={role.id} style={{ width: '30px', height: '30px', display: 'block', margin: '0 auto' }} />
                            
                            <span style={{ fontSize: '10px', fontWeight: activeRole === role.slug ? 'bold' : 'normal' }}>
                                {t(`role_name_${role.id}`)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className={viewMode === "grid" ? "row row-cols-2 row-cols-md-3 row-cols-xl-5 g-4" : "d-flex flex-column"}>
                {loading ? (
                    Array(15).fill(0).map((_, i) => <ChampionSkeleton key={i} />)
                ) : (
                    renderedChampions
                )}
            </div>
        </div>
    )
}