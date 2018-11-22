import React from 'react'
import Card from 'react-bootstrap/lib/Card'
import Button from 'react-bootstrap/lib/Button'
import ListGroup from 'react-bootstrap/lib/ListGroup'
import AdminHeader from './AdminHeader'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { loadPages } from '../actions'
import { Link } from 'react-router-dom'
import './admin.css'

const mapStateToProps = state => ({
  pages: Object.keys(state.pages).map(key => state.pages[key])
})

const mapDispatchToProps = dispatch => ({
  loadPages: () => dispatch(loadPages())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class Admin extends React.Component {
    static propTypes = {
      pages: PropTypes.array,
      loadPages: PropTypes.func
    }

    constructor () {
      super()
      this.state = {
        isLoadingPages: true
      }
    }

    componentDidMount () {
      this.props.loadPages().then(() => {
        this.setState({ isLoadingPages: false })
      })
    }

    getPagesList () {
      return this.props.pages.map(page => (
        <ListGroup.Item key={page.id} className='page-item'>
          <Link to={`/admin/pages/${page.id}/edit`}>{page.title}</Link>
          <Button variant='danger' size='sm'>
            Delete page
          </Button>
        </ListGroup.Item>
      ))
    }

    render () {
      return (
        <div>
          <AdminHeader />
          <div className='content-container'>
            <div className={'pages-container'}>
              <div className={'pages-title-container'}>
                <h1>Pages</h1>
                <Button variant='link' href={'/admin/pages/create'}>
                  Create New Page
                </Button>
              </div>
              <Card style={{ width: '100%' }}>
                <ListGroup variant='flush'>{this.getPagesList()}</ListGroup>
              </Card>
            </div>
          </div>
        </div>
      )
    }
  }
)
