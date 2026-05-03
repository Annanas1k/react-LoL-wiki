import React, { useContext, useMemo, useState } from 'react';
import { UserContext } from '../../context/createContext';
import { useChampContext } from "../../hooks/useChampContext";
import { ChampionCard } from '../../components/champion/ChampionCard';
import { ChampionListItem } from "../../components/champion/ChampionListItem";
import { ChampionSkeleton } from '../../components/skeletons/ChampionSkeleton';

export const UserProfile = () => {
    const { user, logout } = useContext(UserContext);
    const { champions, loading, version } = useChampContext();
    
    const [query, setQuery] = useState("");
    const [viewMode, setViewMode] = useState(() => {
        return localStorage.getItem("viewMode") || "grid";
    });

    // 1. Filtrăm campionii: trebuie să fie în lista de favorite ȘI să respecte căutarea
    const favoriteChampions = useMemo(() => {
        if (!user?.favorites) return [];
        
        return champions.filter(champ => {
            const isFav = user.favorites.includes(champ.id);
            const matchesSearch = champ.name.toLowerCase().includes(query.toLowerCase());
            return isFav && matchesSearch;
        });
    }, [champions, user?.favorites, query]);

    const handleViewChange = (mode) => {
        setViewMode(mode);
        localStorage.setItem("viewMode", mode);
    };

    return (
        <div className="container-fluid min-vh-100 bg-black text-white py-5">
            <div className="container" style={{ maxWidth: '1400px' }}>
                
                {/* Header Profil */}
                <div className="row mb-5 align-items-center bg-dark p-4 rounded-3 border border-secondary">
                    <div className="col-md-auto">
                        <div className="rounded-circle border border-riot-gold p-1" style={{ width: '120px', height: '120px', overflow: 'hidden' }}>
                            <img src="https://ddragon.leagueoflegends.com/cdn/14.1.1/img/profileicon/588.png" className="img-fluid" alt="Avatar" />
                        </div>
                    </div>
                    <div className="col-md">
                        <h1 className="display-5 fw-bold italic mb-1 text-riot-gold">{user?.username?.toUpperCase()}</h1>
                        <p className="text-secondary mb-3">{user?.email}</p>
                        <button onClick={logout} className="btn btn-outline-danger btn-sm fw-bold px-4">SIGN OUT</button>
                    </div>
                </div>

                {/* Bara de unelte (Search & View Mode) similară cu ChampionPage */}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">
                    <h3 className="fw-bold italic mb-0">FAVORITE CHAMPIONS</h3>
                    
                    <div className="d-flex gap-3 align-items-center">
                        <input
                            type="text"
                            className="form-control bg-dark border-secondary text-white shadow-none"
                            placeholder="Search in favorites..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            style={{ width: '250px' }}
                        />
                        
                        <div className="btn-group border border-secondary rounded">
                            <button 
                                className={`btn btn-sm ${viewMode === 'grid' ? 'btn-riot-gold' : 'btn-dark'}`}
                                onClick={() => handleViewChange('grid')}
                            >
                                Grid
                            </button>
                            <button 
                                className={`btn btn-sm ${viewMode === 'list' ? 'btn-riot-gold' : 'btn-dark'}`}
                                onClick={() => handleViewChange('list')}
                            >
                                List
                            </button>
                        </div>
                    </div>
                </div>

                {/* Grid-ul sau Lista de campioni */}
                <div className={viewMode === "grid" ? "row row-cols-2 row-cols-md-3 row-cols-xl-5 g-4" : "d-flex flex-column gap-2"}>
                    {loading ? (
                        Array(5).fill(0).map((_, i) => <ChampionSkeleton key={i} />)
                    ) : favoriteChampions.length > 0 ? (
                        favoriteChampions.map(champ => (
                            viewMode === "grid" ? (
                                <ChampionCard key={champ.id} champion={champ} />
                            ) : (
                                <ChampionListItem key={champ.id} champion={champ} version={version} />
                            )
                        ))
                    ) : (
                        <div className="col-12 text-center py-5 border border-dashed border-secondary rounded">
                            <p className="text-secondary mb-0">
                                {query ? "No favorites match your search." : "You haven't added any favorites yet."}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};