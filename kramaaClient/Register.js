import React, { Component } from "react";
import axios from "axios";
import { Link} from "react-router-dom";
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Register extends Component {
    constructor(props){
      super(props);
      this.state = {
        email: '',
        otp: '',
        submittedOTP: '',
        otpVerified: '',
        name: '',
        password: '',
        repeatPassword: '',
        userRegistered: '',
        organizationName: '',
        addressLine1: '',
        addressLine2: '',
        addressLine3: ''
      };

      this.handleChange = this.handleChange.bind(this);
      this.onSubmitForm = this.onSubmitForm.bind(this);
      this.onSubmitOTP = this.onSubmitOTP.bind(this);
      this.onSubmitUserDetails = this.onSubmitUserDetails.bind(this);
    }

    handleChange(e) {
      const { name, value } = e.target;
      console.log("name", name, "value", value);
      this.setState({ [name]: value });
    }
    onSubmitForm(e) {
      e.preventDefault();
      console.log("Submitted");
      axios.post('/api/users/userOnboarding', {email: this.state.email})
      .then(res => {
        this.setState({otp: res.data.otp})
        console.log("OTP is", this.state.otp);
      })
    }

    onSubmitOTP(e) {
      e.preventDefault();
      axios.post('/api/users/verifyOTP', {'email': this.state.email, 'otp': this.state.submittedOTP})
      .then(res => {
        if(res.data.status == "true"){
          this.setState({otpVerified: "true"})
        }
      })
    }
    onSubmitUserDetails(e) {
      e.preventDefault();
      if(this.state.password == this.state.repeatPassword){
        axios.post('/api/users/userRegistration', {'email': this.state.email, 'name': this.state.name, 'password': this.state.password, 'organizationName': this.state.organizationName, 'addressLine1': this.state.addressLine1, 'addressLine2': this.state.addressLine2, 'addressLine3': this.state.addressLine3})
        .then(res => {
          if(res.data.status== "New User"){
            this.setState({userRegistered: "true"})
          }
        });
      }
      else {
        console.log("Passwords don't match");
      }
    }
    render() {
        const { email, submittedOTP, otpVerified, name, organizationName, addressLine1, addressLine2, addressLine3, password, repeatPassword, userRegistered } = this.state;
        let render;
        if(this.state.otp==""){
          render = <div>
            <h2>Register</h2>
            <Form>
            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="icon-user"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input type="text" name="email" value= {email} onChange={this.handleChange} placeholder="Enter email" autoComplete="username" />
            </InputGroup>
            <Button color="success" onClick= {this.onSubmitForm} block>Register</Button>
          </Form>
        </div>;
      } else if(otpVerified==""){
          render = <div>
            <h2>OTP</h2>
            <Form>
            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="icon-user"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input type="text" name="submittedOTP" value= {submittedOTP} onChange={this.handleChange} placeholder="Enter  OTP" autoComplete="username" />
            </InputGroup>
            <Button color="success" onClick= {this.onSubmitOTP} block>Submit OTP</Button>
          </Form>
        </div>;
        }
        else if(userRegistered==""){
        render =    <Form>
                      <h1>Register</h1>
                      <p className="text-muted">Create your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="name" value= {name} onChange={this.handleChange} placeholder="Username" autoComplete="username" />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="organizationName" value= {organizationName} onChange={this.handleChange} placeholder="Organization Name" autoComplete="Organization Name" />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="addressLine1" value= {addressLine1} onChange={this.handleChange} placeholder="AddressLine1" autoComplete="AddressLine1" />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="addressLine2" value= {addressLine2} onChange={this.handleChange} placeholder="AddressLine2" autoComplete="AddressLine2" />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="addressLine3" value= {addressLine3} onChange={this.handleChange} placeholder="AddressLine3" autoComplete="AddressLine3" />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>@</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" readOnly name="email" value= {email} placeholder="Email" autoComplete="email" />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" name="password" value= {password} onChange={this.handleChange} placeholder="Password" autoComplete="new-password" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Repeat password" name="repeatPassword" value= {repeatPassword} onChange={this.handleChange} autoComplete="new-password" />
                      </InputGroup>
                      <Button color="success" onClick= {this.onSubmitUserDetails} block>Create Account</Button>
                    </Form>;
        }
        else {
          render = <div>
            <h3>User Has been Registered Successfully</h3>
              <Link to="/login">
                <Button color="primary" className="mt-3" active tabIndex={-1}>Proceed to Login</Button>
              </Link>
            </div>;
        }
        return (
          <div className="app flex-row align-items-center">
            <Container>
              <Row className="justify-content-center">
                <Col md="9" lg="7" xl="6">
                  <Card className="mx-4">
                    <CardBody className="p-4">

                      {render}

                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Container>
          </div>

        );
    }
}

export default Register;