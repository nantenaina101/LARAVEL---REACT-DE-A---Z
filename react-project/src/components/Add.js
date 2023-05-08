import React, { useRef, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import API from "../config/API";

const Add = () => {
    
    const navigate = useNavigate();
    
    const [state, setState] = useState({student : {
        name : "", course : "", email : "", phone : "", image: ""
    }, imgUrl : null, successResponse : {message : "", color : ""}});
    
    const [validateName, setValidateName] = useState("");
    const [validateCourse, setValidateCourse] = useState("");
    const [validateEmail, setValidateEmail] = useState("");
    const [validatePhone, setValidatePhone] = useState("");
    let fileRef = useRef(null)
    
    const saveStudent = (e) => {
        e.preventDefault();

        setValidateName("")
        setValidateCourse("")
        setValidateEmail("")
        setValidatePhone("")
        
        const formData = new FormData()

        formData.append('name', state.student.name)

        formData.append('course', state.student.course)

        formData.append('email', state.student.email)

        formData.append('phone', state.student.phone)

        formData.append('image', state.student.image)

        API.post("student", formData, {})
            .then(result => {
                console.log(result.data.message);
                setState({ 
                    student:{name : "", course : "", email : "", phone : "", image: ""},
                    imgUrl : null,
                    successResponse: {message : result.data.message, color: "success"}
                })

                fileRef.current.value = null;
                
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
        if(!e.target.files){
            const value = e.target.value;
            setState({
                ...state,
                student : {
                    ...state.student,
                    [e.target.name]: value,
                 }
            });
         }else{
            setState({
               student:{...state.student, image : e.target.files[0]},
               imgURL:URL.createObjectURL(e.target.files[0]),
               successResponse : {message : "", color : ""}
            });
         }
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
                                {state.successResponse && <div className={"text-white h6 w-50 p-2 bg-" + state.successResponse.color}>{state.successResponse.message}</div>}
                                <form onSubmit = {saveStudent} className="row">
                                    <div className="form-group mb-3 col-6">
                                        <label>Nom</label>
                                        <input type="text" name="name" value={state.student.name} onChange={handleInput} className="form-control" />
                                    { validateName && <span className="text-danger small">{validateName}</span>}
                                    </div>
                                    <div className="form-group mb-3 col-6">
                                        <label>Cours</label>
                                        <input type="text" name="course" value={state.student.course} onChange={handleInput} className="form-control"/>
                                        { validateCourse && <span className="text-danger small">{validateCourse}</span>}
                                    </div>
                                    <div className="form-group mb-3 col-6">
                                        <label>Email</label>
                                        <input type="email" name="email" value={state.student.email} onChange={handleInput} className="form-control"/>
                                        { validateEmail && <span className="text-danger small">{validateEmail}</span>}
                                    </div>
                                    <div className="form-group mb-3 col-6">
                                        <label>Téléphone</label>
                                        <input type="text" name="phone" value={state.student.phone} onChange={handleInput} className="form-control"/>
                                        { validatePhone && <span className="text-danger small">{validatePhone}</span>}
                                    </div>

                                    <div className="form-group mb-3 col-6">
                                        <label>Photo</label>
                                        <input type="file" name="image" ref={fileRef} onChange={handleInput} className="form-control" accept="image/*"/>
                                    </div>
                                    {
                                    state.imgURL && 
                                    <div className="form-group mb-3">
                                        <img src={state.imgURL} width='100' height='100' />
                                    </div>
                                    }
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