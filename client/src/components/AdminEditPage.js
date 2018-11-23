import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadPageWithId, savePage } from '../actions'
import AdminHeader from './AdminHeader'
import Button from 'react-bootstrap/lib/Button'
import Form from 'react-bootstrap/lib/Form'
import './admin.css'

const mapStateToProps = (state, props) => ({
  page: state.pages[props.match.params.id]
})

const mapDispatchToProps = dispatch => ({
  loadPage: id => dispatch(loadPageWithId(id)),
  savePage: pageData => dispatch(savePage(pageData))
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
      savePage: PropTypes.func
    }

    constructor (props) {
      super(props)
      this.state = {
        loadingPage: true,
        page: props.page,
        isSavingPage: false
      }
      this.onChangeField = this.onChangeField.bind(this)
      this.savePage = this.savePage.bind(this)
    }

    componentDidMount () {
      if (!this.props.page) {
        this.props.loadPage(this.props.match.params.id).then(page => {
          this.setState({ loadingPage: false, page })
        })
      } else {
        this.setState({ loadingPage: false })
      }
    }

    onChangeField (key, value) {
      this.setState({
        page: {
          ...this.state.page,
          [key]: value
        }
      })
    }

    savePage () {
      this.setState({ isSavingPage: true })
      this.props.savePage(this.state.page).then(() => {
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
                    value={this.state.page.title}
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
                    value={this.state.page.path}
                    onChange={e => this.onChangeField('path', e.target.value)}
                  />
                  <Form.Text className='text-muted'>
                    What should be the relative url of the page?
                  </Form.Text>
                </Form.Group>
              </Form>
            </div>
          </div>
        </div>
      )
    }
  }
)
