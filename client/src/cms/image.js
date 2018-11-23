import React from 'react'
import PropTypes from 'prop-types'
import './cms.css'

const ConsumerRender = props => <div alt='test' style={{ backgroundImage: `url(${props.data.imageSrc})`, height: '300px', width: '300px', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} />
ConsumerRender.propTypes = {
  data: PropTypes.object
}

const EditorRender = props => (
  <input className={'image-input'} placeholder={'Copy image src'} defaultValue={props.data.imageSrc} onChange={e => props.updateData({ imageSrc: e.target.value })} />
)
EditorRender.propTypes = {
  data: PropTypes.object,
  updateData: PropTypes.func
}

export default {
  consumer: ConsumerRender,
  editor: EditorRender,
  initData: () => ({ imageSrc: '' }),
  displayName: 'Image'
}
