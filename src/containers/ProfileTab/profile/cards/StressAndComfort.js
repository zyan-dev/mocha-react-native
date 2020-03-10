import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import Collapsible from 'react-native-collapsible';
import {MCCard, MCView} from 'components/styled/View';
import {H3, MCIcon} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {selector} from 'Redux/selectors';

class StressAndComfort extends React.Component {
  static propTypes = {
    stress_and_comforts: PropTypes.arrayOf(Object),
  };

  static defaultProps = {
    stress_and_comforts: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
    };
  }

  onToggleCollapse = collapsed => {
    this.setState({collapsed});
  };

  render() {
    const {t, stress_and_comforts} = this.props;
    const {collapsed} = this.state;
    return (
      <MCView align="center" mt={20}>
        <MCView width={340} row justify="space-between">
          <MCButton onPress={() => this.onToggleCollapse(!collapsed)}>
            <MCCard width={320} height={200} align="center">
              <MCIcon name="ios-thunderstorm" size={40} padding={15} />
              <MCView justify="center" align="center" style={{flex: 1}}>
                <H3>{t('profile_card_stress_and_comfort')}</H3>
                <H3>{t('profile_card_stress_and_comfort_description')}</H3>
              </MCView>
            </MCCard>
          </MCButton>
        </MCView>
        <Collapsible collapsed={collapsed}>
          {stress_and_comforts.length > 0 && (
            <MCButton
              width={320}
              row
              justify="space-between"
              onPress={() => {}}>
              <H3>All Answers</H3>
              <MCIcon name="ios-arrow-forward" />
            </MCButton>
          )}
          {stress_and_comforts.length === 0 && (
            <MCCard align="center" mt={10} width={320}>
              <H3>You have not added any answer</H3>
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
  connect(mapStateToProps, undefined)(StressAndComfort),
);
