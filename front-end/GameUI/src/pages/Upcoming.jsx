import React from 'react'
import GameTable from '../component/GameTable'

const Upcoming = () => {
  return (
    <div className='min-h-screen'>
        <GameTable status={"upcoming"}/>
    </div>
  )
}

export default Upcoming