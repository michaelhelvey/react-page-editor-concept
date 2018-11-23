import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadPageWithId, savePage, updateLocalPage } from '../actions'
import AdminHeader from './AdminHeader'
import Button from 'react-bootstrap/lib/Button'
import Form from 'react-bootstrap/lib/Form'
import AdminEditor from './AdminEditor'
import './admin.css'

const mapStateToProps = (state, props) => ({
  page: state.pages[props.match.params.id]
})

const mapDispatchToProps = dispatch => ({
  loadPage: id => dispatch(loadPageWithId(id)),
  savePage: pageData => dispatch(savePage(pageData)),
  updatePage: pageData => dispatch(updateLocalPage(pageData))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class extends React.Component {
    static propTypes = {
      page: PropTypes.object,
      match: PropTypes.object,
      loadPage: PropTypes.func,
      savePage: PropTypes.func,
      updatePage: PropTypes.func
    }

    constructor (props) {
      super(props)
      this.state = {
        loadingPage: true,
        isSavingPage: false
      }
      this.onChangeField = this.onChangeField.bind(this)
      this.savePage = this.savePage.bind(this)
      this.onUpdateData = this.onUpdateData.bind(this)
    }

    componentDidMount () {
      if (!this.props.page) {
        this.props.loadPage(this.props.match.params.id).then(() => {
          this.setState({ loadingPage: false })
        })
      } else {
        this.setState({ loadingPage: false })
      }
    }

    onUpdateData (dataId, comp, newData) {
      // find the element in the array I want to change
      const pageData = this.props.page.page_data
      pageData.forEach((componentDef, index) => {
        if (componentDef.id === dataId) {
          // gods of functional programming pls dont kill me i have a family
          pageData[index] = {
            ...componentDef,
            component: comp,
            data: newData
          }
        }
      })
      this.props.updatePage({
        ...this.props.page,
        page_data: pageData
      })
    }

    onChangeField (key, value) {
      this.props.updatePage({
        ...this.props.page,
        [key]: value
      })
    }

    savePage () {
      this.setState({ isSavingPage: true })
      this.props.savePage(this.props.page).then(() => {
        this.setState({ isSavingPage: false })
      })
    }

    render () {
      if (this.state.loadingPage) {
        return <div>Loading page...</div>
      }
      return (
        <div>
          <AdminHeader />
          <div className={'content-container'}>
            <div className='pages-container'>
              <div className={'pages-title-container'}>
                <h1>Editing Page: {this.props.page.title}</h1>
                <Button
                  variant='primary'
                  disabled={this.state.isSavingPage}
                  onClick={!this.state.isSavingPage ? this.savePage : null}
                >
                  {this.state.isSavingPage ? 'Saving...' : 'Save Page'}
                </Button>
              </div>
              <Form>
                <Form.Group controlId='formTitle'>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Page Title'
                    value={this.props.page.title}
                    onChange={e => this.onChangeField('title', e.target.value)}
                  />
                  <Form.Text className='text-muted'>
                    This is just for display and has no impact on the rendered
                    page
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId='formPath'>
                  <Form.Label>Path</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Page Path'
                    value={this.props.page.path}
                    onChange={e => this.onChangeField('path', e.target.value)}
                  />
                  <Form.Text className='text-muted'>
                    What should be the relative url of the page?
                  </Form.Text>
                </Form.Group>
              </Form>
              <AdminEditor pageData={this.props.page ? this.props.page.page_data : []} onUpdateData={this.onUpdateData} />
            </div>
          </div>
        </div>
      )
    }
  }
)
