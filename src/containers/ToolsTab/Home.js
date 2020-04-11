import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {MCView, MCCard, MCRootView, MCContent} from 'components/styled/View';
import {H3, H4, MCIcon} from 'components/styled/Text';
import {MCHeader, MCImage} from 'components/common';
import {AddReflectionSections} from 'utils/constants';
import {MCButton} from 'components/styled/Button';
import NavigationService from 'navigation/NavigationService';

class AddReflectionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPressCard = (section) => {
    NavigationService.navigate(section.navigateTo);
  };

  renderSectionTitle = (section) => {
    const {t} = this.props;
    let str = t(`add_reflection_${section.key}`);
    const snippets = [];
    let boldWord = '';
    let boldIndex = 0;
    section.boldWordKeys.map((key) => {
      boldWord = t(`add_reflection_${section.key}_bold_${key}`);
      boldIndex = str.indexOf(boldWord);
      if (boldIndex > 0) {
        snippets.push(str.substr(0, boldIndex));
      }
      snippets.push(
        <H4 weight="bold">{str.substr(boldIndex, boldWord.length)}</H4>,
      );
      str = str.substr(boldIndex + boldWord.length);
    });
    snippets.push(str);
    return (
      <MCView row>
        <H4>{snippets.map((snippet) => snippet)}</H4>
      </MCView>
    );
  };

  render() {
    const {
      t,
      profile: {userToken},
    } = this.props;
    return (
      <MCRootView justify="flex-start">
        <MCContent contentContainerStyle={{alignItems: 'center'}}>
          <H3 weight="bold" align="center" mt={10}>
            {t('tools_tab_profile_basic')}
          </H3>
          <H4 align="center" mb={10}>
            {t('tools_tab_build_profile')}
          </H4>
          <MCButton
            width={340}
            pb={20}
            mb={20}
            align="center"
            bordered
            onPress={() => NavigationService.navigate('KnowYourSelf')}>
            <H3 weight="bold" align="center" mt={10}>
              {t('tools_tab_start_here')}
            </H3>
            <H4 align="center" mb={10}>
              {t('tools_tab_know_yourself')}
            </H4>
            <MCIcon type="FontAwesome5" name="child" size={50} />
          </MCButton>
          {AddReflectionSections.map((section) => {
            if (!userToken && section.registerRequired) return null;
            return (
              <MCButton
                width={350}
                key={section.key}
                onPress={() => this.onPressCard(section)}>
                <MCCard row p={10}>
                  <MCView style={{flex: 1}} height={60} justify="space-between">
                    {this.renderSectionTitle(section)}
                    <MCView row align="center">
                      <MCView row style={{flex: 1}}>
                        <MCIcon
                          type="MaterialCommunityIcons"
                          name="star-four-points-outline"
                        />
                        <H4>{`${section.points} ${t(
                          `unit_${section.unit}`,
                        )}`}</H4>
                      </MCView>
                      <MCView row style={{flex: 1}}>
                        <MCIcon type="FontAwesome" name="clock-o" />
                        <H4>{`${section.duration} ${t('unit_min')}`}</H4>
                      </MCView>
                    </MCView>
                  </MCView>
                  <MCImage width={60} height={60} image={section.icon} />
                </MCCard>
              </MCButton>
            );
          })}
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profileReducer,
});

const mapDispatchToProps = {};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(AddReflectionScreen),
);