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
      impactsArray: [],
      skillsArray: [],
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

    if (from === 'global' || from === 'bookmark' || from == 'search') {
      let resources = allResources;
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

        resources = searchedResources;
      }

      if (from === 'bookmark') {
        bookmarkedResources.map(item => {
          if (item.title === resource.data.title) {
            this.setState({bookInfo: item});
          }
        });

        resources = bookmarkedResources;
      }

      resources.map(item => {
        if (item.title === resource.data.title) {
          this.setState({bookInfo: item}, () => {
            const mappingImpacts = [];
            this.state.bookInfo.data.forEach(book => {
              book.data.impacts &&
                book.data.impacts.forEach(impact => {
                  mappingImpacts.push(impact);
                });
              book.data.veryImpacts &&
                book.data.veryImpacts.forEach(impact => {
                  mappingImpacts.push(impact);
                });
              book.data.mostImpacts &&
                book.data.mostImpacts.forEach(impact => {
                  mappingImpacts.push(impact);
                });
            });

            const impactsArray = _.uniqBy(mappingImpacts);

            const mappingSkills = [];
            this.state.bookInfo.data.map(book => {
              book.data.skills.map(skill => {
                mappingSkills.push(skill);
              });
            });

            const skillsArray = _.uniqBy(mappingSkills);

            this.setState({impactsArray});
            this.setState({skillsArray});
          });
        }
      });
    } else {
      let allImpacts = [];
      allImpacts = _.concat(
        allImpacts,
        resource.data.mostImpacts || [],
        resource.data.veryImpacts || [],
        resource.data.impacts || [],
      );

      this.setState({impactsArray: allImpacts});
      this.setState({skillsArray: resource.data.skills});
    }

    // if (from === 'recommended') {
    //   recommendedResources.map(item => {
    //     if (item.title === resource.data.title) {
    //       this.setState({bookInfo: item});
    //     }
    //   });
    // }
  }

  componentDidUpdate(preProps, preState) {
    if (
      preProps.resource !== this.props.resource &&
      this.props.from == 'trust-member'
    ) {
      let allImpacts = [];
      allImpacts = _.concat(
        allImpacts,
        this.props.resource.data.mostImpacts || [],
        this.props.resource.data.veryImpacts || [],
        this.props.resource.data.impacts || [],
      );

      this.setState({impactsArray: allImpacts});
      this.setState({skillsArray: this.props.resource.data.skills});
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

  showAvatars = avatars => {
    const {theme} = this.props;
    return (
      <MCView row justify="flex-end" style={{paddingLeft: dySize(30)}}>
        {avatars.slice(0, 3).map((owner, index) => {
          return (
            <>
              <MCView ml={-15}>
                <MCImage
                  key={index}
                  image={{uri: owner.avatar}}
                  round
                  width={30}
                  height={30}
                  type="avatar"
                />
              </MCView>
              {avatars.length > 3 && index == 2 && (
                <MCView
                  width={30}
                  height={30}
                  bordered
                  br={15}
                  background={theme.colors.text}
                  align="center"
                  justify="center"
                  ml={-14}
                  style={{opacity: 0.8}}>
                  <H4 weight="bold" color={theme.colors.background}>
                    +{avatars.length - 3}
                  </H4>
                </MCView>
              )}
            </>
          );
        })}
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
    const {bookInfo, impactsArray, skillsArray} = this.state;
    let recommendedOwners = [],
      bookshelfOwners = [];

    return (
      <MCView>
        {from === 'recommended' ? (
          <MCView
            row
            justify="space-around"
            align="center"
            width={320}
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
        ) : (
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
        <MCButton
          onPress={() => this.goDetailpage(resource)}
          key={resource._id}>
          <MCView
            width={320}
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
            data={impactsArray}
            renderItem={this._renderImpactItem}
            keyExtractor={item => item}
            keyboardShouldPersistTaps="always"
            ListEmptyComponent={<MCEmptyText>{t('no_result')}</MCEmptyText>}
            numColumns={1}
            style={{
              width: dySize(320),
              maxHeight: dySize(60),
              marginTop: dySize(10),
            }}
            horizontal={true}
          />
        </MCView>
        <MCView>
          <H4 underline>{t('resource_type_book_skill')}</H4>
          <FlatList
            data={skillsArray}
            renderItem={this._renderSkillItem}
            keyExtractor={item => item}
            keyboardShouldPersistTaps="always"
            ListEmptyComponent={<MCEmptyText>{t('no_result')}</MCEmptyText>}
            numColumns={1}
            style={{
              width: dySize(320),
              maxHeight: dySize(40),
            }}
            horizontal={true}
          />
        </MCView>

        {from === 'bookmark' &&
          bookInfo &&
          bookInfo.data.map(v => {
            if (v.recommends && v.recommends.indexOf(profile._id) > -1) {
              const item = {
                name: v.ownerName,
                avatar: v.ownerAvatar,
              };
              recommendedOwners.push(item);
            } else {
              const item = {
                name: v.ownerName,
                avatar: v.ownerAvatar,
              };
              bookshelfOwners.push(item);
            }
          })}
        {from == 'bookmark' && recommendedOwners.length > 0 && (
          <MCView
            row
            align="center"
            style={{borderTopWidth: 1, borderColor: '#dddddd'}}
            width={320}
            pv={5}>
            <MCIcon name="book" type="FontAwesome5Pro" size={20} />
            <H4
              ml={10}
              mr={10}
              style={{flex: 1}}
              numberOfLines={2}
              align="center">
              Recommended by {recommendedOwners[0].name}
              {recommendedOwners.length > 1 &&
                ` and ${recommendedOwners.length - 1} others`}
            </H4>
            {this.showAvatars(recommendedOwners)}
          </MCView>
        )}
        {from == 'bookmark' && bookshelfOwners.length > 0 && (
          <MCView
            row
            align="center"
            style={{borderTopWidth: 1, borderColor: '#dddddd'}}
            width={320}
            pv={5}>
            <MCIcon name="book" type="FontAwesome5Pro" size={20} />
            <H4
              ml={10}
              mr={10}
              style={{flex: 1}}
              numberOfLines={2}
              align="center">
              From {bookshelfOwners[0].name}'s
              {bookshelfOwners.length > 1 &&
                `and ${bookshelfOwners.length - 1} other's`}{' '}
              Bookshelf
            </H4>
            {this.showAvatars(bookshelfOwners)}
          </MCView>
        )}
      </MCView>
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
