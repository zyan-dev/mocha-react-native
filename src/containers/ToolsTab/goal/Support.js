import React from 'react';
import {FlatList} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import CheckBox from 'react-native-check-box';
import {reflectionActions} from 'Redux/actions';
import {MCImage} from 'components/common';
import {MCRootView, MCView, MCCard} from 'components/styled/View';
import {MCEmptyText, H3, H4, H6, MCIcon} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {dySize} from 'utils/responsive';

class SupportObjectiveScreen extends React.Component {
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

  initialize = () => {
    const {selectedOwner} = this.state;
    const owners = this.getObjectiveOwners();
    this.setState({owners});
    if (owners.length > 0 && !selectedOwner.length)
      this.setState({selectedOwner: owners[0]});
  };

  onPressEmoji = (item, reaction) => {
    this.props.reactToObjective({
      ...item,
      data: {
        ...item.data,
        [reaction]: item.data[reaction] ? item.data[reaction] + 1 : 1,
      },
    });
  };

  getObjectiveOwners = () => {
    const {supportedObjectives, allUsers} = this.props;
    let owners = [];
    supportedObjectives.map(objective => {
      const find = owners.find(user => user._id === objective.owner);
      if (!find) {
        const owner = allUsers.find(user => user._id === objective.owner);
        if (owner) owners.push(owner);
      }
    });
    console.log({supportedObjectives});
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

  _renderObjectiveItem = ({item}) => {
    const objective = item.data;
    const {allUsers, theme} = this.props;
    const owner = allUsers.find(user => user._id === item.owner);
    if (!owner) return null;
    return (
      <MCView width={350} bordered br={8} mt={10}>
        <MCCard shadow row align="center" justify="center" width={350} br={1}>
          <H3 ml={5} weight="bold">
            {objective.title}
          </H3>
        </MCCard>

        {objective.measures.map(measure => (
          <MCView width={350} align="center">
            <CheckBox
              style={{width: dySize(330), marginTop: 10}}
              isChecked={measure.completed}
              leftText={measure.title}
              leftTextStyle={{
                color: theme.colors.text,
                fontSize: theme.base.FONT_SIZE_LARGE,
                fontFamily: 'Raleway-Regular',
              }}
              checkBoxColor={theme.colors.text}
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
    const {t, theme, supportedObjectives} = this.props;
    return (
      <MCRootView justify="flex-start" align="center">
        {owners.length > 0 && (
          <>
            <FlatList
              style={{marginTop: 20}}
              contentContainerStyle={{
                width: dySize(350),
                alignItems: 'center',
                paddingVertical: 10,
              }}
              data={owners}
              horizontal
              renderItem={this._renderOwnerItem}
              keyExtractor={item => item._id}
              ListEmptyComponent={<MCEmptyText>{t('no_result')}</MCEmptyText>}
            />
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
                {t('objective_supporting_on', {name: selectedOwner.name})}
              </H3>
            </MCView>
          </>
        )}

        <FlatList
          contentContainerStyle={{
            width: dySize(375),
            alignItems: 'center',
            flex: 1,
          }}
          data={supportedObjectives.filter(
            objective => objective.owner === selectedOwner._id,
          )}
          renderItem={this._renderObjectiveItem}
          keyExtractor={item => item._id}
          ListEmptyComponent={
            <MCEmptyText mt={30}>{t('no_result')}</MCEmptyText>
          }
        />
      </MCRootView>
    );
  }
}
const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  supportedObjectives: state.reflectionReducer.supportedObjectives,
  allUsers: state.usersReducer.allUsers,
});

const mapDispatchToProps = {
  reactToObjective: reflectionActions.reactToObjective,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SupportObjectiveScreen),
);
