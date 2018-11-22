import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ConsumerPage from './ConsumerPage'
import { withRouter } from 'react-router-dom'

const mapStateToProps = state => ({
  pages: state.pages
})

const NotFound = () => <div>Page not found</div>

export default withRouter(
  connect(mapStateToProps)(
    class extends React.Component {
      static propTypes = {
        location: PropTypes.object,
        pages: PropTypes.object
      }

      getPageDataForRoute (path) {
        const pageArray = Object.keys(this.props.pages).map(
          key => this.props.pages[key]
        )
        return pageArray.filter(page => page.slug === path)[0]
      }

      render () {
        const pageData = this.getPageDataForRoute(this.props.location.pathname)
        console.log(pageData)
        if (pageData) {
          return <ConsumerPage data={pageData} />
        }
        return <NotFound />
      }
    }
  )
)
