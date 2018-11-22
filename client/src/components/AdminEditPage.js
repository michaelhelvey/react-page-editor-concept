import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadPageWithId } from '../actions'
import AdminHeader from './AdminHeader'
import Button from 'react-bootstrap/lib/Button'
import Form from 'react-bootstrap/lib/Form'
import './admin.css'

const mapStateToProps = (state, props) => ({
  page: state.pages[props.match.params.id]
})

const mapDispatchToProps = dispatch => ({
  loadPage: id => dispatch(loadPageWithId(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class extends React.Component {
    static propTypes = {
      page: PropTypes.object,
      match: PropTypes.object,
      loadPage: PropTypes.func
    }

    constructor () {
      super()
      this.state = {
        loadingPage: true
      }
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
                <Button variant='primary' size='sm'>
                  Save Page
                </Button>
              </div>
              <Form>
                <Form.Group controlId='formTitle'>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Page Title'
                    value={this.props.page.title}
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
