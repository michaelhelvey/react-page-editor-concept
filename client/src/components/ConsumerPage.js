import React from 'react'
import PropTypes from 'prop-types'
import cmsComponents from '../cms'

export default class ConsumerPage extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      title: PropTypes.string,
      page_data: PropTypes.array
    })
  }

  getComponents () {
    return this.props.data.page_data.map(componentDef => {
      const Component = cmsComponents[componentDef.component]
      return <Component.consumer data={componentDef.data} key={Math.random()} />
    })
  }

  render () {
    return <div>{this.getComponents()}</div>
  }
}
