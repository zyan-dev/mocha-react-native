import React from 'react';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {MCView, MCRootView} from 'components/styled/View';
import {MCButton} from 'components/styled/Button';
import {dySize} from 'utils/responsive';
import {H3} from 'components/styled/Text';
import {profileActions} from 'Redux/actions';
import {MCContent} from '../../../../../components/styled/View';

class ValueListScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {t, theme} = this.props;
    return (
      <MCRootView>
        <MCContent>
          <H3>Values</H3>
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
});

const mapDispatchToProps = {
  getMyProfile: profileActions.getMyProfile,
};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(ValueListScreen),
);
