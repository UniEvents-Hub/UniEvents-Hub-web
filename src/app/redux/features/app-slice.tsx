import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/app/models/user";


type InitialState = {
    auth: AuthState;
    userData: User | undefined;
    accessToken: string;
    selectedRouteName: string;
    isAppInit: boolean;
    Loading: {
        isLoading: boolean;
        message: string;
    };
};

type AuthState = {
    isAuth: boolean;
};

const initialState = {
    auth: {
        isAuth: false,
        user: undefined,
    } as AuthState,
    Loading: {
        isLoading: false,
        message: "",
    },
    accessToken: '',
    userData: undefined,
    userPasses: [],
    selectedRouteName: '',
    isAppInit: false,
    selectedTag: 'all',
} as InitialState;

export const appSlice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        logOut: (state) => {
            state.auth = initialState.auth;
            state.userData = initialState.userData;
            state.accessToken = initialState.accessToken;
        },
        logIn: (state, action: PayloadAction<any>) => {
            state.auth.isAuth = true;
            //   state.auth.user = action.payload;
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
        userDetails: (state, action: PayloadAction<User>) => {
            state.userData = action.payload;
        },
        setSelectedRoute: (state, action: PayloadAction<string>) => {
            state.selectedRouteName = action.payload
        },
        startLoader: (state, action: PayloadAction<string>) => {
            state.Loading.isLoading = true;
            state.Loading.message = action.payload ?? "";
        },
        stopLoader: (state) => {
            state.Loading.isLoading = false;
            state.Loading.message = "";
        },

        appInitialized: (state) => {
            state.isAppInit = true;
        },
    },
});

export const {
    logIn,
    logOut,
    userDetails,
    setToken,
    setSelectedRoute,
    startLoader,
    stopLoader,
    appInitialized,
} = appSlice.actions;
export default appSlice.reducer;
