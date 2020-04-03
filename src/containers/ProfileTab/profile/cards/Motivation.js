import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import Collapsible from 'react-native-collapsible';
import FastImage from 'react-native-fast-image';
import {DefaultPicture} from 'assets/images';
import {MCCard, MCView} from 'components/styled/View';
import {H3, H4, MCIcon} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCModal, MCImage} from 'components/common';
import {profileCardWidth, profileCardNumPerRow} from 'services/operators';
import CardItem from './CardItem';

class MotivationCard extends React.Component {
  static propTypes = {
    onPressAllMotivations: PropTypes.func,
    motivations: PropTypes.arrayOf(Object),
  };

  static defaultProps = {
    onPressAllMotivations: () => undefined,
    motivations: [],
  };
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      selected: null,
      showModal: false,
    };
  }

  onToggleCollapse = collapsed => {
    this.setState({collapsed});
  };

  onPressValue = value => {
    this.setState({selected: value, showModal: true});
  };

  _renderMotivationItem = item => {
    const motivation = item.data;
    return (
      <MCCard width={profileCardWidth} ml={5} mr={5} align="center">
        <MCButton
          key={item._id}
          align="center"
          onPress={() => this.onPressValue(motivation)}>
          <H4 numberOfLines={1}>{motivation.title}</H4>
          <MCImage
            image={{uri: motivation.image}}
            style={{width: 100, height: 100}}
            br={6}
          />
        </MCButton>
      </MCCard>
    );
  };

  render() {
    const {t, onPressAllMotivations, motivations} = this.props;
    const {selected, collapsed, showModal} = this.state;
    return (
      <MCView align="center" mt={20}>
        <MCView width={300} row justify="space-between">
          <CardItem
            width={280}
            icon="ios-fitness"
            text={t('profile_card_motivations')}
            onPress={() => this.onToggleCollapse(!collapsed)}
          />
        </MCView>
        <Collapsible collapsed={collapsed}>
          <MCView align="center">
            {motivations.length > 0 && (
              <MCButton
                width={320}
                row
                justify="space-between"
                onPress={() => onPressAllMotivations()}>
                <H3>All Motivations</H3>
                <MCIcon name="ios-arrow-forward" />
              </MCButton>
            )}
            <MCView row width={350} justify="center">
              {motivations.length > 0 &&
                motivations
                  .slice(0, profileCardNumPerRow)
                  .map(value => this._renderMotivationItem(value))}
              {motivations.length === 0 && (
                <MCButton
                  bordered
                  align="center"
                  mt={10}
                  width={320}
                  onPress={() => onPressAllMotivations()}>
                  <H3>You have not added a Motivation</H3>
                </MCButton>
              )}
            </MCView>
          </MCView>
        </Collapsible>
        {selected && (
          <MCModal
            isVisible={showModal}
            onClose={() => this.setState({showModal: false})}>
            <MCView align="center" width={280} mt={20}>
              <MCImage image={{uri: selected.image}} br={6} />
              <H3 weight="bold">{selected.title}</H3>
              <H4>{selected.description}</H4>
            </MCView>
          </MCModal>
        )}
      </MCView>
    );
  }
}

export default withTranslation()(MotivationCard);
