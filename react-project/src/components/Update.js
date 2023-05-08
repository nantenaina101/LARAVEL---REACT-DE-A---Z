import React, { useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

import API from "../config/API";

const Update = () => {
    
    const { id } = useParams()
    
    const navigate = useNavigate();
    
    const [succes, setSucces] = useState({message : "", color : ""});
    
    const [state, setState] = useState({
        name : "", course : "", email : "", phone : "", image: "", old_image: "", imgUrl : null
    });
    
    const [validateName, setValidateName] = useState("");
    const [validateCourse, setValidateCourse] = useState("");
    const [validateEmail, setValidateEmail] = useState("");
    const [validatePhone, setValidatePhone] = useState("");
    
    useEffect(() => {
        API.get("student/" + id).then(response => {
            //setState(response.data);
            setState({
                name: response.data.name,
                course: response.data.course,
                email: response.data.email,
                phone:response.data.phone,
                //image: response.data.image,
                old_image: response.data.image,
                imgUrl : null
             });

             console.log(state);
        })
    }, [])
    
    const updateStudent = (e) => {
        e.preventDefault();

        setValidateName("")
        setValidateCourse("")
        setValidateEmail("")
        setValidatePhone("")
        
        const formData = new FormData()

        formData.append('name', state.name)

        formData.append('course', state.course)

        formData.append('email', state.email)

        formData.append('phone', state.phone)

        //formData.append('image', state.image)

        formData.append('old_image', state.old_image)

        API.put("student/"+id, state)
        //API.put("student/"+id, formData, {})
            .then(result => {

                console.log(result.data);
                
                //console.log(result.data.message);
                
                setSucces({ message: result.data.message, color: "success" })
                
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
               [e.target.name]: value,
            });
         }else{
            setState({
               ...state,
               //image:e.target.files[0],
               imgURL:URL.createObjectURL(e.target.files[0])
            });
         }
        //setState({ ...state, [e.target.name]: e.target.value });
    }
    
    return (
            <div className="container">
                <div className="row mt-4">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <div>
                            <h4>Modifier un étudiant
                                    <Link className="btn btn-danger btn-sm float-end" to="/">Retour</Link>
                            </h4>
                            
                            <div className="mt-4">
                                {succes.message && <div className={"text-white h6 w-50 p-2 bg-" + succes.color}>{succes.message}</div>}
                                <form onSubmit = {updateStudent} className="row">
                                    <div className="form-group mb-3 col-6">
                                        <label>Nom</label>
                                        <input type="text" name="name" value={state.name} onChange={handleInput} className="form-control" />
                                        { validateName && <span className="text-danger small">{validateName}</span>}
                                    </div>
                                    <div className="form-group mb-3 col-6">
                                        <label>Cours</label>
                                        <input type="text" name="course" value={state.course} onChange={handleInput} className="form-control"/>
                                        { validateCourse && <span className="text-danger small">{validateCourse}</span>}
                                    </div>
                                    <div className="form-group mb-3 col-6">
                                        <label>Email</label>
                                        <input type="email" name="email" value={state.email} onChange={handleInput} className="form-control"/>
                                        { validateEmail && <span className="text-danger small">{validateEmail}</span>}
                                    </div>
                                    <div className="form-group mb-3 col-6">
                                        <label>Téléphone</label>
                                        <input type="text" name="phone" value={state.phone} onChange={handleInput} className="form-control"/>
                                        { validatePhone && <span className="text-danger small">{validatePhone}</span>}
                                    </div>
                                    <div className="form-group mb-3 col-6">
                                        <label>Photo</label>
                                        <input type="file" name="image" onChange={handleInput} className="form-control" accept="image/*"/>
                                    </div>
 
                                    <div className="form-group mb-3">
                                        <img src={state.imgURL ? state.imgURL : "/uploads/" + state.old_image} width='100' height='100' />
                                    </div>

                                    <div className="form-group mb-3">
                                        
                                        <button type="submit" className="btn btn-primary">Modifier</button>
                                        
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

export default Update;