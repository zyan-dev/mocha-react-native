import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import Collapsible from 'react-native-collapsible';
import {MCCard, MCView} from 'components/styled/View';
import {H3, MCIcon} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {selector} from 'Redux/selectors';
import CardItem from './CardItem';

class ChronotypeAndPersonality extends React.Component {
  static propTypes = {
    chronotypes: PropTypes.arrayOf(Object),
    personalities: PropTypes.arrayOf(Object),
  };

  static defaultProps = {
    chronotypes: [],
    personalities: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      chronotypeCollapsed: true,
      personalityCollapsed: true,
    };
  }

  onToggleChronotypeCollapse = collapsed => {
    this.setState({chronotypeCollapsed: collapsed});
    if (!collapsed) {
      this.setState({personalityCollapsed: true});
    }
  };

  onTogglePersonalityCollapse = collapsed => {
    this.setState({personalityCollapsed: collapsed});
    if (!collapsed) {
      this.setState({chronotypeCollapsed: true});
    }
  };

  render() {
    const {t, chronotypes, personalities} = this.props;
    const {
      selectedFeedback,
      chronotypeCollapsed,
      personalityCollapsed,
      showFeedbackModal,
    } = this.state;
    return (
      <MCView align="center" mt={20}>
        <MCView width={340} row justify="space-between">
          <CardItem
            icon="ios-hourglass"
            text={t('profile_card_chronotype')}
            onPress={() =>
              this.onToggleChronotypeCollapse(!chronotypeCollapsed)
            }
          />
          <CardItem
            icon="ios-finger-print"
            text={t('profile_card_personality')}
            onPress={() =>
              this.onTogglePersonalityCollapse(!personalityCollapsed)
            }
          />
        </MCView>
        <Collapsible collapsed={chronotypeCollapsed}>
          {chronotypes.length > 0 && (
            <MCButton
              width={320}
              row
              justify="space-between"
              onPress={() => {}}>
              <H3>All Chronotypes</H3>
              <MCIcon name="ios-arrow-forward" />
            </MCButton>
          )}
          {chronotypes.length === 0 && (
            <MCCard align="center" mt={10} width={320}>
              <H3>You have not added a Chronotype</H3>
            </MCCard>
          )}
        </Collapsible>
        <Collapsible collapsed={personalityCollapsed}>
          {personalities.length > 0 && (
            <MCButton
              width={320}
              row
              justify="space-between"
              onPress={() => {}}>
              <H3>All Personalities</H3>
              <MCIcon name="ios-arrow-forward" />
            </MCButton>
          )}
          {personalities.length === 0 && (
            <MCCard align="center" mt={10} width={320}>
              <H3>You have not added a Personality</H3>
            </MCCard>
          )}
        </Collapsible>
      </MCView>
    );
  }
}

const mapStateToProps = state => ({
  values: selector.reflections.getUserValues(state),
});

export default withTranslation()(
  connect(mapStateToProps, undefined)(ChronotypeAndPersonality),
);
