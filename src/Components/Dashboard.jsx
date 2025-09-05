import React from 'react'
import Cateogery from './Cateogery'
import CarouselCard from './CarouselCard'
import Data1 from './Data1'
import Footer from './Footer'

const Dashboard = () => {
  return (
    <div className='mt-30 md:mt-22 p-2'>
     <Cateogery/>
     &nbsp;
     <CarouselCard/>
        &nbsp;
        <Data1/>
        &nbsp;
        
    </div>
  )
}

export default Dashboard
