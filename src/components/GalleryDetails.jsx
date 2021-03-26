import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Loader from '@material-ui/core/CircularProgress';

import AppBar from 'components/AppBar';
import {theme} from 'theme/theme.js';
import { PostInfo } from 'components/PostInfo';
import noImage from 'assets/no-image.png';

// const StyledDiv = styled.div`
//   background: white;
// `
// StyledDiv.displayName = 'StyledDiv'

const StyledApp = styled.div`
  min-height: 0;
  display: inline-block;
  position: relative;
  margin: 50px 0;
  background-color: ${theme.base.white};
  width: 100%;
`
StyledApp.displayName = 'StyledApp'

const StyledContainer = styled.div`
  display: block;
  justify-items: stretch;
  align-items: stretch;
  width: 80%;
  margin: 50px auto;
`
StyledContainer.displayName = 'StyledContainer'

const StyledTitle = styled.div`
  display: block;
  background: ${theme.primary.main};
  width: 100%;
  margin: 20px auto;
  height: 40px;
  font-size: 20px;
  padding: 16px 0 0 12px;
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
  text-align: center;
  @media (max-width: 480px) {
    font-size: 16px;
    padding: 18px 0 0 10px;
  }
`
StyledTitle.displayName = 'StyledTitle'

const StyledLoaderContainer = styled.div`
  max-width: 60px;
  width: 100%;
  margin: 100px auto;
`
StyledLoaderContainer.displayName = 'StyledLoaderContainer'

const StyledLoader = styled(Loader)`
  color: ${theme.secondary.main};
`
StyledLoader.displayName = 'StyledLoader'

const StyledImage = styled.img`
  display: block;
  max-width: 70%;
  height: auto;
  margin: 10px auto;
`
StyledImage.displayName = 'StyledImage'

const StyledVideo = styled.video`
  display: block;
  max-width: 60%;
  height: auto;
  margin: 10px auto;
`
StyledVideo.displayName = 'StyledVideo'

const StyledDescription = styled.p`
  padding: 15px 0;
  border-bottom: 2px solid ${theme.primary.main};
  text-align: center;
`
StyledDescription.displayName = 'StyledDescription'

export const GalleryDetails = props => {
  const { gallery } = props;
  const imageType = gallery.images && gallery.images[0].link.split('.').pop();

  return (
		<>
      <AppBar />
		  <StyledApp>
		    {props.isLoading &&
					<StyledLoaderContainer><StyledLoader /></StyledLoaderContainer>}
				{!props.isLoading && <StyledContainer>
		      <StyledTitle>Title: {gallery.title}</StyledTitle>
          {gallery.images ? (gallery.images.map(image => {
            return (
              <div key={image.id}>
                {imageType === 'mp4' ? 
                  (<StyledVideo loop controls autoPlay>
                    <source src={image.link} type='video/mp4' />
                  </StyledVideo>) :
                  (<StyledImage src={image.link} />)
                }
              </div>);
            })) :
            (<div><StyledImage src={noImage} /></div>)
          }
          {true && (
           <StyledDescription>{gallery.description}</StyledDescription>
          )}
          <PostInfo gallery={gallery} />
		    </StyledContainer>}
		  </StyledApp>
    </>
  );
}

const mapStateToProps = (state, { match }) => ({
  gallery: state.galleriesList.find(i => i.id === match.params.galleryId)
});

export default connect(mapStateToProps, {})(
  withRouter(GalleryDetails)
);

