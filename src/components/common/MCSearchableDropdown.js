import React from 'react';
import {Animated, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Icon} from 'native-base';
import {dySize} from 'utils/responsive';
import MCEditableText from './MCEditableText';
import {MCView, MCCard} from '../styled/View';
import {MCButton} from '../styled/Button';
import {MCIcon} from '../styled/Text';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const PickerHeader = styled(TouchableWithoutFeedback)``;

const Wrapper = styled(MCView)`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: ${props => dySize(props.width) || dySize(350)};
  border-radius: 4px;
  border: 1px solid ${props => props.theme.colors.text};
  background-color: rgba(0, 0, 0, 0.3);
  margin-top: 10px;
  margin-bottom: 10px;
  overflow: visible;
`;

const DropdownWrapper = styled(Animated.View)`
  background-color: rgba(0, 0, 0, 0.3);
  margin-top: 5px;
  overflow: hidden;
  border-radius: 4px;
  align-items: center;
`;

export default class MCSearchableDropdown extends React.PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired,
    width: PropTypes.number,
    height: PropTypes.number.isRequired,
    selectedItem: PropTypes.node.isRequired,
    onSelect: PropTypes.func.isRequired,
    dropDownHeight: PropTypes.number,
    childrens: PropTypes.array.isRequired,
    searchable: PropTypes.bool,
  };

  static defaultProps = {
    width: 350,
    dropDownHeight: 200,
    searchable: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      dropDownOpened: false,
      pickerHeight: new Animated.Value(0),
      searchText: '',
    };
  }

  onPressInput = () => {
    const {dropDownOpened} = this.state;
    this.showDropdown(!dropDownOpened);
  };

  showDropdown = show => {
    const {dropDownHeight} = this.props;
    const {pickerHeight, dropDownOpened} = this.state;
    this.setState({dropDownOpened: show}, () => {
      if (!show) {
        Animated.timing(pickerHeight, {
          toValue: 0,
          duration: 300,
        }).start();
      } else {
        Animated.timing(pickerHeight, {
          toValue: dySize(dropDownHeight),
          duration: 300,
        }).start();
      }
    });
  };

  onPressItem = index => {
    const {data, onSelect} = this.props;
    onSelect(data[index]);
    this.showDropdown(false);
  };

  onChangeSearchText = text => {
    this.setState({searchText: text});
  };

  render() {
    const {
      width,
      height,
      onChange,
      selectedItem,
      children,
      data,
      searchable,
    } = this.props;
    const {pickerHeight, searchText} = this.state;
    return (
      <>
        <TouchableWithoutFeedback onPress={() => this.onPressInput()}>
          <MCCard width={width} height={height}>
            {selectedItem}
          </MCCard>
        </TouchableWithoutFeedback>
        <DropdownWrapper
          style={{
            height: pickerHeight,
            width: dySize(width),
          }}>
          {searchable && (
            <Wrapper width={width - 20}>
              <MCEditableText
                bordered={false}
                onChange={this.onChangeSearchText}
                text={searchText}
                style={{flex: 1}}
                onFocus={() => this.showDropdown(true)}
              />
              <MCButton onPress={() => this.onChangeSearchText('')}>
                <MCIcon name="ios-close-circle-outline" size={20} />
              </MCButton>
            </Wrapper>
          )}
          <ScrollView
            contentContainerStyle={{padding: 10, width: dySize(width - 10)}}
            keyboardShouldPersistTaps="always">
            {children.map((item, index) => {
              if (
                JSON.stringify(data[index])
                  .toLowerCase()
                  .indexOf(searchText.toLowerCase()) < 0
              )
                return;
              return (
                <MCButton onPress={() => this.onPressItem(index)}>
                  {item}
                </MCButton>
              );
            })}
          </ScrollView>
        </DropdownWrapper>
      </>
    );
  }
}
