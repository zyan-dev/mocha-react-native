import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {Header, Left, Body, Right, Icon} from 'native-base';
import {H4, H3} from '../styled/Text';
import {MCButton} from '../styled/Button';
import NavigationService from 'navigation/NavigationService';
import {dySize} from 'utils/responsive';

const HeaderWrapper = styled(Header)`
  width: ${dySize(375)};
  height: 80px;
  background-color: ${props => props.theme.colors.background};
  border-bottom-width: 0px;
  elevation: 0;
`;

const HeaderLeft = styled(Left)`
  flex: 1;
  justify-content: center;
  align-items: flex-start;
`;

const HeaderRight = styled(Right)`
  flex: 1;
  justify-content: center;
  align-items: flex-end;
  padding-right: 10px;
`;

const HeaderBody = styled(Body)`
  flex: 4;
  justify-content: center;
  align-items: center;
`;

const HeaderIcon = styled(Icon)`
  font-size: ${dySize(30)};
  color: ${props => props.theme.colors.text};
`;

class MCHeader extends React.PureComponent {
  static propTypes = {
    hasBack: PropTypes.bool,
    title: PropTypes.string.isRequired,
    hasRight: PropTypes.bool,
    rightText: PropTypes.string,
    rightIcon: PropTypes.string,
    rightIconType: PropTypes.string,
    onPressRight: PropTypes.func,
    style: PropTypes.object,
    onPressBack: PropTypes.func,
  };
  static defaultProps = {
    hasBack: true,
    hasRight: false,
    rightText: '',
    rightIcon: '',
    rightIconType: 'Ionicon',
    onPressRight: () => undefined,
    onPressBack: () => {
      NavigationService.goBack();
    },
    style: {},
  };
  render() {
    const {
      hasBack,
      title,
      hasRight,
      rightText,
      rightIcon,
      rightIconType,
      onPressRight,
      onPressBack,
      style,
      t,
    } = this.props;
    return (
      <HeaderWrapper style={style}>
        <HeaderLeft style={{width: 60}}>
          {hasBack && (
            <MCButton width={70} onPress={() => onPressBack()}>
              <H4>{t('header_back')}</H4>
            </MCButton>
          )}
        </HeaderLeft>
        <HeaderBody>
          <H3>{title}</H3>
        </HeaderBody>
        <HeaderRight>
          {hasRight && rightText.length > 0 && (
            <MCButton
              width={80}
              align="flex-end"
              onPress={() => onPressRight()}>
              <H4>{rightText}</H4>
            </MCButton>
          )}
          {hasRight && rightIcon.length > 0 && (
            <MCButton
              width={80}
              rippleSize={40}
              align="flex-end"
              onPress={() => onPressRight()}>
              <HeaderIcon type={rightIconType} name={rightIcon} />
            </MCButton>
          )}
        </HeaderRight>
      </HeaderWrapper>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
});

export default withTranslation()(connect(mapStateToProps, undefined)(MCHeader));
