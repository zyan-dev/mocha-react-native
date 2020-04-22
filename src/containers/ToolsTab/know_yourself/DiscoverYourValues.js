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
import {MCHeader, MCImage, MCModal} from 'components/common';
import {dySize, CURRENT_HEIGHT} from 'utils/responsive';
import NavigationService from 'navigation/NavigationService';
import {DiscoverValues} from 'utils/constants';

const cardViewHeight = CURRENT_HEIGHT - dySize(400);

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
      showHowModal: false,
    };
  }

  componentWillMount() {
    const {coreValues, selectReflection, setInitialReflection} = this.props;
    if (coreValues) {
      selectReflection(coreValues);
    } else {
      setInitialReflection('core_values');
    }
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

  _onSwipedTop = index => {
    const {swiped} = this.state;
    swiped.push({
      value: DiscoverValues[index],
      how: 2,
    });
    this.setState({swiped});
  };

  _onSwipedLeft = index => {
    const {swiped} = this.state;
    swiped.push({
      value: DiscoverValues[index],
      how: 0,
    });
    this.setState({swiped});
  };

  _onSwipedRight = index => {
    const {swiped} = this.state;
    swiped.push({
      value: DiscoverValues[index],
      how: 1,
    });
    this.setState({swiped});
  };

  _onPressBack = () => {
    const {swiped} = this.state;
    if (swiped.length === 0) return;
    const how = swiped[swiped.length - 1].how;
    if (how === 0) this.swiper.goBackFromLeft();
    else if (how === 1) this.swiper.goBackFromRight();
    else this.swiper.goBackFromTop();
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

  onPressHeaderBack = () => {
    const {step} = this.state;
    if (step) {
      this.setState({step: 0, swiped: []});
    } else {
      NavigationService.goBack();
    }
  };

  _onPressHow = () => {
    this.setState({showHowModal: true});
  };

  onPressNext = () => {
    this.setState({step: 1});
    const {swiped} = this.state;
    console.log({swiped});
    const selectedValues = swiped.filter(value => value.how > 0);
    const coreValues = swiped.filter(value => value.how > 1);
    this.setState({selectedValues: selectedValues.map(value => value.value)});
    this.setState({coreValues: coreValues.map(value => value.value)});
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
      ...this.props.selectedReflection,
      data: {
        ...this.props.selectedReflection.data,
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
    const {
      swiped,
      step,
      coreValues,
      submitted,
      scrollEnabled,
      showHowModal,
      selectedValues,
      selectedReflection,
    } = this.state;
    const {t, theme} = this.props;
    console.log({selectedReflection});
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          hasRight={step === 1}
          title={`${t('practice')} 5`}
          rightIcon={step ? 'cloud-upload-alt' : 'arrow-right'}
          onPressBack={() => this.onPressHeaderBack()}
          onPressRight={() => this.onPressSubmit()}
        />
        <MCView row justify="center" align="center">
          <H3>{t('tools_tab_discover_your_values')}</H3>
          <MCIcon type="FontAwesome5" name="key" size={30} />
        </MCView>
        {step === 0 ? (
          <>
            <MCView row align="center">
              <H4>{t('tools_tab_discover_your_values_question')}</H4>
              <MCButton align="center" onPress={() => this._onPressHow()}>
                <MCIcon type="FontAwesome5" name="question-circle" />
              </MCButton>
            </MCView>
            <MCView align="center">
              <CardStack
                style={{
                  width: dySize(375),
                  height: cardViewHeight,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                ref={swiper => (this.swiper = swiper)}
                secondCardZoom={0.9}
                onSwipe={x => this._onSwipe(x)}
                onSwiped={this._onSwiped}
                onSwipedTop={this._onSwipedTop}
                onSwipedLeft={this._onSwipedLeft}
                onSwipedRight={this._onSwipedRight}
                onSwipeEnd={this._onSwipeEnd}
                verticalThreshold={dySize(90)}
                horizontalThreshold={dySize(90)}
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
                disableBottomSwipe>
                {DiscoverValues.map(value => (
                  <Card
                    key={value.value}
                    style={{
                      width: cardViewHeight * 0.6,
                      height: cardViewHeight * 0.9,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: theme.colors.border,
                      backgroundColor: theme.colors.background,
                      borderRadius: 10,
                      padding: dySize(10),
                    }}>
                    <H5>
                      {t(`value_category_${value.category}`).toUpperCase()}
                    </H5>
                    <H4 weight="bold">{t(`tools_tab_value_${value.value}`)}</H4>
                    <MCView style={{flex: 1}} align="center" justify="center">
                      {value.image && (
                        <MCImage
                          image={value.image}
                          width={180}
                          height={200}
                          resizeMode="contain"
                        />
                      )}
                      {value.icon && (
                        <MCIcon
                          type="FontAwesome5"
                          name={value.icon}
                          size={60}
                        />
                      )}
                    </MCView>
                    <H5>{t(`value_name_${value.name}`).toUpperCase()}</H5>
                    <H5 weight="italic" align="center">
                      {t(`value_name_${value.name}_description`)}
                    </H5>
                  </Card>
                ))}
              </CardStack>
            </MCView>
            <MCView row align="center" width={375} height={120}>
              <MCView style={{flex: 1}} align="center">
                <MCView
                  align="center"
                  justify="center"
                  style={{
                    borderWidth: 2,
                    borderRadius: this.getLessFontSize() / 2 + 17,
                    borderColor: theme.colors.danger,
                  }}
                  width={this.getLessFontSize() + 30}
                  height={this.getLessFontSize() + 30}>
                  <MCIcon
                    type="FontAwesome"
                    name="thumbs-down"
                    size={this.getLessFontSize()}
                    color={theme.colors.danger}
                  />
                </MCView>
              </MCView>
              <MCButton
                row
                align="center"
                bordered
                width={40}
                height={40}
                br={20}
                disabled={swiped.length === 0}
                onPress={() => this._onPressBack()}>
                <MCIcon type="FontAwesome5" name="undo" />
              </MCButton>
              <MCView style={{flex: 1}} align="center">
                <MCView
                  align="center"
                  justify="center"
                  style={{
                    borderWidth: 2,
                    borderRadius: this.getVeryFontSize() / 2 + 17,
                    borderColor: theme.colors.outline,
                  }}
                  width={this.getVeryFontSize() + 30}
                  height={this.getVeryFontSize() + 30}>
                  <MCIcon
                    type="FontAwesome"
                    name="thumbs-up"
                    size={this.getVeryFontSize()}
                    color={theme.colors.outline}
                  />
                </MCView>
              </MCView>
            </MCView>
          </>
        ) : (
          <MCContent contentContainerStyle={{padding: dySize(20)}}>
            <H4>{t('tools_tab_core_values_explain')}</H4>
            {!this.validateOptions() && submitted && (
              <ErrorText>{t('error_input_select_empty')}</ErrorText>
            )}
            <MCView row wrap justify="space-between" mt={20}>
              {selectedValues.map(item => {
                const value = item;
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
        <MCModal
          isVisible={showHowModal}
          onClose={() => this.setState({showHowModal: false})}>
          <MCView width={280} mt={20}>
            <MCView row align="center" mt={10}>
              <MCButton bordered align="center" width={100}>
                <H5>{t('tools_tab_discover_your_values_swipe_left')}</H5>
              </MCButton>
              <MCIcon type="FontAwesome" name="long-arrow-right" padding={10} />
              <H5 style={{flex: 1}}>
                {t('tools_tab_discover_your_values_less_important')}
              </H5>
            </MCView>
            <MCView row align="center" mt={10}>
              <MCButton bordered align="center" width={100}>
                <H5>{t('tools_tab_discover_your_values_swipe_right')}</H5>
              </MCButton>
              <MCIcon type="FontAwesome" name="long-arrow-right" padding={10} />
              <H5 style={{flex: 1}}>
                {t('tools_tab_discover_your_values_very_important')}
              </H5>
            </MCView>
            <MCView row align="center" mt={10}>
              <MCButton bordered align="center" width={100}>
                <H5>{t('tools_tab_discover_your_values_swipe_top')}</H5>
              </MCButton>
              <MCIcon type="FontAwesome" name="long-arrow-right" padding={10} />
              <H5 style={{flex: 1}}>
                {t('tools_tab_discover_your_values_super_important')}
              </H5>
            </MCView>
          </MCView>
        </MCModal>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  selectedReflection: state.reflectionReducer.selectedReflection,
  coreValues: selector.reflections.findMySpecialReflections(
    state,
    'CoreValues',
  ),
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
