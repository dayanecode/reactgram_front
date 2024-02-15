// Utilização do Redux
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// É do services que sai as funções pra gente executar as coisas do sistema que correspondem a esse slice
import authService from "../services/authService";

// Vou tentar pegar o usuário
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: user ? user : null,
    error: false,
    success: false,
    loading: false,
};

// Register an user and sign in
// Vamos exportar as funções e criar as funções com AsyncThunk. 
export const register = createAsyncThunk(
    // O nome segue uma convenção: "auth" é o nome da entidade e "register" é a ação atual
    "auth/register",
    // Função assíncrona, vamos poder receber o usuário e a thunkAPI nos permite executar algumas funções extras como parar a execução e identificar um erro da API
    async (user, thunkAPI) => {
        // Vamos passar o usuário criado no componente Register
        const data = await authService.register(user);

        // check for errors 
        if (data.errors) {
            // Estou rejeitando essa requisição, porque houve alguma coisa errada. 
            return thunkAPI.rejectWithValue(data.errors[0]);
        }

        return data;
    }
);

// Vamos exportar o authSlice
export const authSlice = createSlice({
    // nomear essse cara, porque é assim que ele vai se chamar no Store, daí eu consigo extrair os valores por meio desse nome.
    name: "auth",
    // Preciso passar o estado inicial
    initialState,
    reducers: {
        // A função 'reset' reseta todos os estados como no início. Quando eu quero limpar componente e zerar ele como se eu estivesse recarregando a página
        reset: (state) => {
            state.loading = false;
            state.error = false;
            state.success = false;
        },
    },
    // Esses daqui vão ser parte das execuções que a gente faz na API. Vão trabalhar diretamente com o estado atual de cada requisição. o 
    extraReducers: (builder) => {
        // Se  a requisição não tiver nenhuma resposta (estiver pendente) eu quero que:
        builder.addCase(register.pending, (state) => {
            state.loading = true;
            state.error = false;
            // fullfilled é quando eu vou ter um estado e uma ação que está vindo lá dos dados 
        }).addCase(register.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            // basicamente eu também consigo trafegar dados por aqui, consigo pegar os dados do usuário por aqui.
            state.user = action.payload;
            // Eu identifico o erro e rejeito.
        }).addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.user = null;
        });
    },
});
// Exportar o authSlice.actions e eu posso ter várias actions e vamos criar outras inclusive
export const { reset } = authSlice.actions
// O slice nada mais é do que reducer
export default authSlice.reducer;
