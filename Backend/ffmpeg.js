/**
 * Reencode audio & video without creating files first
 *
 * Requirements: ffmpeg, ether via a manual installation or via ffmpeg-static
 */
const express = require("express");

// Buildin with nodejs
const cp = require('child_process');
const app = express();
let cors = require("cors");
app.use(cors());
const readline = require('readline');
// External modules
const ytdl = require('ytdl-core');
const ffmpeg = require('ffmpeg-static');
// Global constants





app.get('/download', async (req, res) => {
    res.header("Content-Disposition", `attachment;  filename=${videoName}.mkv`);
    const video = ytdl(url, { filter: 'videoonly' });
    const audio = ytdl(url, { filter: 'audioonly', highWaterMark: 1 << 25 });
    // Start the ffmpeg child process
    const ffmpegProcess = cp.spawn(ffmpeg, [
        // Remove ffmpeg's console spamming
        '-loglevel', '0', '-hide_banner',
        '-i', 'pipe:4',
        '-i', 'pipe:5',
        '-reconnect', '1',
        '-reconnect_streamed', '1',
        '-reconnect_delay_max', '4',
        // Rescale the video
        '-vf', 'scale=1980:1080',
        // Choose some fancy codes
        '-c:v', 'libx265', '-x265-params', 'log-level=0',
        '-c:a', 'flac',
        // Define output container
        '-f', 'matroska', 'pipe:6',
    ], {
        windowsHide: true,
        stdio: [
            /* Standard: stdin, stdout, stderr */
            'inherit', 'inherit', 'inherit',
            /* Custom: pipe:4, pipe:5, pipe:6 */
            'pipe', 'pipe', 'pipe',
        ],
    });

    audio.pipe(ffmpegProcess.stdio[4]);
    video.pipe(ffmpegProcess.stdio[5]);
    ffmpegProcess.stdio[6].pipe(res); // Combining and piping the streams for download directly to the response
}
)