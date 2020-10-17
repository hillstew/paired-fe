import React from 'react'
import { connect } from 'react-redux'
import { setError } from '../../actions'
import RockCard from '../../components/RockCard'
import { activateRockAndPebble} from '../../thunks/activateRockAndPebble'
import { declineRockPebbleRelationship} from '../../thunks/declineRockPebble'
import { discontinueRockPebbleRelationship} from '../../thunks/discontinueRockPebble'
import { rockOptInOut } from '../../thunks/rockOptOut'
import PebbleCard from '../../components/PebbleCard'
import PendingCard from '../../components/PendingCard'
import PropTypes from 'prop-types'

const RockAndPebble = ({ user, 
                         rockandpebbles, 
                         rockOptInOut, 
                         activateRockAndPebble,
                         declineRockPebbleRelationship, 
                         discontinueRockPebbleRelationship}) => {

  const rockOptIn = user.rockOptIn
  const id = user.id
  const pebbles = rockandpebbles.myPebbles
  const rocks = rockandpebbles.myRocks
  const pendingPebbles = rockandpebbles.pendingPebbles


  const handleSubmitRockOptinStatus = async () => {
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
              <RockCard rocks={rocks} userId = {user.id} discontinueRockPebbleRelationship = {discontinueRockPebbleRelationship}/>
            } 
        </div>

        <div className='RockAndPebble--div'>
          <div className='RockAndPebble--header--div--pebble'>

            <h2 className='RockAndPebble--header--h2'>Your Pebble(s)</h2>

            <div className='RockAndPebble--opt--div'>
            {rockOptIn ? 
              <button className='RockAndPebble--opt--btn' onClick={() => handleSubmitRockOptinStatus()}>Opt-out</button>
              :
              <button className='RockAndPebble--opt--btn'onClick={() => handleSubmitRockOptinStatus()}>Opt-in</button>
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
                 <PebbleCard pebbles={pebbles} userId = {user.id} discontinueRockPebbleRelationship = {discontinueRockPebbleRelationship}/> 
                }  
            <div className='RockAndPebble--opt--div'>
              { pebbles && pebbles.length >= 2 &&
                <p> Since you already have two pebbles you will no longer be listed as an available Rock. </p> 
              }
          </div>
        </div>
          { pendingPebbles && pendingPebbles.length >= 1 && 
          <>
            <div className='RockAndPebble--div'>        
            <h2 className='RockAndPebble--header--h2'>Your Pending Pebble(s)</h2>
              <PendingCard pendingPebbles={pendingPebbles} userId = {user.id} activateRockAndPebble = {activateRockAndPebble} declineRockPebbleRelationship = {declineRockPebbleRelationship} />
          </div> 
              </> 
            }
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
  activateRockAndPebble: (rockId, pebbleId) => dispatch(activateRockAndPebble(rockId, pebbleId)),
  declineRockPebbleRelationship: (rockId, pebbleId, reason) => dispatch(declineRockPebbleRelationship(rockId, pebbleId, reason)),
  discontinueRockPebbleRelationship: (rockId, pebbleId, reason) => dispatch(discontinueRockPebbleRelationship(rockId, pebbleId, reason)),
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
