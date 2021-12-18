export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A properly formatted email address */
  Email: string;
  /** An ISO 8601-encoded datetime */
  ISO8601DateTime: string;
  /** An Int with a value >= 0 */
  NonNegativeInt: number;
  /** A nil value */
  Void: void;
};




/** Problem code for the deviceRefreshToken mutation */
export enum DeviceRefreshTokenProblemCode {
  /** Occurs when a device is no longer able to be refreshed */
  DeviceExpired = 'DEVICE_EXPIRED',
  /** Occurs when the given refreshToken is invalid */
  InvalidToken = 'INVALID_TOKEN'
}




export enum LocaleEnum {
  UsEnglish = 'US_ENGLISH'
}










/** Problem code for the userResetPassword mutation */
export enum UserResetPasswordProblemCode {
  /** Occurs when the given token is invalid */
  InvalidToken = 'INVALID_TOKEN'
}

