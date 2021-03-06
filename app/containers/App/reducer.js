import { createReducer } from 'redux-act';

import {
  loginTFAEnableSuccess,
  loginTFADisableSuccess,
  withdrawalTFAEnableSuccess,
  withdrawalTFADisableSuccess
} from 'containers/UserDashboard/actions/twoFactorAuthActions';

import {
  tfaAdminEnableSuccess
} from 'containers/AdminDashboard/actions/twoFactorAuth';

import {
  patchUserSuccess,
  uploadIdentitySuccess,
  uploadProofSuccess
} from 'containers/UserDashboard/actions/common';

import {
  loginTFAEnableSuccess as toggleFirstTimeLogin
} from 'containers/UserTFAFirstTimeSetup/actions';

import {
  initiateTradeSuccess
} from 'containers/UserDashboard/actions/buyActions';

import {
  authSucess,
  authFailure,
  logOutRequest,
  logOutSuccess,
  logOutFailure,
  openFeedbackModal,
  closeFeedbackModal,
  submitFeedback,
  submitFeedbackSuccess,
  submitFeedbackError,
  changeVerificationStatus,
  onResizeWindow
} from './actions';

const initialState = {
  currentUser: null,
  isAuthenticated: false,
  isAuthenticating: true,
  isLoggingOut: false,
  feedbackModalOpen: false,
  isSubmittingFeedback: false,
  windowInnerWidth: window.innerWidth
};

const reducer = {
  [onResizeWindow]: state => ({
    ...state,
    windowInnerWidth: window.innerWidth
  }),
  [authFailure]: state => ({
    ...state,
    isAuthenticating: false,
    isAuthenticated: false
  }),
  [authSucess]: (state, currentUser) => {
    const roleObject = {};
    if (!currentUser) {
      return {
        ...state
      };
    }
    const { roleMapping } = currentUser;
    if (roleMapping) {
      if (roleMapping.role.name === 'SUPER_ADMIN') {
        roleObject.isSuperAdmin = true;
      } else if (roleMapping.role.name === 'ADMIN') {
        roleObject.isAdmin = true;
      }
    }
    return {
      ...state,
      isAuthenticating: false,
      isAuthenticated: true,
      currentUser: {
        ...currentUser,
        ...roleObject
      },
    };
  },
  [logOutRequest]: state => ({
    ...state,
    isLoggingOut: true
  }),
  [logOutSuccess]: state => ({
    ...state,
    currentUser: null,
    isAuthenticated: false,
    isLoggingOut: false
  }),
  [logOutFailure]: state => ({
    ...state,
    isLoggingOut: false
  }),
  // TFA actions
  [loginTFAEnableSuccess]: state => ({
    ...state,
    currentUser: {
      ...state.currentUser,
      twoFactorLoginEnabled: true
    }
  }),
  [loginTFADisableSuccess]: state => ({
    ...state,
    currentUser: {
      ...state.currentUser,
      twoFactorLoginEnabled: false
    }
  }),
  [withdrawalTFAEnableSuccess]: state => ({
    ...state,
    currentUser: {
      ...state.currentUser,
      twoFactorWithdrawalEnabled: true
    }
  }),
  [withdrawalTFADisableSuccess]: state => ({
    ...state,
    currentUser: {
      ...state.currentUser,
      twoFactorWithdrawalEnabled: false
    }
  }),
  [tfaAdminEnableSuccess]: state => ({
    ...state,
    currentUser: {
      ...state.currentUser,
      twoFactorCreateAdminEnabled: true
    }
  }),
  [patchUserSuccess]: (state, updatedUser) => ({
    ...state,
    currentUser: {
      ...state.currentUser,
      ...updatedUser
    }
  }),
  [toggleFirstTimeLogin]: state => ({
    ...state,
    currentUser: {
      ...state.currentUser,
      isLoggingInFirstTime: false
    }
  }),
  [initiateTradeSuccess]: (state, { results, myWallets }) => ({
    ...state,
    currentUser: {
      ...state.currentUser,
      trades: state.currentUser.trades ? state.currentUser.trades.concat(results) : state.currentUser.trades,
      wallets: myWallets || state.currentUser.wallets
    }
  }),
  [openFeedbackModal]: state => ({
    ...state,
    feedbackModalOpen: true
  }),
  [closeFeedbackModal]: state => ({
    ...state,
    feedbackModalOpen: false
  }),
  [submitFeedback]: state => ({
    ...state,
    isSubmittingFeedback: true
  }),
  [submitFeedbackSuccess]: state => ({
    ...state,
    isSubmittingFeedback: false,
    feedbackModalOpen: false
  }),
  [submitFeedbackError]: state => ({
    ...state,
    isSubmittingFeedback: false,
    feedbackModalOpen: false
  }),
  [uploadIdentitySuccess]: (state, documentObject) => ({
    ...state,
    currentUser: {
      ...state.currentUser,
      documents: state.currentUser.documents
        .filter(d => d.type !== documentObject.type)
        .concat(documentObject)
    }
  }),
  [uploadProofSuccess]: (state, documentObject) => ({
    ...state,
    currentUser: {
      ...state.currentUser,
      documents: state.currentUser.documents
        .filter(d => d.type !== documentObject.type)
        .concat(documentObject)
    }
  }),
  [changeVerificationStatus]: (state, verificationStatus) => ({
    ...state,
    currentUser: {
      ...state.currentUser,
      verificationStatus
    }
  })
};

export default createReducer(reducer, initialState);
