const ffmpeg = require('fluent-ffmpeg');

// Array of input video file paths
const inputFilePaths = [
    'videos/1.TS',
    'videos/2.TS',
    'videos/3.TS',
    'videos/4.TS'
];

// nom du fichier
const outputPath = 'exported/1_2_3_4.mp4';

function mergeFiles(inputFiles, outputPath) {
    const command = ffmpeg();
    inputFiles.forEach(inputPath => command.input(inputPath));

    command.outputOptions([
        '-preset ultrafast', // Use the ultrafast preset
        '-s 1920x1080',      // Video resolution (Full HD)
        // '-b:v 5M',            // Video bitrate (5 Mbps)
        // '-b:a 192k' ,          // Audio bitrate (192 kbps)
        // '-aspect 16/9'
    ]);

    command.mergeToFile(outputPath)
        .on('error', (err) => {
            console.error('Error merging files:', err);
        })
        .on('end', () => {
            console.log('Files merged successfully');
        })
        .on('progress', (progress) => {
            console.log(`Progress: ${progress.percent}%`);
        });
}

// Example usage
mergeFiles(inputFilePaths, outputPath);
