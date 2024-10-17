import React, { useRef, useState, useEffect } from "react";
import axios from "axios";

const VideoRecorder = (handleURL) => {
  const [recording, setRecording] = useState(false); // Kayıt durumu
  const [videoURL, setVideoURL] = useState(null); // Video URL'si
  const [uploading, setUploading] = useState(false); // Yükleme durumu
  const [error, setError] = useState(null); // Hata durumu

  const mediaRecorderRef = useRef(null); // MediaRecorder referansı
  const videoRef = useRef(null); // Video elementine referans
  const recordedChunks = useRef([]); // Kaydedilen video parçalarını tutar

  useEffect(() => {
    // Kullanıcının kamerasına erişim sağla
    const getMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream; // Video akışını video elementine bağla
        }

        const mediaRecorder = new MediaRecorder(stream); // MediaRecorder oluştur
        mediaRecorderRef.current = mediaRecorder;

        // MediaRecorder ile veri toplama
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            recordedChunks.current.push(event.data); // Parçaları kaydet
          }
        };

        // Kayıt durdurulunca video oluşturma
        mediaRecorder.onstop = () => {
          const blob = new Blob(recordedChunks.current, { type: "video/webm" });
          const url = URL.createObjectURL(blob);
          setVideoURL(url); // Video URL'sini güncelle
          recordedChunks.current = []; // Parçaları temizle
          uploadVideo(blob); // Videoyu backend'e yükle
        };
      } catch (err) {
        console.error("Kamera erişimi reddedildi:", err);
        setError("Kamera ve mikrofon erişimi reddedildi.");
      }
    };

    getMedia(); // Kamera ve mikrofon erişimini başlat
  }, []);

  // Kayıt başlatma
  const startRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.start();
      setRecording(true);
    }
  };

  // Kayıt durdurma
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  // Video yükleme
  const uploadVideo = async (blob) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("video", blob, "recording.webm");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/videos/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Video Yüklendi:", response.data.url);
      alert(`Video Yüklendi! URL: ${response.data.url}`);
      handleURL(`${response.data.url}`)
      setVideoURL(response.data.url); // URL'yi güncelle
    } catch (error) {
      console.error("Video yükleme hatası:", error);
      setError("Video yükleme başarısız.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h2>Video Kaydedici</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <video
        ref={videoRef}
        autoPlay
        muted
        style={{ width: "400px", marginBottom: "10px" }}
      />

      <div>
        {recording ? (
          <button onClick={stopRecording}>Kaydı Durdur</button>
        ) : (
          <button onClick={startRecording}>Kayda Başla</button>
        )}
      </div>

      {uploading && <p>Video yükleniyor...</p>}

      {videoURL && (
        <div style={{ marginTop: "20px" }}>
          <h3>Kaydedilen Video:</h3>
          <video src={videoURL} controls style={{ width: "400px" }} />
          <a href={videoURL} download="recording.webm">
            Kaydı İndir
          </a>
        </div>
      )}
    </div>
  );
};

export default VideoRecorder;
