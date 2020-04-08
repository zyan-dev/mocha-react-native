import React from 'react';
import {Linking, Clipboard} from 'react-native';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {resourceActions} from 'Redux/actions';
import {MCView, MCCard} from 'components/styled/View';
import {MCReadMoreText, MCTagsView} from 'components/common';
import {H3, H4, MCIcon} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {showAlert} from '../../services/operators';

class ResourceItem extends React.Component {
  static propTypes = {
    resource: PropTypes.object.isRequired,
    bookmarked: PropTypes.bool.isRequired,
    editable: PropTypes.bool,
    onPressBookmark: PropTypes.func,
    onPressEdit: PropTypes.func,
    onPressRemove: PropTypes.func,
  };

  static defaultProps = {
    onPressBookmark: () => undefined,
    onPressEdit: () => undefined,
    onPressRemove: () => undefined,
    editable: true,
  };

  onPressBrowser = (link) => {
    Linking.canOpenURL(link).then((supported) => {
      if (supported) {
        Linking.openURL(link);
      } else {
        console.log("Don't know how to open URI: " + link);
      }
    });
  };

  onPressCopyLink = (link) => {
    const {t} = this.props;
    Clipboard.setString(link);
    showAlert(t('clipboard_link_saved'));
  };

  onPressBookmark = (resource) => {
    this.props.onPressBookmark(resource._id);
  };

  render() {
    const {t, resource, bookmarked, editable} = this.props;
    return (
      <MCView
        key={resource._id}
        width={350}
        bordered
        align="center"
        br={10}
        mb={10}>
        <MCCard shadow br={1} width={350} row align="center" mb={10}>
          <MCView bordered br={10} ml={10} ph={5}>
            <H3>{t(`resource_type_${resource.type}`)}</H3>
          </MCView>
          <MCView style={{flex: 1}} />
          <MCButton onPress={() => this.onPressBrowser(resource.link)}>
            <MCIcon type="FontAwesome5" name="compass" />
          </MCButton>
          <MCButton onPress={() => this.onPressCopyLink(resource.link)}>
            <MCIcon type="FontAwesome5" name="copy" />
          </MCButton>
          <MCButton onPress={() => this.onPressBookmark(resource)}>
            <MCIcon name={bookmarked ? 'ios-star' : 'star-outline'} />
          </MCButton>
        </MCCard>
        <MCView width={320}>
          <H3 weight="bold">{resource.title}</H3>
        </MCView>
        <MCView width={320}>
          <MCView>
            <MCReadMoreText>
              <H4 weight="italic" underline ml={20}>
                {resource.link}
              </H4>
            </MCReadMoreText>
          </MCView>
        </MCView>
        <MCView width={320} mt={10} mb={10}>
          <MCTagsView tags={resource.tags} />
        </MCView>
        {editable && (
          <MCView row width={320} align="center">
            <MCView row style={{flex: 1}} justify="flex-end">
              <MCButton onPress={() => this.props.onPressEdit(resource)}>
                <MCIcon name="ios-create" />
              </MCButton>
              <MCButton onPress={() => this.props.onPressRemove(resource)}>
                <MCIcon name="ios-trash" />
              </MCButton>
            </MCView>
          </MCView>
        )}
      </MCView>
    );
  }
}

export default withTranslation()(ResourceItem);
