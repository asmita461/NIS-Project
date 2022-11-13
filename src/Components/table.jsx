import React from "react";
import { useState} from "react";
import { readFile, utils } from "xlsx";
import { CSVLink } from "react-csv";
import Modal from "react-modal";
import "./modal.css";

const Table = () => {

    const [reg_no, setReg_no] = useState([]);
    const [name, setName] = useState([]);
    const [message, setMessage] = useState([]);
    const [FileName, setFileName] = useState(null);
    const [disable, setDisable] = useState([]);
    const [reg, setReg] = useState();

    const [data, setData] = useState([]);
    const [t, setT] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const dataset = [{reg_no: "20BIT0030", password: "abc"},{reg_no: "20BIT0001", password: "qwre"}];

    const headers = [
        { label: "RegNo", key: "reg_no" },
        { label: "StudentName", key: "name" },
        { label: "Message", key: "message" },
    ];

    let csvReport = {
        filename: "file.csv",
        headers: headers,
        data: data,
    };

    async function handleFileAsync(e) {
        const file = e.target.files[0];

        setFileName(file.name);

        const data = await file.arrayBuffer();
        const workbook = readFile(data);

        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = utils.sheet_to_json(worksheet);
        for (var i = 0; i < jsonData.length; i++) {
        reg_no.push(jsonData[i].RegNo);
        name.push(jsonData[i].StudentName);;
        message.push(jsonData[i].Message);
        }
    }


    const handleSubmit = () => {
        let dataa;
        for(var i=0; i< reg_no.length; i++){
            dataa = {reg_no : reg_no[i], name : name[i], message : message[i]}
            data.push(dataa);
            disable[i] = true;
        }
        setT(true);
    }

    async function handleChange(index,e) {
        for(var i=0; i< reg_no.length;i++){
            if(i===index){
                data[i].message=e.target.value;
            }
        }
        csvReport.data=data;
    }

    const handleBack = (e) => {
        e.preventDefault();
        document.getElementById("err_msg").style.display = "none";
        setModalOpen(false);
      };

    async function editMsg(reg){
        setReg(reg);
        setModalOpen(true);
    }

    async function verify(){
        for(var i=0;i<dataset.length;i++){
            if(dataset[i].reg_no===reg){
                if(document.getElementById("password").value===dataset[i].password){
                    setModalOpen(false);
                    disable[i]=false;
                }else{
                    document.getElementById("err_msg").style.display = "inline";
                }
            }
        }
    }


    return(
        <div className="flex items-center justify-center my-16">
        <div>
          <Modal isOpen={modalOpen}>
            <div className="modalBackground">
              <div className="modalContainer">
                <div className="titleCloseBtn">
                  <button
                    onClick={() => {
                      setModalOpen(false);
                    }}
                  >
                    x
                  </button>
                </div>
                <div className="title">
                  <h1>Authentication</h1>
                </div>
                <div className="body">
                  <p>
                    Please enter the password
                    <br />
                    <br />
                    <input
                      type="text"
                      id="password"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    ></input>
                  </p>
                </div>
                <div id="err_msg" style={{ display: "none" }}>
                  <h3 className="text-red-500 text-center">Incorrect Password</h3>
                </div>

                <div className="footer">
                  <button onClick={handleBack} id="cancelBtn">
                    Cancel
                  </button>
                  <button onClick={verify}>Continue</button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
            <div className="overflow-y-auto sm:-mx-6 lg:-mx-8 ">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden p-16 bg-gray-100 rounded-md bg-opacity-90">
                        <form className="items-center justify-center text-center ">
                        <table className="min-w-full text-center text-sm">
                            <tbody>        
                                <tr>
                                    <td className="text-sm text-black px-6 whitespace-nowrap">
                                        <label htmlFor="upload">Upload File</label>
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 whitespace-nowrap text-left ">
                                        <input
                                            className="block w-9/12  required inline"
                                            name="filename"
                                            type="file"
                                            id="myFile"
                                            onChange={(e) => handleFileAsync(e)}
                                        ></input>
                                        &nbsp;&nbsp;&nbsp;
                                        <CSVLink
                                            {...csvReport}
                                            className="text-blue-600 underline"
                                        >
                                            &#10515;Template
                                        </CSVLink>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button type="button" className="ml-5 mt-4 px-3 py-1 rounded font-semibold bg-gray-800 bg-opacity-90 text-white" onClick={()=>{handleSubmit()}}>
                            Submit
                        </button>
                        </form>
                        {t &&
                            <div className="mt-16">
                                {
                                    <>
                                    <table className=" rounded-md text-center px-6 py-4 whitespace-nowrap">
                                        <thead>
                                        <tr className=" bg-gray-800 bg-opacity-90 shadow-2xl text-white text-md">
                                            <th className="px-4 py-2 rounded-tl-md  ">Sr No</th>
                                            <th className="px-4 py-2  ">Name</th>
                                            <th className="px-4 py-2  ">Reg No</th>
                                            <th className="px-4 py-2  ">Message</th>
                                            <th className="px-4 py-2  rounded-tr-md ">Edit</th>
                                        </tr>
                                        </thead>
                                        <tbody className="border-br rounded-md">
                                        {data.map((dataa,i) => (
                                            <tr className="border-b">
                                            <td className="text-sm text-black px-4 py-2 whitespace-nowrap border-b border-r border-l">{i+1}</td>
                                            <td className="text-sm text-black px-4 py-2 whitespace-nowrap border-b border-r border-l">{dataa.name}</td>
                                            <td className="text-sm text-black px-4 py-2 whitespace-nowrap border-b border-r border-l">{dataa.reg_no}</td>
                                            <td className="text-sm text-black px-4 py-2 whitespace-nowrap border-b border-r border-l"><textarea disabled={disable[i]} type="text" value={dataa.message} onChange={(e)=>handleChange(i,e)}>{dataa.message}</textarea></td>
                                            <td className="text-sm text-black px-4 py-2 whitespace-nowrap border-b border-r border-l">
                                                <button type="button" className=" px-3 py-1 rounded font-semibold bg-gray-800 bg-opacity-90 text-white" onClick={()=>editMsg(dataa.reg_no)}>
                                                    Edit
                                            </button></td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                            
                                    <br></br>
                            
                                    <CSVLink {...csvReport} className="text-blue-600 underline">&#10515;Download as Excel</CSVLink>
                                    </>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Table;