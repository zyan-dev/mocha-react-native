import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import * as _ from 'lodash';
import {FlatList} from 'react-native-gesture-handler';
import {challengeActions} from 'Redux/actions';
import {MCRootView, MCView} from 'components/styled/View';
import {MCTagsView, MCIcon} from 'components/common';
import {H3} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {NativeCard, DividerLine} from 'components/styled/View';
import {
  TemplateChallenges,
  ChallengeIconData,
  EmptyChallenge,
} from 'utils/constants';
import {dySize} from 'utils/responsive';
import NavigationService from 'navigation/NavigationService';

class SelectTemplateScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPressCustom = () => {
    this.props.selectChallenge(_.cloneDeep(EmptyChallenge));
    NavigationService.navigate('SelectChallenges');
  };

  onSelectTemplate = item => {
    this.props.selectChallenge(item);
    NavigationService.navigate('SelectTeammates');
  };

  renderChallengeIcon = category => {
    const key = category.split('_')[0];
    return (
      <MCIcon type="FontAwesome5Pro-Light" name={ChallengeIconData[key]} />
    );
  };

  _renderChallengeCard = ({item}) => {
    if (item.custom) {
      return (
        <NativeCard
          align="center"
          width={160}
          pv={1}
          ph={1}
          mr={6}
          ml={6}
          mt={10}>
          <MCButton
            align="center"
            width={160}
            height={160}
            justify="center"
            onPress={() => this.onPressCustom()}>
            <MCIcon type="FontAwesome5Pro-Light" name="plus" size={50} />
            <H3 align="center">Add Custom Challenge</H3>
          </MCButton>
        </NativeCard>
      );
    } else {
      return (
        <NativeCard
          align="center"
          width={160}
          pv={1}
          ph={1}
          mr={6}
          ml={6}
          mt={10}>
          <MCButton
            align="center"
            width={160}
            height={160}
            onPress={() => this.onSelectTemplate(item)}>
            <H3 weight="bold">{item.title}</H3>
            <H3 weight="bold">{item.duration} Days</H3>
            <MCView row align="center" justify="center" mb={10}>
              {item.challenges.map(i => {
                return this.renderChallengeIcon(i.category);
              })}
            </MCView>
            <DividerLine width={150} />
            <MCView width={150} mt={10}>
              <MCTagsView tags={item.skills} style={{backgrounColor: 'red'}} />
            </MCView>
          </MCButton>
        </NativeCard>
      );
    }
  };

  render() {
    const {t} = this.props;
    return (
      <MCRootView justify="flex-start">
        <FlatList
          contentContainerStyle={{
            width: dySize(375),
            paddingHorizontal: dySize(15),
          }}
          data={[{index: 0, custom: true}].concat(TemplateChallenges)}
          renderItem={this._renderChallengeCard}
          keyExtractor={item => item.index}
          numColumns={2}
        />
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  selectChallenge: challengeActions.selectChallenge,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SelectTemplateScreen),
);
