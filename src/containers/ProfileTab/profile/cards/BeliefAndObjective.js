import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import Collapsible from 'react-native-collapsible';
import moment from 'moment';
import {MCCard, MCView} from 'components/styled/View';
import {H3, H4, MCIcon} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCImage, MCModal, MCTagsView} from 'components/common';
import {
  profileCardWidth,
  profileCardNumPerRow,
  getTitleByKey,
} from 'services/operators';
import CardItem from './CardItem';
import {dySize} from 'utils/responsive';

class BeliefAndObjective extends React.Component {
  static propTypes = {
    onPressAllBeliefs: PropTypes.func,
    onPressAllObjectives: PropTypes.func,
    dailyObjectives: PropTypes.arrayOf(Object),
    weeklyObjectives: PropTypes.arrayOf(Object),
    manuals: PropTypes.arrayOf(Object),
  };

  static defaultProps = {
    onPressAllBeliefs: () => undefined,
    onPressAllObjectives: () => undefined,
    dailyObjectives: [],
    weeklyObjectives: [],
    manuals: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      beliefCollapsed: true,
      objectiveCollapsed: true,
      selectedBelief: null,
      selectedObjective: null,
      showBeliefModal: false,
      showObjectiveModal: false,
    };
  }

  onToggleBeliefCollapse = collapsed => {
    this.setState({beliefCollapsed: collapsed});
    if (!collapsed) {
      this.setState({objectiveCollapsed: true});
    }
  };

  onToggleObjectiveCollapse = collapsed => {
    this.setState({objectiveCollapsed: collapsed});
    if (!collapsed) {
      this.setState({beliefCollapsed: true});
    }
  };

  onPressBelief = value => {
    this.setState({selectedBelief: value, showBeliefModal: true});
  };

  onPressObjective = value => {
    this.setState({selectedObjective: value, showObjectiveModal: true});
  };

  _renderBeliefItem = item => (
    <MCCard
      width={profileCardWidth}
      key={item._id}
      ml={5}
      mr={5}
      align="center">
      <MCButton align="center" onPress={() => this.onPressBelief(item)}>
        <H4 numberOfLines={1}>{getTitleByKey('manual', item.data.title)}</H4>
        <MCImage
          width={profileCardWidth - 10}
          height={profileCardWidth - 10}
          image={{uri: item.data.image}}
          br={6}
        />
      </MCButton>
    </MCCard>
  );

  _renderObjectiveItem = objective => (
    <MCCard width={300} mb={10} ml={20} align="center">
      <MCButton
        key={objective._id}
        align="center"
        row
        onPress={() => this.onPressObjective(objective)}>
        <H4 style={{flex: 1}} numberOfLines={1}>
          {objective.data.title}
        </H4>
        <MCView row align="center" ml={30} overflow="visible">
          {objective.data.collaborators.map(user => (
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

  render() {
    const {
      t,
      manuals,
      onPressAllBeliefs,
      onPressAllObjectives,
      dailyObjectives,
      weeklyObjectives,
    } = this.props;
    const {
      selectedBelief,
      selectedObjective,
      beliefCollapsed,
      objectiveCollapsed,
      showBeliefModal,
      showObjectiveModal,
    } = this.state;
    return (
      <MCView align="center" mt={20}>
        <MCView width={340} row justify="space-between">
          <CardItem
            icon="ios-cloud-upload"
            text={t('profile_card_belief')}
            onPress={() => this.onToggleBeliefCollapse(!beliefCollapsed)}
          />
          <CardItem
            icon="ios-compass"
            text={t('profile_card_objective')}
            onPress={() => this.onToggleObjectiveCollapse(!objectiveCollapsed)}
          />
        </MCView>
        <Collapsible collapsed={beliefCollapsed}>
          <MCView align="center">
            {manuals.length > 0 && (
              <MCButton
                width={320}
                row
                justify="space-between"
                onPress={() => onPressAllBeliefs()}>
                <H3>All Beliefs</H3>
                <MCIcon name="ios-arrow-forward" />
              </MCButton>
            )}
            <MCView row width={350} justify="center">
              {manuals.length > 0 &&
                manuals
                  .slice(0, profileCardNumPerRow)
                  .map(value => this._renderBeliefItem(value))}
              {manuals.length === 0 && (
                <MCButton
                  bordered
                  align="center"
                  mt={10}
                  width={300}
                  onPress={() => onPressAllBeliefs()}>
                  <H3 align="center">You have not added a Belief</H3>
                </MCButton>
              )}
            </MCView>
          </MCView>
        </Collapsible>
        <Collapsible collapsed={objectiveCollapsed}>
          <MCView align="center">
            <MCButton
              width={320}
              row
              justify="space-between"
              onPress={() => onPressAllObjectives()}>
              <H3>{t('profile_card_objective')}</H3>
              <MCIcon name="ios-arrow-forward" />
            </MCButton>
            {dailyObjectives.length + weeklyObjectives.length === 0 && (
              <MCButton
                bordered
                align="center"
                mt={10}
                width={300}
                onPress={() => onPressAllObjectives()}>
                <H3 align="center">You have not added any objective</H3>
              </MCButton>
            )}
            <MCView width={320} justify="center">
              {dailyObjectives.length > 0 && <H4 mb={10}>Daily</H4>}
              {dailyObjectives.length > 0 &&
                dailyObjectives
                  .slice(0, 3)
                  .map(objective => this._renderObjectiveItem(objective))}
              {weeklyObjectives.length > 0 && <H4 mb={10}>Weekly</H4>}
              {weeklyObjectives.length > 0 &&
                weeklyObjectives
                  .slice(0, 3)
                  .map(objective => this._renderObjectiveItem(objective))}
            </MCView>
          </MCView>
        </Collapsible>
        {selectedBelief && (
          <MCModal
            isVisible={showBeliefModal}
            onClose={() => this.setState({showBeliefModal: false})}>
            <MCView align="center" width={300} mt={20}>
              <H3 weight="bold" align="center" mb={10}>
                {getTitleByKey('manual', selectedBelief.data.title)}
              </H3>
              <MCImage image={{uri: selectedBelief.data.image}} />
              <H4 mt={10}>{selectedBelief.data.text}</H4>
              <MCView row mt={10}>
                <H4>{`${t('section_label_tags')}: `}</H4>
                <MCTagsView tags={selectedBelief.data.tags} />
              </MCView>
              <H4 style={{width: '100%'}}>
                {`${t('Vulnerability')}: ${selectedBelief.data.vulnerability}`}
              </H4>
            </MCView>
          </MCModal>
        )}
        {selectedObjective && (
          <MCModal
            isVisible={showObjectiveModal}
            onClose={() => this.setState({showObjectiveModal: false})}>
            <MCView align="center" mt={20} width={300}>
              <H3 weight="bold" align="center" mt={10} mb={10}>
                {selectedObjective.data.title}
              </H3>
              {selectedObjective.data.measures.map(measure => (
                <MCView row align="center" width={300}>
                  <H4 style={{flex: 1}} numberOfLines={1}>
                    {measure.title}
                  </H4>
                  <MCIcon
                    name={
                      measure.completed
                        ? 'ios-checkmark-circle-outline'
                        : 'ios-hourglass'
                    }
                  />
                  {/* {measure.completed && <H4 weight="bold">Completed</H4>}
                  {!measure.completed && <H4 weight="italic">Working...</H4>} */}
                </MCView>
              ))}
            </MCView>
          </MCModal>
        )}
      </MCView>
    );
  }
}

export default withTranslation()(BeliefAndObjective);
