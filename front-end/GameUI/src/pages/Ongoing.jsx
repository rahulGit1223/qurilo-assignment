import React from 'react'
import GameTable from '../component/GameTable'

const Ongoing = () => {
  return (
    <div className='min-h-screen'>
        <GameTable status={"ongoing"}/>
    </div>
  )
}

export default Ongoing