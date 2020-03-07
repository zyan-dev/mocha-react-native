import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {withTranslation} from 'react-i18next';
import {MCRootView, MCView} from 'components/styled/View';
import {H2, H3} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {dySize} from 'utils/responsive';
import NavigationService from 'navigation/NavigationService';

const Wrapper = styled(MCView)`
  border-radius: ${dySize(60)};
`;

const BottomLine = styled.View`
  margin-top: ${dySize(15)};
  width: ${dySize(200)};
  height: 1px;
  background-color: ${props => props.theme.colors.text};
`;

class WelcomeToMocha extends React.PureComponent {
  render() {
    const {t} = this.props;
    return (
      <MCRootView>
        <Wrapper bordered p={20} justify="center" width={dySize(300)}>
          <H2 underline mt={40}>
            {t('welcome_title')}
          </H2>
          <H3 mt={20} align="center">
            {t('welcome_displayText')}
          </H3>
          <MCView mt={60}>
            <MCButton
              bordered
              width={240}
              align="center"
              onPress={() => NavigationService.navigate('WelcomePickTheme')}>
              <H3>Let's begin.</H3>
            </MCButton>
          </MCView>
          <BottomLine />
        </Wrapper>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
});

export default withTranslation()(
  connect(mapStateToProps, undefined)(WelcomeToMocha),
);
