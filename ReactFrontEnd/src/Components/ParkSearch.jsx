import React from 'react'
import SearchHeader from './SearchHeader'
import { Outlet } from 'react-router-dom'
import './SearchHeader.css'

const ParkSearch = () => {
  return (
    <>
      <SearchHeader />
      <Outlet /> 
    </>
  )
}

export default ParkSearch

// import React from 'react'
// import Header from './Header'
// import SearchForm from './SearchForm'
// import './SearchHeader.css'

// const ParkSearch = () => {
//   return (
//     <>
//         <Header />
//             <div className='holder'>
//               <header className='search-header'>
                
//                 <div className='search-header-content flex flex-c text-center text-white'>
//                     <h2 className='search-header-title text-capitalize'>
//                     Search for a park to visit!
//                     </h2>
//                   <SearchForm />   
                    
//                 </div>
                
//               </header>

//             </div>
//     </>
//   )
// }

// export default ParkSearch