import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Form, FormGroup, Label, Input, FormText,Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';

class ProjectFormModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      name: '',
      description: '',
      tokenName: '',
      tokenSymbol: '',
      industry: '',
      subIndustry: '',
      subIndustryList: '',
      isLoading: false
    };

    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleIndustryChange = this.handleIndustryChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  componentDidMount() {
    if(this.props.isClosed=="true"){
      this.setState({
        modal: false
      })
    }
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleIndustryChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    switch(value){
      case "1": console.log("1");
                break;
    }
  }

  onSubmitForm(e) {
    e.preventDefault();
    this.setState({
      isLoading: true
    })
    this.props.parentHandler(this.state.name, this.state.industry, this.state.subIndustry, this.state.name, this.state.name)
  }

  render() {
    const {name, description, industry, subIndustry, tokenName, tokenSymbol, isLoading} = this.state;
    let button;
    if(!isLoading){
      button = <Button color="primary" onClick = {this.onSubmitForm} >Create Project</Button>;
    }
    else {
      button = 'Please wait ...';
    }
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}><strong>New Project Form</strong></ModalHeader>
              <ModalBody>
              <Form className="form-horizontal">
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Project Name</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="text" name="name" value= {name} onChange={this.handleChange}  id="text-input" placeholder="Text" />
                    <FormText color="muted">This is a help text</FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Project Description</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="text" id="text-input" name="text-input" placeholder="Text" />
                    <FormText color="muted">Describe your project</FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">Select Industry</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="select" name="industry" value= {industry} onChange={this.handleIndustryChange} id="select">
                      <option value="0">Please select</option>
                      <option value="Smart City">Smart City</option>
                      <option value="Building">Building</option>
                      <option value="Energy">Energy</option>
                      <option value="Automobile">Automobile</option>
                      <option value="Retail">Retail</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Agriculture">Agriculture</option>
                      <option value="Supply Chain">Supply Chain</option>
                      <option value="Industry">Industry</option>
                      <option value="Other">Other</option>
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Sub Industry</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="text" name="subIndustry" value= {subIndustry} onChange={this.handleChange} id="text-input" placeholder="Text" />
                    <FormText color="muted">This is a help text</FormText>
                  </Col>
                </FormGroup>
              </Form>
              </ModalBody>
              <ModalFooter>
                {button}
              </ModalFooter>
            </Modal>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ProjectFormModal;
