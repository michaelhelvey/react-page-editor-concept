import React from 'react'
import PropTypes from 'prop-types'
import './cms.css'

const ConsumerRender = props => <h1>{props.data.title}</h1>
ConsumerRender.propTypes = {
  data: PropTypes.object
}

const EditorRender = props => (
  <input className={'h1-input'} defaultValue={props.data.title} onChange={e => props.updateData({ title: e.target.value })} />
)
EditorRender.propTypes = {
  data: PropTypes.object,
  updateData: PropTypes.func
}

export default {
  consumer: ConsumerRender,
  editor: EditorRender,
  initData: () => ({ title: '' }),
  displayName: 'Header'
}
