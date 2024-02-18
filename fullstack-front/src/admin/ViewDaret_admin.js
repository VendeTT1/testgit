import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Period from "../admin/Periodicite_admin";
import Role from "../admin/Role_admin";
import { Table } from 'react-bootstrap';
import Test from "../test/test";
import Test2 from "../test/test2"
export default function ViewDaret_admin() {
    const [showModal, setShowModal] = useState(false);
    let navigate = useNavigate();
    const { id } = useParams();

    const [daret, setDaret] = useState([{
        name: "",
        numberOfParticipants: "",
        numberOfParticipantsTotal: "",
        amountPerPeriod: "",
        periodicity: "",
        startDate: ""

    }]);

  
    const jwtToken = localStorage.getItem('jwtToken');


    const [darets, setDarets] = useState([]);
    useEffect(() => {
        loadDarets();
    }, []);
    // console.log(darets.id);
    const loadDarets = async () => {
        try {
            const result = await axios.get(`http://localhost:8082/admin/daret/info/${id}`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            });
            console.log("hello this is my" + id);
            setDarets(result.data);
        }
        catch (error) {
            console.error("Error loading data:", error);
        }

    };
    return (

        <div className="container " >
            <h2 className="text-center m-4">Daret View:</h2>
            {/* <div className="row" > */}
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow" style={{ position: 'relative', top: 0, left: -350 }}>
                <div className="card" style={{ height: '600px' }} >
                    <div className="card-header" style={{ position: 'relative', height: '100%', top: '0%' }}>
                        Details of Daret:
                        <ul className="list-group list-group-flush" >
                            <li className="list-group-item">
                                <b>ID: </b>
                                {darets.id}
                            </li>
                            <li className="list-group-item">
                                <b>Name: </b>
                                {darets.name}
                            </li>
                            <li className="list-group-item">
                                <b>Start Date: </b>
                                {darets.startDate}
                            </li>
                            <li className="list-group-item">
                                <b>Membre Number: </b>
                                {darets.numberOfParticipants} / {darets.numberOfParticipantsTotal}
                            </li>
                            <li className="list-group-item">
                                <b>Periode: </b>
                                {darets.numberOfParticipantsTotal}
                            </li>
                            <li className="list-group-item">
                                <b>Amount/Period: </b>
                                {darets.amountPerPeriod} DHS
                            </li>
                            <br></br>
                            <Test2/>
                        </ul>
                    </div>
                </div>

            </div>
            {/* </div> */}

            <Period />
            <Role />
            <div className="fixed-bottom d-flex justify-content-center mb-3">
                <Link className="btn btn-primary" to="/admin_daret">
                    Back to Home
                </Link>
            </div>
        </div>
    )
}
