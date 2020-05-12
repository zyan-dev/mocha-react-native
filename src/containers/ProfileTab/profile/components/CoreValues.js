import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView} from 'react-native';
import {withTranslation} from 'react-i18next';
import CardFlip from 'react-native-card-flip';
import * as _ from 'lodash';
import {MCView} from 'components/styled/View';
import {H3, H4, H5, H6, MCEmptyText} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCIcon, MCImage} from 'components/common';
import {KeySvg} from 'assets/svgs';
import {dySize} from 'utils/responsive';
import {
  ValueCardBackgrounds,
  ValueCardTextColor,
  DiscoverValues,
} from 'utils/constants';

class CoreValuesCard extends React.Component {
  static propTypes = {
    coreValues: PropTypes.object,
    valueStory: PropTypes.object,
    onPressEdit: PropTypes.func,
    onPressEditValueStory: PropTypes.func,
    editable: PropTypes.bool,
  };

  static defaultProps = {
    editable: true,
    coreValues: {},
    valueStory: {},
    onPressEdit: () => undefined,
    onPressEditValueStory: () => undefined,
  };

  constructor(props) {
    super(props);
    this.state = {
      flipIndex: -1,
    };
  }

  cards = [];

  onPressValueCard = index => {
    const {flipIndex} = this.state;
    if (flipIndex > -1 && index !== flipIndex) this.cards[flipIndex].flip();
    this.cards[index] && this.cards[index].flip();
    this.setState({flipIndex: index});
  };

  onPressBackCard = index => {
    this.setState({flipIndex: -1});
    this.cards[index] && this.cards[index].flip();
  };

  render() {
    const {
      t,
      theme,
      coreValues,
      valueStory,
      editable,
      onPressEdit,
      onPressEditValueStory,
    } = this.props;
    const core = _.get(coreValues, ['data', 'core'], []);
    const stories = _.get(valueStory, ['data', 'story'], {});
    return (
      <MCView>
        <MCView row align="center">
          <MCView row align="center" style={{flex: 1}}>
            <H3 weight="bold" mr={10}>
              {t('profile_subtitle_core_values')}
            </H3>
            <KeySvg theme={theme} size={25} />
          </MCView>
          {editable && (
            <MCButton onPress={() => onPressEdit()}>
              <MCIcon type="FontAwesome5" name="edit" />
            </MCButton>
          )}
        </MCView>
        <MCView row wrap mb={30} justify="space-between" width={300}>
          {core.length === 0 && (
            <MCEmptyText>
              {editable
                ? t('profile_card_empty_hydration')
                : t('profile_card_empty_user_hydration')}
            </MCEmptyText>
          )}
          {core.map((value, index) => (
            <CardFlip
              ref={card => (this.cards[index] = card)}
              style={{
                marginTop: dySize(20),
                width: dySize(140),
                height: dySize(200),
              }}>
              <MCButton
                onPress={() => this.onPressValueCard(index)}
                key={value.value + theme.colors.theme_name}
                style={{
                  width: dySize(140),
                  height: dySize(200),
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: ValueCardBackgrounds[index % 3],
                  borderRadius: 6,
                  borderWidth: dySize(5),
                  borderColor: theme.colors.card,
                  padding: dySize(5),
                }}>
                <H4 weight="bold" align="center" color={ValueCardTextColor}>
                  {t(`tools_tab_value_${value.value}`)}
                </H4>
                <MCView style={{flex: 1}} align="center" justify="center">
                  {value.image && (
                    <MCImage
                      image={_.get(
                        DiscoverValues.find(i => i.value === value.value),
                        ['image'],
                        '',
                      )}
                      width={120}
                      height={100}
                      resizeMode="contain"
                    />
                  )}
                  {value.icon && (
                    <MCIcon
                      type="FontAwesome5"
                      name={value.icon}
                      size={60}
                      color={ValueCardTextColor}
                    />
                  )}
                </MCView>
                <H6
                  align="center"
                  style={{letterSpacing: 5}}
                  color={ValueCardTextColor}>
                  {t(`value_name_${value.name}`).toUpperCase()}
                </H6>
              </MCButton>
              <MCView
                style={{
                  width: dySize(140),
                  height: dySize(200),
                  backgroundColor: ValueCardBackgrounds[index % 3],
                  borderRadius: 6,
                  borderWidth: dySize(5),
                  borderColor: theme.colors.card,
                  padding: dySize(5),
                }}>
                <ScrollView
                  contentContainerStyle={{padding: 5, paddingBottom: 30}}>
                  <H5 color="black">
                    {_.get(
                      stories,
                      [value.value],
                      t('profile_card_no_value_story'),
                    )}
                  </H5>
                </ScrollView>
                <MCView row style={{width: '100%'}} justify="space-between">
                  <MCButton onPress={() => this.onPressBackCard(index)}>
                    <MCIcon
                      color="black"
                      type="FontAwesome5Pro"
                      name="undo-alt"
                    />
                  </MCButton>
                  {editable && (
                    <MCButton onPress={() => onPressEditValueStory(value)}>
                      <MCIcon color="black" type="FontAwesome5" name="edit" />
                    </MCButton>
                  )}
                </MCView>
              </MCView>
            </CardFlip>
          ))}
        </MCView>
      </MCView>
    );
  }
}

export default withTranslation()(CoreValuesCard);
