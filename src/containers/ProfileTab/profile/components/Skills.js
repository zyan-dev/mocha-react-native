import React from 'react';
import PropTypes from 'prop-types';
import {FlatList} from 'react-native';
import {withTranslation} from 'react-i18next';
import * as _ from 'lodash';
import {MCCard, MCView} from 'components/styled/View';
import {H3, H4, H5, MCEmptyText} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCIcon, MCModal} from 'components/common';
import {dySize} from 'utils/responsive';
import {StrengthOptions} from '../../../../utils/constants';

class SkillsCard extends React.Component {
  static propTypes = {
    strength: PropTypes.object,
    onPressDetails: PropTypes.func,
    editable: PropTypes.bool,
  };

  static defaultProps = {
    editable: true,
    strength: {},
    onPressDetails: () => undefined,
  };

  onPressItem = language => {
    this.setState({selectedLanguage: language, showModal: true});
  };

  _renderItem = ({item}) => {
    const {t} = this.props;
    const option = item;
    const strength = StrengthOptions.find(i => i.key === option);
    if (!strength) return null;
    return (
      <MCView
        bordered
        br={10}
        width={140}
        align="center"
        pt={1}
        ph={10}
        mt={10}
        ml={5}
        mr={5}>
        <MCView height={50} justify="center" align="center">
          <H4 weight="bold" align="center">
            {t(`tools_tab_strength_${strength.key}`)}
          </H4>
        </MCView>
        <MCView height={100} justify="center" align="center">
          <H4 justify="center" align="center">
            {t(`tools_tab_strength_${strength.key}_description`)}
          </H4>
        </MCView>
        <MCIcon type={strength.iconType} name={strength.icon} size={30} />
      </MCView>
    );
  };

  render() {
    const {t, strength, editable} = this.props;
    const skills = _.get(strength, ['data', 'options'], []);
    return (
      <MCView align="center">
        <MCView row align="center" mb={20}>
          <H3 weight="bold" style={{flex: 1}}>
            {t('profile_card_skill')}
          </H3>
          {editable && (
            <MCButton onPress={() => this.props.onPressDetails()}>
              <MCIcon type="FontAwesome5" name="edit" />
            </MCButton>
          )}
        </MCView>
        <FlatList
          data={skills}
          renderItem={this._renderItem}
          keyExtractor={item => item}
          numColumns={2}
          style={{width: dySize(300)}}
          ListEmptyComponent={
            <MCEmptyText>
              {editable ? t('no_result') : t('profile_card_empty_strength')}
            </MCEmptyText>
          }
        />
      </MCView>
    );
  }
}

export default withTranslation()(SkillsCard);
