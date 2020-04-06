import React from 'react';
import Select from './Select';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Select', () =>{

  it('[Component.Select] renders correctly', () => {

    const wrapper = shallow(<Select />);
    expect(wrapper).toMatchSnapshot();
  
  });


  it('[Component.Select] renders options correctly', () => {

    let props = {
      options : [{text: 'text', value: 'value'}]
    }
  
    const wrapper = shallow(<Select {...props} />);
    expect(wrapper.find('option'));
    expect(wrapper.find('option')).toHaveLength(props.options.length)
  
  });
   

})