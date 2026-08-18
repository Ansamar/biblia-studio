import {runHistoricalSeed} from './lib/run-seed.mjs'
import {songOfSongsSeed} from './data/song-of-songs.mjs'

await runHistoricalSeed(songOfSongsSeed, 'Cantico dei Cantici')
