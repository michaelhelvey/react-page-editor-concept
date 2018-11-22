import React from 'react'
import PropTypes from 'prop-types'

const ConsumerRender = props => <h1>{props.data}</h1>
ConsumerRender.propTypes = {
  data: PropTypes.string
}

const EditorRender = props => (
  <input value={props.data} onChange={val => props.updateData(val)} />
)
EditorRender.propTypes = {
  data: PropTypes.object,
  updateData: PropTypes.func
}

export default {
  consumer: ConsumerRender,
  editor: EditorRender
}
