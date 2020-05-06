import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView} from 'react-native';
import Modal from 'react-native-modal';
import styled from 'styled-components';
import {MCCard} from '../styled/View';
import {MCIcon} from '.';
import {MCButton} from '../styled/Button';
import {dySize} from 'utils/responsive';

const ModalContainer = styled(Modal)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled(MCCard)`
  background-color: ${props => props.theme.colors.background};
`;

const ModalContent = styled(ScrollView)`
  max-height: ${dySize(600)};
  margin-bottom: 20px;
  width: 100%;
`;

const ModalCloseView = styled(MCButton)`
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
`;

export default class MCModal extends React.PureComponent {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    hasCloseButton: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    width: PropTypes.number,
    animationIn: PropTypes.string,
    animationOut: PropTypes.string,
    br: PropTypes.number,
  };

  static defaultProps = {
    width: 320,
    animationIn: 'slideInLeft',
    animationOut: 'slideOutRight',
    hasCloseButton: true,
    br: 20,
  };

  render() {
    const {
      isVisible,
      children,
      onClose,
      width,
      br,
      animationIn,
      animationOut,
      hasCloseButton,
    } = this.props;
    return (
      <ModalContainer
        isVisible={isVisible}
        animationIn={animationIn}
        animationOut={animationOut}>
        <ModalWrapper width={width} br={br}>
          <ModalContent
            contentContainerStyle={{
              alignItems: 'center',
            }}>
            {children}
          </ModalContent>
          {hasCloseButton && (
            <ModalCloseView onPress={() => onClose()}>
              <MCIcon name="md-close" />
            </ModalCloseView>
          )}
        </ModalWrapper>
      </ModalContainer>
    );
  }
}
