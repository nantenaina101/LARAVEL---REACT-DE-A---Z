import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../config/API";
const Home = () => {
    
    const [succes, setSucces] = useState({message : "", color : ""});
    
    const [state, setState] = useState({ student : [], loading : true})
    
    useEffect(() => {
        API.get("students").then(result => {
            setState({ student: result.data, loading: false })
        }).catch(error => {
            console.log(error);
        })
    }, [])
    
    const deleteStudent = (id) => {
        
        API.delete("student/" + id).then(result => {
            
            setSucces({ message: result.data.message, color: "success" })
            
            setState({ student: state.student.filter(item => item.id != id), loading: false })
            
            setTimeout(function () {
                    setSucces({ message: "", color: "" })
                }, 2000)
            
        }).catch(error => {
            setSucces({message : error.response.data.message, color : "danger"})
        })
        
    }
    
    let tbody_content = ""
    
    if (state.loading) {
        tbody_content = <tr><td colSpan={6}>Chargement...</td></tr>
    } else {
        if (state.student.length > 0) {
            tbody_content = state.student.map((item,index) => {
                return (
                    <tr key={item.id} align="middle">
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.course}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>
                            <Link to={'update/' + item.id} className="btn btn-success btn-sm">Modifier</Link>
                            &nbsp;&nbsp;
                            <Link onClick={() => { deleteStudent(item.id) }} className="btn btn-danger btn-sm">Supprimer</Link>
                        </td>
                    </tr>
                );
            });
        } else {
            tbody_content = <tr><td className="text-center" colSpan={6}>Aucun enregistrement</td></tr>
        }
        
    }
    
    return (
            <div className="container">
                <div className="row mt-4">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <div>
                            <h4>
                                Liste des étudiants
                            </h4>
                            <div className="table-responsive mt-4">
                                {succes.message && <div className={"text-white h6 w-50 p-2 bg-" + succes.color}>{succes.message}</div>}
                                <table className="table table-striped table-hover text-center">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nom</th>
                                            <th>Cours</th>
                                            <th>Email</th>
                                            <th>Téléphone</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tbody_content}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-2"></div>
                </div>
            </div>
    )
}

export default Home;