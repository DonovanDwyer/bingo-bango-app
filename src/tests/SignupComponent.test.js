import React, { Component } from 'react';
import SignupConnect, {SignupComponent} from '../components/SignupComponent';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

describe("Signup Component", () => {
  let wrapper;
  const mapDispatchToProps = {addThisUser: jest.fn()}
    const mockStore = configureStore()
    let store,container

  beforeEach(() => {
    store = mockStore(mapDispatchToProps);
    wrapper = shallow(<SignupConnect />);
  })

  it("loads without crashing", () => {
    expect(wrapper.length).toEqual(1)
  });

  it("does not submit with invalid inputs", () => {
    const signupComponentSnapshot = renderer.create(<SignupComponent store={store}/>).toJSON();
    wrapper.find('#username').simulate('change', { target: { value: "abc" }})
    wrapper.find('#submit').simulate('click')
    expect(wrapper).toMatchSnapshot();
  });
})
