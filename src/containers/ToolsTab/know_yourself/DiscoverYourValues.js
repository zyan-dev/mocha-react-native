import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import CardStack, {Card} from 'react-native-card-stack-swiper';
import {selector} from 'Redux/selectors';
import {reflectionActions} from 'Redux/actions';
import {MCRootView, MCContent, MCView} from 'components/styled/View';
import {
  H3,
  H4,
  H5,
  ErrorText,
  MCEmptyText,
  MCIcon,
} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCHeader} from 'components/common';
import {dySize} from 'utils/responsive';
import NavigationService from 'navigation/NavigationService';
import {DiscoverValues} from 'utils/constants';

class DiscoverValueScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      swipeXOffset: 0,
      swiped: [],
      coreValues: [],
      selectedValues: [], // important values
      step: 0,
      submitted: false,
      scrollEnabled: true,
    };
  }

  getLessFontSize = () => {
    const {swipeXOffset} = this.state;
    if (swipeXOffset >= 0) return dySize(20);
    return Math.min(60, 20 + Math.abs(swipeXOffset / 2));
  };

  getVeryFontSize = () => {
    const {swipeXOffset} = this.state;
    if (swipeXOffset <= 0) return dySize(20);
    return Math.min(60, 20 + swipeXOffset / 2);
  };

  _onSwiped = index => {
    const {swipeXOffset} = this.state;
    console.log({index, swipeXOffset});
    // this.setState({swipeXOffset: 0});
  };

  _onSwipedLeft = index => {
    const {swiped} = this.state;
    swiped.push({
      value: DiscoverValues[index],
      isLess: true,
    });
    this.setState({swiped});
  };

  _onSwipedRight = index => {
    const {swiped} = this.state;
    swiped.push({
      value: DiscoverValues[index],
      isLess: false,
    });
    this.setState({swiped});
  };

  _onPressBack = () => {
    const {swiped} = this.state;
    if (swiped.length === 0) return;
    const fromLeft = swiped[swiped.length - 1].isLess;
    if (fromLeft) this.swiper.goBackFromLeft();
    else this.swiper.goBackFromRight();
    swiped.splice(-1, 1);
    this.setState({swiped});
  };

  _onPressRefresh = () => {
    const {swiped} = this.state;
    for (let i = 0; i < swiped.length; i++) {
      this.swiper.goBackFromTop();
    }
    this.setState({swiped: []});
  };

  _onSwipe = x => {
    this.setState({swipeXOffset: x, scrollEnabled: false});
  };

  _onSwipeEnd = () => {
    this.setState({swipeXOffset: 0, scrollEnabled: true});
  };

  onPressHeaderNext = () => {
    const {step} = this.state;
    if (step) {
      console.log(this.state.selectedValues);
      console.log(this.state.coreValues);
    } else {
      this.onPressNext();
    }
  };

  onPressHeaderBack = () => {
    const {step} = this.state;
    if (step) {
      this.setState({step: 0, swiped: []});
    } else {
      NavigationService.goBack();
    }
  };

  onPressNext = () => {
    this.setState({step: 1});
    const {swiped} = this.state;
    const filtered = swiped.filter(value => !value.isLess);
    this.setState({selectedValues: filtered.map(value => value.value)});
  };

  onPressCoreItem = value => {
    const {coreValues} = this.state;
    const index = coreValues.indexOf(value);
    if (index < 0) coreValues.push(value);
    else coreValues.splice(index, 1);
    this.setState({coreValues});
  };

  onPressSubmit = () => {
    this.setState({submitted: true});
    if (!this.validateOptions()) return;
    this.props.selectReflection({
      type: 'CoreValues',
      data: {
        selected: this.state.selectedValues,
        core: this.state.coreValues,
      },
    });
    setTimeout(() => {
      this.props.addOrUpdateReflection();
    });
  };

  validateOptions = () => {
    return this.state.coreValues.length > 0;
  };

  render() {
    const {swiped, step, coreValues, submitted, scrollEnabled} = this.state;
    const {t, theme} = this.props;
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          hasRight={step === 1}
          title={`${t('practice')} 5`}
          rightIcon={step ? 'cloud-upload-alt' : 'arrow-right'}
          onPressBack={() => this.onPressHeaderBack()}
          onPressRight={() => this.onPressSubmit()}
        />
        <MCContent
          scrollEnabled={scrollEnabled}
          contentContainerStyle={{alignItems: 'center'}}>
          <MCView row justify="center" align="center">
            <H3>{t('tools_tab_discover_your_values')}</H3>
            <MCIcon type="FontAwesome5" name="key" size={30} />
          </MCView>
          {step === 0 ? (
            <>
              <H4>{t('tools_tab_discover_your_values_question')}</H4>
              <MCView row align="center" width={375} height={80}>
                <MCView style={{flex: 1}} align="center">
                  <MCIcon
                    type="FontAwesome"
                    name="thumbs-down"
                    size={this.getLessFontSize()}
                  />
                </MCView>
                <MCIcon type="FontAwesome" name="arrows-h" size={40} />
                <MCView style={{flex: 1}} align="center">
                  <MCIcon
                    type="FontAwesome"
                    name="thumbs-up"
                    size={this.getVeryFontSize()}
                  />
                </MCView>
              </MCView>
              <MCView align="center">
                <CardStack
                  style={{
                    width: dySize(375),
                    height: dySize(350),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  ref={swiper => (this.swiper = swiper)}
                  secondCardZoom={0.9}
                  onSwipe={x => this._onSwipe(x)}
                  onSwiped={this._onSwiped}
                  onSwipedLeft={this._onSwipedLeft}
                  onSwipedRight={this._onSwipedRight}
                  onSwipeEnd={this._onSwipeEnd}
                  renderNoMoreCards={() => (
                    <>
                      <MCEmptyText>
                        {t('tools_tab_discover_your_values_no_more_cards')}
                      </MCEmptyText>
                      <MCButton
                        bordered
                        pl={20}
                        pr={20}
                        onPress={() => this._onPressRefresh()}>
                        <MCEmptyText>
                          {t('tools_tab_discover_your_values_refresh')}
                        </MCEmptyText>
                      </MCButton>
                      <MCEmptyText>{t('add_goal_manage_or')}</MCEmptyText>
                      <MCButton
                        bordered
                        pl={20}
                        pr={20}
                        onPress={() => this.onPressNext()}>
                        <MCEmptyText>
                          {t('tools_tab_discover_your_values_go_next')}
                        </MCEmptyText>
                      </MCButton>
                    </>
                  )}
                  verticalSwipe={false}
                  disableBottomSwipe
                  disableTopSwipe>
                  {DiscoverValues.map(value => (
                    <Card
                      key={value.value}
                      style={{
                        width: dySize(200),
                        height: dySize(300),
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 1,
                        borderColor: 'white',
                        backgroundColor: theme.colors.background,
                        borderRadius: 10,
                        padding: dySize(10),
                      }}>
                      <H5>
                        {t(`value_category_${value.category}`).toUpperCase()}
                      </H5>
                      <H4 weight="bold">
                        {t(`tools_tab_value_${value.value}`)}
                      </H4>
                      <MCView style={{flex: 1}} align="center" justify="center">
                        <MCIcon
                          type="FontAwesome5"
                          name={value.icon}
                          size={60}
                        />
                      </MCView>
                      <H5>{t(`value_name_${value.name}`).toUpperCase()}</H5>
                      <H5 weight="italic" align="center">
                        {t(`value_name_${value.name}_description`)}
                      </H5>
                    </Card>
                  ))}
                </CardStack>
              </MCView>
              {swiped.length > 0 && (
                <MCButton
                  row
                  align="center"
                  bordered
                  pl={20}
                  pr={20}
                  onPress={() => this._onPressBack()}>
                  <MCIcon type="FontAwesome5" name="undo" />
                  <H4 ml={10}>
                    {t('tools_tab_discover_your_values_swipe_undo')}
                  </H4>
                </MCButton>
              )}
            </>
          ) : (
            <MCContent contentContainerStyle={{padding: dySize(20)}}>
              <H4>{t('tools_tab_core_values_explain')}</H4>
              {!this.validateOptions() && submitted && (
                <ErrorText>{t('error_input_select_empty')}</ErrorText>
              )}
              <MCView row wrap justify="space-between" mt={20}>
                {swiped.map(item => {
                  if (item.isLess) return null;
                  const value = item.value;
                  return (
                    <MCButton
                      key={value}
                      bordered
                      width={160}
                      height={100}
                      br={6}
                      mb={10}
                      align="center"
                      justify="center"
                      style={{
                        borderColor:
                          coreValues.indexOf(value) < 0
                            ? theme.colors.border
                            : theme.colors.outline,
                      }}
                      onPress={() => this.onPressCoreItem(value)}>
                      <H3
                        weight={
                          coreValues.indexOf(value) < 0 ? 'regular' : 'bold'
                        }
                        align="center"
                        color={
                          coreValues.indexOf(value) < 0
                            ? theme.colors.text
                            : theme.colors.outline
                        }>
                        {t(`tools_tab_value_${value.value}`)}
                      </H3>
                    </MCButton>
                  );
                })}
              </MCView>
            </MCContent>
          )}
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
  )(DiscoverValueScreen),
);
