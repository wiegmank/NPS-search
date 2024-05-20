import React, {useRef, useEffect, useState} from 'react';
import { FaSearch } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../context'
import {states} from "../constants/Enum"
import GlobalAPI from "../Services/GlobalAPI"



const SearchForm = () => {

  const {setSearchTerm} = useGlobalContext();
  const {setSearchState} = useGlobalContext();
  const {setActivity} = useGlobalContext();
  const searchState = useRef('');
  const searchText = useRef('');
  const searchActivity = useRef('');
  const [activityList, setActivityList] = useState([]);
  useEffect(() => {
    getActivityList();
  }, [])
  const getActivityList = () => {
    GlobalAPI.getActivities.then(response => {
      setActivityList(response.data.data);
    })
  }
  
  const navigate = useNavigate();

  useEffect(() => {searchText.current.focus(); searchState.current.focus(); searchActivity.current.focus(); []});
  const handleSubmit = (e) => {
    e.preventDefault(); //actually allows the search not just hte defualt
    let tempSearchTerm = searchText
    setSearchState(searchState.current.value); 
    setActivity(searchActivity.current.value);
    if(tempSearchTerm.length === 0){
      setSearchTerm(""); //defualt searchterm

    } else {
      setSearchTerm(searchText.current.value);
    }

    navigate("/parksearch/search");
  };
  
  //^^^what makes the button clickable

  //creates the search container

  return (
    <div className='search-form'>
    <div className='container'>
      <div className='search-form-content'>
        <form className='search-form' onSubmit={handleSubmit}>
          
          <label htmlFor="state">Search by state:</label>
          <select name="state" id = "state" ref={searchState} className='text-black' >
          {states.map((state, index) => <option value = {state.abbreviation} key={index}>{state.name}</option> )}
          </select>
          <label htmlFor="activity">Search by activity:</label>
          <select name="activity" id = "activity" ref={searchActivity} className='text-black' >
          <option value = "" key="defaultActivity">All Activities</option>
          {activityList.map((activity, index) => <option value = {activity.id} key={index}>{activity.name}</option> )}
          </select>
          <div className='search-form-elem flex flex-sb bg-white text-black'>
            <input type = "text" className='form-control text-gray-500 w-full' placeholder='Search by keyword' ref = {searchText}/>
            <button type = "submit" className='flex flex-c' onClick={handleSubmit}>
              <FaSearch className='text-black' size = {32} />
            </button>
          </div>

        </form>
      </div>
    </div>
  </div>
  )
}

export default SearchForm
