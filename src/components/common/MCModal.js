import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView} from 'react-native';
import Modal from 'react-native-modal';
import styled from 'styled-components';
import {MCCard} from '../styled/View';
import {MCIcon} from '../styled/Text';
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
  max-height: ${dySize(400)};
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
    onClose: PropTypes.func.isRequired,
    width: PropTypes.number,
  };

  static defaultProps = {
    width: 320,
  };

  render() {
    const {isVisible, children, onClose, width} = this.props;
    return (
      <ModalContainer
        isVisible={isVisible}
        animationIn="slideInLeft"
        animationOut="slideOutRight">
        <ModalWrapper width={width}>
          <ModalContent>{children}</ModalContent>
          <ModalCloseView onPress={() => onClose()}>
            <MCIcon name="md-close" />
          </ModalCloseView>
        </ModalWrapper>
      </ModalContainer>
    );
  }
}
