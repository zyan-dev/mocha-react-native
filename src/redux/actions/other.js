import codePush from 'react-native-code-push';
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

export const updateAnalyzeStatus = param => ({
  type: types.UPDATE_COMMITS,
  payload: param,
});

export const getUserCommits = userId => ({
  type: types.GET_USER_COMMITS,
  payload: userId,
});

export const showUserHabits = show => ({
  type: types.SHOW_USER_HABITS,
  payload: show,
});

export const setProfileLayout = layout => ({
  type: types.SET_PROFILE_LAYOUT,
  payload: layout,
});

export const trackEvent = param => ({
  type: types.TRACK_MIXPANEL_EVENT,
  payload: param,
});

export const addFavoriteTool = card => ({
  type: types.ADD_FAVORITE_TOOL,
  payload: card,
});

export const removeFavoriteTool = card => ({
  type: types.REMOVE_FAVORITE_TOOL,
  payload: card,
});

export const setFavoriteTools = cards => ({
  type: types.SET_FAVORITE_TOOLS,
  payload: cards,
});

export const changeProfileTab = key => ({
  type: types.SET_PROFILE_TAB,
  payload: key,
});

export const changeToolsTab = key => ({
  type: types.SET_TOOLS_TAB,
  payload: key,
});

export const checkCompletedBasicProfile = () => ({
  type: types.CHECK_COMPLETED_BASIC_PROFILE,
});

export const checkWelcomeBasicProfile = () => ({
  type: types.CHECK_WELCOME_BASIC_PROFILE,
});

export const checkWelcomeAdvanceProfile = () => ({
  type: types.CHECK_WELCOME_ADVANCE_PROFILE,
});

export const checkCompletedAdvanceProfile = () => ({
  type: types.CHECK_COMPLETED_ADVANCE_PROFILE,
});

export const checkCompletedExpertProfile = () => ({
  type: types.CHECK_COMPLETED_EXPERT_PROFILE,
});

export const sendEmail = data => ({
  type: types.SEND_EMAIL,
  payload: data,
});

export const toggleCrown = flag => ({
  type: types.PROFILE_CROWN_TOGGLE,
  payload: flag,
});

export const setCodePushStatus = status => ({
  type: types.SET_CODEPUSH_STATUS,
  payload: status,
});

export const checkCodePushUpdates = () => dispatch => {
  codePush.sync(
    {
      updateDialog: {title: 'CodePush update available'},
      installMode: codePush.InstallMode.IMMEDIATE,
    },
    status => {
      switch (status) {
        case codePush.SyncStatus.CHECKING_FOR_UPDATE:
          dispatch(setCodePushStatus('codepush_checking_for_update'));
          break;
        case codePush.SyncStatus.DOWNLOADING_PACKAGE:
          dispatch(setCodePushStatus('codepush_downloading_package'));
          break;
        case codePush.SyncStatus.INSTALLING_UPDATE:
          dispatch(setCodePushStatus('codepush_installing_update'));
          break;
        case codePush.SyncStatus.UP_TO_DATE:
          dispatch(setCodePushStatus('codepush_up_to_date'));
          break;
        case codePush.SyncStatus.UPDATE_INSTALLED:
          dispatch(setCodePushStatus('codepush_update_installed'));
          break;
      }
    },
  );
};
