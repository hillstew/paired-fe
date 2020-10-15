import React, { useEffect, useState } from 'react'
import * as gql from '../../queries'
import { fetchData } from '../../utils'
import { connect } from 'react-redux'
import { setError } from '../../actions'
import RockCard from '../../components/RockCard'
import { rockOptInOut } from '../../thunks/rockOptOut'
import PebbleCard from '../../components/PebbleCard'
import PropTypes from 'prop-types'

const RockAndPebble = ({ user, rockandpebbles, setError, rockOptInOut }) => {

  const rockOptIn = user.rockOptIn
  const id = user.id
  const pebbles = rockandpebbles.pebbles
  const rocks = rockandpebbles.rocks


  const handleSubmit = async () => {
    await rockOptInOut(id)
  }
  
  return (
    <div className='RockAndPebble'>
      <h2 className='RockAndPebble--h2'>Rock & Pebble</h2>
      <p className='RockAndPebble--explanation'>
        View/Find your Rock (mentor) or Pebble (mentee)
      </p>
      <p className='RockAndPebble--explanation light'>
        e.g. A Mod 2 student would likely be a Rock for Mod 1 student
      </p>
      <section className='RockAndPebble--section'>
        <div className='RockAndPebble--div'>
          <div className='RockAndPebble--header--div'>
            <h2 className='RockAndPebble--header--h2'>Your Rock</h2>
          </div>
            { !rocks?.length ? 
              <>
                <p>You don't have a rock. Let's find one!</p>
                <button className='RockAndPebble--btn'>Get Rockin'</button>
              </>
              :
              <RockCard rocks={rocks}/>
            } 
        </div>
        <div className='RockAndPebble--div'>
          <div className='RockAndPebble--header--div--pebble'>
            <h2 className='RockAndPebble--header--h2'>Your Pebble(s)</h2>
            <div className='RockAndPebble--opt--div'>
            {rockOptIn ? 
              <button className='RockAndPebble--opt--btn' onClick={() => handleSubmit()}>Opt-out</button>
              :
              <button className='RockAndPebble--opt--btn'onClick={() => handleSubmit()}>Opt-in</button>
            }
            </div>
          </div>
          { !pebbles?.length ? 
            <>
              <p>        
                <span role='img' aria-label='pleading face emoji'>🥺</span>
                You don't have any pebbles right now. 
                <span role='img' aria-label='pleading face emoji'>🥺</span>
              </p>
              <p className='RockAndPebble--explanation light'>If you have opted in, keep waiting. If not, opt-in!</p>
            </>
            :
            <PebbleCard pebbles={pebbles}/> 
          } 
          </div>
      </section>
    </div>
  )
}

export const mapStateToProps = state => ({
  user: state.user,
  rockandpebbles: state.rockandpebbles,
})

export const mapDispatchToProps = dispatch => ({
  setError: error => dispatch(setError(error)),
  rockOptInOut: id => dispatch(rockOptInOut(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RockAndPebble)

RockAndPebble.propTypes = {
  setError: PropTypes.func,
  user: PropTypes.object,
  rockandpebbles: PropTypes.object,
  rocks: PropTypes.array,
  pebbles: PropTypes.array,
  rockOptIn: PropTypes.string
}
