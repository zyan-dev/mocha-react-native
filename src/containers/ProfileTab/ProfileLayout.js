import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import * as _ from 'lodash';
import DraggableFlatList from 'react-native-draggable-flatlist';
import ToggleSwitch from 'toggle-switch-react-native';
import {otherActions} from 'Redux/actions';
import {MCHeader, MCIcon} from 'components/common';
import {MCRootView, MCView} from 'components/styled/View';
import {H3, H4} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {dySize} from 'utils/responsive';
import NavigationService from 'navigation/NavigationService';
import {
  GrabberSvg,
  CarrotSvg,
  FaucetSvg,
  FragileSvg,
  KeySvg,
  FutureSvg,
  AppleSvg,
  BullhornSvg,
  PointDownSvg,
  AwardSvg,
  MedalSvg,
  ExclamationSvg,
  BoxingSvg,
  HandheartSvg,
  SirenOnSvg,
  SkullCowSvg,
} from 'assets/svgs';
import {profileIcons} from 'utils/constants';

class ProfileLayoutScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileLayout: props.layout,
    };
  }

  componentDidMount() {
    if (!this.props.layout) {
      console.log('setting initial profile layout');
      this.setState({profileLayout: _.cloneDeep(profileIcons)});
    }
  }

  onSaveLayout = () => {
    this.props.setProfileLayout(this.state.profileLayout);
    NavigationService.goBack();
  };

  onToggleSwitch = (item, isOn) => {
    const {profileLayout} = this.state;
    let find = profileLayout.find(i => i.key === item.key);
    find.disabled = !isOn;
    this.setState({profileLayout});
  };

  renderItem = ({item, index, drag, isActive}) => {
    const {t, theme} = this.props;
    if (item.key === 'overview') return null;
    return (
      <MCView
        bordered
        br={10}
        mb={15}
        height={40}
        row
        align="center"
        key={item.key + item.enabled}>
        <MCView width={40} align="center">
          {!item.hasSvg && <MCIcon type={item.iconType} name={item.icon} />}
          {item.key === 'chronotype' && (
            <MCIcon type="FontAwesome5Pro" name="bed" />
          )}
          {item.key === 'nutrition' && <CarrotSvg size={20} />}
          {item.key === 'hydration' && <FaucetSvg size={20} />}
          {item.key === 'stress_recovery' && <FragileSvg size={20} />}
          {item.key === 'core_values' && <KeySvg size={20} theme={theme} />}
          {item.key === 'dreams' && <FutureSvg size={20} />}
          {item.key === 'habits' && <AppleSvg size={20} />}
          {item.key === 'coaching_feedback' && (
            <BullhornSvg theme={theme} size={20} />
          )}
          {item.key === 'criticism_feedback' && (
            <PointDownSvg theme={theme} size={20} />
          )}
          {item.key === 'praise_feedback' && <AwardSvg size={20} />}
          {item.key === 'qualities_character' && (
            <MedalSvg theme={theme} size={20} />
          )}
          {item.key === 'challenges_concerns' && <ExclamationSvg size={20} />}
          {item.key === 'approach_to_conflict' && <BoxingSvg size={20} />}
          {item.key === 'attachment_pattern' && (
            <MCIcon
              type="FontAwesome5Pro"
              name="paperclip"
              color="#DC3E3E"
              size={20}
            />
          )}
          {item.key === 'comfort' && <HandheartSvg theme={theme} size={20} />}
          {item.key === 'meaning_life' && (
            <SkullCowSvg color={theme.colors.text} size={20} />
          )}
          {item.key === 'triggers' && (
            <SirenOnSvg size={20} color={theme.colors.text} />
          )}
        </MCView>
        <H4 mr={10} style={{flex: 1}}>
          {t(`profile_subtitle_${item.key}`)}
        </H4>
        {!item.edit_disabled && (
          <MCView>
            <ToggleSwitch
              isOn={!item.disabled ? true : false}
              onColor={theme.colors.toggle_on}
              offColor={theme.colors.toggle_off}
              size="medium"
              onToggle={isOn => this.onToggleSwitch(item, isOn)}
            />
          </MCView>
        )}

        {index === 0 ? (
          <MCView width={40} />
        ) : (
          <MCButton onLongPress={drag} width={40} align="center">
            <GrabberSvg color={theme.colors.text} size={20} />
          </MCButton>
        )}
      </MCView>
    );
  };

  render() {
    const {profileLayout} = this.state;
    const {t, theme} = this.props;
    if (!profileLayout) return null;
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          hasRight
          title={t('title_profile_layout')}
          rightIcon="cloud-upload-alt"
          rightText={t('button_save')}
          rightIconColor={theme.colors.outline}
          onPressRight={() => this.onSaveLayout()}
        />
        <DraggableFlatList
          style={{width: dySize(375)}}
          contentContainerStyle={{padding: dySize(15)}}
          data={profileLayout}
          extraData={this.state}
          renderItem={this.renderItem}
          keyExtractor={item => item}
          onDragEnd={({data}) => this.setState({profileLayout: data})}
          ListHeaderComponent={
            <MCView bordered br={10} mb={15} height={40} row align="center">
              <MCView width={40} align="center">
                <MCIcon type="FontAwesome5" name="pen-alt" />
              </MCView>
              <H4 mr={10} style={{flex: 1}}>
                {t(`profile_subtitle_overview`)}
              </H4>
            </MCView>
          }
        />
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  layout: state.otherReducer.profileLayout,
});

const mapDispatchToProps = {
  setProfileLayout: otherActions.setProfileLayout,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ProfileLayoutScreen),
);
