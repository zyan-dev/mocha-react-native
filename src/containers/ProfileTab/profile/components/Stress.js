import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import * as _ from 'lodash';
import {MCIcon, MCImage} from 'components/common';
import {MCView} from 'components/styled/View';
import {H3, H4, MCEmptyText} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {FragileSvg} from 'assets/svgs';
import {dySize} from 'utils/responsive';
import {BodyStress, BodyStressWhite} from 'assets/images';

const bodyPartButtons = [
  {
    key: 'head',
    width: 80,
    top: 40,
    left: 130,
  },
  {
    key: 'eyes',
    width: 65,
    top: 55,
    left: 55,
  },
  {
    key: 'shoulders',
    width: 80,
    top: 100,
    left: 0,
  },
  {
    key: 'hips',
    width: 60,
    top: 200,
    left: 0,
  },
  {
    key: 'legs',
    width: 60,
    top: 330,
    left: 30,
  },
  {
    key: 'feet',
    width: 60,
    top: 360,
    right: 0,
  },
  {
    key: 'back',
    width: 60,
    top: 230,
    right: 0,
  },
  {
    key: 'stomach',
    width: 80,
    top: 170,
    right: 0,
  },
  {
    key: 'neck',
    width: 60,
    top: 100,
    right: 0,
  },
];

class StressAndComfortCard extends React.Component {
  static propTypes = {
    stress: PropTypes.arrayOf(Object),
    stressRecovery: PropTypes.array,
    onPressEditParts: PropTypes.func,
    onPressEditRecovery: PropTypes.func,
    editable: PropTypes.bool,
  };

  static defaultProps = {
    editable: true,
    stress: [],
    stressRecovery: [],
    onPressEditParts: () => undefined,
    onPressEditRecovery: () => undefined,
  };

  render() {
    const {
      t,
      theme,
      stress,
      stressRecovery,
      onPressEditParts,
      onPressEditRecovery,
      editable,
    } = this.props;
    const parts = _.get(stress, ['data', 'parts'], []);
    const methods = _.get(stressRecovery, ['data', 'methods'], []);
    return (
      <MCView mt={30}>
        <MCView row align="center" mb={20}>
          <H3 weight="bold">{t('profile_subtitle_stress_recovery')}</H3>
          <FragileSvg size={30} />
        </MCView>
        <MCView row align="center" mb={10}>
          <H4 underline style={{flex: 1}}>
            {t('profile_card_stress_response')}
          </H4>
          {editable && (
            <MCButton onPress={() => onPressEditParts()}>
              <MCIcon type="FontAwesome5" name="edit" />
            </MCButton>
          )}
        </MCView>
        {!parts.length ? (
          <MCButton
            align="center"
            style={{width: '100%'}}
            bordered
            onPress={() => onPressEdit()}>
            <MCEmptyText>
              {editable
                ? t('profile_card_empty_stress')
                : t('profile_card_empty_user_stress')}
            </MCEmptyText>
          </MCButton>
        ) : (
          <>
            <H4>{t('profile_card_stress_response_title')}</H4>
            <MCView align="center" pv={80}>
              <MCImage
                image={
                  theme.colors.theme_name === 'Stone'
                    ? BodyStressWhite
                    : BodyStress
                }
                height={300}
                width={300}
                resizeMode="contain"
              />
              {bodyPartButtons.map(part => {
                const selected = stress.data.parts.indexOf(part.key) > -1;
                return (
                  <MCButton
                    bordered
                    background={theme.colors.background}
                    onPress={() => {}}
                    align="center"
                    width={part.width}
                    style={{
                      position: 'absolute',
                      top: dySize(part.top),
                      left: dySize(part.left),
                      right: dySize(part.right),
                      borderColor: selected
                        ? theme.colors.outline
                        : theme.colors.border,
                    }}>
                    <H4
                      color={
                        selected ? theme.colors.outline : theme.colors.text
                      }>
                      {t(`tools_tab_body_stress_${part.key}`)}
                    </H4>
                  </MCButton>
                );
              })}
            </MCView>
          </>
        )}
        <MCView row align="center" mb={10}>
          <H4 underline style={{flex: 1}}>
            {t('profile_card_stress_recovery')}
          </H4>
          {editable && (
            <MCButton onPress={() => onPressEditRecovery()}>
              <MCIcon type="FontAwesome5" name="edit" />
            </MCButton>
          )}
        </MCView>
        {methods.length === 0 && (
          <MCButton align="center" style={{width: '100%'}} bordered>
            <MCEmptyText>
              {editable
                ? t('profile_card_empty_stress')
                : t('profile_card_empty_user_stress')}
            </MCEmptyText>
          </MCButton>
        )}
        {methods.length > 0 && (
          <H4 align="center">{t('profile_card_stress_recovery_title')}</H4>
        )}
        {methods.length > 0 && (
          <MCView row wrap justify="space-between" width={300}>
            {methods.map(method => {
              return (
                <MCView
                  bordered
                  br={10}
                  width={140}
                  height={80}
                  align="center"
                  justify="center"
                  mt={15}
                  ph={10}>
                  <H4 align="center">{method}</H4>
                </MCView>
              );
            })}
          </MCView>
        )}
      </MCView>
    );
  }
}

export default withTranslation()(StressAndComfortCard);
