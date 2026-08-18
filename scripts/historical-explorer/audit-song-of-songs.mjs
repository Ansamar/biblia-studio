import {runHistoricalAudit} from './lib/run-audit.mjs'
import {songOfSongsSeed} from './data/song-of-songs.mjs'

await runHistoricalAudit(songOfSongsSeed, 'Cantico dei Cantici')
