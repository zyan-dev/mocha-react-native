import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as _ from 'lodash';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {withTranslation} from 'react-i18next';
import {MCCard, MCView} from 'components/styled/View';
import {H3, H4, H5, MCEmptyText} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCModal, MCImage, MCIcon} from 'components/common';
import {dySize} from 'utils/responsive';
import {
  BehaviorPreferenceNegatives,
  BehaviorPreferences,
} from 'utils/constants';

class BehaviorPreferenceCard extends React.Component {
  static propTypes = {
    onPressEdit: PropTypes.func,
    editable: PropTypes.bool,
    behaviorPreference: PropTypes.object,
  };

  static defaultProps = {
    onPressEdit: () => undefined,
    behaviorPreference: {},
    editable: true,
  };

  render() {
    const {t, theme, behaviorPreference, editable, onPressEdit} = this.props;
    const bookmarked = _.get(behaviorPreference, ['data', 'bookmarked'], []);
    return (
      <MCView>
        <MCView row align="center" mb={20}>
          <H3 weight="bold" style={{flex: 1}}>
            {t('profile_card_Behavior_preference')}
          </H3>
          {editable && (
            <MCButton onPress={() => onPressEdit()}>
              <MCIcon type="FontAwesome5" name="edit" />
            </MCButton>
          )}
        </MCView>
        <H4 underline>{t('profile_negative_behavior')}</H4>
        {BehaviorPreferenceNegatives.map(preference => (
          <MCCard
            key={preference}
            style={{width: '100%'}}
            bordered
            mt={20}
            p={10}>
            <MCView
              row
              align="center"
              justify="space-between"
              style={{width: '100%'}}>
              <H4 style={{width: '80%'}}>
                {t(`tools_tab_behavior_${preference}`)}
              </H4>
              <MCIcon
                type="FontAwesome5Pro"
                name="exclamation-triangle"
                color={
                  bookmarked.indexOf(preference) < 0
                    ? theme.colors.text
                    : theme.colors.danger
                }
              />
            </MCView>
            <MultiSlider
              customMarker={e => {
                return (
                  <MCView
                    width={20}
                    height={20}
                    br={10}
                    background={theme.colors.text}
                  />
                );
              }}
              min={0}
              max={100}
              step={1}
              sliderLength={dySize(260)}
              enabledOne={false}
              enabledTwo={false}
              values={[
                _.get(behaviorPreference, ['data', preference], 50), // if undefined, set to 50 by default
              ]}
              snapped
              containerStyle={{
                marginLeft: dySize(10),
              }}
            />
            <MCView
              row
              justify="space-between"
              mt={-10}
              style={{width: '100%'}}>
              <H5 weight="italic">
                {t('tools_tab_behavior_negative_left_text')}
              </H5>
              <H5 weight="italic">
                {t('tools_tab_behavior_negative_right_text')}
              </H5>
            </MCView>
          </MCCard>
        ))}
        <H4 underline mt={40}>
          {t('profile_positive_behavior')}
        </H4>
        {BehaviorPreferences.map(preference => (
          <MCCard
            key={preference}
            style={{width: '100%'}}
            bordered
            mt={20}
            p={10}>
            <MCView
              row
              align="center"
              justify="space-between"
              style={{width: '100%'}}>
              <H4 style={{width: '80%'}}>
                {t(`tools_tab_behavior_${preference}`)}
              </H4>
              <MCIcon
                name={
                  bookmarked.indexOf(preference) < 0
                    ? 'ios-star-outline'
                    : 'ios-star'
                }
                color={
                  bookmarked.indexOf(preference) < 0
                    ? theme.colors.text
                    : theme.colors.outline
                }
              />
            </MCView>
            <MultiSlider
              customMarker={e => {
                return (
                  <MCView
                    width={20}
                    height={20}
                    br={10}
                    background={theme.colors.text}
                  />
                );
              }}
              min={0}
              max={100}
              step={1}
              sliderLength={dySize(260)}
              enabledOne={false}
              enabledTwo={false}
              values={[
                _.get(behaviorPreference, ['data', preference], 50), // if undefined, set to 50 by default
              ]}
              snapped
              containerStyle={{
                marginLeft: dySize(10),
              }}
            />
            <MCView
              row
              justify="space-between"
              mt={-10}
              style={{width: '100%'}}>
              <H5 weight="italic">
                {t('tools_tab_behavior_positive_left_text')}
              </H5>
              <H5 weight="italic">
                {t('tools_tab_behavior_positive_right_text')}
              </H5>
            </MCView>
          </MCCard>
        ))}
      </MCView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
});

export default withTranslation()(
  connect(
    mapStateToProps,
    undefined,
  )(BehaviorPreferenceCard),
);
