import React from 'react';
import PropTypes from 'prop-types';
import {FlatList} from 'react-native';
import {withTranslation} from 'react-i18next';
import {MCCard, MCView} from 'components/styled/View';
import {H3, H4, H5, MCEmptyText} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCModal, MCImage, MCTagsView} from 'components/common';
import {dySize} from 'utils/responsive';
import {getTitleByKey} from 'services/operators';

class UserManualsCard extends React.Component {
  static propTypes = {
    onPressDetails: PropTypes.func,
    onPressNew: PropTypes.func,
    editable: PropTypes.bool,
    manuals: PropTypes.arrayOf(Object),
  };

  static defaultProps = {
    onPressDetails: () => undefined,
    onPressNew: () => undefined,
    manuals: [],
    editable: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedManual: null,
      showModal: false,
    };
  }

  onPressItem = manual => {
    this.setState({selectedManual: manual, showModal: true});
  };

  _renderItem = ({item}) => {
    const manual = item.data;
    return (
      <MCCard width={140} key={item._id} mr={15} mt={10} align="center">
        <MCButton align="center" onPress={() => this.onPressItem(manual)}>
          <H4 numberOfLines={1}>{getTitleByKey('manual', manual.title)}</H4>
          <MCImage
            width={120}
            height={120}
            image={{uri: manual.image}}
            br={6}
          />
        </MCButton>
      </MCCard>
    );
  };

  render() {
    const {t, manuals, editable, onPressNew, onPressDetails} = this.props;
    const {selectedManual, showModal} = this.state;
    return (
      <MCView align="center" mt={30}>
        <MCView row align="center" mb={20}>
          <H3 weight="bold" style={{flex: 1}}>
            {t('profile_subtitle_beliefs')}
          </H3>
          {editable && (
            <MCButton onPress={() => onPressDetails()}>
              <H5 underline>{t('view_all')}</H5>
            </MCButton>
          )}
        </MCView>
        <FlatList
          data={manuals.slice(0, 4)}
          renderItem={this._renderItem}
          keyExtractor={item => item._id}
          numColumns={2}
          style={{width: dySize(300)}}
          ListEmptyComponent={
            editable ? (
              <MCButton bordered align="center" onPress={() => onPressNew()}>
                <MCEmptyText>{t('profile_card_empty_belief')}</MCEmptyText>
                <MCEmptyText>{t('profile_card_empty_belief_1')}</MCEmptyText>
              </MCButton>
            ) : (
              <MCEmptyText>{t('profile_card_empty_user_belief')}</MCEmptyText>
            )
          }
        />
        {selectedManual && (
          <MCModal
            isVisible={showModal}
            onClose={() => this.setState({showModal: false})}>
            <MCView align="center" width={300} mt={20}>
              <H3 weight="bold" align="center" mb={10}>
                {getTitleByKey('manual', selectedManual.title)}
              </H3>
              <MCImage image={{uri: selectedManual.image}} br={6} />
              <H4 mt={10} width={300}>
                {selectedManual.text}
              </H4>
              <MCView row mt={10}>
                <H4>{`${t('label_tags')}: `}</H4>
                <MCTagsView tags={selectedManual.tags} />
              </MCView>
              <H4 style={{width: '100%'}}>
                {`${t('Vulnerability')}: ${selectedManual.vulnerability}`}
              </H4>
            </MCView>
          </MCModal>
        )}
      </MCView>
    );
  }
}

export default withTranslation()(UserManualsCard);
