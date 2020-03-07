import React from 'react';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {get as lodashGet} from 'lodash';
import styled from 'styled-components';
import {Footer} from 'native-base';
import {MCView} from 'components/styled/View';
import {MCButton} from 'components/styled/Button';
import {dySize} from 'utils/responsive';
import {H3} from 'components/styled/Text';
import UsersSvg from 'assets/svgs/Users';
import UserSvg from 'assets/svgs/User';
import PlusSvg from 'assets/svgs/Plus';
import NavigationService from 'navigation/NavigationService';
import {profileActions} from 'Redux/actions';

const TabBarHeight = dySize(80);
const TabIconBigSize = dySize(40);
const TabIconSmallSize = dySize(25);

const TabWrapper = styled(Footer)`
  height: ${dySize(80)};
  padding-bottom: 20;
  border-top-width: 0px;
`;

class TabView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 1,
    };
  }

  componentWillReceiveProps(props) {
    const index = lodashGet(props, 'navigation.state.index', 0);
    this.setState({tabIndex: index});
  }

  onClickTab = index => {
    const TabScreens = ['TabFeed', 'TabAddValue', 'TabProfile'];
    this.setState({tabIndex: index});
    NavigationService.navigate(TabScreens[index]);
    switch (index) {
      case 0:
        // call some APIs whenever user clicks Social Tab
        break;
      case 1:
        // call some APIs whenever user clicks Add Tab
        break;
      case 2:
        // call some APIs whenever user clicks Profile Tab
        this.props.getMyProfile();
        break;
      default:
        break;
    }
  };

  render() {
    const {t, theme} = this.props;
    const {tabIndex} = this.state;
    return (
      <TabWrapper>
        <MCView
          row
          p={0}
          width={dySize(375)}
          style={{backgroundColor: theme.colors.background}}>
          <MCButton
            rippleCentered
            rippleSize={dySize(100)}
            onPress={() => this.onClickTab(0)}
            justify="center"
            align="center"
            height={TabBarHeight}
            style={{flex: 1}}>
            <UsersSvg
              size={tabIndex === 0 ? TabIconBigSize : TabIconSmallSize}
              color={theme.colors.text}
            />
            <H3 weight={tabIndex === 0 ? 'bold' : 'regular'}>
              {t('footer_feed')}
            </H3>
          </MCButton>
          <MCButton
            rippleCentered
            rippleSize={dySize(100)}
            align="center"
            justify="center"
            onPress={() => this.onClickTab(1)}
            style={{flex: 1}}
            height={TabBarHeight}>
            <PlusSvg
              size={tabIndex === 1 ? TabIconBigSize : TabIconSmallSize}
              color={theme.colors.text}
            />
            <H3 weight={tabIndex === 1 ? 'bold' : 'regular'}>
              {t('footer_add')}
            </H3>
          </MCButton>
          <MCButton
            rippleCentered
            rippleSize={dySize(100)}
            align="center"
            justify="center"
            onPress={() => this.onClickTab(2)}
            style={{flex: 1}}
            height={TabBarHeight}>
            <UserSvg
              size={tabIndex === 2 ? TabIconBigSize : TabIconSmallSize}
              color={theme.colors.text}
            />
            <H3 weight={tabIndex === 2 ? 'bold' : 'regular'}>
              {t('footer_profile')}
            </H3>
          </MCButton>
        </MCView>
      </TabWrapper>
    );
  }
}

const mapDispatchToProps = {
  getMyProfile: profileActions.getMyProfile,
};

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  phone: state.profileReducer.phone,
});

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(TabView),
);
