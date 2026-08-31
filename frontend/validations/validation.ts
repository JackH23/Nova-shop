export const validation = {
  required(value: string, fieldName: string) {
    if (!value.trim()) {
      return `${fieldName} is required`;
    }

    return "";
  },

  email(value: string) {
    if (!value.trim()) {
      return "Email is required";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "Invalid email address";
    }

    return "";
  },

  password(value: string) {
    if (!value) {
      return "Password is required";
    }

    if (value.length < 8) {
      return "Password must be at least 8 characters";
    }

    return "";
  },

  confirmPassword(password: string, confirmPassword: string) {
    if (!confirmPassword) {
      return "Confirm password is required";
    }

    if (password !== confirmPassword) {
      return "Passwords do not match";
    }

    return "";
  },
};