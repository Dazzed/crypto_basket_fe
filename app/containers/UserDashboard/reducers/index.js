import { createReducer } from 'redux-act';

import { commonReducer } from './common';
import { twoFactorAuthReducer } from './twoFactorAuthReducer';
import { changePasswordReducer } from './changePasswordReducer';

const initialState = {
  enablingTFALogin: false,
  enablingTFAWithdrawal: false,
  isEnablingTFALogin: false,
  isEnablingTFAWithdrawal: false,
  disablingTFALogin: false,
  disablingTFAWithdrawal: false,
  isDisablingTFALogin: false,
  isDisablingTFAWithdrawal: false,
  qrCode: null,
  manualCode: null,
  isOTPModalOpen: false,
  // activeTfaToggleKey ~> value is set if enabling one flag to active when another is also active
  activeTfaToggleKey: null,
  // change password keys
  changingPassword: false,
  isChangingPassword: false,
  // user keys
  isPatchingUser: false
};

const reducer = {
  ...commonReducer,
  ...twoFactorAuthReducer,
  ...changePasswordReducer
};

export default createReducer(reducer, initialState);
