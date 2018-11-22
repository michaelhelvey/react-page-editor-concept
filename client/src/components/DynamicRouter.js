import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ConsumerPage from './ConsumerPage'
import { loadPages } from '../actions'

const mapStateToProps = state => ({
  pages: state.pages
})

const mapDispatchToProps = dispatch => ({
  loadPages: () => dispatch(loadPages())
})

const NotFound = () => <div>Page not found</div>
const Loading = () => <div>Loading pages...</div>

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class extends React.Component {
    static propTypes = {
      location: PropTypes.object,
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

    getPageDataForRoute (path) {
      return this.props.pages.filter(page => page.path === path)[0]
    }

    render () {
      if (this.state.isLoadingPages) {
        return <Loading />
      }
      const pageData = this.getPageDataForRoute(this.props.location.pathname)
      console.log(pageData)
      if (pageData) {
        return <ConsumerPage data={pageData} />
      }
      return <NotFound />
    }
  }
)
