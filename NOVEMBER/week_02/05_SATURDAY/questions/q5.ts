/*

You're building a MediaFile class that plays different types of media files.

Create an interface MediaFile with method play()
Implement AudioFile, VideoFile, and PDFFile
Create a MediaFile class that accepts any MediaFile and calls its play() method
Expected Output:

Playing audio file...
Playing video file...
Displaying PDF document...

Goal: Show loose coupling via interface allows plugging in any media type.

*/
interface MediaFile {
  play(): void;
}

class AudioFile implements MediaFile {
  play(): void {
    console.log("Playing audio file...");
  }
}

class VideoFile implements MediaFile {
  play(): void {
    console.log("Playing video file...");
  }
}

class PDFFile implements MediaFile {
  play(): void {
    console.log("Displaying PDF document...");
  }
}

class MediaPlayer {
  private file: MediaFile;

  constructor(file: MediaFile) {
    this.file = file;
    this.file.play();
  }
}

// Test the MediaPlayer
const audioPlayer = new MediaPlayer(new AudioFile());
const videoPlayer = new MediaPlayer(new VideoFile());
const pdfPlayer = new MediaPlayer(new PDFFile());