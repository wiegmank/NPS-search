{/* KW - 3/23/24 */}

import React, {useState} from 'react'
// import logo from '../assets/Images/NPS-Logo.png'
// import logo from '../assets/Images/logo-mushroom.svg'
import logo from '../assets/Images/parktrippin-logo.png'

import {HiHome, HiMagnifyingGlass,HiStar,HiPaperAirplane,HiBars3} from "react-icons/hi2";
import {HiUser} from "react-icons/hi2";
import {HiPlus,HiDotsVertical} from "react-icons/hi";
import { list } from 'postcss';
import HeaderItem from './HeaderItem';


{/* this functional component is used to define the header bar content */}
function Header() {
    const [toggle, setToggle] = useState(false) //for drop-down on mobile menu

    // menu is used to define key/values for nav bar links. 
    //Name is the string value for nav bar link, icon refers 
    //to icon import from react-icon repo (react-icons.github.io for 
    //more, "hero-icon 2" collection is used to start)

    const menu = [
        {
            name:'HOME',
            icon:HiHome,
            path:'/'
        },
        {
            name:'PARK SEARCH',
            icon:HiMagnifyingGlass,
            path:'/parksearch'
        },
        {
            name:'FAVORITES',
            icon:HiStar,
            path:'/favorites'
        },
        {
            name:'ITINERARY',
            icon:HiPaperAirplane,
            path:'/itinerary'
        },
        {
            name:'PROFILE',
            icon:HiUser,
            path:'/profile'
        },
        {
            name: 'LOGIN',
            icon: HiUser,
            path: '/login'
        }

    ]
    return (
        <>
        
        <h1 className="bg-nps-green-999 text-center text-nps-green-200 font-bold underline underline-offset-8 pt-10">Park Trippin'</h1>
        <div className="flex items-center justify-center bg-nps-green-999">
            
            <div className="flex gap-8 items-center py-4">
            <img src={logo} className="w-[80px] md:w-[110px] object-cover"></img>
                
                {/* divs below iterate through menu const above to 
                render each into a navlink with its icon */}
                
                {/* this nav bar is visible ONLY when screen width 
                is OVER 7## px wide  */}
                <div className="hidden md:flex gap-8">
                    {menu.map((item, idx)=>(
                    <HeaderItem key={idx} name={item.name} Icon={item.icon} path={item.path}/>
                    ))}
                </div>
                
                {/* this nav bar is visible ONLY when screen width 
                is UNDER 7## px wide */}
                {/* <div className="flex md:hidden gap-5">
                    {menu.map((item, idx)=>(
                    <HeaderItem key={idx} name={""} Icon={item.icon} path={item.path}/>
                    ))}
                </div> */}
            
            {/* ### this div can be used if you want to collapse some 
            nav bar links when screen width is small (mobile) - the 
            hidden options could be displayed when clicking on 3 bars 
            or 3 dots ### */}
                <div className="md:hidden" onClick={() => setToggle(!toggle)}>
                    <HeaderItem name={''} Icon={HiBars3} />
                    {toggle? 
                        <div className=" absolute right-6 bg-nps-green-999 mt-4 border p-3 z-50">
                            {menu.map((item,idx)=>idx>=0&&(
                            <HeaderItem key={idx} name={item.name} Icon={item.icon} path={item.path}/>
                            ))}
                        </div> : null}
                </div> 
            </div>
        </div>
        </>

    )
}

export default Header