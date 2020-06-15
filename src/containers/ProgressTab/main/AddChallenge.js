import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import * as _ from 'lodash';
import i18next from 'i18next';
import {challengeActions} from 'Redux/actions';
import {MCTagsView, MCIcon} from 'components/common';
import {H3, H4} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {dySize} from 'utils/responsive';
import {getStringWithOutline, getChallengeIcon} from 'services/operators';
import NavigationService from 'navigation/NavigationService';
import {
  MCRootView,
  MCView,
  NativeCard,
  MCContent,
  DividerLine,
} from 'components/styled/View';
import {
  TemplateChallenges,
  ChallengeIconData,
  EmptyChallenge,
} from 'utils/constants';

class SelectTemplateScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  ChooseText = {
    title: i18next.t('label_choose', {
      bold: i18next.t('outline_challenge'),
    }),
    boldWordKeys: ['challenge'],
  };

  onPressCustom = () => {
    this.props.selectChallenge(_.cloneDeep(EmptyChallenge));
    NavigationService.navigate('SelectChallenges');
  };

  onSelectTemplate = item => {
    this.props.selectChallenge(item);
    NavigationService.navigate('SelectTeammates');
  };

  _renderChallengeCard = item => {
    const {theme} = this.props;
    return (
      <NativeCard
        align="center"
        width={160}
        pv={1}
        ph={5}
        mr={6}
        ml={6}
        mt={15}>
        <MCButton
          align="center"
          width={160}
          height={250}
          pt={20}
          pb={20}
          onPress={() => this.onSelectTemplate(item)}>
          <H4 weight="bold">{item.title}</H4>
          <H4 weight="bold">{item.duration} Days</H4>
          <MCView height={70} justify="center">
            <MCView row wrap align="center" justify="center" mb={10}>
              {item.challenges.map(i => {
                return getChallengeIcon(i.category, theme.colors.text);
              })}
            </MCView>
          </MCView>
          <DividerLine width={150} />
          <MCView width={140} mt={10} height={70}>
            <MCTagsView tags={item.skills} />
          </MCView>
        </MCButton>
      </NativeCard>
    );
  };

  render() {
    const {t} = this.props;
    return (
      <MCRootView justify="flex-start" background="transparent">
        <MCContent
          contentContainerStyle={{
            alignItems: 'center',
            paddingVertical: dySize(20),
          }}>
          <NativeCard
            width={240}
            pv={10}
            ph={1}
            align="center"
            justify="center">
            <MCButton
              align="center"
              width={240}
              height={200}
              justify="center"
              onPress={() => this.onPressCustom()}>
              <MCIcon type="FontAwesome5Pro-Light" name="plus" size={50} />
              <H4 align="center">{t('button_create_challenge')}</H4>
              <MCIcon type="FontAwesome5Pro-Light" name="mountain" size={30} />
              <DividerLine width={160} mt={10} mb={20} />
              <MCTagsView
                justify="center"
                tags={[t('tools_tab_personal_development')]}
              />
            </MCButton>
          </NativeCard>
          <DividerLine width={350} mt={30} mb={20} />
          {getStringWithOutline(this.ChooseText)}
          <MCView row wrap justify="center">
            {TemplateChallenges.map(challenge => {
              return this._renderChallengeCard(challenge);
            })}
          </MCView>
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
});

const mapDispatchToProps = {
  selectChallenge: challengeActions.selectChallenge,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SelectTemplateScreen),
);
