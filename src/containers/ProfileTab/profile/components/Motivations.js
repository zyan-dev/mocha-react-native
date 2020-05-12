import React from 'react';
import PropTypes from 'prop-types';
import {FlatList} from 'react-native';
import {withTranslation} from 'react-i18next';
import {MCCard, MCView} from 'components/styled/View';
import {H3, H4, H5, MCEmptyText} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCModal, MCImage} from 'components/common';
import {dySize} from 'utils/responsive';

class MotivationCard extends React.Component {
  static propTypes = {
    onPressDetails: PropTypes.func,
    onPressNew: PropTypes.func,
    editable: PropTypes.bool,
    motivations: PropTypes.arrayOf(Object),
  };

  static defaultProps = {
    onPressDetails: () => undefined,
    onPressNew: () => undefined,
    motivations: [],
    editable: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedMotivation: null,
      showModal: false,
    };
  }

  onPressItem = motivation => {
    this.setState({selectedMotivation: motivation, showModal: true});
  };

  _renderMotivationItem = ({item}) => {
    const motivation = item.data;
    return (
      <MCCard width={140} mr={15} mt={10} key={item._id} align="center">
        <MCButton align="center" onPress={() => this.onPressItem(motivation)}>
          <H4 numberOfLines={1}>{motivation.title}</H4>
          <MCImage
            image={{uri: motivation.image}}
            width={120}
            height={120}
            br={6}
          />
        </MCButton>
      </MCCard>
    );
  };

  render() {
    const {t, motivations, editable, onPressNew, onPressDetails} = this.props;
    const {selectedMotivation, showModal} = this.state;
    return (
      <MCView align="center">
        <MCView row align="center" mb={20}>
          <H3 weight="bold" style={{flex: 1}}>
            {t('profile_subtitle_motivations')}
          </H3>
          {editable && (
            <MCButton onPress={() => onPressDetails()}>
              <H5 underline>{t('view_all')}</H5>
            </MCButton>
          )}
        </MCView>
        <FlatList
          data={motivations.slice(0, 4)}
          renderItem={this._renderMotivationItem}
          keyExtractor={item => item._id}
          numColumns={2}
          style={{width: dySize(300)}}
          ListEmptyComponent={
            editable ? (
              <MCButton bordered align="center" onPress={() => onPressNew()}>
                <MCEmptyText>{t('profile_card_empty_motivation')}</MCEmptyText>
                <MCEmptyText>
                  {t('profile_card_empty_motivation_1')}
                </MCEmptyText>
              </MCButton>
            ) : (
              <MCEmptyText>
                {t('profile_card_empty_user_motivation')}
              </MCEmptyText>
            )
          }
        />
        {selectedMotivation && (
          <MCModal
            isVisible={showModal}
            onClose={() => this.setState({showModal: false})}>
            <MCView align="center" width={280} mt={20}>
              <MCImage image={{uri: selectedMotivation.image}} br={6} />
              <H3 weight="bold" mt={10}>
                {selectedMotivation.title}
              </H3>
              <H4>{selectedMotivation.description}</H4>
            </MCView>
          </MCModal>
        )}
      </MCView>
    );
  }
}

export default withTranslation()(MotivationCard);
