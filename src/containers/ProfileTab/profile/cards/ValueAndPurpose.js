import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import Collapsible from 'react-native-collapsible';
import {MCCard, MCView} from 'components/styled/View';
import {H3, H4, MCIcon} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCImage, MCModal} from 'components/common';
import {profileCardWidth, profileCardNumPerRow} from 'services/operators';
import CardItem from './CardItem';

class ValueAndPurpose extends React.Component {
  static propTypes = {
    values: PropTypes.arrayOf(Object),
    purposes: PropTypes.arrayOf(Object),
    onPressAllValues: PropTypes.func,
    onPressAllPurposes: PropTypes.func,
  };

  static defaultProps = {
    values: [],
    purposes: [],
    onPressAllValues: () => undefined,
    onPressAllPurposes: () => undefined,
  };
  constructor(props) {
    super(props);
    this.state = {
      valueCollapsed: true,
      purposeCollapsed: true,
      selectedValue: null,
      showValueModal: false,
    };
  }

  onToggleValueCollapse = collapsed => {
    this.setState({valueCollapsed: collapsed});
    if (!collapsed) {
      this.setState({purposeCollapsed: true});
    }
  };

  onTogglePurposeCollapse = collapsed => {
    this.setState({purposeCollapsed: collapsed});
    if (!collapsed) {
      this.setState({valueCollapsed: true});
    }
  };

  onPressValue = value => {
    this.setState({selectedValue: value, showValueModal: true});
  };

  _renderValueItem = item => (
    <MCCard width={profileCardWidth} ml={5} mr={5} align="center">
      <MCButton
        key={item._id}
        align="center"
        onPress={() => this.onPressValue(item)}>
        <H4 numberOfLines={1}>{item.data.value}</H4>
        <MCImage
          width={profileCardWidth - 10}
          height={profileCardWidth - 10}
          image={{uri: item.data.image}}
        />
      </MCButton>
    </MCCard>
  );

  render() {
    const {
      t,
      values,
      purposes,
      onPressAllValues,
      onPressAllPurposes,
    } = this.props;
    const {
      selectedValue,
      valueCollapsed,
      purposeCollapsed,
      showValueModal,
    } = this.state;
    return (
      <MCView align="center" mt={20}>
        <MCView width={340} row justify="space-between">
          <CardItem
            icon="ios-key"
            text={t('profile_card_values')}
            onPress={() => this.onToggleValueCollapse(!valueCollapsed)}
          />
          <CardItem
            icon="ios-body"
            text={t('profile_card_purpose_and_passion')}
            onPress={() => this.onTogglePurposeCollapse(!purposeCollapsed)}
          />
        </MCView>
        <Collapsible collapsed={valueCollapsed}>
          <MCView align="center">
            {values.length > 0 && (
              <MCButton
                width={320}
                row
                justify="space-between"
                onPress={() => onPressAllValues()}>
                <H3>All Values</H3>
                <MCIcon name="ios-arrow-forward" />
              </MCButton>
            )}
            <MCView row width={350} justify="center">
              {values.length > 0 &&
                values
                  .slice(0, profileCardNumPerRow)
                  .map(value => this._renderValueItem(value))}
              {values.length === 0 && (
                <MCButton
                  bordered
                  align="center"
                  mt={10}
                  width={300}
                  onPress={() => onPressAllValues()}>
                  <H3>You have not added a Value</H3>
                </MCButton>
              )}
            </MCView>
          </MCView>
        </Collapsible>
        <Collapsible collapsed={purposeCollapsed}>
          {purposes.length > 0 && (
            <MCButton
              width={320}
              row
              justify="space-between"
              onPress={() => onPressAllPurposes()}>
              <H3>All Purposes</H3>
              <MCIcon name="ios-arrow-forward" />
            </MCButton>
          )}
          <MCButton
            bordered
            align="center"
            mt={10}
            width={320}
            onPress={() => onPressAllPurposes()}>
            <H3>You have not added a Purpose</H3>
          </MCButton>
        </Collapsible>
        {selectedValue && (
          <MCModal
            isVisible={showValueModal}
            onClose={() => this.setState({showValueModal: false})}>
            <MCView align="center" width={300} mt={20}>
              <MCImage
                image={{uri: selectedValue.data.image}}
                width={120}
                height={120}
              />
              <H3 weight="bold" align="center">
                {selectedValue.data.value}
              </H3>
              <H4>{selectedValue.data.action}</H4>
              <H4>{selectedValue.data.learn}</H4>
              <H4>{selectedValue.data.pharse}</H4>
            </MCView>
          </MCModal>
        )}
      </MCView>
    );
  }
}

export default withTranslation()(ValueAndPurpose);
