import { useMemo, useState } from "react"
import { useChampContext } from "../../hooks/useChampContext"
import { ChampionCard } from '../../components/champion/ChampionCard'
import { ChampionSkeleton } from '../../components/skeletons/ChampionSkeleton'
import { useSearchParams } from "react-router"
import roles from "../../data/roles.json"
import { ChampionListItem } from "../../components/champion/ChampionListItem"
import { useLanguageContext } from '../../hooks/useLanguageContext'
import { FaThLarge, FaList } from 'react-icons/fa'

export const ChampionPage = () => {
    const { t } = useLanguageContext();
    const { champions, loading, version } = useChampContext()
    const [searchParams, setSearchParams] = useSearchParams()
    
    // Corecție logică: Folosim o stare inițială bazată pe localStorage
    const [viewMode, setViewMode] = useState(() => localStorage.getItem("viewMode") || "grid")

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

    const renderedChampions = useMemo(() => {
        return filteredChampions.map(champ => (
            viewMode === "grid" ? (
                <div className="col" key={champ.id}>
                    <ChampionCard champion={champ} />
                </div>
            ) : (
                <ChampionListItem key={champ.id} champion={champ} version={version} />
            )
        ))
    }, [version, filteredChampions, viewMode])

    const handleViewChange = (mode) => {
        setViewMode(mode)
        localStorage.setItem("viewMode", mode)
    }

    return (
        <div className="champion-page-container">
            {/* Header Section */}
            <header className="champion-page-header">
                <div className="container">
                    <h1 className="page-title text-uppercase">
                        {t('page_champions_title')}
                    </h1>
                    
                    {/* Toolbar: Search & View Toggle */}
                    <div className="champion-toolbar">
                        <div className="search-wrapper">
                            <input
                                type="text"
                                className="lol-search-input"
                                placeholder={t('search_placeholder')}
                                value={query}
                                onChange={(e) => updateFilter("search", e.target.value)}
                            />
                        </div>

                        <div className="view-toggle-group">
                            <button 
                                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                                onClick={() => handleViewChange('grid')}
                            >
                                <FaThLarge />
                            </button>                    
                            <button 
                                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                                onClick={() => handleViewChange('list')}
                            >
                                <FaList />
                            </button>
                        </div>
                    </div>

                    {/* Role Filter Bar */}
                    <div className="role-filter-bar">
                        <div 
                            className={`role-item ${activeRole === "All" ? 'active' : ''}`}
                            onClick={() => updateFilter("role", "All")}
                        >
                            <span className="role-text">{t('role_all')}</span>
                        </div>

                        {roles.map(role => (
                            <div 
                                key={role.id} 
                                className={`role-item ${activeRole === role.slug ? 'active' : ''}`}
                                onClick={() => updateFilter("role", role.slug)}
                            >
                                <img src={role.iconUrl} alt={role.id} className="role-icon" />
                                <span className="role-text">{t(`role_name_${role.id}`)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </header>

            {/* Content Grid */}
            <main className="container py-5">
                <div className={viewMode === "grid" ? "row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4" : "list-view-container"}>
                    {loading ? (
                        Array(15).fill(0).map((_, i) => <ChampionSkeleton key={i} />)
                    ) : (
                        renderedChampions
                    )}
                </div>
            </main>

            <style dangerouslySetInnerHTML={{ __html: `
                .champion-page-container {
                    background: #010a13;
                    min-height: 100vh;
                    color: #f0e6d2;
                }
                .champion-page-header {
                    background: linear-gradient(to bottom, #0a1428 0%, #010a13 100%);
                    padding: 60px 0 30px;
                    border-bottom: 1px solid #1e2328;
                }
                .page-title {
                    font-size: 3rem;
                    font-weight: 900;
                    color: #c8a84b;
                    letter-spacing: 5px;
                    font-style: italic;
                    text-align: center;
                    margin-bottom: 40px;
                }
                .champion-toolbar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 30px;
                    gap: 20px;
                }
                .search-wrapper { flex-grow: 1; }
                .lol-search-input {
                    width: 100%;
                    background: rgba(0,0,0,0.5);
                    border: 1px solid #1e2328;
                    padding: 12px 20px;
                    color: #f0e6d2;
                    transition: 0.3s;
                }
                .lol-search-input:focus {
                    outline: none;
                    border-color: #c8a84b;
                    box-shadow: 0 0 10px rgba(200, 168, 75, 0.2);
                }
                .view-toggle-group {
                    display: flex;
                    border: 1px solid #1e2328;
                }
                .view-btn {
                    background: transparent;
                    border: none;
                    color: #a09b8c;
                    padding: 12px 18px;
                    transition: 0.3s;
                }
                .view-btn.active {
                    background: #c8a84b;
                    color: #010a13;
                }
                .role-filter-bar {
                    display: flex;
                    justify-content: center;
                    gap: 15px;
                    flex-wrap: wrap;
                }
                .role-item {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 8px 16px;
                    cursor: pointer;
                    border: 1px solid transparent;
                    transition: 0.3s;
                    opacity: 0.6;
                }
                .role-item.active {
                    opacity: 1;
                    border-bottom: 2px solid #c8a84b;
                    background: rgba(200, 168, 75, 0.05);
                }
                .role-icon {
                    width: 24px;
                    height: 24px;
                    filter: brightness(0.8);
                }
                .role-text {
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    font-weight: 800;
                    letter-spacing: 1px;
                }
                .list-view-container {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }
            `}} />
        </div>
    )
}