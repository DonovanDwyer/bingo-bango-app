import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAllThemes, saveThemes} from '../actions/bangoActions';
import CustomValueContainer from './CustomValueContainer';

class Editor extends Component {

  state = {
    index: 1,
    themeName: "",
    values: []
  }
  componentDidMount = () => {
    this.props.getThemes("all")
  }

  renderThemes = () => {
    let arr = [];
    arr = this.props.valueBucket.map(value => value.theme)
    arr = [...new Set(arr)]
    arr = arr.map(value => <div key={value} onClick={() => this.setState({themeName: value, index: 2})}>{value}</div>)
    return arr
  }

  renderValues = theme => {
    let arr = [];
    arr = this.props.valueBucket.filter(value => value.theme === theme).map(value => value.content)
    this.props.saveThemes({values: arr, user: this.props.currentUser, token: localStorage.getItem('token')})
    return <CustomValueContainer values={arr} saveValues={this.saveValues} />;
  }

  saveValues = (valuesObj) => {
    console.log(valuesObj);
  }

  render() {
    let finalDiv;

    switch(this.state.index){
      case 1:
      finalDiv = this.renderThemes;
      break;
      case 2:
      finalDiv = () => this.renderValues(this.state.themeName);
      break;
      default:
      break;
    }

    return (
      <div>
          {this.props.valueBucket === 'loading' ? <h2>Loading...</h2> : finalDiv() }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    valueBucket: state.valueBucket,
    currentUser: state.currentUser
   }
  }

const mapDispatchToProps = dispatch => {
  return {
    getThemes: (data) => dispatch(getAllThemes(data)),
    saveThemes: (data) => dispatch(saveThemes(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
