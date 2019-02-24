import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from './actionCreators';
import UserForm from './UserForm';
import { withRouter } from 'react-router-dom';

class UserAddUpdateDelete extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: props.match.params || ''
        }
    }

    handleBack = () => {
        this.props.history.push("/")        
    }

    handleSubmit = async (values) => {
        let birthdate = values.day + '-' +values.month + '-' + values.year ;
        values.dob = birthdate;
        const result = await this.props.actions.add_update_user(values);
        if (!result.status) {
            alert(result.data)
            return
        }
        await this.props.actions.get_user_data();
        this.props.history.push("/")
    }

    render() {
        const {userId} = this.state
        return (
            <div>
                <UserForm userId={userId} handleBack={this.handleBack} onSubmit={this.handleSubmit}/>
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
    return {}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserAddUpdateDelete));
