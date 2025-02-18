import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { AxiosCall } from "../models";

export const useFetchAndLoad = () => {
  const [loading, setLoading] = useState(false);
  let controller: AbortController;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const callEndpoint = async (axiosCall: AxiosCall<any>) => {
    if (axiosCall.controller) controller = axiosCall.controller;
    setLoading(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let result = {} as AxiosResponse<any>;
    try {
      result = await axiosCall.call;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setLoading(false);
      throw err;
    }
    setLoading(false);
    return result;
  };

  const cancelEndpoint = () => {
    setLoading(false);
    controller && controller.abort();
  };

  useEffect(() => {
    return () => {
      cancelEndpoint();
    };
  }, []);

  return { loading, callEndpoint };
};
