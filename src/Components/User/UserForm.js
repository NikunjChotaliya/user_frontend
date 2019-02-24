import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { RadioGroup, renderField, renderSelectField } from '../Common/commonComponent';

let len = 32, years = []
let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
let days = Array.apply(null, { length: len }).map(Number.call, Number)
days = days.splice(1)
for (let y = new Date().getFullYear(); y >= 1970; y--) years.push(y)

const validate = values => {
  const errors = {}
  const requiredFields = ["username", "email", "day", "month", "year", "gender"]

  requiredFields.forEach(field => {
    let birthdayFields = ['day', 'month', 'year']
    let birthdayValues = ['Day', 'Month', 'Year']
    if (field === "email" && values[field]) {
      var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (reg.test(values[field].trim()) === false) errors[field] = 'Invalid Email Address';
    }
    if (values[field] === undefined || (values[field] && values[field].trim() === "")) {
      errors[field] = 'Required'
    }
    if (birthdayFields.includes(field) && birthdayValues.includes(values[field]))
      errors[field] = 'Required'
  })
  return errors
}

class UserForm extends Component {

  render() {
    const { handleSubmit, handleBack, userId } = this.props;
    console.log(userId)
    return (
      <div className="container">

        <Row>
          <Col lg={8} lgOffset={2} md={8} mdOffset={2} sm={10} smOffset={1}>
            <div className="card card-setting z-depth">

              <div className="card-title text-center">
                <h3 className="card-title-text">{userId && userId.id ? 'Edit User' : 'Add User'}</h3>
              </div>

              <form onSubmit={handleSubmit}>

                <div className="card-body">
                  <div className="card-body-inner form-horizontal">

                    <div className="form-group textfield">
                      <div className="row">
                        <div className="col-sm-3">
                          <label className="control-label">User Name :</label>
                        </div>
                        <div className="col-sm-9">
                          <Field className="form-control" name="username" type="text" component={renderField} label="Ex. Nikunj Chotaliya" />
                        </div>
                      </div>
                    </div>

                    <div className="form-group textfield">
                      <div className="row">
                        <div className="col-sm-3">
                          <label className="control-label">Email.</label>
                        </div>
                        <div className="col-sm-9">
                          <Field className="form-control" name="email" type="text" component={renderField} label="Ex. demo@gmail.com" />
                        </div>
                      </div>
                    </div>


                    <div className="form-group textfield">
                      <div className="row">
                        <div className="col-sm-3">
                          <label className="control-label">Birthday :</label>
                        </div>
                        <div className="col-sm-3">
                          <Field name="day" component={renderSelectField}>
                            <option>Day</option>
                            {
                              days.map((day, index) => {
                                return (
                                  <option key={index}>{day}</option>
                                )
                              })
                            }
                          </Field>
                        </div>

                        <div className="col-sm-3">
                          <Field name="month" className="form-control" component={renderSelectField}>
                            <option>Month</option>
                            {
                              months.map((month, index) => {
                                return (
                                  <option key={index}>{month}</option>
                                )
                              })
                            }
                          </Field>
                        </div>

                        <div className="col-sm-3">
                          <Field name="year" className="form-control" component={renderSelectField}>
                            <option>Year</option>
                            {
                              years.map((year, index) => {
                                return (
                                  <option key={index}>{year}</option>
                                )
                              })
                            }
                          </Field>
                        </div>

                        {/* </div> */}
                      </div>
                    </div>


                    <div className="form-group textfield">
                      <div className="row">
                        <div className="col-sm-3">
                          <label className="control-label">Gender:</label>
                        </div>

                        <Field component={RadioGroup} name="gender" required={true} options={[
                          { title: 'Male', value: 'male' },
                          { title: 'Female', value: 'female' }
                        ]} />
                      </div>
                    </div>

                    <div className="card-footer text-right">
                      <button className="btn btn-default btn-md" onClick={() => handleBack()} type="button"> Back</button>
                      <button className="btn btn-primary btn-md" type="submit"> Add</button>
                    </div>
                  </div>
                </div>

              </form>

            </div>
          </Col>
        </Row>
      </div>
    )
  }
};

function bindInitialValue(state) {
  if (state.UserListReducer && state.UserListReducer.user)
    return { initialValues: state.UserListReducer.user }
  else
    return {initialValues: {}}
}

UserForm = reduxForm({
  form: 'UserForm',
  validate,
})(UserForm)

UserForm = connect(
  state => bindInitialValue(state),
)(UserForm)


export default UserForm;
