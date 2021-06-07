import React, {Component} from 'react';

export default class CustomValueContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      valuesList: {}
    };
    this.renderedView = this.renderUpdatedList();
  }

  componentDidMount = () => {
    let valuesObj = {};
    this.props.values.map((val, i) => {
      return valuesObj[i] = val;
    });
    this.setState({valuesList: valuesObj});
  };

  componentDidUpdate = () => {
    this.refresh();
  };

  refresh = () => {
    this.renderedView = this.renderUpdatedList();
  }

  handleChange = (event, key) => {
    let valuesObj = this.state.valuesList;
    valuesObj[key] = event.target.value;
    this.setState({
      valuesList: valuesObj
    });
  };

  handleAddValue = e => {
    e.preventDefault();
    const updatedValuesList = {
      ...this.state.valuesList,
      [Object.keys(this.state.valuesList).length]: ""
    };
    this.setState({valuesList: updatedValuesList});
  };

  handleDelete = (event, key) => {
    event.preventDefault();
    let valuesObj = Object.assign({}, this.state.valuesList);
    delete valuesObj[key];
    this.setState({
      valuesList: valuesObj
    });
  }

  submitHandler = e => {
    e.preventDefault();
    this.props.saveValues(this.state.valuesList);
  }

  renderEditList = () => {
    return (
      <div>
      <button onClick={this.handleAddValue}>Add New Value</button><br />
      {this.props.values.map((val, i) => <div key={i}><input type="text"
      key={i}
      defaultValue={val}
      onChange={(event) => this.handleChange(event, i)}/>
      <button onClick={(event) => this.handleDelete(event, i)}>Delete</button>
      </div>)}
      <button onClick={this.submitHandler}>Save Changes</button>
      </div>
    );
  }

  renderUpdatedList = () => {
    return (
      <div>
      <button onClick={this.handleAddValue}>Add New Value</button><br />
      {Object.keys(this.state.valuesList).map((key, i) => <div key={key}><input type="text"
      key={key}
      defaultValue={this.state.valuesList[key]}
      onChange={(event) => this.handleChange(event, key)}/>
      <button onClick={(event) => this.handleDelete(event, key)}>Delete</button>
      </div>)}
      <input type="submit" value="Save Changes" />
      </div>
    );
  }

  render(){
    this.refresh();
    return (
      <form onSubmit={this.submitHandler}>
        {this.renderedView}
      </form>
    )
  }

}
