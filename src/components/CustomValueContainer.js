import React, {Component} from 'react';

export default class CustomValueContainer extends Component {

  state = {
    valuesList: {}
  }

  componentDidMount = () => {
    let valuesObj = {};
    let valuesList = this.props.values.map((val, i) => {
      valuesObj[i] = val;
    });
    this.setState({
      valuesList: valuesObj
    });
  }

  handleChange = (event, key) => {
    let valuesObj = this.state.valuesList;
    valuesObj[key] = event.target.value;
    this.setState({
      valuesList: valuesObj
    })
  }

  submitHandler = e => {
    e.preventDefault();
    console.log(e);
  }

  render(){
    console.log(this.state);
    return (
      <form onSubmit={this.submitHandler}>
        {this.props.values.map((val, i) => <input type="text"
        key={i}
        defaultValue={val}
        onChange={(event) => this.handleChange(event, i)}/>)}
        <input type="submit" value="Save Changes" />
      </form>
    )
  }

}
