import * as React from "react"
import "../../App.css"
import PersonalInfoForm from "../../components/PersonalInfoForm"

export default function InterviewPage(){
    const [modalPen, setModalPen] = React.useState(true)
    
    const handleModelClose = () =>{
        setModalPen(false)
    }
    return(
        <div className="interview-page">
            <PersonalInfoForm isModalOpen={modalPen} onClose={handleModelClose} />
            <div className="h5container">
                 <h5 className="interview-question-numb">Soru Numarası: 2 / 10</h5> <h5 className="interview-question-numb">Kalan Süre: 15 dak </h5>
            </div>
           
            <textarea disabled placeholder="What is Big-O notation?" className="interview-text-area"></textarea>
            <video className="interview-video" controls><source src="path_to_video.mp4" type="video/mp4" />
            Your browser does not support the video tag.</video>
            <button className="interview-button"> Kaydı Bitir ve Gönder</button>
        </div>
    )
}