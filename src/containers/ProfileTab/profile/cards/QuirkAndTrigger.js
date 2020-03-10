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

class QuirkAndTrigger extends React.Component {
  static propTypes = {
    quirks: PropTypes.arrayOf(Object),
    triggers: PropTypes.arrayOf(Object),
  };

  static defaultProps = {
    quirks: [],
    triggers: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      quirkCollapsed: true,
      triggerCollapsed: true,
    };
  }

  onToggleQuirkCollapse = collapsed => {
    this.setState({quirkCollapsed: collapsed});
    if (!collapsed) {
      this.setState({triggerCollapsed: true});
    }
  };

  onToggleTriggerCollapse = collapsed => {
    this.setState({triggerCollapsed: collapsed});
    if (!collapsed) {
      this.setState({quirkCollapsed: true});
    }
  };

  render() {
    const {t, quirks, triggers} = this.props;
    const {quirkCollapsed, triggerCollapsed} = this.state;
    return (
      <MCView align="center" mt={20}>
        <MCView width={340} row justify="space-between">
          <CardItem
            icon="ios-bowtie"
            text={t('profile_card_quirk')}
            onPress={() => this.onToggleQuirkCollapse(!quirkCollapsed)}
          />
          <CardItem
            icon="ios-warning"
            text={t('profile_card_trigger')}
            onPress={() => this.onToggleTriggerCollapse(!triggerCollapsed)}
          />
        </MCView>
        <Collapsible collapsed={quirkCollapsed}>
          {quirks.length > 0 && (
            <MCButton
              width={320}
              row
              justify="space-between"
              onPress={() => {}}>
              <H3>All quirks</H3>
              <MCIcon name="ios-arrow-forward" />
            </MCButton>
          )}
          {quirks.length === 0 && (
            <MCCard align="center" mt={10} width={320}>
              <H3>You have not added a Quirk</H3>
            </MCCard>
          )}
        </Collapsible>
        <Collapsible collapsed={triggerCollapsed}>
          {triggers.length > 0 && (
            <MCButton
              width={320}
              row
              justify="space-between"
              onPress={() => {}}>
              <H3>All Triggers</H3>
              <MCIcon name="ios-arrow-forward" />
            </MCButton>
          )}
          {triggers.length === 0 && (
            <MCCard align="center" mt={10} width={320}>
              <H3>You have not added a Trigger</H3>
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
  connect(mapStateToProps, undefined)(QuirkAndTrigger),
);
