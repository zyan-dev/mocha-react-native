import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {Header, Left, Body, Right, Icon} from 'native-base';
import {H3, H4, H5} from '../styled/Text';
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
  width: ${dySize(60)}px;
  justify-content: center;
  align-items: flex-start;
`;

const HeaderRight = styled(Right)`
  width: ${dySize(60)}px;
  justify-content: flex-end;
  align-items: center;
`;

const HeaderBody = styled(Body)`
  min-width: ${dySize(235)}px;
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
        <HeaderLeft>
          {hasBack && (
            <MCButton onPress={() => onPressBack()}>
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
          <H3 mr={6} ml={6} weight="bold" align="center" numberOfLines={2}>
            {title}
          </H3>
          {headerIcon}
        </HeaderBody>
        <HeaderRight>
          <MCButton align="center" onPress={() => onPressRight()}>
            {hasRight && rightIcon.length > 0 && (
              <MCIcon
                type={rightIconType}
                name={rightIcon}
                size={rightIconSize}
                padding={1}
              />
            )}
            {hasRight && rightImage && rightImage}
            {hasRight && rightText.length > 0 && (
              <H5 align="center" pv={1}>
                {rightText}
              </H5>
            )}
          </MCButton>
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
