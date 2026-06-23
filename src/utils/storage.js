const HISTORY_KEY = "ppl_arnold_workout_history_v2"; // Using v2 key to avoid data collisions
const DRAFT_PREFIX = "ppl_arnold_workout_draft_v2_";

// --- HISTORY LOGS ---

// Fetch all saved workout sessions
export const getWorkoutHistory = () => {
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading workout history:", error);
    return [];
  }
};

// Save a completed workout session
export const saveWorkoutSession = (session) => {
  try {
    const history = getWorkoutHistory();
    const updatedHistory = [session, ...history]; // newest first
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
    return true;
  } catch (error) {
    console.error("Error saving workout session:", error);
    return false;
  }
};

// Extract performance history for a specific exercise name (reps only)
export const getExerciseHistory = (exerciseName) => {
  const history = getWorkoutHistory();
  const logs = [];

  for (const session of history) {
    if (session.exercises && session.exercises[exerciseName]) {
      logs.push({
        date: session.date,
        dayName: session.dayName,
        ...session.exercises[exerciseName] // { sets: [...], notes: "..." }
      });
    }
  }
  return logs;
};

// Get the absolute last session for a specific exercise name
export const getLatestExerciseSession = (exerciseName) => {
  const history = getWorkoutHistory();
  for (const session of history) {
    if (session.exercises && session.exercises[exerciseName]) {
      const exerciseLog = session.exercises[exerciseName];
      const completedSets = exerciseLog.sets.filter(s => s.completed && s.reps);
      if (completedSets.length > 0) {
        return {
          date: session.date,
          sets: completedSets,
          notes: exerciseLog.notes
        };
      }
    }
  }
  return null;
};

// --- SESSION DRAFTS ---

// Save draft of current active workout progress
export const saveActiveSessionDraft = (dayId, exerciseData) => {
  try {
    localStorage.setItem(`${DRAFT_PREFIX}${dayId}`, JSON.stringify(exerciseData));
  } catch (error) {
    console.error("Error saving workout draft:", error);
  }
};

// Get active workout draft
export const getActiveSessionDraft = (dayId) => {
  try {
    const data = localStorage.getItem(`${DRAFT_PREFIX}${dayId}`);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error loading workout draft:", error);
    return null;
  }
};

// Delete draft
export const clearActiveSessionDraft = (dayId) => {
  try {
    localStorage.removeItem(`${DRAFT_PREFIX}${dayId}`);
  } catch (error) {
    console.error("Error clearing workout draft:", error);
  }
};
