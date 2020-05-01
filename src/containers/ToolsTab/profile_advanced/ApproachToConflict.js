import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import * as _ from 'lodash';
import {selector} from 'Redux/selectors';
import {reflectionActions} from 'Redux/actions';
import {MCRootView, MCContent, MCView} from 'components/styled/View';
import {H3, H4, ErrorText, MCTextInput} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCHeader, MCIcon} from 'components/common';
import {dySize} from 'utils/responsive';
import NavigationService from 'navigation/NavigationService';
import {FutureSvg} from 'assets/svgs';
import {BoxingSvg} from '../../../assets/svgs';

class ApproachToConflictScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
    };
  }

  isNew = false;
  componentWillMount() {
    const {
      approach,
      selectReflection,
      setInitialReflection,
      reflectionDraft,
    } = this.props;
    if (approach) {
      selectReflection(approach);
    } else {
      this.isNew = true;
      if (reflectionDraft['Approach']) {
        selectReflection(reflectionDraft['Approach']);
      } else {
        setInitialReflection('approach');
      }
    }
  }

  onPressBack = () => {
    const {selectedReflection, saveReflectionDraft} = this.props;
    if (this.isNew) {
      saveReflectionDraft({
        [selectedReflection.type]: selectedReflection,
      });
    }
    NavigationService.goBack();
  };

  render() {
    const {submitted, newItem} = this.state;
    const {t, theme, selectedReflection, updateSelectedReflection} = this.props;
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          hasRight
          title={t('tools_tab_approach_to_conflict')}
          headerIcon={<BoxingSvg size={25} />}
          onPressBack={() => this.onPressBack()}
          rightIcon="cloud-upload-alt"
          onPressRight={() => {}}
        />
        <MCContent contentContainerStyle={{padding: dySize(20)}}>
          <H4>{t('coming soon')}</H4>
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  selectedReflection: state.reflectionReducer.selectedReflection,
  approach: selector.reflections.findMySpecialReflections(state, 'Approach'),
  reflectionDraft: state.reflectionReducer.draft,
});

const mapDispatchToProps = {
  selectReflection: reflectionActions.selectReflection,
  setInitialReflection: reflectionActions.setInitialReflection,
  updateSelectedReflection: reflectionActions.updateSelectedReflection,
  addOrUpdateReflection: reflectionActions.addOrUpdateReflection,
  saveReflectionDraft: reflectionActions.saveReflectionDraft,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ApproachToConflictScreen),
);
