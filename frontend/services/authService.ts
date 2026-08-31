import { apiRequest } from "@/lib/api";

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export interface VerifyEmailData {
  email: string;
  code: string;
}

export interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface ResendVerificationCodeData {
  email: string;
}

export interface VerifyResetCodeData {
  email: string;
  code: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  email: string;
  code: string;
  password: string;
  confirmPassword: string;
}

export const authService = {
  register: (data: RegisterData) => {
    return apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  verifyEmail: (data: VerifyEmailData) => {
    return apiRequest("/auth/verify-email", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  resendVerificationCode: (
    data: ResendVerificationCodeData
  ) => {
    return apiRequest("/auth/resend-verification-code", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  login: (data: LoginData) => {
    return apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  verifyResetCode: (data: VerifyResetCodeData) => {
    return apiRequest("/auth/verify-reset-code", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  forgotPassword: (data: ForgotPasswordData) => {
    return apiRequest("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  resetPassword: (data: ResetPasswordData) => {
    return apiRequest("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};