import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {Header, Left, Body, Right, Icon} from 'native-base';
import {H2, H3, H4} from '../styled/Text';
import {MCView} from '../styled/View';
import {MCIcon} from '.';
import {MCButton} from '../styled/Button';
import NavigationService from 'navigation/NavigationService';
import {dySize} from 'utils/responsive';

const HeaderWrapper = styled(Header)`
  width: ${dySize(375)};
  height: auto;
  background-color: transparent;
  border-bottom-width: 0px;
  elevation: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const HeaderLeft = styled(Left)`
  flex: 1;
  justify-content: center;
  align-items: flex-start;
`;

const HeaderRight = styled(Right)`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

const HeaderBody = styled(Body)`
  flex: 6;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const HeaderIcon = styled(Icon)`
  font-size: ${dySize(30)};
  color: ${props => props.theme.colors.text};
`;

class MCHeader extends React.PureComponent {
  static propTypes = {
    hasBack: PropTypes.bool,
    hasLeftBadge: PropTypes.bool,
    title: PropTypes.string.isRequired,
    hasRight: PropTypes.bool,
    headerIcon: PropTypes.node,
    rightText: PropTypes.string,
    rightIcon: PropTypes.string,
    rightImage: PropTypes.node,
    rightIconType: PropTypes.string,
    rightIconSize: PropTypes.number,
    leftIcon: PropTypes.string,
    leftIconSize: PropTypes.number,
    leftIconType: PropTypes.string,
    onPressRight: PropTypes.func,
    style: PropTypes.object,
    onPressBack: PropTypes.func,
  };
  static defaultProps = {
    hasBack: true,
    hasLeftBadge: false,
    hasRight: false,
    headerIcon: undefined,
    rightText: '',
    rightIcon: '',
    leftIcon: 'arrow-left',
    leftIconSize: 20,
    rightImage: null,
    rightIconType: 'FontAwesome5',
    rightIconSize: 20,
    leftIconType: 'FontAwesome5',
    onPressRight: () => undefined,
    onPressBack: () => {
      NavigationService.goBack();
    },
    style: {},
  };
  render() {
    const {
      hasBack,
      hasLeftBadge,
      title,
      hasRight,
      headerIcon,
      rightText,
      rightIcon,
      leftIcon,
      leftIconSize,
      rightImage,
      leftIconType,
      rightIconType,
      rightIconSize,
      onPressRight,
      onPressBack,
      style,
      theme,
    } = this.props;
    return (
      <HeaderWrapper style={style}>
        <HeaderLeft style={{width: 60}}>
          {hasBack && (
            <MCButton width={70} onPress={() => onPressBack()}>
              <MCIcon type={leftIconType} name={leftIcon} size={leftIconSize} />
              {hasLeftBadge && (
                <MCView
                  style={{
                    position: 'absolute',
                    top: dySize(5),
                    left: dySize(20),
                  }}
                  width={12}
                  height={12}
                  bordered
                  br={6}
                  background={theme.colors.danger}
                />
              )}
            </MCButton>
          )}
        </HeaderLeft>
        <HeaderBody>
          <H2 mr={6} ml={6} weight="bold" align="center" numberOfLines={2}>
            {title}
          </H2>
          {headerIcon}
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
              <MCIcon
                type={rightIconType}
                name={rightIcon}
                size={rightIconSize}
              />
            </MCButton>
          )}
          {hasRight && rightImage && (
            <MCButton
              width={80}
              rippleSize={40}
              align="flex-end"
              onPress={() => onPressRight()}>
              {rightImage}
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

export default withTranslation()(
  connect(
    mapStateToProps,
    undefined,
  )(MCHeader),
);
