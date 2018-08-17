import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

//class with named export
//named export should be imported with same name, otherwise I don't think it will work.
import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import { wrap } from 'module';

configure({adapter : new Adapter()});

describe('<BurgerBuilder />', () => {

    let wrapper;

    beforeEach(() => {
        //However, its shallow rendering, but still we are rendering the component, and
        //because this component is having ComponentDidMount method, and there we are calling one method, 
        //so we have to add this as a prop.
        //And adding in "setProps()" method won't trick because, that is added after component has been instantiated.
        //thats too late, so add it to here.
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}}/>)
    })

    it('should render <BuildControls /> when receiving ingredients', () => {
        wrapper.setProps({ings : {salad : 0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })
});