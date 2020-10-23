import React, {useState} from 'react'
import DiscontinueReasons from '../../components/DiscontinueReasons'

const RockCard = ({ rocks, pendingRocks, userId, discontinueRockPebbleRelationship }) => {
  const [ discontinue, setDiscontinue ] = useState('')
  const userRelationship = 'rock'

  const handleSubmit = (event) => {
    setTimeout(() => {
      setDiscontinue(event);
    }, 100);
  }

  const callback = (cancel) => {
    setDiscontinue(cancel)
  }

  const createList = skills => {
    return skills.map((skill, i) => {
      return (
        <li key={i} className='RockCard-li'>
          {skill}
        </li>
      )
    })
  }

  const RocksDisplay = rocks.map((rock, i) => 
    <div key={i}>
      <h2>{rock.name} ({rock.pronouns})</h2>
      <img src={rock.image} alt={rock.name} className='RockCard--image' />
      <p>{rock.program} - Mod {rock.module}</p>
      <p>Slack: {rock.slack}</p>
      <div className='RockCard--skills-div'>
        <p className='RockCard--skills-p'>Skills</p>
        <ul className='RockCard--ul'>{createList(rock.skills)}</ul>
      </div>
        { discontinue !== rock.id ?
         <button className='RockCard--discon-btn' onClick={() => handleSubmit(rock.id)}>Discontinue</button> 
        :
        <DiscontinueReasons parentCallback={callback} userId = {rock.id} 
        pebbleId = {userId} userRelationship = {userRelationship }
        discontinueRockPebbleRelationship= {discontinueRockPebbleRelationship}/>
        } 
    </div>
  )

  const PendingRocks = pendingRocks.map((rock, i) =>
    <div key={i}>
    <h2>{rock.name} ({rock.pronouns}) - Pending</h2>
    <img src={rock.image} alt={rock.name} className='RockCard--image' />
    <p>{rock.program} - Mod {rock.module}</p>
    <p>Slack: {rock.slack}</p>
    <div className='RockCard--skills-div'>
      <p className='RockCard--skills-p'>Skills</p>
      <ul className='RockCard--ul'>{createList(rock.skills)}</ul>
    </div>
  </div>
  ) 

 
  return (
      <section className='PebbleCard--section'>
        <div className='PebbleCard--div'>
          {RocksDisplay}
          {PendingRocks}
        </div>
      </section>
  )
}

export default RockCard

