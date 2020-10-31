import React from 'react'
import { useAlert } from 'react-alert'

const DenyReasons = ({ parentCallback, rock, pebble, declineRockPebbleRelationship }) => {

  const reasonOne = 'I don’t have the time I had when I signed up.'
  const reasonTwo = 'I am no longer interested in being a rock but forgot to opt out.'
  const reasonThree = 'I already have a pebble and don’t feel comfortable taking on more.'

  const pebbleId = pebble.id
  const rockId = rock.id

  const alert = useAlert()

  const handleSubmit = async (event) => {
    await declineRockPebbleRelationship(rockId, pebbleId, event)
  alert.show(<div className='Alert'> An email has been sent to {pebble.name} letting them know you were not able 
                                     to accept the Rock request for the reason you indicated. Thanks for using Paired! </div>)
  }

  const handleSubmitCancel = () => {
    setTimeout(() => {
      parentCallback('')
    }, 100);
  }

  return (
    <section>
          <p> Please Pick a reason that you are not accepting this Pebble. </p>
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

export default DenyReasons