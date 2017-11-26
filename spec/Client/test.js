import React from 'react';
import Enzyme from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import { expect, assert, should } from 'chai';
import { render, mount, shallow } from 'enzyme';
import App from '../../client/src/index.jsx';
import Search from '../../client/src/components/search';
import Carousel from '../../client/src/components/Carousel';
import Login from '../../client/src/components/Login';
import Blanket from 'blanket';

configure({ adapter: new Adapter() });

describe('AppView', function() {
  var view;

  beforeEach(function() {
    sinon.spy(App.prototype, 'render');
    sinon.spy(Carousel.prototype, 'render');
    sinon.spy(Search.prototype, 'render');
    sinon.spy(Login.prototype, 'render');

    view = new App();
    view.src.reset([]);
  });

  afterEach(function() {
    App.prototype.render.restore();
    Carousel.prototype.render.restore();
    Search.prototype.render.restore();
    Login.prototype.render.restore();
  });

  it('should render itself', function() {
    expect(App.prototype.render).to.have.callCount(1);
  });

  it('should render a Carousel view', function() {
    expect(Carousel.prototype.render).to.have.callCount(1);
  });

  it('should render a Search view', function() {
    expect(Search.prototype.render).to.have.callCount(1);
  });

  it('should render a Login view', function() {
    expect(Login.prototype.render).to.have.callCount(1);
  });
});

<<<<<<< HEAD
describe("AppScreen", () => {
=======

describe("App", () => {
>>>>>>> Write client side tests for div and button counts on initial layout
  let props;
  let mountedAppScreen;
  const appScreen = () => {
    if (!mountedAppScreen) {
      mountedAppScreen = mount(<App {...props} />);
    }
    return mountedAppScreen;
  }

  beforeEach(() => {
    // props = {
    //   currentPhotoIndex: undefined,
    //   searchTerm: undefined,
    //   searchPagination: undefined,
    // };
    mountedAppScreen = undefined;
  });

<<<<<<< HEAD
describe('App', () => {

sinon.spy(App.prototype, 'componentWillMount');

xdescribe('<App />', () => {
  xit('calls componentWillMount', () => {
    const wrapper = mount(<App />);
    expect(App.prototype.componentWillMount.call).to.equal(true);
  });

  xit('renders one <App /> component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(App)).to.have.length(1);
  });


  xit('App.handlePhotoNavigationClick should exist', function() {
    // console.log(App.toString());
    console.log('Try to console an APP property', App._this.handlePhotoNavigationClick.toString());
    expect(App.handlePhotoNavigationClick).exist;
  });

  xit('simulates click events', () => {
    const handlePhotoNavigationClick = sinon.spy();
    // const wrapper = mount((<App handlePhotoNavigationClick={handlePhotoNavigationClick} />));
    wrapper.find('button').simulate('click');
    expect(handlePhotoNavigationClick).to.have.property('callCount', 1);
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

  it('should be a stateful class component', function() {
    expect(React.Component.isPrototypeOf(Login)).to.be.true;
  });

  xit('Login.submitInformation should exist', function() {
    console.log(Login.toString());
    console.log('Try to console an Login property', Login.submitInformation .toString());
    expect(Login.submitInformation ).exist;
  });

});

  it('renders 5 <div> tags', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('div')).to.have.length(5);
=======
  xit('should properly run tests', () => {
    expect(1).equal(1);
>>>>>>> Write client side tests for div and button counts on initial layout
  });

  xit('should be an Function', function() {
    expect(App).to.be.an('Function');
  });

  xit('should be a stateful class component', function() {
    expect(React.Component.isPrototypeOf(App)).to.be.true;
  });

  describe('<App />', () => {
    sinon.spy(App.prototype, 'componentWillMount');

    it('renders 5 <div> tags for major components on shallow', () => {
      const wrapper = shallow(<App />);
      expect(wrapper.find('div')).to.have.length(5);
    });

    it("contains everything else on mount with strict equal", () => {
      const wrapper = appScreen();
      expect(wrapper.find('div').children()).to.have.length(14);
    });


    it("contains everything else on mount with deep equal", () => {
        const wrapper = appScreen().find("div");
        expect(wrapper.children()).to.deep.equal(wrapper.find('div').children());
    });

    it("contains everything else on mount with deep equal", () => {
        const wrapper = appScreen().find("button");
        expect(wrapper.children()).to.deep.equal(wrapper.find('button').children());
    });

    it('renders 5 buttons tags for major components on mount', () => {
      const wrapper = appScreen();
      expect(wrapper.find('button')).to.have.length(5);
    });
    // it('App.handlePhotoNavigationClick should exist', function() {
    //   const handlePhotoClick = appScreen().find(handlePhotoNavigationClick);
    //   expect(handlePhotoClick.props().children).to.be.true;
      // assert.exists(wrapper.handlePhotoNavigationClick);
    // });

    xit('simulates click events', () => {
      const handlePhotoNavigationClick = sinon.spy();
      // const wrapper = mount((<App handlePhotoNavigationClick={handlePhotoNavigationClick} />));
      wrapper.find('button').simulate('click');
      expect(handlePhotoNavigationClick).to.have.property('callCount', 1);
    });
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


xdescribe('Carousel', () => {
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
  xit('should properly run tests', () => {
    expect(1).equal(1);
  });

  xit('should be an Function', () => {
    expect(Login).to.be.an('Function');
  });

  xit('should be a stateful class component', function() {
    expect(React.Component.isPrototypeOf(Login)).to.be.true;
  });

  it('Login.submitInformation should exist', function() {
    console.log(Login.toString());
    console.log('Try to console an Login property', Login.submitInformation.toString());
    expect(Login.submitInformation).exist;
  });

  xit('Login.submitInformation should exist', function() {
    console.log(Login.toString());
    console.log('Try to console an Login property', Login.submitInformation .toString());
    expect(Login.submitInformation ).exist;
  });
});