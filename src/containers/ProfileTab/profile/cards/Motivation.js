import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import Collapsible from 'react-native-collapsible';
import FastImage from 'react-native-fast-image';
import {DefaultPicture} from 'assets/images';
import {MCCard, MCView} from 'components/styled/View';
import {H3, H4, MCIcon} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCModal} from 'components/common';
import {profileCardWidth, profileCardNumPerRow} from 'services/operators';
import CardItem from './CardItem';

const dummy = [
  {
    _id: 1,
    title: 'Belonging',
    description: 'Description 1',
  },
  {
    _id: 2,
    title: 'Family',
    description: 'Description 2',
  },
  {
    _id: 3,
    title: 'Love',
    description: 'Description 3',
  },
];

class MotivationCard extends React.Component {
  static propTypes = {
    onPressAllMotivations: PropTypes.func,
  };

  static defaultProps = {
    onPressAllMotivations: () => undefined,
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

  _renderMotivationItem = item => (
    <MCCard width={profileCardWidth} ml={5} mr={5} align="center">
      <MCButton
        key={item._id}
        align="center"
        onPress={() => this.onPressValue(item)}>
        <H4 numberOfLines={1}>{item.title}</H4>
        <FastImage source={DefaultPicture} style={{width: 100, height: 100}} />
      </MCButton>
    </MCCard>
  );

  render() {
    const {t, onPressAllMotivations} = this.props;
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
            {dummy.length > 0 && (
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
              {dummy.length > 0 &&
                dummy
                  .slice(0, profileCardNumPerRow)
                  .map(value => this._renderMotivationItem(value))}
              {dummy.length === 0 && (
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
            <MCView align="center" width={300} mt={20}>
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
