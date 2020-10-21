import React from 'react'

const DiscontinueReasons = ({ parentCallback, 
                              userId, 
                              pebbleId, 
                              discontinueRockPebbleRelationship, 
                              userRelationship }) => {
                            

  const reasonOne = "I don’t have as much time anymore but it's been fun working together!"
  const reasonTwo = 'I am no longer interested in pairing together. Best of luck!'
  const reasonThree = "I've graduated and no longer need a mentor. Thanks for all of your help."

  const handleSubmit = async (event) => {
    await discontinueRockPebbleRelationship(userId, pebbleId, event, userRelationship)
  }

  const handleSubmitCancel = () => {
    setTimeout(() => {
      parentCallback('')
    }, 100);
  }
  
  return (
    <section>
      <p> Please Pick a reason that you are discontinuing this relationship. </p>
        <button className='PebbleCard--reason-btn' onClick={() => handleSubmit(reasonOne)}>{reasonOne}</button> 
           <p> </p>
        <button className='PebbleCard--reason-btn' onClick={() => handleSubmit(reasonTwo)} >{reasonTwo}</button>
         <p></p>
        <button className='PebbleCard--reason-btn' onClick={() => handleSubmit(reasonThree)} >{reasonThree}</button>
        <p></p>
        <button className='PebbleCard--reason-btn' onClick={() => handleSubmitCancel()} >Cancel</button>
  </section>
  )
}

export default DiscontinueReasons