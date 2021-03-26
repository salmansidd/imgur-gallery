import { render } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';

import App from './App';
import AppBar from 'components/AppBar';
import HomeView from 'components/HomeView';
import GalleryDetails from 'components/GalleryDetails';
import { PostInfo } from 'components/PostInfo';

Enzyme.configure({ adapter: new Adapter() });
const mockStore = configureMockStore();
const store = mockStore({});

const gallery = {
  "id": "m6tIYYI",
  "title": "NZ approved a new measure",
  "link": "https://imgur.com/a/m6tIYYI",
  "ups": 4285,
  "downs": 47,
  "score": 4273,
  "comment_count": 503,
  "favorite_count": 272,
  "tags": [
    {
      "name": "themoreyouknow",
      "display_name": "themoreyouknow",
    },
    {
      "name": "worldnews",
      "display_name": "worldnews",
    }
  ]
}
const props = { gallery }

it('should render the app without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('should render Imgur App Document', () => {
  const wrapper = render(<App />);
  const imgurDiv = wrapper.getByTestId('imgur-app');
  expect(imgurDiv).toBeInTheDocument();
});

it('should render Imgur Logo in App Bar', () => {
  const wrapper = shallow(<AppBar />);
  setTimeout(() => {
    expect(wrapper.find('[data-testid="app-bar-logo"]')).toHaveLength(1);
    expect(wrapper.find('[data-testid="app-bar-logo"]')).toHaveAttribute('src', 'imgur.png');
    expect(wrapper.find('[data-testid="app-bar-logo"]')).toHaveAttribute('alt', 'imgur');
  })
});

it('should render Home Icon in App Bar', () => {
  const wrapper = shallow(<AppBar />);
  expect(wrapper.find('[data-testid="home-button"]')).toHaveLength(1);
});

it('should render HomeView Component', () => {
  const wrapper = shallow(
    <Provider store={store}><HomeView><div className="home-view" /></HomeView></Provider>
  )
  expect(wrapper.contains(<div className="home-view" />)).toEqual(true)
});

it('should render GalleryDetails Component', () => {
  const wrapper = shallow(
    <Provider store={store}><GalleryDetails><div className="gallery-details" /></GalleryDetails></Provider>
  )
  expect(wrapper.contains(<div className="gallery-details" />)).toEqual(true)
});

it('should render Gallery Post Info', () => {
  const wrapper = shallow(<PostInfo {...props} />);
  setTimeout(() => {
    expect(wrapper.find('[data-testid="gallery-ups"]')).toHaveLength(1);
    expect(wrapper.find('[data-testid="gallery-ups"]')).toHaveAttribute('secondary', 4285);
    expect(wrapper.find('[data-testid="gallery-downs"]')).toHaveLength(1);
    expect(wrapper.find('[data-testid="gallery-downs"]')).toHaveAttribute('secondary', 47);
    expect(wrapper.find('[data-testid="gallery-score"]')).toHaveLength(1);
    expect(wrapper.find('[data-testid="gallery-score"]')).toHaveAttribute('secondary', 4273);
    expect(wrapper.find('[data-testid="gallery-comments"]')).toHaveLength(1);
    expect(wrapper.find('[data-testid="gallery-comments"]')).toHaveAttribute('secondary', 272);
  })
});