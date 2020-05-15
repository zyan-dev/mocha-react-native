import React from 'react';
import {FlatList} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import CheckBox from 'react-native-check-box';
import {reflectionActions} from 'Redux/actions';
import {MCImage} from 'components/common';
import {MCRootView, MCView, MCCard} from 'components/styled/View';
import {MCEmptyText, H3, H4, H6} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {dySize} from 'utils/responsive';

class SupportHabitScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      selectedOwner: '',
      owners: [],
    };
  }

  componentDidMount() {
    this.initialize();
  }

  componentDidUpdate(preProps, prevState) {
    if (preProps.supportedHabits !== this.props.supportedHabits) {
      this.initialize();
    }
  }

  initialize = () => {
    const {selectedOwner} = this.state;
    const owners = this.getHabitOwners();
    this.setState({owners});
    if (owners.length > 0 && !selectedOwner.length)
      this.setState({selectedOwner: owners[0]});
  };

  onPressEmoji = (item, reaction) => {
    this.props.reactToHabit({
      ...item,
      data: {
        ...item.data,
        [reaction]: item.data[reaction] ? item.data[reaction] + 1 : 1,
      },
      reactionType: reaction,
    });
  };

  getHabitOwners = () => {
    const {supportedHabits} = this.props;
    let owners = [];
    supportedHabits.map(habit => {
      const find = owners.find(user => user._id === habit.owner);
      if (!find) owners.push(habit.owner_profile);
    });
    return owners;
  };

  _renderOwnerItem = ({item}) => {
    const {selectedOwner} = this.state;
    const {theme} = this.props;
    const owner = item;
    const selected = selectedOwner._id === owner._id;
    return (
      <MCButton pl={1} onPress={() => this.setState({selectedOwner: owner})}>
        <MCView
          mr={5}
          br={21}
          width={44}
          height={44}
          bordered={selected}
          style={{
            borderColor: theme.colors.outline,
            borderWidth: selected ? 2 : 0,
          }}>
          <MCImage
            type="avatar"
            round
            image={{uri: owner.avatar}}
            width={40}
            height={40}
          />
        </MCView>
      </MCButton>
    );
  };

  _renderHabitItem = ({item}) => {
    const habit = item.data;
    const {theme} = this.props;
    return (
      <MCView width={350} bordered br={8} mt={10}>
        <MCCard shadow row align="center" justify="center" width={350} br={1}>
          <H4 align="center">{habit.title}</H4>
        </MCCard>

        {habit.habits.map((item, index) => (
          <MCView key={index} width={350} align="center">
            <CheckBox
              style={{width: dySize(330), marginTop: 10}}
              isChecked={item.completed}
              leftText={item.title}
              leftTextStyle={{
                color: theme.colors.text,
                fontSize: theme.base.FONT_SIZE_LARGE,
                fontFamily: 'ProximaNova-Regular',
              }}
              checkBoxColor={theme.colors.text}
              onClick={() => {}}
            />
          </MCView>
        ))}
        <MCView row align="center" justify="space-between">
          <MCButton
            style={{flex: 1}}
            align="center"
            onPress={() => this.onPressEmoji(item, 'love')}>
            <H3>❤</H3>
            <H6>Love</H6>
          </MCButton>
          <MCButton
            style={{flex: 1}}
            align="center"
            onPress={() => this.onPressEmoji(item, 'nudge')}>
            <H3>👉</H3>
            <H6>Nudge</H6>
          </MCButton>
          <MCButton
            style={{flex: 1}}
            align="center"
            onPress={() => this.onPressEmoji(item, 'strong')}>
            <H3>💪</H3>
            <H6>Strong</H6>
          </MCButton>
          <MCButton
            style={{flex: 1}}
            align="center"
            onPress={() => this.onPressEmoji(item, 'cheer')}>
            <H3>👏</H3>
            <H6>Cheer</H6>
          </MCButton>
          <MCButton
            style={{flex: 1}}
            align="center"
            onPress={() => this.onPressEmoji(item, 'congrats')}>
            <H3>🏆</H3>
            <H6>Congrats</H6>
          </MCButton>
          <MCButton
            style={{flex: 1}}
            align="center"
            onPress={() => this.onPressEmoji(item, 'crown')}>
            <H3>👑</H3>
            <H6>Crown</H6>
          </MCButton>
        </MCView>
      </MCView>
    );
  };

  render() {
    const {owners, selectedOwner} = this.state;
    const {t, theme, supportedHabits} = this.props;
    return (
      <MCRootView justify="flex-start" align="center">
        {owners.length > 0 && (
          <>
            <MCView justify="center" height={50} mt={10}>
              <FlatList
                contentContainerStyle={{
                  width: dySize(350),
                  alignItems: 'center',
                }}
                data={owners}
                horizontal
                renderItem={this._renderOwnerItem}
                keyExtractor={item => item._id}
                ListEmptyComponent={<MCEmptyText>{t('no_result')}</MCEmptyText>}
              />
            </MCView>
            <MCView row width={350} mt={20} mb={10} align="center">
              <MCView bordered br={15}>
                <MCImage
                  image={{uri: selectedOwner.avatar}}
                  width={30}
                  height={30}
                  round
                />
              </MCView>
              <H3 ml={10}>
                {t('habit_supporting_on', {name: selectedOwner.name})}
              </H3>
            </MCView>
          </>
        )}
        <MCView style={{flex: 1}}>
          <FlatList
            contentContainerStyle={{
              width: dySize(375),
              alignItems: 'center',
            }}
            data={supportedHabits.filter(
              habit => habit.owner === selectedOwner._id,
            )}
            renderItem={this._renderHabitItem}
            keyExtractor={item => item._id}
            ListEmptyComponent={
              <MCEmptyText mt={30}>{t('no_result')}</MCEmptyText>
            }
          />
        </MCView>
      </MCRootView>
    );
  }
}
const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  supportedHabits: state.reflectionReducer.supportedHabits,
});

const mapDispatchToProps = {
  reactToHabit: reflectionActions.reactToHabit,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SupportHabitScreen),
);
