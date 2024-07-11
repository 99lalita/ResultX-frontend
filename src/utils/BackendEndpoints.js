const BackendEndpoints = {
  // Student Sign up and Login Module Backend Endpoints
  REACT_APP_STUDENT_REGISTRATION_API:
    "http://localhost:9000/api/v1/auth/student/signup",
  REACT_APP_STUDENT_LOGIN_API:
    "http://localhost:9000/api/v1/auth/student/login",
  REACT_APP_STUDENT_LOGOUT_API:
    "http://localhost:9000/api/v1/auth/student/logout",
  REACT_APP_GET_REFRESH_AUTH_STUDENT_TOKEN_API:
    "http://localhost:9000/api/v1/auth/student/refresh",

  // Admin Sign up and Login Module Backend Endpoints
  REACT_APP_ADMIN_REGISTRATION_API:
    "http://localhost:9000/api/v1/auth/admin/signup",
  REACT_APP_ADMIN_LOGIN_API: "http://localhost:9000/api/v1/auth/admin/login",
  REACT_APP_ADMIN_LOGOUT_API: "http://localhost:9000/api/v1/auth/admin/logout",
  REACT_APP_GET_REFRESH_AUTH_ADMIN_TOKEN_API:
    "http://localhost:9000/api/v1/auth/admin/refresh",

  // student Dashboard Backend Endpoints
  // STUDENT_ACCOUNT_DATA:
  //   "http://localhost:9000/api/v2/student/result/retrieve/:year",
  STUDENT_ACCOUNT_FIRSTYEARRESULT_UPLOAD:
    "http://localhost:9000/api/v2/student/result/firstyearresult",
  STUDENT_ACCOUNT_SECONDYEARRESULT_UPLOAD:
    "http://localhost:9000/api/v2/student/result/secondyearresult",
  STUDENT_ACCOUNT_THIRDYEARRESULT_UPLOAD:
    "http://localhost:9000/api/v2/student/result/thirdyearresult",
  STUDENT_ACCOUNT_FINALYEARRESULT_UPLOAD:
    "http://localhost:9000/api/v2/student/result/fourthyearresult",

  // Admin Dashboard Backend Endpoints
  // ADMIN_ACCOUNT_RESULT_ANALYSIS_FETCH_API:
  //   "http://localhost:9000/api/v2/admin/account/result/:batchYear/:resultYear",

  // Tokens
  AUTH_ADMIN_ACCESS_TOKEN:
    "C*F-JaNdRgUkXp2s5u8x/A?D(G+KbPeShVmYq3t6w9y$B&E)H@McQfTjWnZr4u7x!A%C*F-JaNdRgUkXp2s5v8y/B?E(G+KbPeShVmYq3t6w9z$C&F)J@McQfTjWnZr4",
  AUTH_ADMIN_REFRESH_TOKEN:
    "gUkXp2r5u8x/A?D(G+KbPeShVmYq3t6v9y$B&E)H@McQfTjWnZr4u7x!z%C*F-JaNdRgUkXp2s5v8y/B?D(G+KbPeShVmYq3t6w9z$C&F)H@McQfTjWnZr4u7x!A%D*G",
  ADMIN:
    "KaPdRgUkXp2s5v8y/B?E(H+MbQeThVmYq3t6w9z$C&F)J@NcRfUjXnZr4u7x!A%D*G-KaPdSgVkYp3s5v8y/B?E(H+MbQeThWmZq4t7w9z$C&F)J@NcRfUjXn2r5u8x/",
  STUDENT:
    "TjWnZr4u7w!z%C*F-JaNdRgUkXp2s5v8y/A?D(G+KbPeShVmYq3t6w9z$C&E)H@McQfTjWnZr4u7x!A%D*G-JaNdRgUkXp2s5v8y/B?E(H+MbPeShVmYq3t6w9z$C&F)",
  AUTH_STUDENT_ACCESS_TOKEN:
    "Zq4t7w9z$C&F)J@NcRfUjXn2r5u8x/A%D*G-KaPdSgVkYp3s6v9y$B&E(H+MbQeThWmZq4t7w!z%C*F-J@NcRfUjXn2r5u8x/A?D(G+KbPdSgVkYp3s6v9y$B&E)H@Mc",
  AUTH_STUDENT_REFRESH_TOKEN:
    "RgUkXp2s5v8y/B?D(G+KbPeShVmYq3t6w9z$C&F)H@McQfTjWnZr4u7x!A%D*G-KaNdRgUkXp2s5v8y/B?E(H+MbQeShVmYq3t6w9z$C&F)J@NcRfUjWnZr4u7x!A%D*",
};

export default BackendEndpoints;
