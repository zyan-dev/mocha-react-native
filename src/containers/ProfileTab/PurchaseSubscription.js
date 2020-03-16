import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {MCRootView} from 'components/styled/View';
import {MCHeader} from 'components/common';
import {H3, H4} from 'components/styled/Text';
import {MCView, NativeCard, MCContent} from 'components/styled/View';
import {MCButton} from 'components/styled/Button';

const purchaseItems = [
  {
    key: 'com.mocha.purchase.year',
    months: 12,
    price: 49.99,
  },
  {
    key: 'com.mocha.purchase.month',
    months: 1,
    price: 4.99,
  },
];

class PurchaseSubscription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: {},
    };
  }

  onPressPurchaseItem = item => {
    this.setState({selectedItem: item});
  };

  onPurchase = () => {
    const {selectedItem} = this.state;
    alert(`You purchased $${selectedItem.price} successfully! (Test)`);
  };

  render() {
    const {selectedItem} = this.state;
    const {t, theme} = this.props;
    return (
      <MCRootView justify="flex-start">
        <MCHeader title={t('profile_menu_purchase')} />
        <MCContent contentContainerStyle={{alignItems: 'center'}}>
          {purchaseItems.map(item => (
            <MCButton onPress={() => this.onPressPurchaseItem(item)}>
              <NativeCard
                key={item.key}
                width={340}
                bordered={selectedItem.key === item.key}>
                <MCView>
                  <MCView row align="center">
                    <H3 weight="bold">12 </H3>
                    <H4 weight="bold">{t('unit_months')}</H4>
                  </MCView>
                  <H3 pv={1}>$49.99</H3>
                </MCView>
              </NativeCard>
            </MCButton>
          ))}
        </MCContent>
        <MCButton
          onPress={() => this.onPurchase()}
          disabled={!selectedItem.key}
          align="center"
          background="#19D868"
          width={340}
          mt={20}
          mb={30}>
          <H3>Subscribe</H3>
        </MCButton>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
});

const mapDispatchToProps = {};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(PurchaseSubscription),
);
