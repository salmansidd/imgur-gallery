import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ScoreIcon from '@material-ui/icons/Score';
import CommentIcon from '@material-ui/icons/Comment';

import {theme} from 'theme/theme.js';
import {ITEM_URL} from 'constants.js';

const StyledGalleryWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 20%;
  margin: 15px;
  @media (max-width: 1130px) {
    max-width: 37%;
 	}
   @media (max-width: 870px) {
    max-width: 40%;
 	}
 	@media (max-width: 480px) {
    max-width: 100%;
 	}
`
StyledGalleryWrapper.displayName = 'StyledGalleryWrapper'

const StyledLink = styled(Link)`
  text-decoration: none;
`
StyledLink.displayName = 'StyledLink'

const StyledImage = styled.img`
  max-width: 100%;
`
StyledImage.displayName = 'StyledImage'

const StyledText = styled.p`
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
`
StyledText.displayName = 'StyledText'

const StyledTitle = styled(Typography)`
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
`
StyledTitle.displayName = 'StyledTitle'

const StyledAvatar = styled(Avatar)`
  background-color: ${theme.base.maroon};
`
StyledAvatar.displayName = 'StyledAvatar'

const StyledDiv = styled.div`
  display: grid;
  text-align: center;
`
StyledDiv.displayName = 'StyledDiv'

const StyledCardHeader = styled(CardHeader)`
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
`
StyledCardHeader.displayName = 'StyledCardHeader'

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 345,
    backgroundColor: `${theme.primary.main}`
  },
  media: {
    height: 0,
    paddingTop: '100%'
  },
}));

const GalleryItem = ({ item }) => {
  const classes = useStyles();
  const avatar = item.account_url.substr(0, 1).toUpperCase();
  return (
    <StyledGalleryWrapper>
      <StyledLink to={`gallery/${item.id}`}>
        <Card className={classes.root}>
          <StyledCardHeader
            avatar={<StyledAvatar>{avatar}</StyledAvatar>}
            title={item.account_url}
            subheader={moment.unix(item.datetime).format('L, HH:mm')}>
          </StyledCardHeader>
          <CardMedia
            className={classes.media}
            image={
              item.cover
                ? `${ITEM_URL}/${item.cover}b.jpg`
                : `${ITEM_URL}/${item.id}b.jpg`
            }
            title='Paella dish'
          />
          <CardContent>
            <StyledTitle variant='body2'>
              {item.title}
            </StyledTitle>
          </CardContent>
          <CardActions disableSpacing>
            <StyledDiv>
              <IconButton color='primary'>
                <ArrowUpwardIcon />
              </IconButton>
              <span>{item.ups}</span>
            </StyledDiv>
            <StyledDiv>
              <IconButton color='primary'>
                <ArrowDownwardIcon />
              </IconButton>
              <span>{item.downs}</span>
            </StyledDiv>
            <StyledDiv>
              <IconButton color='primary'>
                <ScoreIcon />
              </IconButton>
              <span>{item.score}</span>
            </StyledDiv>
            <StyledDiv>
              <IconButton color='primary'>
                <CommentIcon />
              </IconButton>
              <span>{item.comment_count}</span>
            </StyledDiv>
          </CardActions>
        </Card>
      </StyledLink>
    </StyledGalleryWrapper>

  );
}

export default GalleryItem;
