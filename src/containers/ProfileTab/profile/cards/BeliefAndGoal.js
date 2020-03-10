import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import Collapsible from 'react-native-collapsible';
import moment from 'moment';
import {MCCard, MCView} from 'components/styled/View';
import {H3, H4, MCIcon} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCImage, MCModal, MCTagsView} from 'components/common';
import {profileCardWidth, profileCardNumPerRow} from 'services/operators';
import {selector} from 'Redux/selectors';
import CardItem from './CardItem';

class BeliefAndGoal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      beliefCollapsed: true,
      goalCollapsed: true,
      selectedBelief: null,
      selectedGoal: null,
      showBeliefModal: false,
      showGoalModal: false,
    };
  }

  onToggleBeliefCollapse = collapsed => {
    this.setState({beliefCollapsed: collapsed});
    if (!collapsed) {
      this.setState({goalCollapsed: true});
    }
  };

  onToggleGoalCollapse = collapsed => {
    this.setState({goalCollapsed: collapsed});
    if (!collapsed) {
      this.setState({beliefCollapsed: true});
    }
  };

  onPressBelief = value => {
    this.setState({selectedBelief: value, showBeliefModal: true});
  };

  onPressGoal = value => {
    this.setState({selectedGoal: value, showGoalModal: true});
  };

  _renderBeliefItem = item => (
    <MCCard width={profileCardWidth} mr={10} align="center">
      <MCButton
        key={item._id}
        align="center"
        onPress={() => this.onPressBelief(item)}>
        <H4 numberOfLines={1}>{item.data.title}</H4>
        <MCImage
          width={profileCardWidth - 10}
          height={profileCardWidth - 10}
          image={{uri: item.data.image}}
        />
      </MCButton>
    </MCCard>
  );

  _renderGoalItem = item => (
    <MCCard width={profileCardWidth} mr={10} align="center">
      <MCButton
        key={item._id}
        align="center"
        onPress={() => this.onPressGoal(item)}>
        <H4 numberOfLines={1}>{item.data.title}</H4>
        <MCImage
          width={profileCardWidth - 10}
          height={profileCardWidth - 10}
          image={{uri: item.data.image}}
        />
      </MCButton>
    </MCCard>
  );

  render() {
    const {t, goals, manuals} = this.props;
    const {
      selectedBelief,
      selectedGoal,
      beliefCollapsed,
      goalCollapsed,
      showBeliefModal,
      showGoalModal,
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
            text={t('profile_card_goal')}
            onPress={() => this.onToggleGoalCollapse(!goalCollapsed)}
          />
        </MCView>
        <Collapsible collapsed={beliefCollapsed}>
          {manuals.length > 0 && (
            <MCButton
              width={320}
              row
              justify="space-between"
              onPress={() => {}}>
              <H3>All Beliefs</H3>
              <MCIcon name="ios-arrow-forward" />
            </MCButton>
          )}
          <MCView row width={300}>
            {manuals.length > 0 &&
              manuals
                .slice(0, profileCardNumPerRow)
                .map(value => this._renderBeliefItem(value))}
            {manuals.length === 0 && (
              <MCCard align="center" mt={10} width={320}>
                <H3>You have not added a User Manual</H3>
              </MCCard>
            )}
          </MCView>
        </Collapsible>
        <Collapsible collapsed={goalCollapsed}>
          {goals.length > 0 && (
            <MCButton
              width={320}
              row
              justify="space-between"
              onPress={() => {}}>
              <H3>All Goals</H3>
              <MCIcon name="ios-arrow-forward" />
            </MCButton>
          )}
          <MCView row width={300}>
            {goals.length > 0 &&
              goals
                .slice(0, profileCardNumPerRow)
                .map(value => this._renderGoalItem(value))}
            {goals.length === 0 && (
              <MCCard align="center" mt={10} width={320}>
                <H3>You have not added a Goal</H3>
              </MCCard>
            )}
          </MCView>
        </Collapsible>
        {selectedBelief && (
          <MCModal
            isVisible={showBeliefModal}
            onClose={() => this.setState({showBeliefModal: false})}>
            <MCView align="center" width={300} mt={20}>
              <H3 weight="bold" align="center" mb={10}>
                {t('modal_usermanual_header', {
                  title: selectedBelief.data.title,
                })}
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
        {selectedGoal && (
          <MCModal
            isVisible={showGoalModal}
            onClose={() => this.setState({showGoalModal: false})}>
            <MCView align="center" mt={20} width={300}>
              <MCImage image={{uri: selectedGoal.data.image}} />
              <H3 weight="bold" align="center" mt={10} mb={10}>
                {selectedGoal.data.title}
              </H3>
              <MCView row>
                <MCIcon
                  type="AntDesign"
                  name="clockcircleo"
                  align="center"
                  style={{width: 40}}
                />
                <H4>{t('goal_section_by_when')}</H4>
                <H4 align="right" style={{flex: 1}}>
                  {moment(selectedGoal.data.deadline).format('MMM D, YYYY')}
                </H4>
              </MCView>
              <MCView row>
                <MCIcon
                  type="Entypo"
                  name="ruler"
                  align="center"
                  style={{width: 40}}
                />
                <H4>{t('goal_section_measures')}</H4>
                <H4 align="right" style={{flex: 1}}>
                  {selectedGoal.data.measures && selectedGoal.data.measures[0]}
                </H4>
              </MCView>
              <MCView row>
                <MCIcon
                  type="MaterialCommunityIcons"
                  name="account-group"
                  align="center"
                  style={{width: 40}}
                />
                <H4>{t('goal_section_accountable_to')}</H4>
                <MCView row wrap justify="flex-end" style={{flex: 1}}>
                  {selectedGoal.data.collaboraters.length > 0 &&
                    selectedGoal.data.collaboraters.map(collaborater => (
                      <MCView mr={5} mb={5}>
                        <MCImage
                          round
                          width={30}
                          height={30}
                          image={{uri: collaborater.avatar}}
                        />
                      </MCView>
                    ))}
                </MCView>
              </MCView>
              <MCView row>
                <MCIcon
                  name="ios-notifications-outline"
                  align="center"
                  style={{width: 40}}
                />
                <H4>{t('goal_section_expired_time')}</H4>
                <H4 align="right" style={{flex: 1}}>
                  Expired Time
                </H4>
              </MCView>
            </MCView>
          </MCModal>
        )}
      </MCView>
    );
  }
}

const mapStateToProps = state => ({
  goals: selector.reflections.getUserGoals(state),
  manuals: selector.reflections.getUserManuals(state),
});

export default withTranslation()(
  connect(mapStateToProps, undefined)(BeliefAndGoal),
);
