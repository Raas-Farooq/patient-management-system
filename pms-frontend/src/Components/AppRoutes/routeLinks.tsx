import {Route, Routes} from 'react-router-dom';

import PatientProfile from '../pages/patientDetail.tsx';
import Home from '../pages/home.tsx';
import PatientForm from '../pages/addPatient.tsx';
import UpdatePatientProfile from '../pages/updatePatientProfile.tsx';
import Register from '../RegisterLogin/register.tsx';


const RouteLinks = () => {
    return(
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile/:patientId" element={<PatientProfile />} />
                    <Route path='/addPatient' element={<PatientForm />} />
                    <Route path="/updatePatientProfile" element={<UpdatePatientProfile />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        
    )
}

export default RouteLinks