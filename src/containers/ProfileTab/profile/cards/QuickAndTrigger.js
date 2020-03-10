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

class QuickAndTrigger extends React.Component {
  static propTypes = {
    quicks: PropTypes.arrayOf(Object),
    triggers: PropTypes.arrayOf(Object),
  };

  static defaultProps = {
    quicks: [],
    triggers: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      quickCollapsed: true,
      triggerCollapsed: true,
    };
  }

  onToggleQuickCollapse = collapsed => {
    this.setState({quickCollapsed: collapsed});
    if (!collapsed) {
      this.setState({triggerCollapsed: true});
    }
  };

  onToggleTriggerCollapse = collapsed => {
    this.setState({triggerCollapsed: collapsed});
    if (!collapsed) {
      this.setState({quickCollapsed: true});
    }
  };

  render() {
    const {t, quicks, triggers} = this.props;
    const {quickCollapsed, triggerCollapsed} = this.state;
    return (
      <MCView align="center" mt={20}>
        <MCView width={340} row justify="space-between">
          <CardItem
            icon="ios-bowtie"
            text={t('profile_card_quick')}
            onPress={() => this.onToggleQuickCollapse(!quickCollapsed)}
          />
          <CardItem
            icon="ios-warning"
            text={t('profile_card_trigger')}
            onPress={() => this.onToggleTriggerCollapse(!triggerCollapsed)}
          />
        </MCView>
        <Collapsible collapsed={quickCollapsed}>
          {quicks.length > 0 && (
            <MCButton
              width={320}
              row
              justify="space-between"
              onPress={() => {}}>
              <H3>All Quicks</H3>
              <MCIcon name="ios-arrow-forward" />
            </MCButton>
          )}
          {quicks.length === 0 && (
            <MCCard align="center" mt={10} width={320}>
              <H3>You have not added a Quick</H3>
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
  connect(mapStateToProps, undefined)(QuickAndTrigger),
);
