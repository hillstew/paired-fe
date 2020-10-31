import React from 'react'
import { useAlert } from 'react-alert'

const DiscontinueReasons = ({ parentCallback, 
                              rock, 
                              pebble,
                              discontinueRockPebbleRelationship, 
                              userRelationship }) => {
                            

  const reasonOne = "I don’t have as much time anymore but it's been fun working together!"
  const reasonTwo = 'I am no longer interested in pairing together. Best of luck!'
  const reasonThree = "I've graduated and no longer need a mentor. Thanks for all of your help."
  const pebbleId = pebble.id
  const rockId = rock.id

  const findUser = () => {
    if (userRelationship === 'rock'){
      return rock
    }
    else {
      return pebble
    }
  }

  const alert = useAlert()

  const handleSubmit = async (event) => {
    await discontinueRockPebbleRelationship(rockId, pebbleId, event, userRelationship)
  alert.show(<div className='Alert'>An email has been sent to {findUser().name} letting {findUser().pronouns} know you've discontinued 
                                    the {userRelationship} relationship. Thanks for  using paired </div>)
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