import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const useGetCallById = (id: string | string[]) => {

  //States
  const [call, setCall] = useState<Call>();
  const [isCallLoading, setIsCallLoading] = useState(true);

  //Hook from stream library.
  const client = useStreamVideoClient();

  //Async call in useEffect 
  useEffect(() => {
    if(!client)return;
    
    const loadCall = async ()=>{
      const {calls} = await client.queryCalls({
        filter_conditions:{
          id
        }
      })

      if(calls.length>0)
        {
          setCall(calls[0]);
        }
        setIsCallLoading(false);
    }
    loadCall();
  }, [id,client]);

  return {call,isCallLoading};
};
