import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import * as _ from 'lodash';
import i18next from 'i18next';
import {challengeActions} from 'Redux/actions';
import {MCTagsView, MCIcon} from 'components/common';
import {H3} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {dySize} from 'utils/responsive';
import {getStringWithOutline} from 'services/operators';
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

  renderChallengeIcon = category => {
    const key = category.split('_')[0];
    return (
      <MCIcon type="FontAwesome5Pro-Light" name={ChallengeIconData[key]} />
    );
  };

  _renderChallengeCard = item => {
    return (
      <NativeCard
        align="center"
        width={160}
        pv={1}
        ph={1}
        mr={6}
        ml={6}
        mt={15}>
        <MCButton
          align="center"
          width={160}
          height={220}
          pt={20}
          pb={20}
          onPress={() => this.onSelectTemplate(item)}>
          <H3 weight="bold">{item.title}</H3>
          <H3 weight="bold">{item.duration} Days</H3>
          <MCView row align="center" justify="center" mb={10}>
            {item.challenges.map(i => {
              return this.renderChallengeIcon(i.category);
            })}
          </MCView>
          <DividerLine width={150} />
          <MCView width={150} mt={10} height={70}>
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
        {/* <FlatList
          contentContainerStyle={{
            width: dySize(375),
            paddingHorizontal: dySize(15),
          }}
          data={[{index: 0, custom: true}].concat(TemplateChallenges)}
          renderItem={this._renderChallengeCard}
          keyExtractor={item => item.index}
          numColumns={2}
        /> */}

        <MCContent
          contentContainerStyle={{
            alignItems: 'center',
            paddingVertical: dySize(20),
          }}>
          <NativeCard width={240} pv={1} ph={1} align="center" justify="center">
            <MCButton
              align="center"
              width={240}
              height={200}
              justify="center"
              onPress={() => this.onPressCustom()}>
              <MCIcon type="FontAwesome5Pro-Light" name="plus" size={50} />
              <H3 align="center">{t('button_create_challenge')}</H3>
              <MCIcon type="FontAwesome5Pro-Light" name="mountain" size={30} />
              <DividerLine width={160} mt={10} mb={20} />
              <MCTagsView
                justify="center"
                tags={[t('tools_tab_personal_development')]}
              />
            </MCButton>
          </NativeCard>
          <DividerLine width={350} mt={30} mb={20} />
          {getStringWithOutline(this.ChooseText, {bigSize: true})}
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

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  selectChallenge: challengeActions.selectChallenge,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SelectTemplateScreen),
);
