import React, { useEffect, useState } from 'react';

import axios from './../../Axios';
import { useTracked } from './../../Store';
import { authApiEndpoints  } from './../../API';

const uname = localStorage.getItem('name');
const uid = localStorage.getItem('id');
const fetchDataOwe = () => {
  return axios.get("");}

const fetchDataOwed = () => {
  return axios.get("");}

const Split = (props) => {
  const [owed,setOwed]=useState('');
const [owes,setOwes]=useState('');
  useEffect(async ()=>{
    var owesAPi=await axios.get(authApiEndpoints.owedApiUrl+uname);
    var owedApi =await axios.get(authApiEndpoints.owesApiUrl+uname)
    setOwed('$'+owedApi.data);
    setOwes('$'+owesAPi.data);
  },[]);
return (
  
<div className="p-grid">

        <div className="p-col-12">
          <div className="p-fluid">
            <div className="p-grid" >
              <div className="p-col-6 p-md-3">
                <div className="p-panel p-component">
                  <div className="p-panel-titlebar"><span className="color-title text-bold"> Money that you owe </span>
                  </div>
                  <div className="p-fluid">
                <input type="text" placeholder="name" id='susername1' name="name" value= {uname} className="p-inputtext p-component p-filled" />
                <p className="text-error"></p>
              </div>

            <div className="p-fluid">
                <input type="text" placeholder="userid" id='suserid1' name="userid" value= {uid} className="p-inputtext p-component p-filled" />
                <p className="text-error">{}</p>
              </div>
                  <div className="p-panel-content-wrapper p-panel-content-wrapper-expanded" id="pr_id_1_content"
                    aria-labelledby="pr_id_1_label" aria-hidden="false">
                    <div className="p-panel-content">
                      <p>{owed}</p>
                    </div>
                  </div>
                </div>
              </div>


              <div className="p-col-6 p-md-3">
                
                <div className="p-panel p-component">
                  
                  <div className="p-panel-titlebar"><span className="color-title text-bold"> Money you are owed</span></div>
                  <div className="p-fluid">
                <input type="text" placeholder="name" id='susername2' name="name" value= {uname} className="p-inputtext p-component p-filled" />
                <p className="text-error"></p>
              </div>

            <div className="p-fluid">
                <input type="text" placeholder="userid" id='suserid2' name="userid" value= {uid} className="p-inputtext p-component p-filled" />
                <p className="text-error">{}</p>
              </div>
                  <div className="p-panel-content-wrapper p-panel-content-wrapper-expanded" id="pr_id_1_content"
                    aria-labelledby="pr_id_1_label" aria-hidden="false">
                    <div className="p-panel-content">
                    <p>{owes}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
)
}

export default React.memo(Split);