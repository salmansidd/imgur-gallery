import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import styled from 'styled-components';

import { Filters } from 'components/Filters';
import imgur from 'assets/imgur.png';
import {theme} from 'theme/theme.js';

const styles = makeStyles();

const StyledAppBar = styled(AppBar)`
  background-color: ${theme.secondary.main};
  position: fixed;
  top: 0;
`
StyledAppBar.displayName = 'StyledAppBar'

const StyledAppBarLogo = styled.img`
  max-width: 100px;
  margin-left: 16px;
`
StyledAppBarLogo.displayName = 'StyledAppBarLogo'

const StyledHomeIcon = styled(HomeIcon)`
  font-size: 40px;
  color: ${theme.primary.main};
`
StyledHomeIcon.displayName = 'StyledHomeIcon'

const ButtonAppBar = (props) => {
  styles();

  return (
    <>
      <StyledAppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            data-testid='home-button'
          >
				  <Link to={`/`}><StyledHomeIcon /></Link>
          </IconButton>
          <StyledAppBarLogo src={imgur} alt='imgur' data-testid='app-bar-logo' />
          {props &&
            <Filters
              filterOptions={props.filterOptions}
              onFilterChange={props.onFilterChange}
              userSelected={props.userSelected}
            />
          }
        </Toolbar>
      </StyledAppBar>
    </>
  );
}

export default ButtonAppBar;
