import React from 'react'
import PropTypes from 'prop-types'

const ConsumerRender = props => <h1>{props.data}</h1>
ConsumerRender.propTypes = {
  data: PropTypes.string
}

const EditorRender = props => (
  <input defaultValue={props.data} onChange={e => props.updateData(e.target.value)} />
)
EditorRender.propTypes = {
  data: PropTypes.string,
  updateData: PropTypes.func
}

export default {
  consumer: ConsumerRender,
  editor: EditorRender
}
