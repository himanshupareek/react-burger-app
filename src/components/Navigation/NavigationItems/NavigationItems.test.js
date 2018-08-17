//JEST -> validation library.
//Jest is used by Facebook to test all JavaScript code including React applications. 
//One of Jest's philosophies is to provide an integrated "zero-configuration" experience. 
//We observed that when engineers are provided with ready-to-use tools, they end up writing more tests, 
//which in turn results in more stable and healthy code bases.

//https://jestjs.io/

//Enzyme is a JavaScript Testing utility for React that makes it easier to assert, 
//manipulate, and traverse your React Components' output.

//https://airbnb.io/enzyme/docs/api/ShallowWrapper/contains.html



//JSX needs to be converted to its React create element alternative.
import React from 'react';

//Enzyme allows us to render this single elment as standalone instead to render the full application.
//that means it helps us to write the unit test, Isloated Test - which don't need to render the complete react app

//its named export, so we need curly braces.

//to render our component, and then look into this Enzyme gives a helper method, that is "shallow" function.
//shallow is the best way to render the react components in many circumstances.
//however, enzyme offers two alternatives too.
//With shallow, only placeHolder is rendered, that meand it doesn't render deeply. it only returns placeholder
//and doesn't return inside  of it.
import { configure, shallow } from 'enzyme';
//configure enzyme and connect to react version.
import Adapter from 'enzyme-adapter-react-16';

import NavigationItemsDiffName from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter : new Adapter()});

//first argument is just a string, you can put any name 
describe('<NavigationItems />', () => {

    let wrapper;

    //run beforeEach test methods.
    //beforeEach takes funciton as an argument.
    beforeEach( () => {
        wrapper = shallow(<NavigationItemsDiffName />);
    }) 

    //first argument is just a meaningful name, nothing else, it doesn't parse and all.
    it('should render two <NavigationItem /> elements if not authenticated', () => {
         //create instance of <ul> component as it would be rendered to the real dom through REact,
         //and then look into the dom, with the property, that isAuthenticated is true or not etc..

         //pass the element as JSX element.
         //const wrapper = shallow(<NavigationItemsDiffName />);
         
         //look into the wrapper
         //these utility methiods ("find" etc..) are provided by enzyme.
         //"toBe", "toBeFalsy", "toHaveLength"etc..these utility methods made available by Jest.

         //remember, this time, its not a JSX element, its normal variable from import.

         //NotAuthenticated case -> Check that NavigationItems compoenent, have two "NavigationItem" component
         expect(wrapper.find(NavigationItem)).toHaveLength(2);

         //now run this test with "test" script, which is mentioned along with other scripts name 
         //as "start", "build" etc.. in our package.json file.
    });

    it('should render three <NavigationItem /> elements if authenticated', () => {
        //const wrapper = shallow(<NavigationItemsDiffName isAuthenticated />);

        //can override the wrapper which declared in "beforeEach" method.
        //wrapper = shallow(<NavigationItemsDiffName isAuthenticated />);

        //another helpful method of Enzyme package, which pass a Object as a parameter, with Key value pair.
        wrapper.setProps({
            isAuthenticated : true
        });
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should contains LogOut button if authenticated', () => {
        wrapper.setProps({
            isAuthenticated : true
        });
        expect(wrapper.contains(<NavigationItem link="/logout"> Logout </NavigationItem>)).toEqual(true);
    });
})


