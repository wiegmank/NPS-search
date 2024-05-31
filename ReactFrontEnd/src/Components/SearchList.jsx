import React from 'react';
import { useGlobalContext } from '../context';
import Search from "./Search";
import coverImg from "../images/photo2.jpg";
//import "./SearchList.css";
import './SearchHeader.css'

const api_key=import.meta.env.VITE_REACT_APP_NPS_API_KEY;

const SearchList = () => {
  const {searches, resultName} = useGlobalContext();
  const parksWithCovers = searches.map((singleSearch) => {
    return {
      ...singleSearch,
    cover_img: singleSearch.cover_id ? `https://developer.nps.gov/api/v1/multimedia/galleries/assets?limit=50&q=${singleSearch.cover_id}&api_key=${api_key}` : coverImg
    }
    //This shows the picture in the search
  });

   //console.log(parksWithCovers);

  return (
    <section className='searchlist bg-nps-green-300'>
      <div className='container'>
        <div className='section-title'>
          <h2>{resultName}</h2>  
          {/* ^^^"your search results" */}
        </div>
        <div className='searchlist-content grid'>
          {
            //limits search and shows results
            parksWithCovers.slice(0, 20).map((item, index) => {
              return (
                <Search key = {index} {...item} />
              )
            })
          }
        </div>
      </div>
    </section>
  )
}

export default SearchList