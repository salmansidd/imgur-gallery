import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazyload';
import styled from 'styled-components';
import Loader from '@material-ui/core/CircularProgress';

import { getGalleries, changeFilter } from 'api/baseApi.js';
import AppBar from 'components/AppBar';
import GalleryItem from 'components/GalleryItem';
import {theme} from 'theme/theme.js';

const StyledApp = styled.div`
  width: 95%;
  margin-right: auto;
  margin-left: auto;
`
StyledApp.displayName = 'StyledApp'

const StyledAppHeader = styled.div`
  text-align: center;
  background: ${theme.primary.main};
  max-width: 80vw;
  width: 100%;
  margin: 0 auto;
  height: 65px;
  padding-top: 12px;
`
StyledAppHeader.displayName = 'StyledAppHeader'

const StyledContainer = styled.div`
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  padding-top: 20px;
  background-color: ${theme.base.white};
  margin-top: 60px;
  justify-content: center;
`
StyledContainer.displayName = 'StyledContainer'

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

const StyledError = styled.div`
  max-width: 80vw;
  width: 100%;
  margin: 80px auto;
`
StyledError.displayName = 'StyledError'

class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      currentPage: 0,
      pageSize: 10,
      list: [],
      isListEnd: false,
      isUserSelected: false,
      isLoadingData: false
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.props.getGalleries(this.props.filter);
    window.addEventListener('scroll', this.handleScroll, true);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.filter) !== JSON.stringify(this.props.filter)) {
      this.props.getGalleries(nextProps.filter);
    } else {
      this.setState({ isLoadingData: false });
      this.loadGalleries(nextProps);
    }
  }

  onFilterChange(event) {
    const element = event.target;
    const option = element.options[element.selectedIndex];
    this.setState({
      page: 0,
      currentPage: 0,
      isLoadingData: true,
      useFilter: true
    });
    this.props.changeFilter({
      [element.name]: option.value,
      page: 0
    });
    if (element.name === 'section') {
      const isUserSelected = option.value === 'user' ? true : false;
      this.setState({ isUserSelected });
    }
  }

  handleScroll() {
    const { isLoadingData, isListEnd, page, currentPage, pageSize } = this.state;
    const {documentElement: { clientHeight, scrollHeight, scrollTop }} = document;
    const scrollToTop = window.pageYOffset || scrollTop;
    const headerOffSet = 100;
    if ((clientHeight + scrollToTop + headerOffSet >= scrollHeight) && !isLoadingData && isListEnd) {
      this.props.changeFilter({ page: (page + 1) });
      this.setState({
        page: page + 1,
        currentPage: currentPage + pageSize,
        isLoadingData: true,
        isListEnd: false,
      });
    } else if ((clientHeight + scrollToTop + headerOffSet >= scrollHeight) && !isLoadingData && !isListEnd) {
      this.loadGalleries(this.props);
    }
  }

  loadGalleries(props) {
    const {currentPage, pageSize, useFilter, list} = this.state;
    let nextPage;
    if (currentPage + pageSize >= props.list.length) {
      nextPage = currentPage;
      this.setState({ isListEnd: true });
    } else {
      nextPage = currentPage + pageSize;
      this.setState({ isListEnd: false });
    }
    if (useFilter) {
      window.scrollTo(0, 0);
      this.setState({
        list: [
          ...props.list.slice(
            currentPage,
            currentPage + pageSize
          )
        ],
        currentPage: nextPage,
        useFilter: false
      });
    } else {
      this.setState({
        list: [
          ...list,
          ...props.list.slice(
            currentPage,
            currentPage + pageSize
          )
        ],
        currentPage: nextPage
      });
    }
  }

  render() {
    return (
      <div>
        <AppBar
          onFilterChange={this.onFilterChange.bind(this)}
          userSelected={this.state.isUserSelected}
          filterOptions={this.props.filter}
        />
        <LazyLoad>
          <StyledApp>
            <StyledContainer data-testid='galleries-container'>
            {this.props.list.length ? (
                this.state.list.map(item => {
                  return <GalleryItem key={item.id} item={item} />
                })
              ) : (
                <StyledLoaderContainer><StyledLoader /></StyledLoaderContainer>
              )}
              </StyledContainer>
              {this.state.isLoadingData &&
                <StyledLoaderContainer><StyledLoader /></StyledLoaderContainer>}
          </StyledApp>
        </LazyLoad>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  list: state.galleriesList,
  filter: state.galleriesFilter
});

const mapDispatchToProps = (dispatch) => ({
  getGalleries: (params) => {
    dispatch(getGalleries(params));
  },
  changeFilter: (name, param) => {
    dispatch(changeFilter(name, param));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(HomeView)
);
