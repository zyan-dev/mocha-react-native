import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import Collapsible from 'react-native-collapsible';
import {MCView} from 'components/styled/View';
import {H3, MCIcon} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import CardItem from './CardItem';

class LanguageAndRisk extends React.Component {
  static propTypes = {
    languages: PropTypes.arrayOf(Object),
    risks: PropTypes.arrayOf(Object),
    onPressAllLanguages: PropTypes.func,
    onPressAllRisks: PropTypes.func,
  };

  static defaultProps = {
    languages: [],
    risks: [],
    onPressAllLanguages: () => undefined,
    onPressAllRisks: () => undefined,
  };

  constructor(props) {
    super(props);
    this.state = {
      languageCollapsed: true,
      riskCollapsed: true,
    };
  }

  onToggleLanguageCollapse = collapsed => {
    this.setState({languageCollapsed: collapsed});
    if (!collapsed) {
      this.setState({riskCollapsed: true});
    }
  };

  onToggleRiskCollapse = collapsed => {
    this.setState({riskCollapsed: collapsed});
    if (!collapsed) {
      this.setState({languageCollapsed: true});
    }
  };

  render() {
    const {
      t,
      languages,
      risks,
      onPressAllLanguages,
      onPressAllRisks,
    } = this.props;
    const {languageCollapsed, riskCollapsed} = this.state;
    return (
      <MCView align="center" mt={20}>
        <MCView width={340} row justify="space-between">
          <CardItem
            icon="ios-heart"
            text={t('profile_card_language')}
            onPress={() => this.onToggleLanguageCollapse(!languageCollapsed)}
          />
          <CardItem
            icon="ios-american-football"
            text={t('profile_card_risk')}
            onPress={() => this.onToggleRiskCollapse(!riskCollapsed)}
          />
        </MCView>
        <Collapsible collapsed={languageCollapsed}>
          {languages.length > 0 && (
            <MCButton
              width={320}
              row
              justify="space-between"
              onPress={() => onPressAllLanguages()}>
              <H3>All languages</H3>
              <MCIcon name="ios-arrow-forward" />
            </MCButton>
          )}
          {languages.length === 0 && (
            <MCButton
              bordered
              align="center"
              mt={10}
              width={320}
              onPress={() => onPressAllLanguages()}>
              <H3>Please add a language you love.</H3>
            </MCButton>
          )}
        </Collapsible>
        <Collapsible collapsed={riskCollapsed}>
          {risks.length > 0 && (
            <MCButton
              width={320}
              row
              justify="space-between"
              onPress={() => onPressAllRisks()}>
              <H3>All risks</H3>
              <MCIcon name="ios-arrow-forward" />
            </MCButton>
          )}
          {risks.length === 0 && (
            <MCButton
              bordered
              align="center"
              mt={10}
              width={320}
              onPress={() => onPressAllRisks()}>
              <H3>You have not added a risk</H3>
            </MCButton>
          )}
        </Collapsible>
      </MCView>
    );
  }
}

export default withTranslation()(LanguageAndRisk);
