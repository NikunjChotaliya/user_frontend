import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from './actionCreators';
import { withRouter } from 'react-router-dom';

class UserList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
    }
  }

  async componentDidMount() {
    await this.props.actions.get_user_data();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      users: nextProps.data
    })

  }

  editForm = async id => {
    let user;
    if (id) {
      let { users } = this.state, user_length = users.length;
      for (let i = 0; i < user_length; i++) {
        if (users[i].id === id) {
          user = { ...users[i] }
          break;
        }
      }
      await this.props.actions.set_user(user)
      this.props.history.push(`/edit/${id}`);
    } else {
      await this.props.actions.set_user('')
      this.props.history.push(`/add`);
    }
  }

  deleteForm = async id => {
    await this.props.actions.delete_user(id);
    await this.props.actions.get_user_data();
  }

  render() {
    let { users } = this.state;
    return (
      <div>
        <button className="btn btn-primary btn-md pull-right add-button-style" onClick={() => this.editForm('')}>Add User</button><br />
        {users.length > 0 ?
          <table className="table table-hover user-list">
            <thead>
              <tr>
                <th>UserName</th>
                <th>Email</th>
                <th>Birthdate</th>
                <th>Gender</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => {
                return (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.dob}</td>
                    <td>{user.gender}</td>
                    <td>
                      <a onClick={() => this.editForm(user.id)} className="actions">Edit</a>
                      <a onClick={() => this.deleteForm(user.id)} className="actions">Delete</a></td>
                  </tr>
                )
              })}

            </tbody>
          </table>
          :

          <div className="no-user">
            No User Added Yet.
          </div>
        }
      </div>

    )
  }

}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  }
}

function mapStateToProps(state) {
  return {
    data: state.UserListReducer.data
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserList));
