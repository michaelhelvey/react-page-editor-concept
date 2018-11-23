import React from 'react'
import PropTypes from 'prop-types'
import Textarea from 'react-textarea-autosize'

import './cms.css'

const ConsumerRender = props => <p>{props.data.content}</p>
ConsumerRender.propTypes = {
  data: PropTypes.object
}

const EditorRender = props => (
  <Textarea className={'p-input'} defaultValue={props.data.content} onChange={e => props.updateData({ content: e.target.value })} />
)
EditorRender.propTypes = {
  data: PropTypes.object,
  updateData: PropTypes.func
}

export default {
  consumer: ConsumerRender,
  editor: EditorRender,
  initData: () => ({ content: '' }),
  displayName: 'Paragraph'
}
