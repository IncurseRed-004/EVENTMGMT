import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        users: JSON.parse(localStorage.getItem("users")) || [],
        user: JSON.parse(localStorage.getItem("user")) || null,
        isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated")) || false,
    },
    reducers: {
        userRegister: (state, action) => {
            state.users.push(action.payload);
            localStorage.setItem("users", JSON.stringify(state.users))
        },
        userLogin: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem("user", JSON.stringify(state.user));
            localStorage.setItem("isAuthenticated", JSON.stringify(state.isAuthenticated));
        },
        userLogout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem("user");
            localStorage.removeItem("isAuthenticated");
        },
        deleteUser: (state, action) => {
            state.users = state.users.filter(
                (user) => user.id !== action.payload
            );
            localStorage.setItem("users", JSON.stringify(state.users))
        },
        toggleUserStatus: (state, action) => {
            const user = state.users.find(
                (user) => user.id === action.payload
            );

            if (user) {
                user.status = !user.status;

                localStorage.setItem("users", JSON.stringify(state.users));

                if (state.user && state.user.id === user.id) {
                    state.user.status = user.status;
                    localStorage.setItem("user", JSON.stringify(state.user));
                }
            }
        },
        changeUserRole: (state, action) => {
            const userIndex = state.users.findIndex((u) => u.id === action.payload.id);
            if (userIndex !== -1) {
                state.users[userIndex].role = action.payload.role;
                localStorage.setItem("users", JSON.stringify(state.users));
            }
            if (state.user.id === action.payload.id) {
                state.user.role = action.payload.role;
                localStorage.setItem("user", JSON.stringify(state.user));
            }
        },
        editUser: (state, action) => {
            const userIndex = state.users.findIndex((u) => u.id === action.payload.id);

            if (userIndex !== -1) {
                state.users[userIndex] = action.payload;
                localStorage.setItem("users",JSON.stringify(state.users));
            }

            if (state.user && state.user.id === action.payload.id) {
                state.user = action.payload;
                localStorage.setItem("user",JSON.stringify(state.user));
            }

        },
        
    }

});

export const { userRegister, userLogin, userLogout, deleteUser, toggleUserStatus, changeUserRole ,editUser  } = userSlice.actions;
export default userSlice.reducer;