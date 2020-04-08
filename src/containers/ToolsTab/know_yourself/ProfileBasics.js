import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {MCView, MCCard, MCRootView, MCContent} from 'components/styled/View';
import {H3, H4, MCIcon} from 'components/styled/Text';
import {MCHeader, MCImage} from 'components/common';
import {BasicProfileCards} from 'utils/constants';
import {MCButton} from 'components/styled/Button';
import NavigationService from 'navigation/NavigationService';
import ProfileBasicCard from './components/ProfileBasicCard';

class ProfileBasicScreen extends React.Component {
  render() {
    const {t} = this.props;
    return (
      <MCRootView justify="flex-start">
        <MCHeader title={t('tools_tab_profile_basic')} />
        <MCContent contentContainerStyle={{alignItems: 'center'}}>
          <ProfileBasicCard data={BasicProfileCards.personal} />
          <MCView row justify="space-between" width={320} overflow="visible">
            <ProfileBasicCard data={BasicProfileCards.feedback} locked />
            <ProfileBasicCard data={BasicProfileCards.behavior} locked />
          </MCView>
          <ProfileBasicCard data={BasicProfileCards.risk} locked />
          <MCView row justify="space-between" width={320} overflow="visible">
            <ProfileBasicCard data={BasicProfileCards.attach} locked />
            <ProfileBasicCard data={BasicProfileCards.approach} locked />
          </MCView>
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(ProfileBasicScreen),
);
