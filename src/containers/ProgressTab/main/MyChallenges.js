import React from 'react';
import {FlatList} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {MCRootView, NativeCard} from 'components/styled/View';
import {MCHeader} from 'components/common';
import {H3, MCEmptyText} from 'components/styled/Text';
import {dySize} from 'utils/responsive';

class ProgressChallengeTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderChallengeItem = ({item}) => {
    return (
      <NativeCard width={200} mr={20} mt={20}>
        <H3>{item.title}</H3>
      </NativeCard>
    );
  };

  render() {
    const {t, myChallenges} = this.props;
    return (
      <MCRootView justify="flex-start" background="transparent">
        <FlatList
          horizontal
          style={{height: dySize(150)}}
          contentContainerStyle={{
            paddingHorizontal: dySize(15),
            height: dySize(150),
          }}
          data={myChallenges}
          renderItem={this._renderChallengeItem}
          keyExtractor={item => item._id}
          ListEmptyComponent={<MCEmptyText>{t('no_result')}</MCEmptyText>}
          keyExtractor={item => item._id}
        />
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  myChallenges: state.challengeReducer.myChallenges,
});

const mapDispatchToProps = {};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ProgressChallengeTab),
);
