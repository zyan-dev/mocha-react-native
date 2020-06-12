import React from 'react';
import {Clipboard, ScrollView, FlatList} from 'react-native';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import Swiper from 'react-native-swiper';
import * as _ from 'lodash';

import {MCView} from 'components/styled/View';
import {MCBookTagsView, MCImage, MCIcon} from 'components/common';
import {H3, H4, H5, MCEmptyText} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {showAlert} from 'services/operators';
import {dySize} from 'utils/responsive';
import NavigationService from 'navigation/NavigationService';
import {resourceActions} from 'Redux/actions';
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

    // if (from === 'recommended') {
    //   recommendedResources.map(item => {
    //     if (item.title === resource.data.title) {
    //       this.setState({bookInfo: item});
    //     }
    //   });
    // }
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

  addResource = resource => {
    NavigationService.navigate('AddResource', {
      resource: resource,
      from: this.props.from,
    });
  };

  _renderSkillItem = ({item}) => {
    const {theme, t} = this.props;

    return (
      <MCView
        mr={10}
        mb={5}
        br={10}
        background="#FFE482"
        height={30}
        ph={10}
        align="center"
        justify="center">
        {item && item.indexOf('resource_manual_') > -1 ? (
          <H5 color={theme.colors.text}>
            {t(item.slice('resource_manual_'.length))}
          </H5>
        ) : (
          <H5 color={theme.colors.text}>{t(`resource_book_skills_${item}`)}</H5>
        )}
      </MCView>
    );
  };

  _renderImpactItem = ({item}) => {
    const {theme, t} = this.props;
    return (
      <MCView
        mr={10}
        mb={5}
        br={10}
        background="#C1F1D8"
        width={80}
        ph={10}
        align="center"
        justify="center">
        <H5 color={theme.colors.text} align="center">
          {t(`resource_book_impact_${item}`)}
        </H5>
      </MCView>
    );
  };

  render() {
    const {
      t,
      resource,
      theme,
      from,
      profile,
      removeRecommendedResource,
      hiddenRecommendedResource,
    } = this.props;
    const {bookInfo} = this.state;
    let allImpacts = [];
    allImpacts = _.concat(
      allImpacts,
      resource.data.mostImpacts || [],
      resource.data.veryImpacts || [],
      resource.data.impacts || [],
    );

    return (
      <>
        {from === 'recommended' && (
          <MCView
            row
            justify="space-around"
            align="center"
            width={300}
            height={50}
            alsoute
            style={{
              right: 0,
              top: 10,
              borderBottomWidth: 1,
              borderColor: '#dddddd',
            }}>
            <MCButton
              align="center"
              onPress={() => removeRecommendedResource(resource._id)}>
              <MCIcon name="times" type="FontAwesome5Pro" size={20} />
              <H5>Remove</H5>
            </MCButton>
            <MCButton
              align="center"
              onPress={() => hiddenRecommendedResource(resource._id)}>
              <MCIcon name="eye-slash" type="FontAwesome5Pro" size={20} />
              <H5>Hide</H5>
            </MCButton>
            <MCButton align="center" onPress={() => this.addResource(resource)}>
              <MCIcon name="plus" type="FontAwesome5Pro" size={20} />
              <H5>Add</H5>
            </MCButton>
            <MCButton
              align="center"
              onPress={() => this.onPressBookmark(resource)}>
              <MCIcon name="bookmark" type="FontAwesome5Pro" size={20} />
              <H5>Bookmark</H5>
            </MCButton>
          </MCView>
        )}
        <MCButton
          onPress={() => this.goDetailpage(resource)}
          key={resource._id}>
          {/* {(from === 'global' || from === 'search' || from === 'bookmark') && (
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
          )} */}
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
        </MCButton>
        <MCView style={{borderTopWidth: 1, borderColor: '#dddddd'}}>
          <H4 underline>{t('resource_type_book_impact')}</H4>
          <FlatList
            data={allImpacts}
            renderItem={this._renderImpactItem}
            keyExtractor={item => item}
            keyboardShouldPersistTaps="always"
            ListEmptyComponent={<MCEmptyText>{t('no_result')}</MCEmptyText>}
            numColumns={1}
            style={{
              width: dySize(300),
              maxHeight: dySize(60),
              marginTop: dySize(10),
            }}
            horizontal={true}
          />
        </MCView>
        <MCView>
          <H4 underline>{t('resource_type_book_skill')}</H4>
          <FlatList
            data={resource.data.skills}
            renderItem={this._renderSkillItem}
            keyExtractor={item => item}
            keyboardShouldPersistTaps="always"
            ListEmptyComponent={<MCEmptyText>{t('no_result')}</MCEmptyText>}
            numColumns={1}
            style={{
              width: dySize(300),
              maxHeight: dySize(60),
              marginTop: dySize(10),
            }}
            horizontal={true}
          />
        </MCView>

        {from === 'bookmark' &&
        resource &&
        resource.recommended &&
        resource.recommends.indexOf(profile._id) > -1 ? (
          <>
            <MCView
              row
              justify="center"
              style={{borderTopWidth: 1, borderColor: '#dddddd'}}
              width={320}
              pv={5}>
              <MCIcon
                name="hand-holding-seedling"
                type="FontAwesome5Pro"
                size={20}
              />
              <H4 ml={10} mr={10}>
                Recommended by {resource.ownerName}
              </H4>
              <MCImage
                image={{uri: resource.ownerAvatar}}
                round
                width={30}
                height={30}
                type="avatar"
              />
            </MCView>
          </>
        ) : (
          from === 'bookmark' && (
            <>
              <MCView
                row
                justify="center"
                style={{borderTopWidth: 1, borderColor: '#dddddd'}}
                width={320}
                pv={5}>
                <MCIcon name="book" type="FontAwesome5Pro" size={20} />
                <H4 ml={10} mr={10}>
                  From {resource.ownerName}'s Bookshelf
                </H4>
                <MCImage
                  image={{uri: resource.ownerAvatar}}
                  round
                  width={30}
                  height={30}
                  type="avatar"
                />
              </MCView>
            </>
          )
        )}

        {from !== 'recommended' && (
          <MCView width={30} height={30} absolute style={{right: 0, top: 10}}>
            <MCButton onPress={() => this.onPressBookmark(resource)}>
              <MCIcon
                padding={1}
                name={
                  resource.bookedBy &&
                  resource.bookedBy.indexOf(profile._id) > -1
                    ? 'ios-star'
                    : 'ios-star-outline'
                }
                color={
                  resource.bookedBy &&
                  resource.bookedBy.indexOf(profile._id) > -1
                    ? theme.colors.like
                    : theme.colors.text
                }
                size={15}
              />
            </MCButton>
          </MCView>
        )}
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

const mapDispatchToProps = {
  hiddenRecommendedResource: resourceActions.hiddenRecommendedResource,
  removeRecommendedResource: resourceActions.removeRecommendedResource,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(BookItem),
);
