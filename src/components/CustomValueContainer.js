import React, {Component} from 'react';

export default class CustomValueContainer extends Component {

  state = {
    editedValues: []
  }

  submitHandler = e => {
    e.preventDefault();
    console.log(e);
  }

  render(){
    return (
      <form onSubmit={this.submitHandler}>
        {this.props.values.map(val => <input type="text" key={val} defaultValue={val} />)}
        <input type="submit" value="Save Changes" />
      </form>
    )
  }

}
