import React from 'react'

const PebbleCard = ({ pebbles }) => {
  const createList = skills => {
    return skills.map((skill, i) => {
      return (
        <li key={i} className='PebbleCard-li'>
          {skill}
        </li>
      )
    })
  }
  const pebblesDisplay = pebbles.map((pebble, i) => 
    <div key={i}>
      <h2>{pebble.name} ({pebble.pronouns})</h2>
      <img src={pebble.image} alt={pebble.name} className='PebbleCard--image' />
      <p>{pebble.program} - Mod {pebble.module}</p>
      <p>Slack: {pebble.slack}</p>
      <div className='PebbleCard--skills-div'>
        <p className='PebbleCard--skills-p'>Skills</p>
        <ul className='PebbleCard--ul'>{createList(pebble.skills)}</ul>
      </div>
      <button className='PebbleCard--discon-btn'>Discontinue</button>
    </div>
  )
  return (
    <section className='PebbleCard--section'>
      <div className='PebbleCard--div'>
        {pebblesDisplay}
      </div>
    </section>
  )
}

export default PebbleCard

