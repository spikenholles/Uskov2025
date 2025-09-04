import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Slide } from '@/app/(presentation-generator)/types/slide';

interface HistoryState {
  slides: Slide[];
  timestamp: number;
  actionType: string;
}

interface UndoRedoState {
  past: HistoryState[];
  present: HistoryState | null;
  future: HistoryState[];
  maxHistorySize: number;
  isUndoRedoInProgress: boolean;
}

// Helper function for deep copy
const deepCopy = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

const initialState: UndoRedoState = {
  past: [],
  present: null,
  future: [],
  maxHistorySize: 30,
  isUndoRedoInProgress: false
};

const undoRedoSlice = createSlice({
  name: 'undoRedo',
  initialState,
  reducers: {
    addToHistory: (state, action: PayloadAction<{slides: Slide[], actionType: string}>) => {
      // Skip if undo/redo is in progress
      if (state.isUndoRedoInProgress) {
        return;
      }
      
      // Deep copy the slides to avoid reference issues
      const newSlides = deepCopy(action.payload.slides);
      
      // Only add to history if the slides have actually changed
      if (!state.present) {
        state.present = {
          slides: newSlides,
          timestamp: Date.now(),
          actionType: action.payload.actionType
        };
       
        return;
      }
      
      // Skip if slides are identical
      if (JSON.stringify(state.present.slides) === JSON.stringify(newSlides)) {
        return;
      }
      
      // Add current state to past
      state.past.push(state.present);
      
      // Limit history size
      if (state.past.length > state.maxHistorySize) {
        state.past.shift();
      }
      
      // Clear future on new change
      state.future = [];
      
      // Set new present
      state.present = {
        slides: newSlides,
        timestamp: Date.now(),
        actionType: action.payload.actionType
      };
      
     
    },

    undo: (state) => {
        if (state.past.length === 0) {
          
        return;
      }
      
      state.isUndoRedoInProgress = true;
      
      // Move present to future
      if (state.present) {
        state.future.unshift(deepCopy(state.present));
      }
      
      // Get last past state
      const previous = state.past[state.past.length - 1];
      state.past = state.past.slice(0, -1);
      state.present = deepCopy(previous);
     
     
    },

    redo: (state) => {
      if (state.future.length === 0) {
      
        return;
      }
      
      state.isUndoRedoInProgress = true;
      
      // Move present to past
      if (state.present) {
        state.past.push(deepCopy(state.present));
      }
      
      // Get first future state
      const next = state.future[0];
      state.future = state.future.slice(1);
      state.present = deepCopy(next);
      
     
    },
    
    finishUndoRedo: (state) => {
      state.isUndoRedoInProgress = false;
    },

    clearHistory: (state) => {
      state.past = [];
      state.future = [];
      // Keep present
    }
  }
});

export const { addToHistory, undo, redo, finishUndoRedo, clearHistory } = undoRedoSlice.actions;
export default undoRedoSlice.reducer; 