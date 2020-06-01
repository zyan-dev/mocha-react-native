import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import CardStack, {Card} from 'react-native-card-stack-swiper';
import {isIphoneX} from 'react-native-iphone-x-helper';
import i18next from 'i18next';
import {selector} from 'Redux/selectors';
import {reflectionActions} from 'Redux/actions';
import {MCRootView, MCContent, MCView} from 'components/styled/View';
import {H3, H4, H5, H6, ErrorText, MCEmptyText} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCHeader, MCImage, MCModal, MCIcon} from 'components/common';
import {dySize, CURRENT_HEIGHT} from 'utils/responsive';
import NavigationService from 'navigation/NavigationService';
import {
  DiscoverValues,
  ValueCardBackgrounds,
  ValueCardTextColor,
} from 'utils/constants';
import {KeySvg} from 'assets/svgs';
import {showAlert, getStringWithOutline} from 'services/operators';

const cardViewHeight =
  CURRENT_HEIGHT - dySize(180) - 120 - (isIphoneX() ? 60 : 0);

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
      showHowModal: false,
    };
  }

  title = {
    title: i18next.t('tools_tab_profile_basic_question_1', {
      bold: i18next.t('outline_core_values'),
    }),
    boldWordKeys: ['core_values'],
  };

  subTitle1 = {
    title: i18next.t('tools_tab_core_value_modal_subtitle_1', {
      bold: i18next.t('outline_right'),
    }),
    boldWordKeys: ['right'],
  };

  subTitle2 = {
    title: i18next.t('tools_tab_core_value_modal_subtitle_2', {
      bold: i18next.t('outline_left'),
    }),
    boldWordKeys: ['left'],
  };

  subTitle3 = {
    title: i18next.t('tools_tab_core_value_modal_subtitle_3', {
      bold: i18next.t('outline_6_core_values'),
    }),
    boldWordKeys: ['6_core_values'],
  };

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

  _onSwipe = x => {
    this.setState({swipeXOffset: x});
  };

  _onSwipeEnd = () => {
    this.setState({swipeXOffset: 0});
  };

  _onSwipedAll = () => {
    this.onPressNext();
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
    const selectedValues = swiped.filter(value => value.how > 0);
    const coreValues = swiped.filter(value => value.how > 1);
    this.setState({selectedValues: selectedValues.map(value => value.value)});
    this.setState({coreValues: coreValues.map(value => value.value)});
  };

  onPressCoreItem = value => {
    const {t} = this.props;
    const {coreValues} = this.state;
    const index = coreValues.indexOf(value);
    if (index < 0 && coreValues.length < 6) coreValues.push(value);
    else if (index > -1) coreValues.splice(index, 1);
    else {
      showAlert(t('error_selected_max_core_values'));
    }
    this.setState({coreValues});
  };

  onPressRight = () => {
    const {step} = this.state;
    if (!step) {
      // pressed View All
      this.setState({selectedValues: DiscoverValues, coreValues: [], step: 1});
    } else {
      this.setState({submitted: true});
      if (!this.validateOptions()) return;
      this.props.updateSelectedReflection({
        selected: this.state.selectedValues,
        core: this.state.coreValues,
      });
      setTimeout(() => {
        this.props.addOrUpdateReflection();
      });
    }
  };

  validateOptions = () => {
    return this.state.coreValues.length > 0;
  };

  renderValueCard = (value, index) => {
    const {t, theme} = this.props;
    return (
      <Card
        key={value.value + theme.colors.theme_name}
        style={{
          width: cardViewHeight * 0.65,
          height: cardViewHeight * 1,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: theme.colors.border,
          backgroundColor: ValueCardBackgrounds[index % 3],
          borderRadius: 10,
          borderWidth: dySize(12),
          borderColor: theme.colors.card,
          padding: dySize(5),
        }}>
        <H5 style={{letterSpacing: 5}} color={ValueCardTextColor}>
          {t(`value_category_${value.category}`).toUpperCase()}
        </H5>
        <H3 weight="bold" align="center" color={ValueCardTextColor}>
          {t(`tools_tab_value_${value.value}`)}
        </H3>
        <MCView style={{flex: 1}} align="center" justify="center">
          {value.image && (
            <MCImage
              image={value.image}
              width={cardViewHeight * 0.5}
              height={cardViewHeight * 0.4}
              resizeMode="contain"
            />
          )}
          {value.icon && (
            <MCIcon
              type="FontAwesome5"
              name={value.icon}
              size={60}
              color={ValueCardTextColor}
            />
          )}
        </MCView>
        <H5
          align="center"
          style={{letterSpacing: 5}}
          color={ValueCardTextColor}>
          {t(`value_name_${value.name}`).toUpperCase()}
        </H5>
        <H5 weight="italic" align="center" color={ValueCardTextColor}>
          {t(`value_name_${value.name}_description`)}
        </H5>
      </Card>
    );
  };

  renderSelectedValueCard = (value, index) => {
    const {coreValues} = this.state;
    const {t, theme} = this.props;
    const selected = coreValues.indexOf(value) > -1;
    return (
      <MCButton
        key={value.value + theme.colors.theme_name}
        mb={15}
        onPress={() => this.onPressCoreItem(value)}
        style={{
          width: dySize(160),
          height: dySize(220),
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: selected ? theme.colors.outline : theme.colors.card,
          backgroundColor: ValueCardBackgrounds[index % 3],
          borderRadius: 10,
          borderWidth: dySize(6),
          padding: dySize(5),
        }}>
        <H4 weight="bold" align="center" color={ValueCardTextColor}>
          {t(`tools_tab_value_${value.value}`)}
        </H4>
        <MCView style={{flex: 1}} align="center" justify="center">
          {value.image && (
            <MCImage
              image={value.image}
              width={dySize(125)}
              height={dySize(100)}
              resizeMode="contain"
            />
          )}
          {value.icon && (
            <MCIcon
              type="FontAwesome5"
              name={value.icon}
              size={50}
              color={ValueCardTextColor}
            />
          )}
        </MCView>
        <H6
          align="center"
          style={{letterSpacing: 5}}
          color={ValueCardTextColor}>
          {t(`value_name_${value.name}`).toUpperCase()}
        </H6>
      </MCButton>
    );
  };

  render() {
    const {
      swiped,
      step,
      coreValues,
      submitted,
      showHowModal,
      selectedValues,
    } = this.state;
    const {t, theme} = this.props;
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          hasRight
          title={t('tools_tab_discover_your_values')}
          headerIcon={<KeySvg theme={theme} size={30} />}
          rightIcon={step ? 'cloud-upload-alt' : ''}
          rightText={step ? t('button_save') : t('button_view_all')}
          onPressBack={() => this.onPressHeaderBack()}
          onPressRight={() => this.onPressRight()}
        />
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
                onSwipedAll={this._onSwipedAll}
                verticalThreshold={dySize(90)}
                horizontalThreshold={dySize(90)}
                renderNoMoreCards={() => (
                  <MCEmptyText>
                    {t('tools_tab_discover_your_values_no_more_cards')}
                  </MCEmptyText>
                )}
                disableBottomSwipe>
                {DiscoverValues.map((value, index) => {
                  return this.renderValueCard(value, index);
                })}
              </CardStack>
            </MCView>
            <MCView row align="center" width={375} height={100}>
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
            {selectedValues.length === 0 && (
              <MCEmptyText mt={200}>
                {t('error_no_value_card_selected')}
              </MCEmptyText>
            )}
            {!this.validateOptions() && submitted && (
              <ErrorText>{t('error_input_select_empty')}</ErrorText>
            )}
            <MCView row wrap justify="space-between" mt={20}>
              {selectedValues.map((item, index) => {
                return this.renderSelectedValueCard(item, index);
              })}
            </MCView>
          </MCContent>
        )}
        <MCModal
          br={50}
          isVisible={showHowModal}
          hasCloseButton={false}
          onClose={() => this.setState({showHowModal: false})}>
          <MCView width={250} align="center" mt={20}>
            <KeySvg theme={theme} size={30} />
            <MCView mt={20} mb={20}>
              {getStringWithOutline(this.title, {
                style: {underline: true},
                bigSize: true,
              })}
            </MCView>
            <MCView mb={20}>{getStringWithOutline(this.subTitle1)}</MCView>
            <MCView mb={20}>{getStringWithOutline(this.subTitle2)}</MCView>
            <MCView mb={20}>{getStringWithOutline(this.subTitle3)}</MCView>
            <MCButton
              bordered
              mt={20}
              width={150}
              align="center"
              onPress={() => this.setState({showHowModal: false})}>
              <H3>{t('welcome_reflectionpoints_buttons_continue')}</H3>
            </MCButton>
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
