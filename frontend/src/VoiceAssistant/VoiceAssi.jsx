
import { assets } from "../assets/assets";
import { useEffect, useState } from "react";
// import foodSvg from "../../assets/food.svg";
import { useDispatch, useSelector } from "react-redux";
// import { predictImage } from "../../Redux/Slice/predictSLice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// import { ColorRing } from 'react-loader-spinner';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import SiriWaveComponent from "./siri_wave";
import { voiceAssitenceResponse, welcomeMessage ,clearSession} from "../Redux/Slice/voiceAssi";

function VoiceAssistance({ popUp,closePopUp })  {
  
  const [lastTranscript, setLastTranscript] = useState("");
  const [pauseTimer, setPauseTimer] = useState(null);
  const [changedTranscript,setChangedTranscript]=useState("");


    // const products = useSelector((state) => state.product.productsData);
    const dispatch = useDispatch();


    const navigate = useNavigate();

    
    const {
      transcript,
      listening,
      resetTranscript,
      browserSupportsSpeechRecognition
    } = useSpeechRecognition();

  const startListening = () => SpeechRecognition.startListening({
    continuous: true,
    language: 'en-US'
  }); 
  
  const stopListening = () => SpeechRecognition.stopListening();

  if (!browserSupportsSpeechRecognition) {
    return null;
  }


async function handleVoiceCommand(transcript) {
  try{
      stopListening()
      const response = await dispatch(voiceAssitenceResponse(transcript))
      console.log("Response from voice command :----->", response);
      console.log("Intent:",response?.payload?.data?.intent)
      if(response?.payload?.data?.intent=='log_in'){
        navigate('/auth/login');
      }
      else if(response?.payload?.data?.intent=='new_user'){
        navigate('/auth/signup');
      }
      else if(response?.payload?.data?.intent=='home_page'){
        navigate('/');
      }
      else if(response?.payload?.data?.intent=='send_menu'){
        navigate('/product/allProduct');
      }
      else if(response?.payload?.data?.intent=='watch_cart'){
        navigate('/cart');
        }
      else if(response?.payload?.data?.intent=='payment'){
        navigate('/order');
      }

      if (response?.payload?.status == 200 ) {
        const message = response?.payload?.data?.response;
        setChangedTranscript(message)
        resetTranscript(); // Clear the transcript after processing
        startListening()
      } 
    
  }
  catch (error) {
    console.error("Error in voice command handling:", error);
    toast.error("An error occurred while processing your command.");
  }


}
    let user_Id = useSelector((state) => state?.auth?.data?.userId)
    useEffect(() => {
      const sendWelcome = async () => {
        try {
          // if (!user_Id) return;  // Safety check
          const user_info =  user_Id ;
          stopListening()
          console.log("Welcome Messege triggers")
          const response = await dispatch(welcomeMessage(user_info));
          setChangedTranscript(response?.payload?.message)
          resetTranscript()
          if (response?.payload?.status==200) {
            console.log("Welcome message sent");
            startListening()
          }
        } catch (error) {
          console.error("Error in welcomeCheck:", error);
        }
      };
    
      sendWelcome();
    }, []);
    
async function clear_Session() {
  try{
    const response =await dispatch(clearSession());
    return response;
  }
  catch(error){
    console.error("Error in clearing session:", error);

  }
  
}


useEffect(() => {
  if (!transcript) return;

  // If transcript changed, reset the pause timer
  if (transcript !== lastTranscript) {
    setLastTranscript(transcript);

    // Clear previous timeout
    if (pauseTimer) {
      clearTimeout(pauseTimer);
    }

    // Start a new pause timer (e.g. 3 seconds of no input)
    const timer = setTimeout(() => {
      console.log("No speech input for 3 seconds, sending data...");
      handleVoiceCommand(transcript);  // your existing function
      resetTranscript();               // optional: clear after send
    }, 3000); // 3 seconds of pause

    setPauseTimer(timer);
  }
}, [transcript]);


    return (
<div className="montserrat-font1 fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-50">
        <div className=" w-[90vw] h-[95vh] sm:w-[80vw] md:w-[65vw] lg:w-[55vw] 
                    bg-gradient-to-br from-black via-white-600 to-white-400 
                    rounded-2xl p-6 overflow-y-auto relative">

    <button
      className="absolute top-4 right-6 text-white text-4xl hover:text-red-400"
        onClick={() => {
        stopListening();
        closePopUp();
        clear_Session();
        resetTranscript();
        }}   
   aria-label="Close"
    >
      &times;
    </button>

    {/* Title */}
    <div className="flex flex-col items-center mb-6">
        <img src={assets.mic} alt="Voice Icon" className="w-16 h-16 mb-4" />
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Voice Assistance
        </h1>
    </div>
    {listening &&
        <div className="w-full flex flex-row  justify-center items-center ">
            <SiriWaveComponent isSpeaking={true} />
        </div>
    }

    {/* Transcript Display */}
 {listening ?  
    <div className=" w-full flex justify-center items-center bg-transparent text-white p-4 rounded-xl min-h-[100px] mb-6 overflow-y-auto">
      <p className="whitespace-pre-wrap">{transcript || "Say something..."}</p>
    </div>:
    
    <div className=" w-full flex justify-center items-center bg-transparent text-white p-4 rounded-xl min-h-[100px] mb-6 overflow-y-auto">
      <p className="whitespace-pre-wrap">{"Speaking..."}</p>
    </div>
        }

    <div className="flex flex-col items-center mb-6">
{
  !listening?
    <button onClick={()=>{
      startListening()
     }} className="flex flex-col justify-center items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-2xl transition ">
      <div className="flex justify-center items-center ">
        Start Listening
    </div>
    </button>:
    <button  onClick={()=>{
      stopListening()
      resetTranscript()
      navigate("/about")
      }} className="flex flex-col justify-center items-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-2xl transition ">
      <div className="flex justify-center items-center ">
        Stop Listening
    </div>
    </button>
}

      <div className="text-center mt-4 text-white">
         {listening ? "🟢 Listening..." : "🔴 Not Listening"}
      </div>

</div>


    {/* Control Buttons */}
    <div className="flex justify-center gap-4">


{/* 
    <button
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-2xl transition"
        onClick={() => speechSynthesis(transcript)}

      >
        Speak
      </button> */}

    </div>

  </div>
</div>
    );
}

export default VoiceAssistance;
