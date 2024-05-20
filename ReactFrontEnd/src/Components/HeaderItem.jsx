{/* KW - 3/23/24 */}

import React from 'react'
import { Link } from 'react-router-dom'

{/* this generates each nav link from the "menu" const in Header.jsx into its own element in the Header */}
function HeaderItem({name,Icon,path}) {
  return (
    <>
        <Link to={path}>

          <div className="text-nps-green-200 flex items-center gap-3 
          text-[18px] font-semibold cursor-pointer hover:underline underline-offset-8">
            <Icon/>
            <h2 className="">{name}</h2>
          </div>
        </Link>
    </>
  )
}

export default HeaderItem