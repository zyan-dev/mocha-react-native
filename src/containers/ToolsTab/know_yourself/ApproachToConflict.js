import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {selector} from 'Redux/selectors';
import {reflectionActions} from 'Redux/actions';
import {MCRootView, MCContent, MCView, MCCard} from 'components/styled/View';
import {H3, H4, H5, MCIcon} from 'components/styled/Text';
import {MCHeader} from 'components/common';
import {BehaviorPreferences} from 'utils/constants';
import {dySize} from 'utils/responsive';

class ApproachToConflictScreen extends React.Component {
  componentWillMount() {
    const {approach, selectReflection, setInitialReflection} = this.props;
    if (approach) {
      selectReflection(approach);
    } else {
      setInitialReflection('approach');
    }
  }

  render() {
    const {t, theme, selectedReflection} = this.props;
    if (!selectedReflection || !selectedReflection.data) return null;
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          hasRight
          title={`${t('practice')} 4 - 2`}
          rightText={t('done')}
          onPressRight={() => this.props.addOrUpdateReflection()}
        />
        <MCContent contentContainerStyle={{alignItems: 'center'}}>
          <H3>{t('coming soon')}</H3>
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  selectedReflection: state.reflectionReducer.selectedReflection,
  approach: selector.reflections.findMySpecialReflections(state, 'Approach'),
});

const mapDispatchToProps = {
  selectReflection: reflectionActions.selectReflection,
  setInitialReflection: reflectionActions.setInitialReflection,
  updateSelectedReflection: reflectionActions.updateSelectedReflection,
  addOrUpdateReflection: reflectionActions.addOrUpdateReflection,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ApproachToConflictScreen),
);
