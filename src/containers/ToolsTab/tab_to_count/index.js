import React from 'react';
import {Alert} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {FlatList} from 'react-native-gesture-handler';
import {selector} from 'Redux/selectors';
import {reflectionActions} from 'Redux/actions';
import {MCRootView, MCView, MCCard, MCContent} from 'components/styled/View';
import {MCHeader, MCIcon} from 'components/common';
import {H3, H4, H2, MCEmptyText, MCTextInput} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {dySize} from 'utils/responsive';
import NavigationService from 'navigation/NavigationService';
import {
  showAlert,
  getTodayStartDateStamp,
  getWeekStartDateStamp,
} from 'services/operators';

class TapToCountScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newText: '',
      addingNew: false,
      tapToCounts: props.tapToCounts,
    };
  }

  onAddNew = () => {
    const {t} = this.props;
    const {newText, tapToCounts} = this.state;
    const find = tapToCounts.find(
      i => i.data.text.toLowerCase() === newText.toLowerCase(),
    );
    if (find) {
      showAlert(t('add_new_constant_duplicateError'));
      return;
    }
    this.setState({
      newText: '',
      addingNew: false,
      tapToCounts: tapToCounts.concat([
        {
          _id: new Date().getTime().toString(),
          type: 'Tap',
          data: {
            text: newText,
            times: [new Date().getTime()],
          },
        },
      ]),
    });
  };

  onPressItem = item => {
    const updated = this.state.tapToCounts.map(i => {
      if (i._id === item._id) {
        return {
          ...i,
          data: {
            text: i.data.text,
            times: i.data.times.concat([new Date().getTime()]),
          },
          updated: new Date().toISOString(),
        };
      } else {
        return i;
      }
    });
    this.setState({tapToCounts: updated});
  };

  onPressRemove = item => {
    const filtered = this.state.tapToCounts.filter(i => i._id !== item._id);
    this.setState({tapToCounts: filtered});
  };

  onPressReset = () => {
    const {t} = this.props;
    Alert.alert(
      t('alert_title_mocha'),
      t('alert_reset_tap_to_count'),
      [
        {
          text: t('modal_cancel'),
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: t('modal_ok'),
          onPress: () => {
            this.props.updateTapToCounts([]);
            this.setState({tapToCounts: []});
          },
        },
      ],
      {cancelable: false},
    );
  };

  getTodayCount = tapToCount => {
    const result = tapToCount.times.filter(i => i >= getTodayStartDateStamp());
    return result.length;
  };

  getWeekCount = tapToCount => {
    const result = tapToCount.times.filter(i => i => getWeekStartDateStamp);
    return result.length;
  };

  onSaveAndGoBack = () => {
    const {tapToCounts} = this.state;
    NavigationService.goBack();
    this.props.updateTapToCounts(tapToCounts);
  };

  _renderListItem = ({item}) => {
    const tapToCount = item.data;
    const {t} = this.props;
    if (!tapToCount) return this._renderFooterItem();
    return (
      <MCView
        key={item._id}
        width={160}
        bordered
        align="center"
        br={10}
        mb={20}
        ml={9}
        mr={9}>
        <MCCard
          shadow
          br={1}
          height={60}
          width={160}
          align="center"
          justify="center">
          <H4 align="center" pv={1}>
            {tapToCount.text}
          </H4>
        </MCCard>
        <MCButton
          onPress={() => this.onPressItem(item)}
          height={120}
          width={160}
          style={{position: 'relative'}}
          justify="center"
          align="center">
          <MCView width={120} row align="center" justify="space-between">
            <H4>{t('tap_to_count_today')}</H4>
            <H2 weight="bold">{this.getTodayCount(tapToCount)}</H2>
          </MCView>
          <MCView width={120} row align="center" justify="space-between">
            <H4>{t('tap_to_count_this_week')}</H4>
            <H2 weight="bold">{this.getWeekCount(tapToCount)}</H2>
          </MCView>
        </MCButton>
        <MCButton
          onPress={() => this.onPressRemove(item)}
          style={{position: 'absolute', top: -10, right: -10}}>
          <MCIcon name="ios-close-circle-outline" />
        </MCButton>
      </MCView>
    );
  };

  _renderFooterItem = () => {
    const {newText, addingNew} = this.state;
    if (!addingNew) {
      return (
        <MCButton
          width={160}
          height={180}
          bordered
          align="center"
          justify="center"
          onPress={() => this.setState({addingNew: true})}
          br={10}
          ml={10}
          mr={10}>
          <MCIcon name="ios-add" size={100} />
        </MCButton>
      );
    }
    return (
      <MCView
        width={160}
        bordered
        align="center"
        br={10}
        ml={10}
        mr={10}
        height={180}>
        <MCCard
          shadow
          br={1}
          height={120}
          width={160}
          justify="center"
          align="center">
          <MCTextInput
            width={160}
            minHeight={120}
            multiline
            value={newText}
            maxLength={40}
            onChangeText={value => this.setState({newText: value})}
          />
        </MCCard>
        <MCView
          row
          width={160}
          height={60}
          align="center"
          justify="space-between">
          <MCButton onPress={() => this.setState({addingNew: false})}>
            <MCIcon name="ios-close-circle-outline" size={30} />
          </MCButton>
          {newText.length > 0 && (
            <MCButton onPress={() => this.onAddNew()}>
              <MCIcon name="ios-add" size={40} />
            </MCButton>
          )}
        </MCView>
      </MCView>
    );
  };

  render() {
    const {tapToCounts} = this.state;
    const {t} = this.props;
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          title={t('add_reflection_tapToCount_header')}
          hasRight
          rightIcon="trash-alt"
          onPressBack={() => this.onSaveAndGoBack()}
          onPressRight={() => this.onPressReset()}
        />
        <MCContent>
          <FlatList
            contentContainerStyle={{paddingHorizontal: dySize(10)}}
            data={tapToCounts.concat({})}
            numColumns={2}
            renderItem={this._renderListItem}
            keyExtractor={item => item._id}
            keyboardShouldPersistTaps="always"
            ListEmptyComponent={<MCEmptyText>{t('no_result')}</MCEmptyText>}
          />
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  tapToCounts: selector.reflections.getMySpecialReflections(state, 'Tap'),
});

const mapDispatchToProps = {
  updateTapToCounts: reflectionActions.updateTapToCounts,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(TapToCountScreen),
);
