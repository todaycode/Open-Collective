/* setup.js */

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

const { jsdom } = require('jsdom');

global.document = jsdom('');
global.window = document.defaultView;
global.window.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}
global.navigator = {
  userAgent: 'node.js',
};

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .reduce((result, prop) => ({
      ...result,
      [prop]: Object.getOwnPropertyDescriptor(src, prop),
    }), {});
  Object.defineProperties(target, props);
}
copyProps(document.defaultView, global);


Enzyme.configure({ adapter: new Adapter() });
