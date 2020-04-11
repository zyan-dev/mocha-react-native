import React from 'react';
import PropTypes from 'prop-types';
import {FlatList} from 'react-native';
import {withTranslation} from 'react-i18next';
import {MCCard, MCView} from 'components/styled/View';
import {H3, H4, H5, MCEmptyText} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCImage, MCModal} from 'components/common';
import {dySize} from 'utils/responsive';

class SkillsCard extends React.Component {
  static propTypes = {
    skills: PropTypes.arrayOf(Object),
    onPressDetails: PropTypes.func,
    editable: PropTypes.bool,
  };

  static defaultProps = {
    editable: true,
    skills: [],
    onPressDetails: () => undefined,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedSkill: null,
      showModal: false,
    };
  }

  onPressItem = (language) => {
    this.setState({selectedLanguage: language, showModal: true});
  };

  _renderItem = (item) => {
    const skill = item.data;
    return (
      <MCCard width={140} key={item._id} mr={15} align="center">
        <MCButton
          align="center"
          onPress={() => this.onPressItem(item)}></MCButton>
      </MCCard>
    );
  };

  render() {
    const {t, skills, editable} = this.props;
    const {selectedSkill, showModal} = this.state;
    return (
      <MCView align="center">
        <MCView row align="center" mb={20}>
          <H3 weight="bold" style={{flex: 1}}>
            {t('profile_card_skill')}
          </H3>
          {editable && (
            <MCButton onPress={() => this.props.onPressDetails()}>
              <H5 underline>{t('view_all')}</H5>
            </MCButton>
          )}
        </MCView>
        <FlatList
          data={skills.slice(0, 4)}
          renderItem={this._renderItem}
          keyExtractor={(item) => item._id}
          numColumns={2}
          style={{width: dySize(300)}}
          ListEmptyComponent={<MCEmptyText>{t('coming soon')}</MCEmptyText>}
        />
        {selectedSkill && (
          <MCModal
            isVisible={showModal}
            onClose={() => this.setState({showModal: false})}>
            <MCView align="center" width={300} mt={20}></MCView>
          </MCModal>
        )}
      </MCView>
    );
  }
}

export default withTranslation()(SkillsCard);
