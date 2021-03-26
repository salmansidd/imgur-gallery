import React from 'react';
import { 
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import HomeView from 'components/HomeView';
import GalleryDetails from 'components/GalleryDetails';

const AppRouter = () => (
  <>
    <Router>
      <Switch>
        <Route exact path='/' component={HomeView} />
        <Route path='/gallery/:galleryId' component={GalleryDetails} />
      </Switch>
    </Router>
  </>
)

export default AppRouter;
