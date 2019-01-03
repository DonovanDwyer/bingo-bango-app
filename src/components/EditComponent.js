import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAllThemes} from '../actions/bangoActions'

class Editor extends Component {

  state = {
    themeName: "",
    values: []
  }
  componentDidMount = () => {
    this.props.getThemes("all").then(res => {
      // for(let data of this.props.valueBucket) {
      //   if(!this.arrayOfValues.find(val => val === data.theme)){
      //     this.arrayOfValues.push(data.theme)
      //     console.log(this.arrayOfValues)
      //   }
      // }
    })
  }

  renderThemes = () => {
    let arr = [];
    console.log(this.props.valueBucket)
    arr = this.props.valueBucket.map(value => value.theme)
    arr = [...new Set(arr)]
    arr = arr.map(value => <div key={value} onClick={() => this.setState({themeName: value})}>{value}</div>)
    return arr
  }

  renderValues = theme => {
    let arr = [];
    arr = this.props.valueBucket.filter(value => value.theme === theme)
    arr = arr.map(value => <li key={value}>{value}</li>)
    console.log(arr)
    return arr
  }

  render() {
    let finalDiv;

    if(this.state.themeName === ""){
      finalDiv = this.renderThemes
    } else {
      finalDiv = this.renderValues(this.state.themeName)
    }
    return (
      <div>
          {this.props.valueBucket === 'loading' ? <h2>Loading...</h2> : finalDiv()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { valueBucket: state.valueBucket }
  }

const mapDispatchToProps = dispatch => {
  return { getThemes: (data) => dispatch(getAllThemes(data)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
