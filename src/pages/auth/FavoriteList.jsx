import React, { useMemo, useState, useContext } from 'react';
import { UserContext } from '../../context/createContext';
import { useChampContext } from '../../hooks/useChampContext';
import { useLanguageContext } from '../../hooks/useLanguageContext';
import { ChampionCard } from '../../components/champion/ChampionCard'
import { ChampionListItem } from '../../components/champion/ChampionListItem';
import { ChampionSkeleton } from '../../components/skeletons/ChampionSkeleton';

export const FavoritesList = () => {
    const { user } = useContext(UserContext);
    const { champions, loading, version } = useChampContext();
    const { t } = useLanguageContext();
    const [query, setQuery] = useState("");
    const [viewMode, setViewMode] = useState("grid");

    const favoriteChampions = useMemo(() => {
        if (!user?.favorites) return [];
        return champions.filter(champ => {
            const isFav = user.favorites.includes(champ.id);
            return isFav && champ.name.toLowerCase().includes(query.toLowerCase());
        });
    }, [champions, user?.favorites, query]);

    return (
        <section className="favorites-content">
            <div className="profile-toolbar">
                <div className="toolbar-left">
                    <h3 className="toolbar-title">{t('favorites_title') || 'FAVORITE CHAMPIONS'}</h3>
                </div>
                <div className="toolbar-actions">
                    <input 
                        type="text" 
                        className="profile-search" 
                        placeholder={t('search_favorites_placeholder')} 
                        value={query} 
                        onChange={(e) => setQuery(e.target.value)} 
                    />
                    <div className="view-switcher">
                        <button className={viewMode === 'grid' ? 'active' : ''} onClick={() => setViewMode('grid')}>GRID</button>
                        <button className={viewMode === 'list' ? 'active' : ''} onClick={() => setViewMode('list')}>LIST</button>
                    </div>
                </div>
            </div>

            <div className={viewMode === "grid" ? "champions-grid" : "champions-list"}>
                {loading ? (
                    Array(6).fill(0).map((_, i) => <ChampionSkeleton key={i} />)
                ) : favoriteChampions.length > 0 ? (
                    favoriteChampions.map(champ => (
                        viewMode === "grid" 
                            ? <ChampionCard key={champ.id} champion={champ} /> 
                            : <ChampionListItem key={champ.id} champion={champ} version={version} />
                    ))
                ) : (
                    <div className="empty-state" style={{ padding: '100px', textAlign: 'center', opacity: 0.5 }}>
                        <p>{t('no_favorites_yet') || 'No champions found in your collection.'}</p>
                    </div>
                )}
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .profile-toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
                .toolbar-title { font-family: 'Syne'; letter-spacing: 1px; color: #c8aa55; }
                .profile-search { background: rgba(0,0,0,0.5); border: 1px solid rgba(200, 170, 85, 0.3); padding: 10px 20px; color: white; font-family: 'Rajdhani'; width: 250px; }
                .view-switcher { display: flex; gap: 5px; margin-left: 20px; }
                .view-switcher button { background: transparent; border: 1px solid rgba(200, 170, 85, 0.3); color: #c8aa55; padding: 5px 15px; cursor: pointer; font-size: 10px; font-weight: 800; }
                .view-switcher button.active { background: #c8aa55; color: #010a13; }
                .champions-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 25px; }
                .toolbar-actions { display: flex; align-items: center; }
            `}} />
        </section>
    );
};