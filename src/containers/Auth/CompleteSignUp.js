import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {profileActions, authActions, chatActions} from 'Redux/actions';
import {MCRootView, MCView, MCContent} from 'components/styled/View';
import {H3} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCEditableText, MCImagePicker, MCHeader} from 'components/common';
import {
  WideOvalGreenImage,
  WideOvalYellowImage,
} from 'components/styled/Custom';
import {OvalYellowWide, OvalGreenWide} from 'assets/images';

class CompleteSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarChanged: false,
      editableUsername: this.props.profile.user_id.length === 0,
    };
  }

  componentDidMount() {
    this.props.firebaseAuthentication();
  }

  onFinishedProfile = () => {
    this.props.completeSignUp(this.state.avatarChanged);
  };

  onChangeAvatar = image => {
    this.setState({avatarChanged: true});
    this.props.setProfileData({avatar: image.path});
  };

  render() {
    const {
      setProfileData,
      profile: {name, user_id, avatar},
      t,
      theme,
    } = this.props;
    const {editableUsername} = this.state;
    return (
      <MCRootView justify="flex-start">
        <MCHeader title={t('footer_profile')} hasBack={false} />
        <WideOvalGreenImage source={OvalGreenWide} resizeMode="stretch" />
        <WideOvalYellowImage source={OvalYellowWide} resizeMode="stretch" />
        <MCContent contentContainerStyle={{alignItems: 'center'}}>
          <MCView width={350} align="center">
            <H3 align="center" mt={30} mb={20}>
              {t('auth_comple_signup_select_picture')}
            </H3>
            <MCImagePicker
              width={140}
              height={140}
              round
              image={avatar}
              onSelectImage={image => this.onChangeAvatar(image)}
            />
            <H3 align="center" mt={40}>
              {t('auth_profile_name_displayText')}
            </H3>
            <MCView width={300}>
              <MCEditableText
                text={name}
                editable
                bordered
                maxLength={30}
                textAlign="center"
                onChange={text => setProfileData({name: text})}
                placeholder={t('auth_profile_name_placeHolder')}
              />
            </MCView>
            <H3 align="center" mt={40}>
              {t('auth_profile_user_id_stableUsername')}
            </H3>
            <MCView width={300}>
              <MCEditableText
                text={user_id}
                editable={editableUsername}
                bordered={editableUsername}
                maxLength={30}
                textAlign="center"
                onChange={text => setProfileData({user_id: text})}
                placeholder={t('auth_profile_user_id_placeHolder')}
              />
            </MCView>
          </MCView>
          <MCButton
            br={20}
            height={40}
            mt={40}
            mb={40}
            align="center"
            background={theme.colors.outline}
            pl={20}
            pr={20}
            disabled={avatar.length * name.length * user_id.length === 0}
            onPress={() => this.onFinishedProfile()}>
            <H3 color={theme.colors.background}>{t('button_continue')}</H3>
          </MCButton>
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  profile: state.profileReducer,
});

const mapDispatchToProps = {
  completeSignUp: authActions.completeSignUp,
  setProfileData: profileActions.setProfileData,
  firebaseAuthentication: chatActions.firebaseAuthentication,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(CompleteSignUp),
);
