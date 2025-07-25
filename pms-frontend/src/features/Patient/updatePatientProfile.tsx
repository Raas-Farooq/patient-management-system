// import { zodResolver } from "@hookform/resolvers/zod"
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod"
import FormComponent from "../../Components/pages/formComponent";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { useEffect, useState } from "react";
import { ImInsertTemplate } from "react-icons/im";

 const patientSchema=z.object({
        patientId:z.string().optional(),
        patientName:z.string().min(2),
        phone:z.string(),
        diagnosis:z.string().min(3),
        gender:z.string().optional(),
        city:z.string().min(2),
        dateOfBirth:z.date().max(new Date),
        age:z.number().min(0).max(120)
    })

type PatientDataType=z.infer<typeof patientSchema>

function UpdatePatientProfile(){
    const [updatingPatientLoading, setUpdatingPatientLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [objectId, setObjectId] = useState('');
    const patientData = location.state?.[0];

    // const {register, handleSubmit, formState:{errors}, reset} = useForm({
    //     resolver:zodResolver(patientSchema),
    //         defaultValues:patientData || {
    //             patientId:'',
    //             patientName:'',
    //             diagnosis:'',
    //             city:'',
    //             age:0
    //         }
    //     })

    
    // useEffect(() => {
    //     if(patientData){
    //       reset(patientData)  
    //     }
    // },[patientData, reset])

    useEffect(() => {
        setObjectId(patientData._id);
    },[patientData])
   const mySubmitFunction = async (data:PatientDataType) => {
    
    let userUpdatedFields:{[key:string]:any} = {};

     Object.entries(data).forEach(([key, val]) => {
        if(patientData[key] !== val){
            userUpdatedFields[key] = val
        }
    })
    console.log("UserUpdatedFields ", userUpdatedFields)
    // patientData.forEach((element:Object, index) => {
    //     console.log("element: ",element);
    // })
    const patchPatientDetail = new FormData();
    // const {diagnosis, ...withoutDiagnosis} = data;
    // const newData = {
    //     ...withoutDiagnosis,
    //     phone:'+923012707036',
    //     medicalHistory:[
    //         {
    //             date: new Date(),
    //             diagnosis
    //         }
    //     ]
    // }
    // console.log("new data before sending to backend ", newData)
    // patchPatientDetail.append('updatedDetail', JSON.stringify(newData));
    // try{
    //     setUpdatingPatientLoading(true);
    //     const response = await axios.put(`http://localhost:2500/pms/updatePatientProfile/${objectId}`,
    //         patchPatientDetail
    //     )

    //         console.log("response after making update request: ", response);
    //         if(response.data.success){
    //             alert("Successfully Updated the Patient");
    //             // navigate(-1);
    //         }
    // }
    // catch(err){
    //     console.log("error got while updating: ", err);
    // }
    // finally{
    //     setUpdatingPatientLoading(false)
    // }
    
   }

    return (
        <div className="h-screen bg-gray-200 flex justify-center items-center flex flex-col ">
            {updatingPatientLoading && 
            <div className="fixed inset-0 bg-black z-40 opacity-50 flex justify-center items-center">

                <div className="shadow-lg rounded-lg flex justify-center items-center p-6 gap-4 bg-white">
                    <FaSpinner className="animate-spin text-xl"></FaSpinner>
                    <span className="text-xl text-blue-800"> Updating Patient.. </span>
                 </div>
            </div>
            }
            <article className="w-full max-w-xl shadow-xl rounded-lg px-8 py-3 bg-white">
                    <h1 className="underline decoration-blue-500 text-2xl font-bold">UPDATE PATIENT</h1>
                    <FormComponent receiveSubmitData={mySubmitFunction} initialData={patientData} />
            </article>
        </div>
    )
}

export default UpdatePatientProfile