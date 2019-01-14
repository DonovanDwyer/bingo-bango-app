import React, {Component} from 'react';

export default class CustomValue extends Component {
  constructor(props){
    super(props)
    this.state = {
      value: this.props.value
    }
  }

  handleChange = e => {
    this.setState({value: e.target.value})
  }

  handleSubmit = e => {
    e.preventDefault();
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <input type="submit" value="Save Change"/>
      </form>
    )
  }
}
