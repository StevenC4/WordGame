import {combineReducers} from 'redux';
import game from './game';
import me from './me';
import players from './players';
import teams from './teams';
import waitingRoom from './waitingRoom';

const rootReducer = combineReducers({
    game,
    me,
    players,
    teams,
    waitingRoom
});

export default rootReducer;
