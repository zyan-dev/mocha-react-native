import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import * as _ from 'lodash';
import i18next from 'i18next';
import {userActions, feedbackActions} from 'Redux/actions';
import {MCRootView, MCContent, MCView, MCCard} from 'components/styled/View';
import {H4, ErrorText} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCHeader, MCIcon, MCImage} from 'components/common';
import {dySize} from 'utils/responsive';
import NavigationService from 'navigation/NavigationService';
import {getStringWithOutline} from 'services/operators';

class BestSelfScreen extends React.Component {
  title = {
    title: i18next.t('tools_tab_self_best_title', {
      bold: i18next.t('outline_capital_strengths'),
    }),
    boldWordKeys: ['capital_strengths'],
  };

  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
    };
  }

  componentWillMount() {
    this.props.setSeletedUsers([]);
  }

  onPressSubmit = () => {
    this.setState({submitted: true});
    if (!this.validateUsers()) return;
    this.props.selectQuestion('mocha_feedback_best_self');
    setTimeout(async () => {
      this.props.requestFeedback({goBack: true});
    });
  };

  validateUsers = () => {
    return this.props.selectedUsers.length > 0;
  };

  renderUserAvatar = user => {
    return (
      <MCView align="center" ml={12} mr={12}>
        <MCImage
          image={{uri: user.avatar}}
          type="user"
          width={80}
          height={80}
          round
        />
        <MCButton onPress={() => this.props.deselectUser(user)}>
          <MCIcon name="ios-remove-circle-outline" />
        </MCButton>
      </MCView>
    );
  };

  renderPlusButton = () => {
    const {submitted} = this.state;
    const {theme} = this.props;
    const isUsersError = submitted && !this.validateUsers();
    const color = isUsersError ? theme.colors.danger : theme.colors.text;
    return (
      <MCButton
        width={80}
        height={80}
        bordered
        br={40}
        ml={10}
        align="center"
        justify="center"
        style={{borderColor: color}}
        onPress={() =>
          NavigationService.navigate('SelectUser', {multiple: true})
        }>
        <MCIcon name="ios-add" size={50} color={color} />
      </MCButton>
    );
  };

  render() {
    const {submitted} = this.state;
    const {t, theme, selectedUsers} = this.props;
    const isUsersError = submitted && !this.validateUsers();
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          hasRight
          title={t('tools_tab_best_self')}
          headerIcon={<MCIcon type="FontAwesome5Pro" name="hammer" />}
          rightIcon="cloud-upload-alt"
          rightText={t('button_save')}
          rightIconColor={theme.colors.outline}
          onPressRight={() => this.onPressSubmit()}
        />
        <MCContent
          contentContainerStyle={{
            paddingVertical: dySize(15),
            alignItems: 'center',
          }}>
          <MCView align="center" ph={20}>
            <H4 align="center">{getStringWithOutline(this.title)}</H4>
            <MCCard width={280} mt={20} p={10}>
              <H4>{t('mocha_feedback_my-strenhths')}</H4>
            </MCCard>
            <MCCard width={280} mt={20} p={10}>
              <H4>{t('mocha_feedback_when-i-was-at-best')}</H4>
            </MCCard>
          </MCView>
          <MCView>
            <H4 width={345} mt={60}>
              {t('tools_tab_self_best_question')}
            </H4>
            {isUsersError && (
              <ErrorText>{t('error_input_trustnetwork_members')}</ErrorText>
            )}
          </MCView>
          <MCView bordered br={15} width={345} row wrap mt={20} pv={20} ph={12}>
            {selectedUsers.map(user => {
              return this.renderUserAvatar(user);
            })}
            {this.renderPlusButton()}
          </MCView>
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  selectedUsers: state.usersReducer.selectedUsers,
});

const mapDispatchToProps = {
  setSeletedUsers: userActions.setSeletedUsers,
  deselectUser: userActions.deselectUser,
  selectQuestion: feedbackActions.selectQuestion,
  requestFeedback: feedbackActions.requestFeedback,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(BestSelfScreen),
);
