
const BASE_URL = "https://ddragon.leagueoflegends.com/cdn"

export const getLatestVersion = async () =>{
    const res = await fetch("https://ddragon.leagueoflegends.com/api/versions.json")
    const verions = await res.json()
    return verions[0] 
}

export const fetchChampions = async (version, locale) =>{
    const res = await fetch(`${BASE_URL}/${version}/data/${locale}/champion.json`)
    const data = await res.json()
    return data.data
}

export const fetchChampionDetails = async (version, id, locale) =>{
    const res = await fetch(`${BASE_URL}/${version}/data/${locale}/champion/${id}.json`)
    const data = await  res.json()
    return data.data[id]
}


export const fetchItems = async (version, locale) => {
  const res = await fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/${locale}/item.json`)
  const data = await res.json()
  return data.data
}

export const fetchItemsTree = async (version, locale) => {
  const res = await fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/${locale}/item.json`)
  const data = await res.json()
  return data.tree
}


export const fetchRunes = async (version, locale) => {
  const res = await fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/${locale}/runesReforged.json`)
  const data = await res.json()
  return data
}

export const fetchSummonerSpells = async (version, locale) => {
    const riotLocale = locale === 'en' ? 'en_US' : 'ro_RO';
    const res = await fetch(`${BASE_URL}/${version}/data/${riotLocale}/summoner.json`);
    const data = await res.json();
    return data.data;
};