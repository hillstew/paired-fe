import React, { useState } from 'react'
import DenyReasons from '../../components/DenyReasons'

const PendingCard = ({ pendingPebbles, userId, activateRockAndPebble, declineRockPebbleRelationship }) => {
  const [ denyPebble, setdenyPebble ] = useState('');

  const handleSubmitDeny = (event) => {
    setTimeout(() => {
      setdenyPebble(event);
    }, 100);
  }

  const callback = (cancel) => {
    setdenyPebble(cancel)
  }

  const handleSubmitAccept = async (pebbleId) => {
      await activateRockAndPebble(userId, pebbleId);
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
        <button className='PebbleCard--discon-btn' onClick={() => handleSubmitAccept(pebble.id)}>Say Yes To Relationship</button>
        </> :
         <DenyReasons  parentCallback={callback} userId = {userId} declineRockPebbleRelationship= {declineRockPebbleRelationship} pebbleId = {pebble.id}/>    
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

