import React from 'react';
import {FlatList} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import CheckBox from 'react-native-check-box';
import {reflectionActions, userActions} from 'Redux/actions';
import {selector} from 'Redux/selectors';
import {MCRootView, MCView, MCCard} from 'components/styled/View';
import {MCImage} from 'components/common';
import {H3, H4, MCEmptyText, MCIcon} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {dySize} from 'utils/responsive';
import NavigationService from 'navigation/NavigationService';

class DailyObjectiveScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPressEdit = item => {
    this.props.selectReflection(item);
    this.props.setSeletedUsers(item.data.collaborators);
    NavigationService.navigate('EditObjective');
  };

  onPressRemove = item => {
    this.props.removeReflection(item);
  };

  _renderItem = ({item}) => {
    const {t, theme} = this.props;
    const {title, measures, isDaily, deadline, collaborators} = item.data;
    return (
      <MCView width={350} bordered br={10} align="center">
        <MCCard shadow br={1} row align="center">
          <H4 style={{flex: 1}} align="center">
            {title}
          </H4>
        </MCCard>
        {measures.map(measure => (
          <CheckBox
            style={{width: dySize(330), marginTop: 10}}
            onClick={() => {}}
            isChecked={measure.completed}
            leftText={measure.title}
            leftTextStyle={{
              color: theme.colors.text,
              fontSize: theme.base.FONT_SIZE_LARGE,
              fontFamily: 'Raleway-Regular',
            }}
            checkBoxColor={theme.colors.text}
          />
        ))}
        <MCView row align="center" mt={10} mb={10}>
          <MCView
            row
            align="center"
            style={{flex: 1}}
            ml={30}
            overflow="visible">
            {collaborators.map(user => (
              <MCImage
                image={{uri: user.avatar}}
                round
                width={30}
                height={30}
                style={{marginLeft: dySize(-20)}}
              />
            ))}
          </MCView>
          <MCView row align="center" justify="flex-end" style={{flex: 1}}>
            <MCButton onPress={() => this.onPressEdit(item)}>
              <MCIcon name="ios-create" />
            </MCButton>
            <MCButton onPress={() => this.onPressRemove(item)}>
              <MCIcon name="ios-trash" />
            </MCButton>
          </MCView>
        </MCView>
      </MCView>
    );
  };

  render() {
    const {t, dailyObjectives} = this.props;
    return (
      <MCRootView justify="flex-start">
        <FlatList
          contentContainerStyle={{paddingTop: 20}}
          data={dailyObjectives}
          renderItem={this._renderItem}
          keyExtractor={item => item._id}
          ListEmptyComponent={<MCEmptyText>{t('no_result')}</MCEmptyText>}
        />
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  dailyObjectives: selector.reflections.getMyDailyObjectives(state),
});

const mapDispatchToProps = {
  setInitialReflection: reflectionActions.setInitialReflection,
  removeReflection: reflectionActions.removeReflection,
  selectReflection: reflectionActions.selectReflection,
  setSeletedUsers: userActions.setSeletedUsers,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(DailyObjectiveScreen),
);