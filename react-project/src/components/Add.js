import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import API from "../config/API";

const Add = () => {
    
    const navigate = useNavigate();
    
    const [succes, setSucces] = useState({message : "", color : ""});
    
    const [state, setState] = useState({
        name : "", course : "", email : "", phone : ""
    });
    
    const [validateName, setValidateName] = useState("");
    const [validateCourse, setValidateCourse] = useState("");
    const [validateEmail, setValidateEmail] = useState("");
    const [validatePhone, setValidatePhone] = useState("");
    
    const saveStudent = (e) => {
        e.preventDefault();

        setValidateName("")
        setValidateCourse("")
        setValidateEmail("")
        setValidatePhone("")

        API.post("student", state)
            .then(result => {
                console.log(result.data.message);
                setSucces({ message: result.data.message, color: "success" })
                
                setState({
                    name : "", course : "", email : "", phone : ""
                });
                
                setTimeout(function () {
                    navigate("/");
                }, 2000)

            })
            .catch(error => {

                console.log(error);
                
                if (error.response.data.message.name) {
                    setValidateName(error.response.data.message.name[0])
                }
                
                if (error.response.data.message.course) {
                    setValidateCourse(error.response.data.message.course[0])
                }

                if (error.response.data.message.email) {
                    setValidateEmail(error.response.data.message.email[0])
                }
                
                if (error.response.data.message.phone) {
                    setValidatePhone(error.response.data.message.phone[0])
                }

                
            })
        
    }
    
    const handleInput = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    }
    
    return (
            <div className="container">
                <div className="row mt-4">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <div>
                            <h4>Ajouter un étudiant
                                    <Link className="btn btn-danger btn-sm float-end" to="/">Retour</Link>
                            </h4>
                            
                            <div className="mt-4">
                                {succes.message && <div className={"text-white h6 w-50 p-2 bg-" + succes.color}>{succes.message}</div>}
                                <form onSubmit = {saveStudent}>
                                    <div className="form-group mb-3">
                                        <label>Nom</label>
                                        <input type="text" name="name" value={state.name} onChange={handleInput} className="form-control" />
                                    { validateName && <span className="text-danger small">{validateName}</span>}
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Cours</label>
                                        <input type="text" name="course" value={state.course} onChange={handleInput} className="form-control"/>
                                        { validateCourse && <span className="text-danger small">{validateCourse}</span>}
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Email</label>
                                        <input type="email" name="email" value={state.email} onChange={handleInput} className="form-control"/>
                                        { validateEmail && <span className="text-danger small">{validateEmail}</span>}
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Téléphone</label>
                                        <input type="text" name="phone" value={state.phone} onChange={handleInput} className="form-control"/>
                                        { validatePhone && <span className="text-danger small">{validatePhone}</span>}
                                    </div>
                                    <div className="form-group mb-3">
                                        
                                        <button type="submit" className="btn btn-primary">Ajouter</button>
                                        
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-2"></div>
                </div>
            </div>
        )
}

export default Add;