import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import styled from 'styled-components';
import {MCButton} from 'components/styled/Button';
import {MCView} from 'components/styled/View';
import {MCIcon, H4, H3} from 'components/styled/Text';
import NavigationService from 'navigation/NavigationService';

const LockIcon = styled(MCIcon)`
  position: absolute;
  top: -20px;
  right: -20px;
`;

class ProfileBasicCard extends React.Component {
  static PropTypes = {
    data: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired,
    locked: PropTypes.bool,
  };

  static defaultProps = {
    locked: false,
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
      locked,
      data: {practice, title, iconType, icon, minutes, width},
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
        <H3 underline>{`${t('practice')} ${practice}`}</H3>
        <MCView
          width={80}
          height={80}
          br={40}
          mt={10}
          mb={10}
          bordered
          align="center"
          justify="center">
          <MCIcon type={iconType} name={icon} size={40} />
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
