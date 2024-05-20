
import {states} from "../constants/Enum"
import { useGlobalContext } from '../context'
import React, {useRef, useEffect} from 'react';




export default StateDropdown = () => {

    const {setSearchState} = useGlobalContext();
    const searchState = useRef('');



  return (
    <>
    <label for="state">Search by state:</label>

    <select name="state" id = "state" ref={searchState} />
    {states.map((state) => <option value = {state.abbreviation}>{state.name}</option> )}
    </>
)}
