import React from 'react';
import {FlatList} from 'react-native';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {MCCard, MCView} from 'components/styled/View';
import {H3, H4, H5, MCIcon, MCEmptyText} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCImage, MCModal} from 'components/common';
import {dySize} from 'utils/responsive';

class ObjectivesCard extends React.Component {
  static propTypes = {
    onPressAllDaily: PropTypes.func,
    onPressAllWeekly: PropTypes.func,
    onPressNew: PropTypes.func,
    dailyObjectives: PropTypes.arrayOf(Object),
    weeklyObjectives: PropTypes.arrayOf(Object),
    editable: PropTypes.bool,
  };

  static defaultProps = {
    onPressAllDaily: () => undefined,
    onPressAllWeekly: () => undefined,
    onPressNew: () => undefined,
    dailyObjectives: [],
    weeklyObjectives: [],
    editable: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedObjective: null,
      showModal: false,
    };
  }

  onPressItem = (objective) => {
    this.setState({selectedObjective: objective, showModal: true});
  };

  _renderObjectiveItem = ({item}) => {
    const objective = item.data;
    return (
      <MCCard key={item._id} width={300} mb={10} align="center">
        <MCButton
          align="center"
          row
          onPress={() => this.onPressItem(objective)}>
          <H4 style={{flex: 1}} numberOfLines={1}>
            {objective.title}
          </H4>
          <MCView row align="center" ml={30} overflow="visible">
            {objective.collaborators.map((user) => (
              <MCImage
                image={{uri: user.avatar}}
                round
                width={30}
                height={30}
                style={{marginLeft: dySize(-20)}}
              />
            ))}
          </MCView>
        </MCButton>
      </MCCard>
    );
  };

  render() {
    const {
      t,
      dailyObjectives,
      weeklyObjectives,
      onPressAllDaily,
      onPressAllWeekly,
      onPressNew,
      editable,
    } = this.props;
    const {selectedObjective, showModal} = this.state;
    return (
      <MCView align="center">
        <MCView row align="center" mb={20}>
          <H3 weight="bold" style={{flex: 1}}>
            {t('profile_card_objective')}
          </H3>
          {editable && (
            <MCButton onPress={() => onPressNew()}>
              <MCIcon type="FontAwesome5" name="plus" />
            </MCButton>
          )}
        </MCView>
        <MCView row align="center" mb={10}>
          <H3 weight="italic" style={{flex: 1}}>
            {t('objective_daily_tabTitle')}
          </H3>
          {editable && (
            <MCButton onPress={() => onPressAllDaily()}>
              <H5 underline>{t('view_all')}</H5>
            </MCButton>
          )}
        </MCView>
        <FlatList
          data={dailyObjectives.slice(0, 4)}
          renderItem={this._renderObjectiveItem}
          keyExtractor={(item) => item._id}
          style={{width: dySize(300)}}
          ListEmptyComponent={<MCEmptyText>{t('no_result')}</MCEmptyText>}
        />
        <MCView row align="center" mt={20} mb={10}>
          <H3 weight="italic" style={{flex: 1}}>
            {t('objective_weekly_tabTitle')}
          </H3>
          {editable && (
            <MCButton onPress={() => onPressAllWeekly()}>
              <H5 underline>{t('view_all')}</H5>
            </MCButton>
          )}
        </MCView>
        <FlatList
          data={weeklyObjectives.slice(0, 4)}
          renderItem={this._renderObjectiveItem}
          keyExtractor={(item) => item._id}
          numColumns={2}
          style={{width: dySize(300)}}
          ListEmptyComponent={<MCEmptyText>{t('no_result')}</MCEmptyText>}
        />
        {selectedObjective && (
          <MCModal
            isVisible={showModal}
            onClose={() => this.setState({showModal: false})}>
            <MCView align="center" mt={20} width={300}>
              <H3 weight="bold" align="center" mt={10} mb={10}>
                {selectedObjective.title}
              </H3>
              {selectedObjective.measures.map((measure) => (
                <MCView row align="center" width={300}>
                  <H4 mr={5}>🔹</H4>
                  <H4 weight="italic" style={{flex: 1}} mr={20}>
                    {measure.title}
                  </H4>
                  <MCIcon
                    name={
                      measure.completed
                        ? 'ios-checkmark-circle-outline'
                        : 'ios-hourglass'
                    }
                  />
                </MCView>
              ))}
            </MCView>
          </MCModal>
        )}
      </MCView>
    );
  }
}

export default withTranslation()(ObjectivesCard);
