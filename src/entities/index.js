import {session} from '@/entities/session';
import {track} from '@/entities/track';

import {makeEntity} from 'react-entities';

export const useSession = makeEntity(session);
export const useTracker = makeEntity(track);