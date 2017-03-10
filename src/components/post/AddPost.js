import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { addPost } from '../../actions';



const validate = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = 'title require';
  }
  if (!values.content) {
    errors.content = 'content require';
  }
  return errors;
};


// http://stackoverflow.com/questions/40815172/redux-form-textarea-error-handling
const renderField = ({ input, label, type, textarea, meta: { touched, error, warning, invalid } }) => {
  const textareaType = <textarea {...input} placeholder={label} type={type} className={`form-control ${touched && invalid ? 'has-danger' : ''}`} />;
  const inputType = <input {...input} placeholder={label} type={type} className={`form-control ${touched && invalid ? 'has-danger' : ''}`} />;

  return (
    <div className="add-post">
      <label>{label}</label>
      <div>
        {textarea ? textareaType : inputType}
        {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  );
};


class AddPost extends Component {

  handleFormSubmit(formProps) {
    console.log(formProps)
    this.props.addPost(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Opps!</strong>
          {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const {handleSubmit } = this.props;

    return (
    <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
      <fieldset className="form-group">
        <Field label="Title" name="title" component={renderField} type="text" />
      </fieldset>
      <fieldset className="form-group">
        <Field label="Content" name="content" component={renderField} type="text" textarea={true} />
      </fieldset>
      {this.renderAlert()}
      <button action="submit" className="btn btn-primary">Add Post</button>
    </form>
    );
  }
}


// export default reduxForm({
//   form: 'signin',
// })(Signin)

function mapStateToProps(state) {
  return { errorMessage: state.posts.error };
}
AddPost = reduxForm({
  form:'addpost',
  validate,
})(AddPost);
// connect Signinform with actions using 'connect'
AddPost = connect(mapStateToProps, {addPost})(AddPost);

// do not forget to export default
export default AddPost;
