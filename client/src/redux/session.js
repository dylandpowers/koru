export const CREATE_SESSION = 'CREATE_SESSION';
export const UPDATE_STEP = 'UPDATE_STEP';
export const ADD_GRATITUDES = 'ADD_GRATITUDES';
export const ADD_LENGTH_IN_MINUTES = 'ADD_LENGTH_IN_MINUTES';
export const ADD_IS_GUIDED = 'ADD_IS_GUIDED';
export const ADD_REFLECTION = 'ADD_REFLECTION';
export const ADD_SKILLS_USED = 'ADD_SKILLS_USED';
export const ADD_MINDFUL_ACTION = 'ADD_MINDFUL_ACTION';
export const SAVE_SESSION = 'SAVE_SESSION';
export const END_SESSION = 'END_SESSION';

export const startSession = () => {
  return {
    type: CREATE_SESSION
  }
}

/**
 * Updates the current step of the meditation session.
 * @param {Number} newStep 
 */
export const setSessionStep = (newStep) => {
  return {
    type: UPDATE_STEP,
    payload: newStep
  }
}

export const addGratitudes = (gratitudes, isPublicGratitudes) => {
  return {
    type: ADD_GRATITUDES,
    payload: gratitudes,
    isPublicGratitudes
  }
}

export const addLengthInMinutes = (lengthInMinutes) => {
  return {
    type: ADD_LENGTH_IN_MINUTES,
    payload: lengthInMinutes
  }
}

export const addIsGuided = (isGuided) => {
  return {
    type: ADD_IS_GUIDED,
    payload: isGuided
  }
}

export const addReflection = (reflection) => {
  return {
    type: ADD_REFLECTION,
    payload: reflection
  }
}

export const addSkillsUsed = (skillsUsed) => {
  return {
    type: ADD_SKILLS_USED,
    payload: skillsUsed
  }
}

export const addMindfulAction = (mindfulAction) => {
  return {
    type: ADD_MINDFUL_ACTION,
    payload: mindfulAction
  }
}

export const endSession = () => {
  return {
    type: END_SESSION
  }
}

const initialState = {
  isActive: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SESSION:
      return { isActive: true }
    case UPDATE_STEP:
      return { ...state, step: action.payload }
    case ADD_GRATITUDES:
      return { ...state, gratitudes: action.payload, isPublicGratitudes: action.isPublicGratitudes }
    case ADD_LENGTH_IN_MINUTES:
      return { ...state, lengthInMinutes: action.payload }
    case ADD_IS_GUIDED:
      return { ...state, isGuided: action.payload }
    case ADD_REFLECTION:
      return { ...state, reflection: action.payload }
    case ADD_SKILLS_USED:
      return { ...state, skillsUsed: action.payload }
    case ADD_MINDFUL_ACTION:
      return { ...state, mindfulAction: action.payload }
    case END_SESSION:
      return { isActive: false }
    default:
      return state;
  }
}