import { createContext, useState } from "react";
import axios from "axios";
import helper from "../component/helper";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData(prev => prev + nextWord)
        }, 75 * index)
    }

    const newChat = () => {
        setLoading(false);
        setShowResult(false)
    }

    const onSent = async (prompt) => {
        // console.log("prompt ",prompt);
        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response="";
        //console.log("prompt: ",prompt);
        if (prompt !== undefined) 
        {
            try 
            {   //console.log("prompt ",prompt);
                setRecentPrompt(prompt);
                const resp=await helper(prompt)
                response = resp?.generated_text;
            } catch (error) 
            {
                console.error("error occured ",error);
                throw error;
            }
        } 
        else 
        {
            //console.log("else ",input);
            setPrevPrompts(prev => [...prev, input])
            setRecentPrompt(input)
            const resp = await helper(input);
            response=resp?.generated_text;    
        }
        if(response !== undefined)
        {
            //console.log(response);
            let responseArray = response.split("**");
            let newResponse = "";
            for (let i = 0; i < responseArray.length; i++) 
            {
                if (i === 0 || i % 2 !== 1) {
                    newResponse += responseArray;
                } else {
                    newResponse += "</br> <b>" + responseArray[i] + "</b>"
                }
            }
            let newResponse2 = newResponse.split("*").join("</br>")
            let newResponseArray = newResponse2.split(" ");
            for (let i = 0; i < newResponseArray.length; i++) 
            {
                const nextWord = newResponseArray[i];
                delayPara(i, nextWord + " ")
            }
        }
        setLoading(false)
        setInput("")
        // await run(prompt);
    }
   

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;