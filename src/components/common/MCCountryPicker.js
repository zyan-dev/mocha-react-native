import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';
import {MCView} from '../styled/View';
import i18next from 'i18next';
import {MCTextInput} from '../styled/Text';

class MCCountryPicker extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    onSelectCountry: PropTypes.func.isRequired,
    onChangeInput: PropTypes.func.isRequired,
  };

  static defaultProps = {
    width: 300,
  };

  constructor(props) {
    super(props);
    this.state = {
      cca2: 'US',
    };
  }

  componentDidMount() {
    this.props.onSelectCountry(this.phone.getValue());
  }

  selectCountry(country) {
    this.phone && this.phone.selectCountry(country.cca2.toLowerCase());
    this.setState({cca2: country.cca2}, () => {
      this.props.onSelectCountry(this.phone.getValue());
    });
  }

  render() {
    const {cca2} = this.state;
    const {width, onChangeInput} = this.props;
    return (
      <MCView row align="center" width={width}>
        <View style={{width: 0, height: 0, overflow: 'hidden'}}>
          <PhoneInput
            ref={ref => {
              this.phone = ref;
            }}
          />
        </View>
        <CountryPicker
          ref={ref => (this.countryPicker = ref)}
          onSelect={value => this.selectCountry(value)}
          translation={i18next.language}
          withFilter
          withFlag
          countryCode={cca2}
        />
        <MCTextInput
          style={{flex: 1}}
          onChangeText={value => onChangeInput(value)}
        />
      </MCView>
    );
  }
}

export default MCCountryPicker;
