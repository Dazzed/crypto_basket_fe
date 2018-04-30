import { createReducer } from 'redux-act';

import {
  initiateOnboarding,
  initiateOnboardingSuccess,
  initiateOnboardingError,
  completeOnboarding,
  completeOnboardingSuccess,
  completeOnboardingError,
  submitFormOne,
  openTfaModal,
  closeTfaModal,
  toggleSeenTfaModal
} from './actions';

const initialState = {
  currentUser: null,
  verificationToken: null,
  isInitiatingOnboarding: true,
  isCompletingOnboarding: false,
  qrCode: null,
  manualCode: null,
  hasSubmittedFormOne: false,
  isTfaModalOpen: false,
  hasSeenTfaModal: false
};

const reducer = {
  [initiateOnboarding]: state => ({
    ...state,
    isInitiatingOnboarding: true
  }),
  [initiateOnboardingSuccess]: (state, payload) => ({
    ...state,
    isInitiatingOnboarding: false,
    currentUser: payload.currentUser,
    qrCode: payload.qrCode,
    manualCode: payload.manualCode,
    verificationToken: payload.verificationToken
  }),
  [initiateOnboardingError]: state => ({
    ...state,
    isInitiatingOnboarding: false,
  }),
  [submitFormOne]: state => ({
    ...state,
    hasSubmittedFormOne: true
  }),
  [completeOnboarding]: state => ({
    ...state,
    isCompletingOnboarding: true,
  }),
  [completeOnboardingSuccess]: state => ({
    ...state,
    isCompletingOnboarding: false
  }),
  [completeOnboardingError]: state => ({
    ...state,
    isCompletingOnboarding: false
  }),
  [openTfaModal]: state => ({
    ...state,
    isTfaModalOpen: true
  }),
  [closeTfaModal]: state => ({
    ...state,
    isTfaModalOpen: false
  }),
  [toggleSeenTfaModal]: state => ({
    ...state,
    hasSeenTfaModal: true
  })
};

export default createReducer(reducer, initialState);
