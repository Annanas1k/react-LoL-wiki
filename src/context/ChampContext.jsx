import { useEffect, useMemo, useState } from "react"
import { fetchChampions, fetchItems, fetchItemsTree, getLatestVersion } from "../services/api"
import { ChampContext } from "./createContext"

export const ChampProvider = ({ children }) => {
  const [champions, setChampions] = useState([])
  const [items, setItems] = useState({})
  const [itemTree, setItemTree] = useState([])
  const [loading, setLoading] = useState(true)
  const [version, setVersion] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const latestVersion = await getLatestVersion()
        setVersion(latestVersion)

        const cachedVersion = localStorage.getItem('riot_version')
        const cachedChamp = localStorage.getItem('champions_data')
        const cachedItems = localStorage.getItem('items_data')
        const cachedItemsTree = localStorage.getItem('items_tree_data')

        if (cachedVersion === latestVersion && cachedChamp && cachedItems && cachedItemsTree) {
          setChampions(JSON.parse(cachedChamp))
          setItems(JSON.parse(cachedItems))
          setItemTree(JSON.parse(cachedItemsTree))
          setLoading(false)
        } else {
          const [champsData, itemsData, itemsTreeData] = await Promise.all([
            fetchChampions(latestVersion),
            fetchItems(latestVersion),
            fetchItemsTree(latestVersion)
          ])

          const champsArray = Object.values(champsData)
          localStorage.setItem('champions_data', JSON.stringify(champsArray))
          localStorage.setItem('items_data', JSON.stringify(itemsData))
          localStorage.setItem('items_tree_data', JSON.stringify(itemsTreeData))
          localStorage.setItem('riot_version', latestVersion)

          setChampions(champsArray)
          setItems(itemsData)
          setItemTree(itemsTreeData)
          setLoading(false)
        }
      } catch (err) {
        console.error("Failed to fetch champions: ", err)
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const value = useMemo(() => ({
    champions, items, itemTree, loading, version
  }), [champions, items, itemTree, loading, version])

  return (
    <ChampContext.Provider value={value}>
      {children}
    </ChampContext.Provider>
  )
}