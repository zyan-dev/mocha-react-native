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

class DreamScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      newItem: '',
    };
  }

  isNew = false;
  componentWillMount() {
    const {
      dream,
      selectReflection,
      setInitialReflection,
      reflectionDraft,
    } = this.props;
    if (dream) {
      selectReflection(dream);
    } else {
      this.isNew = true;
      if (reflectionDraft['Dreams']) {
        selectReflection(reflectionDraft['Dreams']);
      } else {
        setInitialReflection('dreams');
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

  removeItem = other => {
    const {others} = this.props.selectedReflection.data;
    const index = others.indexOf(other);
    others.splice(index, 1);
    this.props.updateSelectedReflection({others});
  };

  addNewItem = () => {
    const {newItem} = this.state;
    const {others} = this.props.selectedReflection.data;
    if (newItem.length === 0) return;
    const index = others.indexOf(newItem);
    if (index > -1) return;
    others.push(newItem);
    this.props.updateSelectedReflection({others});
    this.setState({newItem: ''});
  };

  updateItem = (item, text) => {
    const {newItem} = this.state;
    const {others} = this.props.selectedReflection.data;
    if (text.length === 0) return;
    const findIndex = others.indexOf(item);
    others[findIndex] = text;
    this.props.updateSelectedReflection({others});
  };

  onPressSubmit = () => {
    this.setState({submitted: true});
    if (!this.validateMain()) return;
    if (!this.validateOthers()) return;
    const {newItem} = this.state;
    const {addOrUpdateReflection, updateSelectedReflection} = this.props;
    const {others} = this.props.selectedReflection.data;
    if (newItem.length > 0) {
      others.push(newItem);
      updateSelectedReflection({others});
      this.setState({newItem: false});
    }
    setTimeout(() => {
      addOrUpdateReflection();
    });
  };

  validateMain = () => {
    const {selectedReflection} = this.props;
    const main = _.get(selectedReflection, ['data', 'main'], '');
    return main.length > 0;
  };

  validateOthers = () => {
    const {selectedReflection} = this.props;
    const others = _.get(selectedReflection, ['data', 'others'], []);
    return others.length > 0 || this.state.newItem.length > 0;
  };

  render() {
    const {submitted, newItem} = this.state;
    const {t, theme, selectedReflection, updateSelectedReflection} = this.props;
    const main = _.get(selectedReflection, ['data', 'main'], '');
    const others = _.get(selectedReflection, ['data', 'others'], []);
    // if (!main.length || !others.length) return null;
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          hasRight
          title={t('tools_tab_dreams')}
          headerIcon={<FutureSvg size={25} />}
          onPressBack={() => this.onPressBack()}
          rightIcon="cloud-upload-alt"
          rightText={t('button_save')}
          rightIconColor={theme.colors.outline}
          onPressRight={() => this.onPressSubmit()}
        />
        <MCContent contentContainerStyle={{padding: dySize(20)}}>
          <H4>{t('tools_tab_dreams_main_title')}</H4>
          {submitted && !this.validateMain() && (
            <ErrorText>{t('error_input_select_empty')}</ErrorText>
          )}
          <MCTextInput
            value={main}
            onChangeText={text => updateSelectedReflection({main: text})}
          />
          <MCView row align="center" mt={30} width={350}>
            <H4>
              {t('tools_tab_dreams_others_title')}
              <MCIcon type="FontAwesome5Pro" name="island-tropical" />
            </H4>
          </MCView>
          {submitted && !this.validateOthers() && (
            <ErrorText>{t('error_input_select_empty')}</ErrorText>
          )}
          {others.map((other, index) => {
            return (
              <MCView row align="center" key={index} mb={10}>
                <MCTextInput
                  style={{flex: 1}}
                  value={other}
                  onChangeText={text => this.updateItem(other, text)}
                />
                <MCButton onPress={() => this.removeItem(other)}>
                  <MCIcon name="ios-remove" />
                </MCButton>
              </MCView>
            );
          })}
          <MCView row align="center">
            <MCTextInput
              style={{flex: 1}}
              value={newItem}
              onChangeText={text => this.setState({newItem: text})}
              blurOnSubmit={false}
              onSubmitEditing={() => this.addNewItem()}
            />
            <MCButton onPress={() => this.addNewItem()}>
              <MCIcon name="ios-add" />
            </MCButton>
          </MCView>
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  selectedReflection: selector.reflections.getSelectedReflection(state),
  dream: selector.reflections.findMySpecialReflections(state, 'Dreams'),
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
  )(DreamScreen),
);
