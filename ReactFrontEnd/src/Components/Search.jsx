import React from 'react'
import { Link } from 'react-router-dom';
//import "./SearchList.css";
import './SearchHeader.css'

const Search = (search) => {

  // console.log(search.activities);
  return (
    <div className='search-item flex flex-column flex-sb drop-shadow-2xl bg-nps-green-500'>
      <div className='search-item-img'>
        <img src = {search.cover_id} alt = "photo" />
      </div>
     <div className='search-item-info text-center'>
        <Link to = {`${search.parkcode}`} {...search}>
          <div className='search-item-info-item parkname fw-7 fs-18'>
            <span>{search.fullname}</span>
          </div>
        </Link>
        {/* //this displaces the park name and makes it a link to go to a new page */}


        <div className='search-item-info-item state fs-15'>
          <span className='text-capitalize fw-7'>State: </span>
          <span>{search.states}</span>
        </div>

        <div className='search-item-info-item activities fs-15'>
          <span className='text-capitalize fw-7'>Activities: </span>
          <span>{search.activities.map((activitie) => {
                    return activitie.name + ", "
            })}
            
            </span>

        </div> 

      </div>
    </div>  
  )
}

export default Search
