import React from 'react';
import {FlatList} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {reflectionActions} from 'Redux/actions';
import {MCImage} from 'components/common';
import {MCRootView, MCView, MCCard} from 'components/styled/View';
import {MCEmptyText, H3, H4, H5, MCIcon} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {dySize} from 'utils/responsive';

class SupportObjectiveScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  onPressEmoji = (item, reaction) => {
    this.props.reactToObjective({
      ...item,
      data: {
        ...item.data,
        [reaction]: item.data[reaction] ? item.data[reaction] + 1 : 1,
      },
    });
  };

  _renderItem = ({item}) => {
    const objective = item.data;
    const {allUsers} = this.props;
    const owner = allUsers.find((user) => user._id === item.owner);
    if (!owner) return null;
    return (
      <MCView width={350} bordered br={8} mt={10}>
        <MCCard shadow row align="center" width={350} br={1}>
          <MCImage image={{uri: owner.avatar}} width={30} height={30} br={15} />
          <H3 ml={10} style={{flex: 1}}>
            {owner.name}
          </H3>
          <MCButton onPress={() => this.onPressEmoji(item, 'love')}>
            <H5>❤</H5>
          </MCButton>
        </MCCard>
        <H3 ml={10} mt={10} weight="bold">
          {objective.title}
        </H3>
        {objective.measures.map((measure) => (
          <MCView row align="center" justify="space-between">
            <H4 weight="italic" ml={10} style={{flex: 1}} mr={30}>
              {measure.title}
            </H4>
            {measure.completed && <MCIcon name="md-checkmark" />}
          </MCView>
        ))}
        <MCView row align="center" justify="space-between">
          <MCButton
            style={{flex: 1}}
            align="center"
            onPress={() => this.onPressEmoji(item, 'nudge')}>
            <H3>👉</H3>
            <H5>Nudge</H5>
          </MCButton>
          <MCButton
            style={{flex: 1}}
            align="center"
            onPress={() => this.onPressEmoji(item, 'strong')}>
            <H3>💪</H3>
            <H5>Strong</H5>
          </MCButton>
          <MCButton
            style={{flex: 1}}
            align="center"
            onPress={() => this.onPressEmoji(item, 'cheer')}>
            <H3>👏</H3>
            <H5>Cheer</H5>
          </MCButton>
          <MCButton
            style={{flex: 1}}
            align="center"
            onPress={() => this.onPressEmoji(item, 'congrats')}>
            <H3>🏆</H3>
            <H5>Congrats</H5>
          </MCButton>
          <MCButton
            style={{flex: 1}}
            align="center"
            onPress={() => this.onPressEmoji(item, 'crown')}>
            <H3>👑</H3>
            <H5>Crown</H5>
          </MCButton>
        </MCView>
      </MCView>
    );
  };

  render() {
    const {t, theme, supportedObjectives} = this.props;
    return (
      <MCRootView justify="flex-start" align="flex-start">
        <FlatList
          contentContainerStyle={{
            width: dySize(375),
            alignItems: 'center',
          }}
          data={supportedObjectives}
          renderItem={this._renderItem}
          keyExtractor={(item) => item._id}
          ListEmptyComponent={<MCEmptyText>{t('no_result')}</MCEmptyText>}
        />
      </MCRootView>
    );
  }
}
const mapStateToProps = (state) => ({
  theme: state.routerReducer.theme,
  supportedObjectives: state.reflectionReducer.supportedObjectives,
  allUsers: state.usersReducer.allUsers,
});

const mapDispatchToProps = {
  reactToObjective: reflectionActions.reactToObjective,
};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(SupportObjectiveScreen),
);
