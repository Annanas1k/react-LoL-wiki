import { useParams } from "react-router"
import { useChampContext } from "../../hooks/useChampContext"
import { useEffect, useState, useMemo } from "react"
import { fetchChampionDetails } from "../../services/api"
import { ChampionDetailsInfo } from "../../components/champion/ChampionDetailsInfo"
import { ChampionDetailsAbility } from "../../components/champion/ChampionDetailAbitily"
import { ChampionDetailsSkins } from "../../components/champion/ChampionDetailsSkins"
import { useLanguageContext } from '../../hooks/useLanguageContext'
import { LoadingSpinner } from "../NotFound/LoadingSpinner"

export const ChampionDetails =() =>{

    const  {championId} = useParams()
    const { version } = useChampContext()
    const { locale, t } = useLanguageContext();
const riotLocale = useMemo(() => {
  switch (locale) {
    case 'ru':
      return 'ru_RU';
    case 'ro':
      return 'ro_RO';
    default:
      return 'en_US';
  }
}, [locale]);    const [champion, setChampion] = useState(null)
    const [loading, setLoading] = useState(true)


    useEffect(()=>{
        const getDetails = async () =>{
            if(!version) return null
            const newChampion = await fetchChampionDetails(version, championId, riotLocale)
            setChampion(newChampion)
            setLoading(false)
        }
        if(version){
            getDetails()
        }
    }, [championId, version, riotLocale])

    if(loading) return <LoadingSpinner />
    if(!champion) return <p>{t('champ_404')}</p>


    return(
        <>
        <div className="champion-details-wrapper">
             {console.log(champion)}
             <ChampionDetailsInfo champion={champion} />
             <ChampionDetailsAbility champion={champion} version={version} />
             <ChampionDetailsSkins champion={champion} />
        </div>
        </>
    )
}