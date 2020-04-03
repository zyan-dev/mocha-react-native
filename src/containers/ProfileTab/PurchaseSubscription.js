import React from 'react';
import {Platform} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import RNIap, {
  getProducts,
  purchaseErrorListener,
  purchaseUpdatedListener,
} from 'react-native-iap';
import {otherActions} from 'Redux/actions';
import {MCRootView} from 'components/styled/View';
import {MCHeader} from 'components/common';
import {H3, H4} from 'components/styled/Text';
import {MCView, NativeCard, MCContent} from 'components/styled/View';
import {MCButton} from 'components/styled/Button';
import {showAlert} from 'services/operators';

const purchaseItems = Platform.select({
  ios: ['com.mocha.mobile.annual', 'com.mocha.mobile.monthly'],
  android: ['com.mocha.mobile.annual', 'com.mocha.mobile.monthly'],
});

const monthsPerProduct = {
  'com.mocha.mobile.annual': 12,
  'com.mocha.mobile.monthly': 1,
};

// const sampleProductInfo = {
//   currency: 'GBP',
//   description: 'Annual Subscription',
//   discounts: [Array],
//   introductoryPrice: '',
//   introductoryPriceNumberOfPeriodsIOS: '',
//   introductoryPricePaymentModeIOS: '',
//   introductoryPriceSubscriptionPeriodIOS: '',
//   localizedPrice: '£48.99',
//   price: '48.99',
//   productId: 'com.mocha.mobile.annual',
//   subscriptionPeriodNumberIOS: '1',
//   subscriptionPeriodUnitIOS: 'YEAR',
//   title: 'Annual Subscription',
//   type: 'Do not use this. It returned sub only before',
// };

class PurchaseSubscription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: {},
    };
  }

  async componentDidMount() {
    try {
      // this.props.loadingProducts(true);
      const products = await getProducts(purchaseItems);
      this.props.setPurchaseProducts(products);
      // this.props.loadingProducts(false);
    } catch (err) {
      console.warn(err); // standardized err.code and err.message available
    }
    this.purchaseUpdateSubscription = purchaseUpdatedListener(purchase => {
      console.log('purchaseUpdatedListener', purchase);
      const receipt = purchase.transactionReceipt;
      if (receipt) {
        this.props.purchaseSubscription({receipt, purchase});
      }
    });

    this.purchaseErrorSubscription = purchaseErrorListener(error => {
      showAlert(error.message);
    });
  }

  componentWillUnmount() {
    if (this.purchaseUpdateSubscription) {
      this.purchaseUpdateSubscription.remove();
      this.purchaseUpdateSubscription = null;
    }
    if (this.purchaseErrorSubscription) {
      this.purchaseErrorSubscription.remove();
      this.purchaseErrorSubscription = null;
    }
  }

  onPressPurchaseItem = item => {
    this.setState({selectedItem: item});
  };

  onPurchase = async () => {
    const {selectedItem} = this.state;
    try {
      await RNIap.requestSubscription(selectedItem.productId);
    } catch (err) {
      showAlert(err.toString());
    }
  };

  render() {
    const {selectedItem} = this.state;
    const {t, products} = this.props;
    if (!products) return <MCRootView />;
    return (
      <MCRootView justify="flex-start">
        <MCHeader title={t('profile_menu_purchase')} />
        <MCContent contentContainerStyle={{alignItems: 'center'}}>
          {products.map(product => (
            <MCButton onPress={() => this.onPressPurchaseItem(product)}>
              <NativeCard
                key={product.productId}
                justify="flex-start"
                align="flex-start"
                width={340}
                bordered={selectedItem.productId === product.productId}>
                <MCView>
                  <MCView row align="center">
                    <H3 weight="bold">
                      {monthsPerProduct[product.productId]}{' '}
                    </H3>
                    <H4 weight="bold">{t('unit_months')}</H4>
                  </MCView>
                  <H3 pv={1}>{product.localizedPrice}</H3>
                </MCView>
              </NativeCard>
            </MCButton>
          ))}
        </MCContent>
        <MCButton
          onPress={() => this.onPurchase()}
          disabled={!selectedItem.productId}
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
  products: state.otherReducer.purchaseProducts,
});

const mapDispatchToProps = {
  purchaseSubscription: otherActions.purchaseSubscription,
  setPurchaseProducts: otherActions.setPurchaseProducts,
  loadingProducts: otherActions.loadingProducts,
};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(PurchaseSubscription),
);
