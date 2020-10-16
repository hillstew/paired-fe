import React from 'react'

const DenyReasons = ({ userId, pebbleId, declineRockPebbleRelationship }) => {

  const reasonOne = 'I don’t have the time I had when I signed up.'
  const reasonTwo = 'I am no longer interested in being a rock but forgot to opt out.'
  const reasonThree = 'I already have a pebble and don’t feel comfortable taking on more.'

  const handleSubmit = async (event) => {
    await declineRockPebbleRelationship(userId, pebbleId, event)
  }
  return (
      <section>
        <button className='PebbleCard--reason-btn' onClick={() => handleSubmit(reasonOne)}>{reasonOne}</button> 
           <p> </p>
        <button className='PebbleCard--reason-btn' onClick={() => handleSubmit(reasonTwo)} >{reasonTwo}</button>
         <p></p>
        <button className='PebbleCard--reason-btn' onClick={() => handleSubmit(reasonThree)} >{reasonThree}</button>
  </section>
  )
}

export default DenyReasons