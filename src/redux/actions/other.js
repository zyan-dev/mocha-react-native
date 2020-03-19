import * as types from './types';

export const purchaseSubscription = param => ({
  type: types.PURCHASE_SUBSCRIPTION,
  payload: param,
});

export const setPurchaseProducts = products => ({
  type: types.SET_PURCHASE_PRODUCTS,
  payload: products,
});

export const loadingProducts = loading => ({
  type: loading ? types.API_CALLING : types.API_FINISHED,
});
