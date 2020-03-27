import React from 'react';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CheckBox from 'react-native-check-box';
import {FlatList} from 'react-native-gesture-handler';
import moment from 'moment';
import * as _ from 'lodash';
import {reflectionActions, userActions, otherActions} from 'Redux/actions';
import {MCHeader, MCEditableText, MCImage} from 'components/common';
import {MCView, MCRootView, MCContent, MCCard} from 'components/styled/View';
import {MCButton} from 'components/styled/Button';
import {H3, H4, MCIcon} from 'components/styled/Text';
import {getAfterDate} from 'services/operators';
import NavigationService from 'navigation/NavigationService';
import {dySize} from 'utils/responsive';
import {WeekDays} from 'utils/constants';
import {getCommitKey} from '../../../services/operators';

class EditObjectiveScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showTimePicker: false,
      newMeasureTitle: '',
      origin: {},
    };
  }

  componentDidMount() {
    this.setState({origin: this.props.selectedReflection});
  }

  onPressRight = () => {
    const {selectedUsers, updateSelectedReflection} = this.props;
    updateSelectedReflection({
      collaborators: selectedUsers.map(user =>
        _.pick(user, ['_id', 'avatar', 'pushToken', 'name']),
      ),
    });
    this.updateCommitHistory();
    setTimeout(() => {
      this.props.addOrUpdateReflection();
    });
  };

  updateCommitHistory = () => {
    const {
      selectedReflection: {
        data: {measures},
      },
    } = this.props;
    const {origin} = this.state;
    const todayKey = getCommitKey(new Date());
    let temp = {};
    measures.map(measure => {
      const find = origin.data.measures.find(i => i.title === measure.title);
      if (find) {
        // existing measure
        if (find.completed && !measure.completed) {
          const findKey = getCommitKey(new Date(find.completed));
          temp = {
            ...temp,
            [findKey]: temp[findKey] ? temp[todayKey] - 1 : -1,
          };
        } else if (!find.completed && measure.completed) {
          temp = {
            ...temp,
            [todayKey]: temp[todayKey] ? temp[todayKey] + 1 : 1,
          };
        }
      } else {
        // new measure
        if (measure.completed) {
          temp = {
            ...temp,
            [todayKey]: temp[todayKey] ? temp[todayKey] + 1 : 1,
          };
        }
      }
    });
    if (Object.keys(temp).length > 0) {
      const param = Object.keys(temp).map(key => ({
        date: key,
        amount: temp[key],
      }));
      this.props.updateAnalyzeStatus({data: param});
    }
  };

  onToggleCheck = measure => {
    const {
      updateSelectedReflection,
      selectedReflection: {
        data: {measures},
      },
    } = this.props;
    const updated = measures.map(item => {
      if (item.title === measure.title) {
        return {
          ...measure,
          completed: measure.completed ? undefined : new Date().getTime(),
        };
      } else {
        return item;
      }
    });
    updateSelectedReflection({measures: updated});
  };

  onChangeTime = time => {
    const {updateSelectedReflection} = this.props;
    updateSelectedReflection({deadline: new Date(time).getTime()});
    this.hideDatePicker();
  };

  hideDatePicker = () => {
    this.setState({showTimePicker: false});
  };

  onRemoveMeasure = measure => {
    const {
      selectedReflection: {
        data: {measures},
      },
    } = this.props;
    const filtered = measures.filter(item => item.title !== measure.title);
    this.props.updateSelectedReflection({measures: filtered});
  };

  onAddMeasure = title => {
    const {
      selectedReflection: {
        data: {measures},
      },
    } = this.props;
    if (title.length === 0) return;
    measures.push({title, completed: undefined});
    this.props.updateSelectedReflection({measures});
    this.setState({newMeasureTitle: ''});
  };

  _renderMemberItem = ({item}) => {
    const user = item;
    const {deselectUser} = this.props;
    return (
      <MCView align="center" width={100} mt={10}>
        <MCImage round image={{uri: user.avatar}} width={80} height={80} />
        <MCButton onPress={() => deselectUser(user)}>
          <MCIcon name="ios-remove-circle-outline" />
        </MCButton>
        <H3 align="center">{user.name}</H3>
      </MCView>
    );
  };

  _renderSocialListFooter = () => (
    <MCButton
      bordered
      align="center"
      justify="center"
      width={80}
      height={80}
      br={40}
      mt={10}
      ml={10}
      onPress={() =>
        NavigationService.navigate('SelectUser', {multiple: true})
      }>
      <MCIcon name="ios-add" size={40} />
    </MCButton>
  );

  render() {
    const {showTimePicker, newMeasureTitle} = this.state;
    const {
      t,
      theme,
      selectedReflection,
      updateSelectedReflection,
      selectedUsers,
    } = this.props;
    const {
      data: {title, isDaily, measures, deadline, collaborators},
    } = selectedReflection;
    return (
      <MCRootView>
        <MCHeader
          title={
            selectedReflection._id
              ? t('objective_edit_title')
              : t('objective_add_title')
          }
          hasRight={title.length * measures.length * selectedUsers.length > 0}
          rightIcon={selectedReflection._id ? 'ios-cloud-upload' : 'ios-send'}
          onPressRight={() => this.onPressRight()}
        />
        <MCContent
          contentContainerStyle={{padding: dySize(10), paddingBottom: 200}}>
          <H3 width={350} align="left" underline>
            {t('objective_preview')}
          </H3>
          <MCView bordered br={10} align="center">
            <MCCard shadow br={1}>
              <H4 width={350} align="center">
                {title}
              </H4>
            </MCCard>
            {measures.map(measure => (
              <CheckBox
                style={{width: dySize(330), marginTop: 10}}
                onClick={() => this.onToggleCheck(measure)}
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
                {selectedUsers.map(user => (
                  <MCImage
                    image={{uri: user.avatar}}
                    round
                    width={30}
                    height={30}
                    style={{marginLeft: dySize(-20)}}
                  />
                ))}
              </MCView>
              {isDaily ? (
                <H4 mr={10}>{t('objective_daily_tabTitle')}</H4>
              ) : (
                <MCView row align="center" mr={10}>
                  <MCIcon name="md-alarm" />
                  <H4>{`${t('by')} ${
                    WeekDays[new Date(deadline).getDay()].long
                  }`}</H4>
                </MCView>
              )}
            </MCView>
          </MCView>

          <H3 width={350} align="left" underline mt={20} mb={20}>
            {t('objective_settings')}
          </H3>
          <MCView row align="center">
            <MCIcon name="ios-information-circle-outline" padding={1} />
            <H3 ml={10} weight="bold">
              {t('objective_header_title')}
            </H3>
          </MCView>
          <H4 color={theme.colors.border}>{t('object_title_1')}</H4>
          <H4 color={theme.colors.border}>{t('object_title_2')}</H4>
          <H4 color={theme.colors.border} mb={10}>
            {t('object_title_3')}
          </H4>
          <MCEditableText
            text={title}
            onChange={text => updateSelectedReflection({title: text})}
          />

          <MCView row align="center" justify="space-between" mt={20}>
            <MCView row align="center">
              <MCIcon name="md-alarm" padding={1} />
              <H3 ml={10} weight="bold">
                {'By when?'}
              </H3>
            </MCView>
            <CheckBox
              style={{width: 150}}
              onClick={() => updateSelectedReflection({isDaily: !isDaily})}
              isChecked={isDaily}
              leftText={t('objective_daily_checkmark_title')}
              leftTextStyle={{
                color: theme.colors.text,
                fontSize: theme.base.FONT_SIZE_LARGE,
                fontFamily: 'Raleway-Regular',
                textAlign: 'right',
                paddingRight: 10,
              }}
              checkBoxColor={theme.colors.text}
            />
          </MCView>
          <H4 color={theme.colors.border}>{t('objective_deadline_title')}</H4>
          {!isDaily && (
            <MCButton
              bordered
              onPress={() => this.setState({showTimePicker: !showTimePicker})}>
              <H4>{moment(new Date(deadline)).format('MMMM D YYYY')}</H4>
            </MCButton>
          )}
          <DateTimePickerModal
            isVisible={showTimePicker}
            mode="date"
            minimumDate={new Date()}
            maximumDate={getAfterDate(7)}
            date={new Date(deadline)}
            onConfirm={this.onChangeTime}
            onCancel={this.hideDatePicker}
            headerTextIOS={t('objective_deadline_picker_title')}
          />

          <MCView row align="center" mt={20}>
            <MCIcon name="ruler" type="Entypo" padding={1} size={16} />
            <H3 ml={10} weight="bold">
              {t('objective_measure_title')}
            </H3>
          </MCView>
          <H4 color={theme.colors.border}>{t('object_title_1')}</H4>
          {measures.map((measure, index) => (
            <MCView row align="center">
              <H4 width={30} align="center">
                {index + 1}.
              </H4>
              <H4 style={{flex: 1}} pv={1}>
                {measure.title}
              </H4>
              <MCButton onPress={() => this.onRemoveMeasure(measure)}>
                <MCIcon name="ios-remove-circle-outline" padding={1} />
              </MCButton>
            </MCView>
          ))}
          <MCView row align="center" mt={10}>
            <MCView style={{flex: 1}}>
              <MCEditableText
                maxLength={60}
                text={newMeasureTitle}
                onChange={text => this.setState({newMeasureTitle: text})}
              />
            </MCView>
            <MCButton onPress={() => this.onAddMeasure(newMeasureTitle)}>
              <MCIcon name="ios-add-circle-outline" padding={1} />
            </MCButton>
          </MCView>
          <MCView row align="center" mt={20}>
            <MCIcon name="ios-person-add" padding={1} />
            <H3 ml={10} weight="bold">
              {t('objective_social_accountability_title')}
            </H3>
          </MCView>
          <H4 color={theme.colors.border}>
            {t('objective_social_accountability_bottom')}
          </H4>
          <MCCard>
            <FlatList
              horizontal
              style={{width: '100%', height: dySize(200)}}
              data={selectedUsers}
              renderItem={this._renderMemberItem}
              keyExtractor={item => item}
              ListFooterComponent={this._renderSocialListFooter}
            />
          </MCCard>
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  selectedReflection: state.reflectionReducer.selectedReflection,
  reflectionSections: state.reflectionReducer.reflectionSections,
  selectedUsers: state.usersReducer.selectedUsers,
});

const mapDispatchToProps = {
  updateSelectedReflection: reflectionActions.updateSelectedReflection,
  addOrUpdateReflection: reflectionActions.addOrUpdateReflection,
  addCustomReflectionTitle: reflectionActions.addCustomReflectionTitle,
  deselectUser: userActions.deselectUser,
  updateAnalyzeStatus: otherActions.updateAnalyzeStatus,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(EditObjectiveScreen),
);
