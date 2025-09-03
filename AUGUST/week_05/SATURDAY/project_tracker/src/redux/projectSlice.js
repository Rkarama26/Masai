import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";



const baseURL = "https://auth-d2bdd-default-rtdb.firebaseio.com/projects.json"

//thunks
export const fetchProjects = createAsyncThunk(
    "projects/fetchProjects",
    async () => {
        const res = await axios.get(baseURL);
        return res.data || {};
    }
);

// Add new project
export const addProject = createAsyncThunk(
    "projects/addProject",
    async (project) => {
        const newProject = { ...project, createdAt: new Date().toISOString(), tasks: {} };
        const res = await axios.post(baseURL, newProject);
        return { id: res.data.name, ...newProject };
    }
);
// Edit project
export const editProject = createAsyncThunk(
    "projects/editProject",
    async ({ id, updates }) => {
        await axios.patch(baseURL, updates);
        return { id, updates };
    }
);

// delete projects
export const deleteProject = createAsyncThunk(
    "projects/deleteProject",
    async (id) => {
        await axios.delete(baseURL);
        return id;
    }
);


// add task
export const addTask = createAsyncThunk(
    "projects/addTask",
    async ({ projectId, task }) => {
        const newTask = { ...task, completed: false, createdAt: new Date().toISOString() };
        const res = await axios.post(`https://auth-d2bdd-default-rtdb.firebaseio.com/projects/${projectId}/tasks.json`, newTask);
        return { projectId, taskId: res.data.name, task: newTask };
    }
);

// Edit task
export const editTask = createAsyncThunk(
    "projects/editTask",
    async ({ projectId, taskId, updates }) => {
        await axios.patch(`https://auth-d2bdd-default-rtdb.firebaseio.com/projects/${projectId}/tasks/${taskId}.json`, updates);
        return { projectId, taskId, updates };
    }
);

// Delete task
export const deleteTask = createAsyncThunk(
    "projects/deleteTask",
    async ({ projectId, taskId }) => {
        await axios.delete(`https://auth-d2bdd-default-rtdb.firebaseio.com/projects/${projectId}/tasks/${taskId}.json`);
        return { projectId, taskId };
    }
);


const initialState = {
    items: {},
    loading: false,
    error: null,
}


//slice 
const projectSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            //fetch 
            .addCase(fetchProjects.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Add
            .addCase(addProject.fulfilled, (state, action) => {
                state.items[action.payload.id] = {
                    title: action.payload.title,
                    description: action.payload.description,
                    createdAt: action.payload.createdAt,
                    tasks: {}
                };
            })

            //edit
            .addCase(editProject.fulfilled, (state, action) => {
                const { id, updates } = action.payload;
                state.items[id] = { ...state.items[id], ...updates };
            })

            //delete 
            .addCase(deleteProject.fulfilled, (state, action) => {
                delete state.items[action.payload];
            })

            .addCase(addTask.fulfilled, (state, action) => {
                const { projectId, taskId, task } = action.payload;
                if (!state.items[projectId].tasks) state.items[projectId].tasks = {};
                state.items[projectId].tasks[taskId] = task;
            })


            .addCase(editTask.fulfilled, (state, action) => {
                const { projectId, taskId, updates } = action.payload;
                state.items[projectId].tasks[taskId] = { ...state.items[projectId].tasks[taskId], ...updates };
            })

        .addCase(deleteTask.fulfilled, (state, action) => {
            const { projectId, taskId } = action.payload;
            delete state.items[projectId].tasks[taskId];
        })


}
});
export default projectSlice.reducer;
