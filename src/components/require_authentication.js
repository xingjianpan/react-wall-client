import React, {Component} from 'react'
import {connect} from 'react-redux'

export default function(ComposedComponent) {
  class Authentication extends Component {

    // static declare class property
    // required to use context
    static contextTypes = {
      router: React.PropTypes.object
    }

    componentWillMount() {
      if (!this.props.authenticated){
        this.context.router.push('/')
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated){
        this.context.router.push('/')
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }

  }

  function mapStateToProps(state) {
    return {authenticated: state.auth.authenticated}
  }

  return connect(mapStateToProps)(Authentication)
}


/*
// In some other location .... Not in this file...
// We want to use this HOC

import Authentication // This is my HOC
import Resouces // This is the component i want to wrap

const ComposedComponent = Authentication(Resouces)

// in some render method...
<ComposedComponent resouces={resouceList} />
*/
