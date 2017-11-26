import React from 'react';
import Enzyme from 'enzyme';
<<<<<<< HEAD
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import { expect } from 'chai';
import { render, mount, shallow } from 'enzyme';
import App from '../../client/src/index.jsx';
import Search from '../../client/src/components/search';
import Carousel from '../../client/src/components/Carousel';
import Login from '../../client/src/components/Login';

configure({ adapter: new Adapter() });

describe('App', () => {

  it('should properly run tests', () => {
    expect(1).equal(1);
  });

  it('should be an Function', function() {
    expect(App).to.be.an('Function');
  });

  it('should be a stateful class component', function() {
    expect(React.Component.isPrototypeOf(App)).to.be.true;
  });
});

sinon.spy(App.prototype, 'componentWillMount');

xdescribe('<App />', () => {
  xit('calls componentWillMount', () => {
    const wrapper = mount(<App />);
    expect(App.prototype.componentWillMount.call).to.equal(true);
  });
});

describe('App', () => {

  it('should properly run tests', () => {
    expect(1).equal(1);
  });

  it('should be an Function', function() {
    expect(App).to.be.an('Function');
  });

  it('should be a stateful class component', function() {
    expect(React.Component.isPrototypeOf(App)).to.be.true;
  });

  it('App.handlePhotoNavigationClick should exist', function() {
    // console.log(App.toString());
    console.log('Try to console an APP property', App._this.handlePhotoNavigationClick.toString());
    expect(App.handlePhotoNavigationClick).exist;
  });
});


describe('Search', () => {
  it('should properly run tests', () => {
    expect(1).equal(1);
  });

  it('should be a Function', () => {
    expect(Search).to.be.an('Function');
  });

  it('should be a stateless class component', function() {
    expect(React.Component.isPrototypeOf(Search)).to.be.false;
  });

});


describe('Carousel', () => {
  it('should properly run tests', () => {
    expect(1).equal(1);
  });

  it('should be a function', () => {
    expect(Carousel).to.be.an('function');
  });

  it('should be a stateless class component', function() {
    expect(React.Component.isPrototypeOf(Carousel)).to.be.false;
  });

});


describe('Login', () => {
  it('should properly run tests', () => {
    expect(1).equal(1);
  });

  it('should be an Function', () => {
    expect(Login).to.be.an('Function');
  });

  it('should be a stateless class component', function() {
    expect(React.Component.isPrototypeOf(Login)).to.be.false;
  });

});