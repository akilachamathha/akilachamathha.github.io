import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

export default function FletchData() {
    const [records,setRecords] = useState([])
    const fletching =() => {
        axios.get("https://api.carbonintensity.org.uk/generation")
        .then(res=> {setRecords(res.data)})
        .catch(err=> console.log(err));

    }
    useEffect(()=> {

    },[])

    console.log(records)
    //records.data.generationmix.map((v,i)=>{
    //    return console.log(v.fuel,v.perc)
    //})

    return(
        <div>
            <button onClick={fletching}>Show Data</button>
            {records.data && (
                <>
                {records.data.from} - {records.data.to}
                {records.data.generationmix.map((v, i) => (
                <div key={i}>
                    <strong>{v.fuel} {v.perc}%</strong>
                </div>
                ))}
                </>
                )}
        </div>
    )

}
