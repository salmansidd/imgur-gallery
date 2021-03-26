import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ScoreIcon from '@material-ui/icons/Score';
import CommentIcon from '@material-ui/icons/Comment';
import styled from 'styled-components';
import {theme} from 'theme/theme.js';

const StyledPostInfo = styled.div`
  text-align: center;
`
StyledPostInfo.displayName = 'StyledPostInfo'

const StyledChip = styled(Chip)`
  margin: 5px 10px 10px 0;
`
StyledChip.displayName = 'StyledChip'

const StyledListItem = styled(ListItem)`
  width: auto;
  display: inline-block;
`
StyledListItem.displayName = 'StyledListItem'

const StyledAvatar = styled(Avatar)`
  background-color: ${theme.secondary.main};
`
StyledAvatar.displayName = 'StyledAvatar'

export const PostInfo = props => {
  const { gallery } = props;
  return (
    <StyledPostInfo>
      <List>
        <StyledListItem>
          <ListItemAvatar><StyledAvatar><ArrowUpwardIcon /></StyledAvatar></ListItemAvatar>
          <ListItemText primary='Up Votes' secondary={gallery.ups} data-testid='gallery-ups' />
        </StyledListItem>
        <StyledListItem>
          <ListItemAvatar><StyledAvatar><ArrowDownwardIcon /></StyledAvatar></ListItemAvatar>
          <ListItemText primary='Down Votes' secondary={gallery.downs} data-testid='gallery-downs' />
        </StyledListItem>
        <StyledListItem>
          <ListItemAvatar><StyledAvatar><ScoreIcon /></StyledAvatar></ListItemAvatar>
          <ListItemText primary='Score' secondary={gallery.score} data-testid='gallery-score'/>
        </StyledListItem>
        <StyledListItem>
          <ListItemAvatar><StyledAvatar><CommentIcon /></StyledAvatar></ListItemAvatar>
          <ListItemText primary='Comments' secondary={gallery.comment_count} data-testid='gallery-comments'/>
        </StyledListItem>
      </List>
      <div>
        {gallery.tags.map((tag, i) => {
          const avatar = tag.display_name.substr(0, 1).toUpperCase();
          return (
            <StyledChip
              key={i}
              avatar={<Avatar>{avatar}</Avatar>}
              label={tag.display_name}
              color='secondary'
            />
          );
        })}
      </div>
    </StyledPostInfo>
  );
};
