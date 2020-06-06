import React from 'react';
import {KeyboardAvoidingView} from 'react-native';
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
import {SirenOnSvg} from 'assets/svgs';

class EditTriggersScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
    };
  }

  isNew = false;
  componentWillMount() {
    const {
      triggers,
      selectReflection,
      setInitialReflection,
      reflectionDraft,
    } = this.props;
    if (triggers) {
      selectReflection(triggers);
    } else {
      this.isNew = true;
      if (reflectionDraft['Triggers']) {
        selectReflection(reflectionDraft['Triggers']);
      } else {
        setInitialReflection('triggers');
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

  onPressSubmit = () => {
    this.setState({submitted: true});
    if (!this.validateOptions()) return;
    const {
      addOrUpdateReflection,
      selectedReflection,
      updateSelectedReflection,
    } = this.props;
    updateSelectedReflection({
      options: selectedReflection.data.options.filter(i => i.length > 0),
    });
    setTimeout(() => {
      addOrUpdateReflection();
    });
  };

  onChangeTrigger = (text, index) => {
    const {selectedReflection, updateSelectedReflection} = this.props;
    const options = _.get(selectedReflection, ['data', 'options'], []);
    if (text === '' && index > 0) return;
    options[index] = text;
    updateSelectedReflection({options});
  };

  onAddorRemoveTrigger = index => {
    const {selectedReflection, updateSelectedReflection} = this.props;
    const options = _.get(selectedReflection, ['data', 'options'], []);
    if (options[index].length === 0) return;
    if (index === options.length - 1) options.push('');
    else options.splice(index, 1);
    updateSelectedReflection({options});
  };

  validateOptions = () => {
    const {selectedReflection} = this.props;
    const options = _.get(selectedReflection, ['data', 'options'], []);
    return options.filter(i => i.length > 0).length > 0;
  };

  render() {
    const {submitted} = this.state;
    const {t, theme, selectedReflection, updateSelectedReflection} = this.props;
    const options = _.get(selectedReflection, ['data', 'options'], []);
    // if (!main.length || !others.length) return null;
    console.log({selectedReflection});
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          hasRight
          title={t('title_triggers')}
          headerIcon={<SirenOnSvg size={25} color={theme.colors.text} />}
          onPressBack={() => this.onPressBack()}
          rightIcon="cloud-upload-alt"
          onPressRight={() => this.onPressSubmit()}
        />
        <KeyboardAvoidingView
          keyboardVerticalOffset={-100}
          behavior={'padding'}>
          <MCContent
            enableResetScrollToCoords={false}
            contentContainerStyle={{padding: dySize(20)}}>
            <H4>{t('tools_tab_triggers_title')}</H4>
            {submitted && !this.validateOptions() && (
              <ErrorText>{t('error_input_add_nothing')}</ErrorText>
            )}
            {options.map((option, index) => {
              return (
                <MCView row align="center" width={335} key={index}>
                  <MCView style={{flex: 1}}>
                    <MCTextInput
                      style={{width: '100%'}}
                      value={option}
                      onChangeText={text => this.onChangeTrigger(text, index)}
                      autoFocus={index > 0 && index === options.length - 1}
                    />
                  </MCView>
                  <MCButton onPress={() => this.onAddorRemoveTrigger(index)}>
                    <MCView align="center">
                      <MCIcon
                        type="FontAwesome5Pro-Light"
                        name={
                          index === options.length - 1
                            ? 'plus-circle'
                            : 'minus-circle'
                        }
                      />
                    </MCView>
                  </MCButton>
                </MCView>
              );
            })}
          </MCContent>
        </KeyboardAvoidingView>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  selectedReflection: selector.reflections.getSelectedReflection(state),
  triggers: selector.reflections.findMySpecialReflections(state, 'Triggers'),
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
  )(EditTriggersScreen),
);
