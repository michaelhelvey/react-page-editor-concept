import React from 'react'
import PropTypes from 'prop-types'
import cmsComponents from '../cms'
import './admin.css'

export default class AdminEditor extends React.Component {
  static propTypes = {
    pageData: PropTypes.array,
    onUpdateData: PropTypes.func
  }

  render () {
    return (
      <div className='editor'>
        {this.props.pageData.map(componentDef => {
          const Component = cmsComponents[componentDef.component]
          return <Component.editor data={componentDef.data} key={componentDef.id} updateData={(d) => this.props.onUpdateData(componentDef.id, componentDef.component, d)} />
        })}
      </div>
    )
  }
}
