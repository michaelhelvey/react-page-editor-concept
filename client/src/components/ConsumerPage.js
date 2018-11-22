import React from 'react'
import PropTypes from 'prop-types'

export default class ConsumerPage extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      title: PropTypes.string
    })
  }

  render () {
    return (
      <div>
        <h1>{this.props.data.title}</h1>
      </div>
    )
  }
}
