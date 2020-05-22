import React from 'react';
import {Clipboard, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import Swiper from 'react-native-swiper';

import {MCView} from 'components/styled/View';
import {MCBookTagsView, MCImage, MCIcon} from 'components/common';
import {H3, H4, H5} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {showAlert} from 'services/operators';
import {dySize} from 'utils/responsive';
import NavigationService from 'navigation/NavigationService';

class BookItem extends React.Component {
  static propTypes = {
    resource: PropTypes.object.isRequired,
    editable: PropTypes.bool,
    onPressBookmark: PropTypes.func,
    onPressEdit: PropTypes.func,
    onPressRemove: PropTypes.func,
  };

  static defaultProps = {
    onPressBookmark: () => undefined,
    onPressEdit: () => undefined,
    onPressRemove: () => undefined,
    editable: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      bookInfo: null,
    };
  }

  componentDidMount() {
    const {
      from,
      resource,
      allResources,
      bookmarkedResources,
      searchedResources,
    } = this.props;

    if (from === 'global') {
      allResources.map(item => {
        if (item.title === resource.data.title) {
          this.setState({bookInfo: item});
        }
      });
    }

    if (from === 'search') {
      searchedResources.map(item => {
        if (item.title === resource.data.title) {
          this.setState({bookInfo: item});
        }
      });
    }

    if (from === 'bookmark') {
      bookmarkedResources.map(item => {
        if (item.title === resource.data.title) {
          this.setState({bookInfo: item});
        }
      });
    }
  }

  onPressCopyLink = link => {
    const {t} = this.props;
    Clipboard.setString(link);
    showAlert(t('clipboard_link_saved'));
  };

  onPressBookmark = resource => {
    this.props.onPressBookmark({
      title: resource.data.title,
      bookmark: !resource.bookmark,
    });
  };

  goDetailpage = resource => {
    NavigationService.navigate('BookDetail', {
      resource: resource,
      from: this.props.from,
    });
  };

  render() {
    const {t, resource, theme, from, profile} = this.props;
    const {bookInfo} = this.state;

    return (
      <>
        <MCButton
          onPress={() => this.goDetailpage(resource)}
          key={resource._id}>
          {(from === 'global' || from === 'search' || from === 'bookmark') && (
            <MCView row justify="flex-start" width={300} mb={10}>
              {bookInfo &&
                bookInfo.ownerInfo.slice(0, 3).map((owner, index) => {
                  return (
                    <>
                      <MCView mr={-15}>
                        <MCImage
                          key={index}
                          image={{uri: owner.avatar}}
                          round
                          width={30}
                          height={30}
                          type="avatar"
                        />
                      </MCView>
                      {bookInfo.ownerInfo.length > 3 && index == 2 && (
                        <MCView
                          width={30}
                          height={30}
                          bordered
                          br={15}
                          background={theme.colors.text}
                          align="center"
                          justify="center"
                          mr={-14}
                          style={{opacity: 0.8}}>
                          <H4 weight="bold" color={theme.colors.background}>
                            +{bookInfo.ownerInfo.length - 3}
                          </H4>
                        </MCView>
                      )}
                    </>
                  );
                })}
            </MCView>
          )}
          <MCView
            width={300}
            row
            justify="space-between"
            align="flex-start"
            ph={10}
            mt={15}>
            <MCView>
              <MCImage
                width={120}
                height={180}
                image={{uri: resource.data.thumbnail}}
                resizeMode="contain"
              />
            </MCView>
            <MCView width={140}>
              <H3 weight="bold">{resource.data.title}</H3>
              {resource.data.authors && <H5> By {resource.data.authors[0]}</H5>}
              <MCView row>
                <H5 weight="bold">{t('resource_type_book_released')}</H5>
                <H5 ml={10}>{resource.data.publishDate}</H5>
              </MCView>
              <MCView row>
                <H5 weight="bold">{t('resource_type_book_page')}</H5>
                <H5 ml={10}>{resource.data.pageCount} pg</H5>
              </MCView>
            </MCView>
          </MCView>
          {from != 'global' && from != 'search' && from != 'bookmark' && (
            <>
              <MCView bordered mt={10} mb={10} width={300} />
              <MCView width={300}>
                <H4 underline>{t('resource_type_book_skill')}</H4>
                <MCView row wrap>
                  {resource.data.skills.map(
                    (skill, index) =>
                      index < 3 && (
                        <MCView
                          mr={10}
                          mb={5}
                          br={10}
                          background={theme.colors.text}
                          height={30}
                          ph={10}
                          align="center"
                          justify="center">
                          {skill.indexOf('resource_manual_') > -1 ? (
                            <H5 color={theme.colors.background}>
                              {t(skill.slice('resource_manual_'.length))}
                            </H5>
                          ) : (
                            <H5 color={theme.colors.background}>
                              {t(`resource_book_skills_${skill}`)}
                            </H5>
                          )}
                        </MCView>
                      ),
                  )}
                </MCView>
              </MCView>
            </>
          )}
        </MCButton>

        <MCView width={30} height={30} absolute style={{right: 0, top: 10}}>
          <MCButton onPress={() => this.onPressBookmark(resource)}>
            <MCIcon
              padding={1}
              name={
                resource.bookedBy && resource.bookedBy.indexOf(profile._id) > -1
                  ? 'ios-star'
                  : 'ios-star-outline'
              }
              color={
                resource.bookedBy && resource.bookedBy.indexOf(profile._id) > -1
                  ? theme.colors.like
                  : theme.colors.text
              }
              size={15}
            />
          </MCButton>
        </MCView>
      </>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  allResources: state.resourceReducer.allResources,
  bookmarkedResources: state.resourceReducer.bookmarkedResources,
  searchedResources: state.resourceReducer.searchedResources,
  profile: state.profileReducer,
});

export default withTranslation()(
  connect(
    mapStateToProps,
    undefined,
  )(BookItem),
);
