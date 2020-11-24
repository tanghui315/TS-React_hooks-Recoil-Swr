import './Index.css';
import { Repository } from "../../Pages/Home/Store"
import React, { useState } from 'react';


/**
 * Notice:
 * 1. There should be a special `Select All` option with checkbox to control all passing options
 * 2. If columns > 1, the options should be placed from top to bottom in each column
 *
 * @param {string} label - the label text of this component
 * @param {Repository[]} options - options
 * @param {string[]} values - default checked option values
 * @param {number} columns - default value is 1
 * @param {Function} onChange - when checked options are changed,
 *                             they should be passed to outside
 */
type Props = {
  label?: string,
  options: Repository[],
  columns?: number,
  values: string[]
  onChange: (options: string[]) => void,
}

const MultiCheck: React.FunctionComponent<Props> = (props): JSX.Element => {
  const { options, values, label, columns, onChange } = props
  const [status, setStatus] = useState<string>("status")
  const [checkAll, setCheckAll] = useState<boolean>(false)
  const contentWidth = columns ? (columns * 80) : 160

  //change event of select all
  function onSelectAllHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setCheckAll(event.target.checked)
    if (event.target.checked && options) {
      onChange(options.map(_ => _.value))
      setStatus("all checked")
    } else {
      onChange([])
      setStatus("unchecked")
    }
  }

  //other checkbox handler  change event
  function onCheckHandler(index: number) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      let option = options[index]
      if (event.target.checked) {
        let selectVals = [...values, option.value]
        //select all if both length equal 
        if (selectVals.length === options.length) {
          setCheckAll(true)
          setStatus("all checked")
        } else {
          setCheckAll(false)
          setStatus("unchecked")
        }
        onChange(selectVals)

      } else {
        let selectVals = [...values]
        //delete slectvals by index
        selectVals.splice(selectVals.findIndex(_ => _ === option.value), 1)
        setCheckAll(false)
        setStatus("unchecked")
        onChange(selectVals)
      }
    }
  }

  return <div className='MultiCheck' style={{ width: contentWidth + 12 }}>
    {/* TODO */}
    <div className="status">{label}-{status}</div>
    <div className="content" style={{ width: contentWidth }}>
      <div className="item">
        <label className="all" ><input type="checkbox" checked={checkAll} onChange={onSelectAllHandler} />Select All</label>
      </div>
      {options?.map((option, index) => <div key={index} className="item">
        <label><input type="checkbox" checked={values?.includes(option.value)} value={option.value} onChange={onCheckHandler(index)} />{option.label}</label>
      </div>)}
    </div>
  </div>
}

export default MultiCheck;
