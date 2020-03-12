import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import Collapsible from 'react-native-collapsible';
import {MCView} from 'components/styled/View';
import {H3, MCIcon} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import CardItem from './CardItem';

class ChronotypeAndPersonality extends React.Component {
  static propTypes = {
    chronotypes: PropTypes.arrayOf(Object),
    personalities: PropTypes.arrayOf(Object),
    onPressAllChronotypes: PropTypes.func,
    onPressAllPersonalities: PropTypes.func,
  };

  static defaultProps = {
    chronotypes: [],
    personalities: [],
    onPressAllChronotypes: () => undefined,
    onPressAllPersonalities: () => undefined,
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
    const {
      t,
      chronotypes,
      personalities,
      onPressAllChronotypes,
      onPressAllPersonalities,
    } = this.props;
    const {chronotypeCollapsed, personalityCollapsed} = this.state;
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
              onPress={() => onPressAllChronotypes()}>
              <H3>All Chronotypes</H3>
              <MCIcon name="ios-arrow-forward" />
            </MCButton>
          )}
          {chronotypes.length === 0 && (
            <MCButton
              bordered
              align="center"
              mt={10}
              width={320}
              onPress={() => onPressAllChronotypes()}>
              <H3>You have not added a Chronotype</H3>
            </MCButton>
          )}
        </Collapsible>
        <Collapsible collapsed={personalityCollapsed}>
          {personalities.length > 0 && (
            <MCButton
              width={320}
              row
              justify="space-between"
              onPress={() => onPressAllPersonalities()}>
              <H3>All Personalities</H3>
              <MCIcon name="ios-arrow-forward" />
            </MCButton>
          )}
          {personalities.length === 0 && (
            <MCButton
              bordered
              align="center"
              mt={10}
              width={320}
              onPress={() => onPressAllPersonalities()}>
              <H3>You have not added a Personality</H3>
            </MCButton>
          )}
        </Collapsible>
      </MCView>
    );
  }
}

export default withTranslation()(ChronotypeAndPersonality);
