import React, { Component } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';


const validation = ({ error, ...rest }) => {
    let checkValidation = false;

    Object.values(error).forEach(val => {
        if (val.length > 0) {
            checkValidation = false
        } else {
            checkValidation = true
        }
    });

    Object.values(rest).forEach(val => {
        if (val === null) {
            checkValidation = false
        } else {
            checkValidation = true
        }
    });
     
    return checkValidation;
    
};

export default class Form extends Component {


    constructor(props) {
        super(props)

        this.state = {
            name: '',
            number: '',
            batch:'',
            message: '',
            error: {
                name: '',
                number: '',
            }
        }
    }
    
    onFormSubmit = event => {
       const name=this.state.name;
       const age=this.state.number;
       const batch=this.state.batch;
        event.preventDefault();
        
        if (validation(this.state)) {
            console.log(this.state)
            
        } else {
            console.log("Error occured");
        }
        var payment = this.CompletePayment();
        if(payment===true){
        var formData={
          name: name,
          age: age,
          batch: batch
        }
        axios.post('http://localhost:3001/user', formData,{headers:{"Content-Type" : "application/json"}})
        .then(function (response) {
          Swal.fire('Transaction Completed!','Successfully registered','success')
          event.target.reset();
        })
    
        .catch(function (error) {
          console.log(error);
        });
    }
        
    };
    CompletePayment=()=>{
        return true;
    }
    handleChange(event) {
        this.setState({value: event.target.value});
      }
   
    formObject = event => {

        event.preventDefault();

        const { name, value } = event.target;
        let error = { ...this.state.error };

        switch (name) {
            case "name":
                error.name = value.length < 3 ? "Name should be 3 characters long" : "";
                break;
            case "number":
                error.number =
                    (value< 18 || value>65) ? "Age Must be between 18-65 years" : "";
                break;
            default:
                break;
        }

        this.setState({
            error,
            [name]: value
        })
        
    };
     

    render() {

        const { error } = this.state;

        return (
            <div className="container d-flex justify-content-center">
                <div className="card mt-5">
                
                    <form className="card-body" onSubmit={this.onFormSubmit}>
                    <h3>Welcome To FlexMoney</h3>
                    <br></br>
                       <h5>{this.state.message}</h5>

                        <div className="form-group mb-3">
                            <label className="mb-2"><strong>Name</strong></label>
                            <input 
                               required
                               type="text" 
                               name="name"
                               onChange={this.formObject}
                               className={error.name.length > 0 ? "is-invalid form-control" : "form-control"}/>
                            
                                {error.name.length > 0 && (
                                <span className="invalid-feedback">{error.name}</span>
                                )}
                        </div>

                        <div className="form-group mb-3">
                            <label className="mb-2"><strong>Age</strong></label>
                            <input
                                required
                                type="number"
                                name="number"
                                className={error.number.length > 0 ? "is-invalid form-control" : "form-control"}
                                onChange={this.formObject}/>

                                {error.number.length > 0 && (
                                    <span className="invalid-feedback">{error.number}</span>
                                )}
                        </div>
                 
                        <div className="form-group mb-3 d-inline-flex">
                            <label className="me-2"><strong>Batch</strong></label><br/>
                            <label className="me-2">
                              <select name="batch"  value={this.state.value} onChange={this.handleChange} required>
                                <option value="6-7AM">6-7AM</option>
                                <option value="7-8AM">7-8AM</option>
                                <option value="8-9AM">8-9AM</option>
                                <option value="5-6PM">5-6PM</option>
                              </select>
                                </label>
                            

                        </div>
                       
                        <div className="d-grid mt-3">
                            <button type="submit" className="btn btn-block btn-primary">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
