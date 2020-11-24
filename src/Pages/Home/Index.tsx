import React, { useEffect, useState } from 'react';
import { useRecoilState } from "recoil";
import { OptionsState, SelectedState, Repository } from "./Store"
import useRequest from '../../Common/Request'
import MultiCheck from '../../Components/MultiCheck'
import "./Index.css"

//porject main page
const Home: React.FunctionComponent = (): JSX.Element => {
  const { data: data } = useRequest<Repository[]>({
    url: "get/options"
  })
  const [options, setOptions] = useRecoilState(OptionsState)
  const [selectedValues, setSelectedValues] = useRecoilState(SelectedState)
  const [columns, setColumns] = useState<number>(2)
  useEffect(() => {
    data && setOptions(data.data) //save data to State
  }, [data])

  //set selected values of event handler
  function onSelectedOptionsChange(selectedVals: string[]): void {
    setSelectedValues(selectedVals)
    return
  }
  //change columns number
  function onTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    let value = parseInt(event.target.value.replace(/[^\d]/g, ''))
    if (value && value <= 20) { //control parameter range
      setColumns(value)
    }

  }

  return <div className="main">
    <h1>Multi Check Page </h1>
    <MultiCheck label='my-multi-check' options={options ? options : []}
      onChange={onSelectedOptionsChange}
      values={selectedValues}
      columns={columns} />
    <div>
      <h2>Current selected values:</h2>
      <div>{selectedValues.join(',')}</div>
      <h2>Change to columns</h2>
      <div><input type="text" onChange={onTextChange} /> </div>
    </div>
  </div>
}

export default Home