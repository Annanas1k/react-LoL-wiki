export const getChampImage = (version, id) => 
    `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${id}.png`;

export const getChampLoading = (id) =>
    `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${id}_0.jpg`

export const getChampSplash = (id) =>
     `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_0.jpg`;

export const getChampSkinSplash = (id, num) =>
    `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_${num}.jpg`

export const getAbilityVideoUrl = (key, index) => {
    // Transformăm key în format de 4 cifre (ex: 103 -> 0103)
    const paddedKey = key.padStart(4, '0');
    // Mapăm indexul la codul Riot (0=P, 1=Q, 2=W, 3=E, 4=R)
    const codes = ["P1", "Q1", "W1", "E1", "R1"];
    return `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${paddedKey}/ability_${paddedKey}_${codes[index]}.mp4`;
};