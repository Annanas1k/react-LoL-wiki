import { useNavigate } from "react-router"
import { useUserContext } from "../../hooks/useUserContext"
import { FaHeart, FaRegHeart } from "react-icons/fa"



export const ChampionCard = ({champion}) => {
    const navigate = useNavigate()
    const {user, toggleFavorite} = useUserContext()

    const isFavorite = user?.favorites?.includes(champion.id);

    const handleFavoriteClick = (e) => {
        e.preventDefault(); 
        e.stopPropagation();
        
        if (!user) {
            alert("You need to be an user!");
            return;
        }
        
        toggleFavorite(champion.id);
    }

    const cardImageUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`

    return(
        <div className="col-6 col-md-4 col-lg-2 mb-4">
            <div 
                className="card bg-riot-gray border-0 h-100 champion-hover-card"
                onClick={()=>navigate(`/champions/${champion.id}`)}
                style={{cursor: "pointer", transition: "transform 0.2s", width: "300px"}}>
                <img src={cardImageUrl} alt={champion.name} className="card-img-top"/>
                <button 
                onClick={handleFavoriteClick}
                className="position-absolute top-0 end-0 m-2 btn btn-link p-0"
                style={{ zIndex: 10, fontSize: '1.5rem', textDecoration: 'none' }}
            >
                {isFavorite ? (
                    <FaHeart /> // Inima plină dacă e favorit
                ) : (
                    <FaRegHeart /> // Inima goală
                )}
            </button>
                <div className="card-body p-2 text-center">
                    <h6 className="card-title text-uppercase fw-bold m-0" style={{fontSize: "0.8rem"}}>
                        {champion.name}
                    </h6>
                </div>
            </div>
        </div>
    )




}