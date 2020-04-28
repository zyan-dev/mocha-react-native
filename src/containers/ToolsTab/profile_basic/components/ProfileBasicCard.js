import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import styled from 'styled-components';
import {MCButton} from 'components/styled/Button';
import {MCIcon} from 'components/common';
import {MCView} from 'components/styled/View';
import {H4, H3} from 'components/styled/Text';
import NavigationService from 'navigation/NavigationService';
import {
  AppleSvg,
  SheepSvg,
  CarrotSvg,
  FaucetSvg,
  FragileSvg,
  KeySvg,
  FutureSvg,
} from 'assets/svgs';

const LockIcon = styled(MCIcon)`
  position: absolute;
  top: -20px;
  right: -20px;
`;

const CompletedView = styled(MCView)`
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
  background-color: green;
  border-radius: 15px;
`;

class ProfileBasicCard extends React.Component {
  static PropTypes = {
    data: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired,
    locked: PropTypes.bool,
    completed: PropTypes.bool,
    theme: PropTypes.object,
  };

  static defaultProps = {
    locked: false,
    completed: false,
    theme: {},
  };

  onPressCard = () => {
    const {data, locked} = this.props;
    if (!locked) {
      NavigationService.navigate(data.redirectTo);
    }
  };

  render() {
    const {
      t,
      theme,
      locked,
      completed,
      data: {title, iconType, icon, minutes, width},
    } = this.props;
    return (
      <MCButton
        bordered
        align="center"
        width={width}
        mt={20}
        opacity={locked ? 0.5 : 1}
        onPress={() => this.onPressCard()}>
        {locked && <LockIcon type="FontAwesome5" name="lock" size={30} />}
        <MCView
          width={80}
          height={80}
          br={40}
          mt={10}
          mb={10}
          bordered
          overflow="visible"
          align="center"
          justify="center">
          {title === 'habits' && <AppleSvg size={30} />}
          {title === 'sleep_chronotype' && <SheepSvg theme={theme} size={50} />}
          {title === 'nutrition' && <CarrotSvg size={50} />}
          {title === 'hydration' && <FaucetSvg size={50} />}
          {title === 'stress_response' && <FragileSvg size={50} />}
          {title === 'strengths' && (
            <MCIcon type="FontAwesome5Pro" name="hammer" size={40} />
          )}
          {title === 'core_values' && <KeySvg theme={theme} size={50} />}
          {title === 'dreams' && <FutureSvg size={50} />}
          {completed && (
            <CompletedView>
              <MCIcon name="ios-checkmark" size={20} color="white" />
            </CompletedView>
          )}
        </MCView>
        <MCView height={50} justify="center">
          <H4 weight="bold" align="center" ph={20}>
            {t(`tools_tab_${title}`)}
          </H4>
        </MCView>
        <H4 weight="italic">{`${minutes} ${t('unit_minutes')}`}</H4>
      </MCButton>
    );
  }
}

export default withTranslation()(ProfileBasicCard);
