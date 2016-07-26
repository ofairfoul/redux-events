import chai from 'chai'
import events, {composeListeners} from '../lib/redux-events'

chai.expect()

const expect = chai.expect

describe('library', () => {
  it('Should import the library', () => {
    expect(composeListeners).to.be.a('Function')
    expect(events).to.be.a('Function')
  })
})
