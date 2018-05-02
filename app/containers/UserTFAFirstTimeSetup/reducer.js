import { createReducer } from 'redux-act';

import {
  startEnablingTFALogin,
  performEnablingTFALogin,
  loginTFAEnableSuccess,
  loginTFAEnableError,
  updateQrCodeAndManual,
  openOTPModal,
  closeOTPModal,
  cancelOperation,
} from './actions';

const initialState = {
  enablingTFALogin: false,
  isEnablingTFALogin: false,
  qrCode: null,
  manualCode: null,
  isOTPModalOpen: false
};

const reducer = {
  [startEnablingTFALogin]: state => ({
    ...state,
    enablingTFALogin: true,
  }),
  [performEnablingTFALogin]: state => ({
    ...state,
    isEnablingTFALogin: true
  }),
  [loginTFAEnableSuccess]: state => ({
    ...state,
    enablingTFALogin: false,
    isEnablingTFALogin: false,
    isOTPModalOpen: false
  }),
  [loginTFAEnableError]: state => ({
    ...state,
    isEnablingTFALogin: false
  }),
  [updateQrCodeAndManual]: (state, { qrCode, manualCode }) => ({
    ...state,
    qrCode,
    manualCode
  }),
  [openOTPModal]: state => ({
    ...state,
    isOTPModalOpen: true
  }),
  [closeOTPModal]: state => ({
    ...state,
    isOTPModalOpen: false
  }),
  [cancelOperation]: state => ({
    ...state,
    isOTPModalOpen: false,
    enablingTFALogin: false
  })
};

export default createReducer(reducer, initialState);
