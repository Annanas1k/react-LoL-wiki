import { useEffect, useMemo, useState } from "react"
import { fetchChampions, fetchItems, fetchItemsTree, fetchRunes, getLatestVersion } from "../services/api"
import { ChampContext } from "./createContext"
import { useLanguageContext } from "../hooks/useLanguageContext"

export const ChampProvider = ({ children }) => {
  const { locale } = useLanguageContext()
  const riotLocale = useMemo(() => locale === 'en' ? 'en_US' : 'ro_RO', [locale]);

  const [champions, setChampions] = useState([])
  const [items, setItems] = useState({})
  const [itemTree, setItemTree] = useState([])
  const [runes, setRunes] = useState([])
  const [loading, setLoading] = useState(true)
  const [version, setVersion] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true) 
        const latestVersion = await getLatestVersion()
        setVersion(latestVersion)

        const cachedVersion = localStorage.getItem('riot_version')
        const cachedChamp = localStorage.getItem(`champions_data_${riotLocale}`)
        const cachedItems = localStorage.getItem(`items_data_${riotLocale}`)
        const cachedItemsTree = localStorage.getItem(`items_tree_data_${riotLocale}`)
        const cachedRunes     = localStorage.getItem(`runes_data_${riotLocale}`)

        if (cachedVersion === latestVersion 
              && cachedChamp 
              && cachedItems 
              && cachedItemsTree
              && cachedRunes) {

          setChampions(JSON.parse(cachedChamp))
          setItems(JSON.parse(cachedItems))
          setItemTree(JSON.parse(cachedItemsTree))
          setRunes(JSON.parse(cachedRunes))
          setLoading(false)
        } else {
          const [champsData, itemsData, itemsTreeData, runesData] = await Promise.all([
            fetchChampions(latestVersion, riotLocale),
            fetchItems(latestVersion, riotLocale),
            fetchItemsTree(latestVersion, riotLocale),
            fetchRunes(latestVersion, riotLocale)
          ])

          const champsArray = Object.values(champsData)
          localStorage.setItem(`champions_data_${riotLocale}`, JSON.stringify(champsArray))
          localStorage.setItem(`items_data_${riotLocale}`, JSON.stringify(itemsData))
          localStorage.setItem(`items_tree_data_${riotLocale}`, JSON.stringify(itemsTreeData))
          localStorage.setItem('riot_version', latestVersion)
          localStorage.setItem(`runes_data_${riotLocale}`, JSON.stringify(runesData))

          setChampions(champsArray)
          setItems(itemsData)
          setItemTree(itemsTreeData)
          setRunes(runesData)
          setLoading(false)
        }
      } catch (err) {
        console.error("Failed to fetch data: ", err)
        setLoading(false)
      }
    }

    loadData()
  }, [riotLocale]) 

  const value = useMemo(() => ({
    champions, items, itemTree, runes, loading, version
  }), [champions, items, itemTree, runes, loading, version])

  return (
    <ChampContext.Provider value={value}>
      {children}
    </ChampContext.Provider>
  )
}