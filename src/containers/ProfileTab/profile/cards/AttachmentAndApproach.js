import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import Collapsible from 'react-native-collapsible';
import {MCView} from 'components/styled/View';
import {H3, MCIcon} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import CardItem from './CardItem';

class AttachmentAndApproach extends React.Component {
  static propTypes = {
    attachments: PropTypes.arrayOf(Object),
    approaches: PropTypes.arrayOf(Object),
    onPressAllAttachments: PropTypes.func,
    onPressAllApproaches: PropTypes.func,
  };

  static defaultProps = {
    attachments: [],
    approaches: [],
    onPressAllAttachments: () => undefined,
    onPressAllApproaches: () => undefined,
  };

  constructor(props) {
    super(props);
    this.state = {
      attachmentCollapsed: true,
      approachCollapsed: true,
    };
  }

  onToggleAttachmentCollapse = collapsed => {
    this.setState({attachmentCollapsed: collapsed});
    if (!collapsed) {
      this.setState({approachCollapsed: true});
    }
  };

  onToggleApproachCollapse = collapsed => {
    this.setState({approachCollapsed: collapsed});
    if (!collapsed) {
      this.setState({attachmentCollapsed: true});
    }
  };

  render() {
    const {
      t,
      attachments,
      approaches,
      onPressAllAttachments,
      onPressAllApproaches,
    } = this.props;
    const {attachmentCollapsed, approachCollapsed} = this.state;
    return (
      <MCView align="center" mt={20}>
        <MCView width={340} row justify="space-between">
          <CardItem
            icon="ios-attach"
            text={t('profile_card_attachment')}
            onPress={() =>
              this.onToggleAttachmentCollapse(!attachmentCollapsed)
            }
          />
          <CardItem
            icon="ios-git-compare"
            text={t('profile_card_approach')}
            onPress={() => this.onToggleApproachCollapse(!approachCollapsed)}
          />
        </MCView>
        <Collapsible collapsed={attachmentCollapsed}>
          {attachments.length > 0 && (
            <MCButton
              width={320}
              row
              justify="space-between"
              onPress={() => onPressAllAttachments()}>
              <H3>All attachments</H3>
              <MCIcon name="ios-arrow-forward" />
            </MCButton>
          )}
          {attachments.length === 0 && (
            <MCButton
              bordered
              align="center"
              mt={10}
              width={320}
              onPress={() => onPressAllAttachments()}>
              <H3>Coming soon!</H3>
            </MCButton>
          )}
        </Collapsible>
        <Collapsible collapsed={approachCollapsed}>
          {approaches.length > 0 && (
            <MCButton
              width={320}
              row
              justify="space-between"
              onPress={() => onPressAllApproaches()}>
              <H3>All approaches</H3>
              <MCIcon name="ios-arrow-forward" />
            </MCButton>
          )}
          {approaches.length === 0 && (
            <MCButton
              bordered
              align="center"
              mt={10}
              width={320}
              onPress={() => onPressAllApproaches()}>
              <H3>Coming soon!</H3>
            </MCButton>
          )}
        </Collapsible>
      </MCView>
    );
  }
}

export default withTranslation()(AttachmentAndApproach);
