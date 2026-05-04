
const BASE_URL = "https://ddragon.leagueoflegends.com/cdn"

export const getLatestVersion = async () =>{
    const res = await fetch("https://ddragon.leagueoflegends.com/api/versions.json")
    const verions = await res.json()
    return verions[0] 
}

export const fetchChampions = async (version) =>{
    const res = await fetch(`${BASE_URL}/${version}/data/en_US/champion.json`)
    const data = await res.json()
    return data.data
}

export const fetchChampionDetails = async (version, id) =>{
    const res = await fetch(`${BASE_URL}/${version}/data/en_US/champion/${id}.json`)
    const data = await  res.json()
    return data.data[id]
}


export const fetchItems = async (version) => {
  const res = await fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/item.json`)
  const data = await res.json()
  return data.data
}

export const fetchItemsTree = async (version) => {
  const res = await fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/item.json`)
  const data = await res.json()
  return data.tree
}


export const fetchRunes = async (version) => {
  const res = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/runesReforged.json`
  )
  const data = await res.json()
  return data
}