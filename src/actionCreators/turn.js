export function countdownTick() {
    return function(dispatch, getState) {
        const state = getState();
        const countdownSeconds = state.turn.countdownSeconds - 1;

        if (countdownSeconds >= 0) {
            dispatch({
                type: 'TURN_COUNTDOWN_TICK',
                countdownSeconds
            });
        }

        if (countdownSeconds === 0) {
            // TODO: increment turn and set awaiting player confirmation
        }
    }
}

export function resetTurnCountdown() {
    return function(dispatch, _getState) {
        dispatch({
            type: 'RESET_TURN_COUNTDOWN'
        });
    }
}

export function resetTurnStartCountdown() {
    return function(dispatch, _getState) {
        dispatch({
            type: 'RESET_TURN_START_COUNTDOWN'
        });
    };
}

export function skipWord() {
    return function(dispatch, getState) {
        const state = getState();
        const currentWordId = state.turn.currentWordId;

        let wordPool = [...state.turn.wordPool];
        let wordPoolUsed = [...state.turn.wordPoolUsed, ...currentWordId];

        if (!wordPool.length) {
            wordPool = [...wordPoolUsed];
            wordPoolUsed = [];
        }

        const newWordIndex = Math.floor(Math.random() * wordPool.length);
        const newWordId = wordPool[newWordIndex];

        wordPool = wordPool.filter(wordId => wordId !== newWordId);

        dispatch({
            type: 'PLAYER_TURN_UPDATE_CURRENT_WORD_AND_POOL',
            currentWordId: newWordId,
            wordPool,
            wordPoolUsed: [...state.turn.wordPoolUsed, currentWordId]
        });
    };
}

export function markWordCorrect() {
    return function(dispatch, getState) {
        const state = getState();
        let wordPool = [...state.turn.wordPool];
        let wordPoolUsed = [...state.turn.wordPoolUsed];
        let newWordId;

        if (!wordPool.length && !wordPoolUsed.length) {
            // TODO: End player's turn prematurely, and also end the round.
            newWordId = '';
        } else {
            if (!wordPool.length) {
                wordPool = [...wordPoolUsed];
                wordPoolUsed = [];
            }

            const newWordIndex = Math.floor(Math.random() * wordPool.length);
            newWordId = wordPool[newWordIndex];

            wordPool = wordPool.filter(wordId => wordId !== newWordId);

            // TODO: Add point to active team
            // TODO: Add point to active player
        }

        dispatch({
            type: 'PLAYER_TURN_UPDATE_CURRENT_WORD_AND_POOL',
            currentWordId: newWordId,
            wordPool,
            wordPoolUsed
        });
    };
}

export function turnStartCountdownTick() {
    return function(dispatch, getState) {
        const state = getState();
        const startCountdownSeconds = state.turn.startCountdownSeconds - 1;

        dispatch({
            type: 'TURN_START_COUNTDOWN_TICK',
            startCountdownSeconds
        });

        if (startCountdownSeconds === 0) {
            dispatch({
                type: 'SET_PLAYER_TURN_ACTIVE'
            });
        }
    }
}
