import React, { Component } from 'react';
import {Field, reduxForm} from 'redux-form'
import * as actions from '../../actions'
import { connect } from 'react-redux'



const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span className="error">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)


class Signin extends Component {
  componentWillMount() {
    this.props.clearAuthError()
  }
  renderAlert() {
    if (this.props.errorMessage){
      return (
        <div className="alert alert-danger">
          <strong>Opps!</strong>
          {this.props.errorMessage}
        </div>
        )
    }
  }

  handleFormSubmit({email, password}) {
    this.props.signinUser({email, password})
    // need to do something to log user in
  }
  render() {
    const {handleSubmit } = this.props

    return (
    <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
      <fieldset className="form-group">
        <Field label="email" name="email" component={renderField} type="email" className="form-control" />
      </fieldset>
      <fieldset className="form-group">
        <Field label="password" name="password" component={renderField}  type="password"  className="form-control" />
      </fieldset>
      {this.renderAlert()}
      <button action="submit" className="btn btn-primary">Sign in</button>
    </form>
    )
  }
}


// export default reduxForm({
//   form: 'signin',
// })(Signin)

function mapStateToProps(state) {
  return {errorMessage: state.auth.error}
}
Signin = reduxForm({form:'signin'})(Signin)
// connect Signinform with actions using 'connect'
Signin = connect(mapStateToProps, actions)(Signin)

// do not forget to export default
export default Signin
