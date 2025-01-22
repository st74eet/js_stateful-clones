'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const result = [];

  for (const action of actions) {
    if (action.type === 'clear') {
      for (const key in stateCopy) {
        delete stateCopy[key];
      }

      const copy = { ...stateCopy };

      result.push(copy);
    }

    if (action.type === 'addProperties') {
      Object.assign(stateCopy, { ...action.extraData });

      const copy = { ...stateCopy };

      result.push(copy);
    }

    if (action.type === 'removeProperties') {
      for (let key = 0; key < action.keysToRemove.length; key++) {
        delete stateCopy[action.keysToRemove[key]];
      }

      const copy = { ...stateCopy };

      result.push(copy);
    }
  }

  return result;
}

module.exports = transformStateWithClones;
