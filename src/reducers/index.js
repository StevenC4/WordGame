import {combineReducers} from 'redux';
import game from './game';
import me from './me';
import players from './players';
import teams from './teams';
import turn from './turn';
import waitingRoom from './waitingRoom';

const rootReducer = combineReducers({
    game,
    me,
    players,
    teams,
    turn,
    waitingRoom
});

export default rootReducer;
