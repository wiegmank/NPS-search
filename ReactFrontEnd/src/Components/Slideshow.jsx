import React, { useEffect, useState } from 'react'
import GlobalAPI from '../Services/GlobalAPI'
import { Carousel } from "flowbite-react"

const PIC_BASE_URL="";
function Slideshow() {
    const [picList, setPicList] = useState([]);
    useEffect(()=>{
        getParkPics();
    },[])
    const getParkPics=()=>{
        GlobalAPI.getImages.then(response=>{
            setPicList(response.data.data)
        })
    }
    
    const myArray = picList.map(item => item.fileInfo.url);

    return (
        //this div renders slide show using images from "picList". Interval can be changed 
        //by altering 'slideInterval'. Prev/next image buttons are hidden with leftControl
        //and rightControl set to non-breaking space...delete those props to make them visible
        <>
            <div className="h-80 pt-10">
                <Carousel slideInterval={5000} indicators={false} pauseOnHover leftControl="&nbsp;" rightControl="&nbsp;">
                    {picList.map((item, idx) => (
                        <img key={idx}src={item.fileInfo.url} className="min-w-full"/>
                    ))}
                </Carousel>
            </div>
        </>
    )
}

export default Slideshow