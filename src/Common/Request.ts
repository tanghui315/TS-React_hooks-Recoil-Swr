import useSWR, { ConfigInterface, responseInterface } from 'swr'
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
interface Repository {
  label: string;
  value: string;
}

//create axios instance
const api = axios.create({
});
type JsonData = {
  code: number,
  data: Repository[]
}

export type GetRequest = AxiosRequestConfig

export interface Return<JsonData, Error>
  extends Pick<
  responseInterface<AxiosResponse<JsonData>, AxiosError<Error>>,
  'isValidating' | 'revalidate' | 'error'
  > {
  data: JsonData | undefined
  response: AxiosResponse<JsonData> | undefined
  requestKey: string
}

export interface Config<JsonData = unknown, Error = unknown>
  extends Omit<
  ConfigInterface<AxiosResponse<JsonData>, AxiosError<Error>>,
  'initialData'
  > {
  initialData?: JsonData
}
//ajax request 
export default function useRequest<Error = unknown>(
  request: GetRequest,
  { initialData, ...config }: Config<JsonData, Error> = {}
): Return<JsonData, Error> {
  //if development use mock data
  if (process.env.NODE_ENV === "development") {
    request.url += ".mock"
  }
  const requestKey = request && JSON.stringify(request);

  const { data: response, error, isValidating, revalidate } = useSWR<
    AxiosResponse<JsonData>,
    AxiosError<Error>
  >(requestKey, () => api(request), {
    ...config,
    initialData: initialData && {
      status: 200,
      statusText: 'InitialData',
      config: request,
      headers: {},
      data: initialData
    }
  })
  // if(response?.data.code !==0){ //handler request error
  //     throw  "request wrong!"
  // }
  return {
    data: response?.data,
    requestKey,
    response,
    error,
    isValidating,
    revalidate
  }
}