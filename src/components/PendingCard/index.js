import React, { useState } from 'react'
import DenyReasons from '../../components/DenyReasons'

const PendingCard = ({ pendingPebbles, userId, activateRockAndPebble, declineRockPebbleRelationship }) => {
  const [ denyPebble, setdenyPebble ] = useState(false);

  const createList = skills => {
    return skills.map((skill, i) => {
      return (
        <li key={i} className='PebbleCard-li'>
          {skill}
        </li>
      )
    })
  }

  const handleSubmitDeny = () => {
    setdenyPebble(true);
  }

  const handleSubmitAccept = async (pebbleId) => {
      await activateRockAndPebble(userId, pebbleId);
  }

  const pendingDisplay = pendingPebbles.map((pebble, i) => 
    <div key={i}>
        {console.log(pebble)}
      <h2>{pebble.name} ({pebble.pronouns})</h2>
      <img src={pebble.image} alt={pebble.name} className='PebbleCard--image' />
      <p>{pebble.program} - Mod {pebble.module}</p>
      <p>Slack: {pebble.slack}</p>
      <div className='PebbleCard--skills-div'>
        <p className='PebbleCard--skills-p'>Skills</p>
        <ul className='PebbleCard--ul'>{createList(pebble.skills)}</ul>
      </div>

      <div className='RockAndPebble--opt--div'>  
      { !denyPebble &&
        <div>
           <button className='PebbleCard--discon-btn' onClick={() => handleSubmitDeny()}>Say No To Relationship</button> 
           <p> </p>
         <button className='PebbleCard--discon-btn' onClick={() => handleSubmitAccept(pebble.id)}>Say Yes To Relationship</button>
         </div>
      }
        </div>

        <div className='RockAndPebble--opt--div'>  
        <div>
            <DenyReasons userId = {userId} declineRockPebbleRelationship= {declineRockPebbleRelationship} pebbleId ={pebble.id}/>
         </div>
        </div> 

    </div>
  )
  return (
      <section>
          <h2 className='RockAndPebble--header--h2'>Pending Pebble(s)</h2>
          <div className='RockAndPebble--opt--div'> 
        {pendingDisplay}
        </div>
    </section>
  )
}

export default PendingCard;

