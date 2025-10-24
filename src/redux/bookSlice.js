import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
    books:[],
    sortingCriteria:'title',
    error:'',
    loading:false,
    order: 'asc'
}

export const fetchApi = createAsyncThunk('books/fetchBooks',async()=>{
      const booksResponse = await fetch('https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=dDdJMebbYWMHsLGmmznTJcWgi9F9TJsx');
      const books =await booksResponse.json();
     return books.results?.lists[0]?.books;  
})


const bookSlice = createSlice({
    name:'books',
    initialState,
    reducers: {
        sortBooks: (state)=>{
         state.books.sort((a,b)=>{
                let valA = a[state.sortingCriteria].toLowerCase()|| '';
                let valB = b[state.sortingCriteria].toLowerCase() || '';
                if(valA>valB) return state.order==='asc'?1:-1;
                if(valB>valA) return state.order==='asc'?-1:1;
                return 0;
            })
        },
        setSortCriteria: (state,action)=>{
            state.sortingCriteria = action.payload;
            bookSlice.caseReducers.sortBooks(state);
        },
        setSortOrder: (state,action)=>{
            state.order = action.payload;
            bookSlice.caseReducers.sortBooks(state);
        }

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchApi.pending,(state,action)=>{
            state.loading = true;
            state.books = [];
        })
        .addCase(fetchApi.fulfilled,(state,action)=>{
             state.books=  action.payload;
             state.loading = false;
             state.error = '';
             bookSlice.caseReducers.sortBooks(state);
        })
        .addCase(fetchApi.rejected,(state,action)=>{
            state.books = [];
            state.error = "error while fetching books data"
        })
    }
})

export const {sortBooks,setSortCriteria,setSortOrder} = bookSlice.actions;
export default bookSlice.reducer;