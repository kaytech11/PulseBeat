import axiosInstance from "../api/axios";

interface RegisterData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
}

interface LoginData {
    email: string;
    password: string;

}

interface GoogleRegisterData {
    token: string;
    role: string;
}

interface GoogleLoginData {
    token: string;
}

export const  registerUser = async  (
    data: RegisterData
) => {
    const response = await axiosInstance.post(
        "/auth/register",
        data
    );
    return response.data;
};


export const loginUser = async (
    data: LoginData
) => {
    const response = await axiosInstance.post(
        "/auth/login",
        data
    );
    return response.data;
}

export const googleRegisterUser = async (
    data: GoogleRegisterData
) => {
    const response = await axiosInstance.post(
        "/auth/google/register",
        data
    );
    return response.data;
}

export const googleLoginUser = async (  
    data: GoogleLoginData
) => {
    const response = await axiosInstance.post(
        "/auth/google/login",
        data
    );
    return response.data;
}

export const resendVerificationEmail = async (
    email: string
) => {
    const response = await axiosInstance.post(
        "/auth/resend-verification",
        {email}
    );

    return response.data;
};

export const forgotPassword = async (
    email: string
) => {
    const response = await axiosInstance.post(
        "auth/forgot-password",
        {email}
    );

    return response.data;
};

export const resetPassword = async (
  token: string,
  password: string,
  confirmPassword: string
) => {
  const response = await axiosInstance.post(
    "/auth/reset-password",
    {
      token,
      password,
      confirmPassword,
    }
  );

  return response.data;
};
