import React from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/lib/Button'
import Dropdown from 'react-bootstrap/lib/Dropdown'
import cmsComponents from '../cms'
import './admin.css'

function insertAndShift (arr, from, to) {
  let cutOut = arr.splice(from, 1)[0] // cut the element at index 'from'
  arr.splice(to, 0, cutOut) // insert it at index 'to'
}

const AddComponentButton = (props) => (
  <div className={props.forceShow ? '' : 'editor-fluff'}>
    <Dropdown>
      <Dropdown.Toggle variant='primary' id='dropdown-basic' size='sm'>
    Add Component Below
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {Object.keys(cmsComponents).map(key => {
          const comp = cmsComponents[key]
          return (
            <Dropdown.Item key={Math.random()} onClick={() => props.addComponentBelow(key)}>{comp.displayName}</Dropdown.Item>
          )
        })}
      </Dropdown.Menu>
    </Dropdown>
  </div>
)
AddComponentButton.propTypes = {
  addComponentBelow: PropTypes.func,
  forceShow: PropTypes.bool
}

export default class AdminEditor extends React.Component {
  static propTypes = {
    page: PropTypes.object,
    onUpdateData: PropTypes.func
  }

  updateSingleComponent (dataId, comp, newData) {
    // find the element in the array I want to change and update it
    const pageData = this.props.page.page_data
    pageData.forEach((componentDef, index) => {
      if (componentDef.id === dataId) {
        pageData[index] = {
          ...componentDef,
          component: comp,
          data: newData
        }
      }
    })
    this.props.onUpdateData(pageData)
  }

  insertComponent (componentName, index) {
    const pageData = this.props.page.page_data
    const newComp = {
      component: componentName,
      id: Math.random(),
      data: cmsComponents[componentName].initData()
    }
    pageData.splice(index, 0, newComp)
    this.props.onUpdateData(pageData)
  }

  removeComponent (dataId) {
    this.props.onUpdateData(this.props.page.page_data.filter(c => c.id !== dataId))
  }

  shiftComponentDown (comp) {
    let pageData = this.props.page.page_data
    const currentIndex = pageData.indexOf(comp)
    insertAndShift(pageData, currentIndex, currentIndex + 1)
    this.props.onUpdateData(pageData)
  }

  shiftComponentUp (comp) {
    let pageData = this.props.page.page_data
    const currentIndex = pageData.indexOf(comp)
    insertAndShift(pageData, currentIndex, currentIndex - 1)
    this.props.onUpdateData(pageData)
  }

  render () {
    if (!this.props.page) {
      return null
    }
    console.log(this.props.page.page_data)
    return (
      <div className='editor'>
        {this.props.page.page_data.map(componentDef => {
          const Component = cmsComponents[componentDef.component]
          return (
            <div className={'editor-component-container'} key={componentDef.id}>
              <div className='component-controls editor-fluff '>
                <Button onClick={() => this.shiftComponentUp(componentDef)} className='component-controls-button' size='sm' variant='light'>↑</Button>
                <Button onClick={() => this.removeComponent(componentDef.id)} className='component-controls-button' size='sm' variant='danger'>-</Button>
                <Button onClick={() => this.shiftComponentDown(componentDef)} className='component-controls-button' size='sm' variant='light'>↓</Button>
              </div>
              <Component.editor data={componentDef.data} updateData={(d) => this.updateSingleComponent(componentDef.id, componentDef.component, d)} />
              <AddComponentButton addComponentBelow={name => this.insertComponent(name, this.props.page.page_data.indexOf(componentDef) + 1)} />
            </div>
          )
        })}
        {this.props.page.page_data.length === 0 ? <AddComponentButton forceShow addComponentBelow={name => this.insertComponent(name, 1)} /> : null}
      </div>
    )
  }
}
