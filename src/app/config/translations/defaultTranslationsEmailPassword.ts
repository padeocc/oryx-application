import { defaultTranslationsCommon } from './defaultTranslationsCommon';
import { defaultTranslationsEmailVerification } from './defaultTranslationsEmailVerification';

export const defaultTranslationsEmailPassword = {
  en: {
    ...defaultTranslationsCommon.en,
    ...defaultTranslationsEmailVerification.en,

    EMAIL_PASSWORD_EMAIL_LABEL: 'Email',
    EMAIL_PASSWORD_EMAIL_PLACEHOLDER: 'Email address',

    EMAIL_PASSWORD_PASSWORD_LABEL: 'Password',
    EMAIL_PASSWORD_PASSWORD_PLACEHOLDER: 'Password',

    EMAIL_PASSWORD_SIGN_IN_FORGOT_PW_LINK: 'Forgot password?',
    EMAIL_PASSWORD_SIGN_IN_SUBMIT_BTN: 'SIGN IN',
    EMAIL_PASSWORD_SIGN_IN_WRONG_CREDENTIALS_ERROR: 'Incorrect email and password combination',

    EMAIL_PASSWORD_SIGN_UP_SUBMIT_BTN: 'SIGN UP',

    EMAIL_PASSWORD_EMAIL_ALREADY_EXISTS: 'This email already exists. Please sign in instead',

    EMAIL_PASSWORD_RESET_HEADER_TITLE: 'Reset your password',
    EMAIL_PASSWORD_RESET_HEADER_SUBTITLE: 'We will send you an email to reset your password',
    EMAIL_PASSWORD_RESET_SEND_FALLBACK_EMAIL: 'your account',
    EMAIL_PASSWORD_RESET_SEND_BEFORE_EMAIL: 'A password reset email has been sent to ',
    EMAIL_PASSWORD_RESET_SEND_AFTER_EMAIL: ', if it exists in our system. ',
    EMAIL_PASSWORD_RESET_RESEND_LINK: 'Resend or change email',
    EMAIL_PASSWORD_RESET_SEND_BTN: 'Email me',
    EMAIL_PASSWORD_RESET_SIGN_IN_LINK: 'Sign In',

    EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_HEADER_TITLE: 'Success!',
    EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_DESC: 'Your password has been updated successfully',
    EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_SIGN_IN_BTN: 'SIGN IN',

    EMAIL_PASSWORD_NEW_PASSWORD_LABEL: 'New password',
    EMAIL_PASSWORD_NEW_PASSWORD_PLACEHOLDER: 'New password',
    EMAIL_PASSWORD_CONFIRM_PASSWORD_LABEL: 'Confirm password',
    EMAIL_PASSWORD_CONFIRM_PASSWORD_PLACEHOLDER: 'Confirm your password',

    EMAIL_PASSWORD_RESET_SUBMIT_PW_HEADER_TITLE: 'Change your password',
    EMAIL_PASSWORD_RESET_SUBMIT_PW_HEADER_SUBTITLE: 'Enter a new password below to change your password',
    EMAIL_PASSWORD_RESET_SUBMIT_PW_CHANGE_PW_BTN: 'CHANGE PASSWORD',
    EMAIL_PASSWORD_RESET_PASSWORD_INVALID_TOKEN_ERROR: 'Invalid password reset token',

    ERROR_EMAIL_NON_STRING: 'Email must be of type string',
    ERROR_EMAIL_INVALID: 'Email is invalid',

    ERROR_PASSWORD_NON_STRING: 'Password must be of type string',
    ERROR_PASSWORD_TOO_SHORT: 'Password must contain at least 8 characters, including a number',
    ERROR_PASSWORD_TOO_LONG: "Password's length must be lesser than 100 characters",
    ERROR_PASSWORD_NO_ALPHA: 'Password must contain at least one alphabet',
    ERROR_PASSWORD_NO_NUM: 'Password must contain at least one number',
    ERROR_CONFIRM_PASSWORD_NO_MATCH: "Confirmation password doesn't match",

    ERROR_NON_OPTIONAL: 'Field is not optional',

    /*
     * The following are error messages from our backend SDK.
     * These are returned as full messages to preserver compatibilty, but they work just like the keys above.
     * They are shown as is by default (setting the value to undefined will display the raw translation key)
     */
    'This email already exists. Please sign in instead.': undefined,
    'Field is not optional': undefined,
    'Password must contain at least 8 characters, including a number': undefined,
    "Password's length must be lesser than 100 characters": undefined,
    'Password must contain at least one alphabet': undefined,
    'Password must contain at least one number': undefined,
    'Email is invalid': undefined,
    'Reset password link was not created because of account take over risk. Please contact support. (ERR_CODE_001)':undefined,
    'Cannot sign up due to security reasons. Please try logging in, use a different login method or contact support. (ERR_CODE_007)':undefined,
    'Cannot sign in due to security reasons. Please try resetting your password, use a different login method or contact support. (ERR_CODE_008)':undefined,
    'Cannot sign in / up due to security reasons. Please contact support. (ERR_CODE_009)': undefined,
    'Cannot sign in / up due to security reasons. Please contact support. (ERR_CODE_010)': undefined,
    'Cannot sign in / up due to security reasons. Please contact support. (ERR_CODE_011)': undefined,
    'Cannot sign in / up due to security reasons. Please contact support. (ERR_CODE_012)': undefined,
    'Cannot sign in / up due to security reasons. Please contact support. (ERR_CODE_013)': undefined,
    'Cannot sign in / up due to security reasons. Please contact support. (ERR_CODE_014)': undefined,
    'Cannot sign in / up due to security reasons. Please contact support. (ERR_CODE_015)': undefined,
    'Cannot sign in / up due to security reasons. Please contact support. (ERR_CODE_016)': undefined
  },
  fr: {
    ...defaultTranslationsCommon.fr,
    ...defaultTranslationsEmailVerification.fr,

    EMAIL_PASSWORD_EMAIL_LABEL: 'E-mail',
    EMAIL_PASSWORD_EMAIL_PLACEHOLDER: 'Adresse e-mail',

    EMAIL_PASSWORD_PASSWORD_LABEL: 'Mot de passe',
    EMAIL_PASSWORD_PASSWORD_PLACEHOLDER: 'Mot de passe',

    EMAIL_PASSWORD_SIGN_IN_FORGOT_PW_LINK: 'Mot de passe oublié?',
    EMAIL_PASSWORD_SIGN_IN_SUBMIT_BTN: 'CONNEXION',
    EMAIL_PASSWORD_SIGN_IN_WRONG_CREDENTIALS_ERROR: 'Combinaison e-mail et mot de passe incorrecte',

    EMAIL_PASSWORD_SIGN_UP_SUBMIT_BTN: 'INSCRIPTION',

    EMAIL_PASSWORD_EMAIL_ALREADY_EXISTS: 'Cette adresse e-mail existe déjà. Veuillez vous connecter.',

    EMAIL_PASSWORD_RESET_HEADER_TITLE: 'Réinitialiser votre mot de passe',

    EMAIL_PASSWORD_RESET_HEADER_SUBTITLE: 'Nous vous enverrons un e-mail pour réinitialiser votre mot de passe',

    EMAIL_PASSWORD_RESET_SEND_FALLBACK_EMAIL: 'votre compte',

    EMAIL_PASSWORD_RESET_SEND_BEFORE_EMAIL: 'Un e-mail de réinitialisation de mot de passe a été envoyé à',

    EMAIL_PASSWORD_RESET_SEND_AFTER_EMAIL: "s'il existe dans notre système.",

    EMAIL_PASSWORD_RESET_RESEND_LINK: "Renvoyer ou modifier l'adresse e-mail",

    EMAIL_PASSWORD_RESET_SEND_BTN: 'Envoyez-moi un e-mail',
    EMAIL_PASSWORD_RESET_SIGN_IN_LINK: 'Connexion',

    EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_HEADER_TITLE: 'Réussi!',
    EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_DESC: 'Votre mot de passe a été mis à jour avec succès',
    EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_SIGN_IN_BTN: 'CONNEXION',

    EMAIL_PASSWORD_NEW_PASSWORD_LABEL: 'Nouveau mot de passe',
    EMAIL_PASSWORD_NEW_PASSWORD_PLACEHOLDER: 'Nouveau mot de passe',
    EMAIL_PASSWORD_CONFIRM_PASSWORD_LABEL: 'Confirmer le mot de passe',
    EMAIL_PASSWORD_CONFIRM_PASSWORD_PLACEHOLDER: 'Confirmer votre mot de passe',

    EMAIL_PASSWORD_RESET_SUBMIT_PW_HEADER_TITLE: 'Modifiez votre mot de passe',
    EMAIL_PASSWORD_RESET_SUBMIT_PW_HEADER_SUBTITLE: 'Saisissez un nouveau mot de passe ci-dessous pour le modifier',
    EMAIL_PASSWORD_RESET_SUBMIT_PW_CHANGE_PW_BTN: 'CHANGER LE MOT DE PASSE',
    EMAIL_PASSWORD_RESET_PASSWORD_INVALID_TOKEN_ERROR: 'Jeton de réinitialisation de mot de passe non valide',

    ERROR_EMAIL_NON_STRING: "L'adresse e-mail doit être de type chaîne",
    ERROR_EMAIL_INVALID: "L'adresse e-mail est invalide",

    ERROR_PASSWORD_NON_STRING: 'Le mot de passe doit être de type chaîne',
    ERROR_PASSWORD_TOO_SHORT: 'Le mot de passe doit contenir au moins 8 caractères, dont un number',
    ERROR_PASSWORD_TOO_LONG: 'Le mot de passe doit contenir moins de 100 caractères',
    ERROR_PASSWORD_NO_ALPHA: 'Le mot de passe doit contenir au moins une lettre',
    ERROR_PASSWORD_NO_NUM: 'Le mot de passe doit contenir au moins un chiffre',
    ERROR_CONFIRM_PASSWORD_NO_MATCH: 'Le mot de passe de confirmation ne correspond pas',

    ERROR_NON_OPTIONAL: "Ce champ n'est pas facultatif",

    FIRSTNAME_LABEL: "Prénom",
    FIRSTNAME_PLACEHOLDER: "Choisissez un prénom",
    LASTNAME_LABEL: "Nom",
    LASTNAME_PLACEHOLDER: "Choisissez un nom",
    PSEUDO_LABEL: "Pseudo",
    PSEUDO_PLACEHOLDER: "Choisissez un pseudo",
    /*
     * Voici les messages d'erreur de notre SDK backend.
     * Ils sont renvoyés sous forme de messages complets pour la compatibilité du conservateur, mais ils fonctionnent comme les clés ci-dessus. * Ils sont affichés tels quels par défaut (la valeur "undefined" affichera la clé de traduction brute).
     */
    'Cette adresse e-mail existe déjà. Veuillez vous connecter.': undefined,
    "Ce champ n'est pas facultatif": undefined,
    'Le mot de passe doit contenir au moins 8caractères, dont un chiffre': undefined,
    "Le mot de passe doit contenir au moins une lettre de l'alphabet": undefined,
    'Le mot de passe doit contenir au moins un chiffre': undefined,
    "L'adresse e-mail est invalide": undefined,
    "Le lien de réinitialisation du mot de passe n'a pas été créé en raison d'un risque de piratage de compte. Veuillez contacter l'assistance. (ERR_CODE_001)":undefined,
    "Inscription impossible pour des raisons de sécurité. Veuillez essayer de vous connecter, utiliser une autre méthode de connexion ou contacter l'assistance. (ERR_CODE_007)":undefined,
    "Connexion impossible pour des raisons de sécurité. Veuillez essayer de réinitialiser votre mot de passe, utiliser une autre méthode de connexion ou contacter l'assistance. (ERR_CODE_008)":undefined,
    'Impossible de se connecter/se créer pour des raisons de sécurité. Veuillez contacter le support. (ERR_CODE_009)':undefined,
    'Impossible de se connecter/se créer pour des raisons de sécurité. Veuillez contacter le support. (ERR_CODE_010)':undefined,
    'Impossible de se connecter/se créer pour des raisons de sécurité. Veuillez contacter le support. (ERR_CODE_011)':undefined,
    'Impossible de se connecter/se créer pour des raisons de sécurité. Veuillez contacter le support. (ERR_CODE_012)':undefined,
    'Impossible de se connecter/se créer pour des raisons de sécurité. Veuillez contacter le support. (ERR_CODE_013)':undefined,
    'Impossible de se connecter/se créer pour des raisons de sécurité. Veuillez contacter le support. (ERR_CODE_014)':undefined,
    'Impossible de se connecter/se créer pour des raisons de sécurité. Veuillez contacter le support. (ERR_CODE_015)':undefined,
    'Impossible de se connecter/se créer pour des raisons de sécurité. Veuillez contacter le support. (ERR_CODE_016)':undefined
  }
};
