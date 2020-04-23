import _ from 'lodash'
import { IO } from '../monad'
const read = (document, selector) => () => document.querySelector(selector).innerHTML

const write = (document, selector) => (val) => {
    document.querySelector(selector).innerHTML = val
    return val
  }

// partial fn with document 
const readDom = _.partial(read, document)
const writeDom = _.partial(write, document)

const changeToStartCase =
  IO.from(readDom('#read')).map(_.startCase).map(writeDom('#write'))
changeToStartCase.run()