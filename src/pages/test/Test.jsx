import { useEffect } from "react"



export const Test =() =>{

    useEffect(()=>{
        const getData = async () =>{
   const url = 'https://league-of-legends-esports.p.rapidapi.com/tournaments?leagueId=101097443346691685';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '182fbfeae1mshda761e7f0b0bd4bp13aacfjsn00c2a4a89e61',
		'x-rapidapi-host': 'league-of-legends-esports.p.rapidapi.com',
		'Content-Type': 'application/json'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}
        }
        getData()
    },[])
}