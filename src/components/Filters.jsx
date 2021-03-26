import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import styled from 'styled-components';

const StyledFilters = styled.div`
  position: absolute;
  right: 10px;
  @media (max-width: 480px) {
    position: relative;
    left: 70px;
 	}
`
StyledFilters.displayName = 'StyledFilters'

const StyledFilterTitle = styled.div`
  display: inline-block;
  padding: 14px 5px 0 5px;
  @media (max-width: 720px) {
    display: none;
 	}
`
StyledFilterTitle.displayName = 'StyledFilterTitle'

const useStyles = makeStyles(() => ({
  formControl: {
    margin: 8,
    minWidth: 80,
    backgroundColor: 'white'
  },
}));

export const Filters = (props) => {
  const classes = useStyles();
  const { onFilterChange, userSelected, filterOptions } = props;
  return (
    <>
      {filterOptions && <StyledFilters>
        <StyledFilterTitle>Section</StyledFilterTitle>
        <FormControl className={classes.formControl}>
          <Select
            native
            value={filterOptions.section}
            onChange={(e) => onFilterChange(e)}
            inputProps={{
              name: 'section',
              id: 'section',
            }}
          >
            <option value='hot'>Hot</option>
            <option value='top'>Top</option>
            <option value='user'>User</option>
          </Select>
        </FormControl>
        <StyledFilterTitle>Sort</StyledFilterTitle>
        <FormControl className={classes.formControl}>
          <Select
            native
            value={filterOptions.sort}
            onChange={(e) => onFilterChange(e)}
            inputProps={{
              name: 'sort',
              id: 'sort',
            }}
          >
            <option value='viral'>Viral</option>
            <option value='top'>Top</option>
            <option value='time'>Time</option>
            {userSelected && <option value='rising'>Rising</option>}
          </Select>
        </FormControl>
        <StyledFilterTitle>Window</StyledFilterTitle>
        <FormControl className={classes.formControl}>
          <Select
            native
            value={filterOptions.window}
            onChange={(e) => onFilterChange(e)}
            inputProps={{
              name: 'window',
              id: 'window',
            }}
          >
            <option value='day'>Day</option>
            <option value='week'>Week</option>
            <option value='month'>Month</option>
            <option value='year'>Year</option>
            <option value='all'>All</option>
          </Select>
        </FormControl>
        </StyledFilters>
        }
    </>
  );
};
