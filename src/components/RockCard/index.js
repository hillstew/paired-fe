import React from 'react'

const RockCard = ({ rocks }) => {
  const rock = rocks[0]
  
  const createList = skills => {
    return skills.map((skill, i) => {
      return (
        <li key={i} className='RockCard-li'>
          {skill}
        </li>
      )
    })
  }

  return (
    <div>
      <h2>{rock.name} ({rock.pronouns})</h2>
      <img src={rock.image} alt={rock.name} className='RockCard--image' />
      <p>{rock.program} - Mod {rock.module}</p>
      <p>Slack: {rock.slack}</p>
      <div className='RockCard--skills-div'>
        <p className='RockCard--skills-p'>Skills</p>
        <ul className='RockCard--ul'>{createList(rock.skills)}</ul>
      </div>
      <button className='RockCard--discon-btn'>Discontinue</button>
    </div>
  )
}

export default RockCard

