import React from 'react';
import PropTypes from 'prop-types';
import {FlatList} from 'react-native';
import {withTranslation} from 'react-i18next';
import * as _ from 'lodash';
import {MCView} from 'components/styled/View';
import {H3, H4, H6, MCEmptyText} from 'components/styled/Text';
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
    coreValues: PropTypes.arrayOf,
    onPressEdit: PropTypes.func,
    editable: PropTypes.bool,
  };

  static defaultProps = {
    editable: true,
    coreValues: {},
    onPressEdit: () => undefined,
  };

  render() {
    const {t, theme, coreValues, editable, onPressEdit} = this.props;
    const core = _.get(coreValues, ['data', 'core'], []);
    return (
      <MCView>
        <MCView row align="center">
          <MCView row align="center" style={{flex: 1}}>
            <H3 weight="bold" mr={10}>
              {t('tools_tab_core_values')}
            </H3>
            <KeySvg theme={theme} size={25} />
          </MCView>
          {editable && (
            <MCButton onPress={() => onPressEdit()}>
              <MCIcon type="FontAwesome5" name="edit" />
            </MCButton>
          )}
        </MCView>
        <MCView row wrap mb={30} justify="space-between">
          {core.length === 0 && (
            <MCEmptyText>
              {editable
                ? t('profile_card_empty_hydration')
                : t('profile_card_empty_user_hydration')}
            </MCEmptyText>
          )}
          {core.map((value, index) => (
            <MCView
              mt={20}
              key={value.value + theme.colors.theme_name}
              style={{
                width: dySize(140),
                height: dySize(200),
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: theme.colors.border,
                backgroundColor: ValueCardBackgrounds[index % 3],
                borderRadius: 6,
                borderWidth: dySize(5),
                borderColor: 'white',
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
            </MCView>
          ))}
        </MCView>
      </MCView>
    );
  }
}

export default withTranslation()(CoreValuesCard);
