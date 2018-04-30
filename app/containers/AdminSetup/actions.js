import { createAction } from 'redux-act';

export const PREFIX = 'APP_ADMIN_SETUP';

export const initiateOnboarding = createAction(
  `${PREFIX}_INITIATE_ONBOARDING`,
  verificationToken => verificationToken
);

export const initiateOnboardingSuccess = createAction(
  `${PREFIX}_INITIATE_ONBOARDING_SUCCESS`,
  (currentUser, qrCode, manualCode, verificationToken) => ({
    currentUser,
    qrCode,
    manualCode,
    verificationToken
  })
);

export const initiateOnboardingError = createAction(
  `${PREFIX}_INITIATE_ONBOARDING_ERROR`,
);

export const completeOnboarding = createAction(
  `${PREFIX}_COMPLETE_ONBOARDING`,
  (verificationToken, username, password, otp) => ({
    verificationToken,
    username,
    password,
    otp
  })
);

export const completeOnboardingSuccess = createAction(
  `${PREFIX}_COMPLETE_ONBOARDING_SUCCESS`,
  (currentUser, accessToken) => ({
    currentUser,
    accessToken
  })
);

export const completeOnboardingError = createAction(
  `${PREFIX}_COMPLETE_ONBOARDING_ERROR`
);

export const submitFormOne = createAction(
  `${PREFIX}_SUBMIT_FORM_ONE`
);

export const openTfaModal = createAction(
  `${PREFIX}_OPEN_TFA_MODAL`
);

export const closeTfaModal = createAction(
  `${PREFIX}_CLOSE_TFA_MODAL`
);

export const toggleSeenTfaModal = createAction(
  `${PREFIX}_TOGGLE_SEEN_TFA_MODAL`
);
