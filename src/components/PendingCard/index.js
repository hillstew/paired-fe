import React, { useState } from 'react'
import DenyReasons from '../../components/DenyReasons'
import { useAlert } from 'react-alert'

const PendingCard = ({ pendingPebbles, user, activateRockAndPebble, declineRockPebbleRelationship }) => {
  const [ denyPebble, setdenyPebble ] = useState('');

  const alert = useAlert()

  const handleSubmitDeny = (event) => {
    setTimeout(() => {
      setdenyPebble(event);
    }, 100);
  }

  const callback = (cancel) => {
    setdenyPebble(cancel)
  }

  const handleSubmitAccept = async (pebbleId, pebbleName) => {
      await activateRockAndPebble(user.id, pebbleId);
      alert.show(<div className='Alert'> {pebbleName} will be notified that you have approved this relationship. </div>)
  }

  const pendingDisplay = pendingPebbles.map((pebble, i) => 
    <div key={i}>
      <h2>{pebble.name} ({pebble.pronouns})</h2>
      <img src={pebble.image} alt={pebble.name} className='PebbleCard--image' />
      <p>{pebble.program} - Mod {pebble.module}</p>
      <p>Slack: {pebble.slack}</p>
      <div className='RockAndPebble--opt--div'>
            { denyPebble !== pebble.id ? 
          <>
        <button className='PebbleCard--discon-btn' onClick={() => handleSubmitDeny(pebble.id)}>Say No To Relationship</button> <br></br>
        <button className='PebbleCard--discon-btn' onClick={() => handleSubmitAccept(pebble.id, pebble.name)}>Say Yes To Relationship</button>
        </> :
         <DenyReasons  parentCallback={callback} rock = {user} declineRockPebbleRelationship= {declineRockPebbleRelationship} pebble = {pebble}/>    
        }
            </div> 
      </div>
  )
  return ( 
    <section className='PebbleCard--section'>
      <div className='PebbleCard--div'>
        {pendingDisplay}
      </div>
    </section>
  )
}

export default PendingCard;

