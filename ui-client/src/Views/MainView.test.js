import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import MainView from './MainView';
import Adapter from 'enzyme-adapter-react-16';
import Spinner from '../Components/Spinner/Spinner';
import Select from '../Components/Select/Select';
import NoResults from '../Components/NoResults/NoResults';

configure({ adapter: new Adapter() });

describe('<MainView /> with no props', () => {
  
  it('renders Child component Spinner', () => {

    const wrapper = shallow(<MainView/>);
    expect(wrapper.containsMatchingElement(<Spinner />)).toEqual(true);
  
  });

  it('Does not renders component Select', () => {

    const wrapper = shallow(<MainView  />);
    expect(wrapper.containsMatchingElement(<Select />)).toEqual(false);
  
  });

  it('does not renders Child component NoResult', () => {
  
    const wrapper = shallow(<MainView />);
    expect(wrapper.containsMatchingElement(<NoResults />)).toEqual(false);
  
  });

})