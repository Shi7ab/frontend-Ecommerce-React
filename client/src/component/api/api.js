const API_KEY = ''
const BASE_URL = ''

export const  getPopularMovie = async ()=>{
  const response = await fetch(BASE_URL+API_KEY);
  const data = await response.json()
  return data.results;
}

export const searchMovies = async (query)=>{
  const response = await fetch(BASE_URL + API_KEY);
  const data = await response.json()
  return data.results; 
}