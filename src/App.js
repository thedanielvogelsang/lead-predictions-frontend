import React, {useState, useEffect} from 'react';
import logo from './machine-learning.jpg';
import './styles/App.css';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import predictions from './data/predictions';
import Star from '@material-ui/icons/Star';
import HalfStar from '@material-ui/icons/StarHalf';
import StarBorder from '@material-ui/icons/StarBorder';
import { post } from './api_client';
// import Icon from '@material-ui/core/Icon';
function App(){
  const accountExec = useFormInput('');
  const accountSource = useFormInput('');
  const industry = useFormInput('');
  const postalCode = useFormInput('');
  const numEmployees = useFormInput('');
  const annualRevenue = useFormInput('');
  const numUsers = useDropdownInput('');

  const [totals, setTotals] = useState({
    category: '',
    totalSpending: '',
    totalSpendingConfidence: '',
    totalContracts: '',
    totalContractConfidence: '',
    numContractsPerMonth: '',
    firstContract: '',
  });

  const [form, changeForm] = useState(true)

  useEffect(()=>{
    document.title = 'Lead Predictions App'
  })

  function handleSubmit(e){
    const postValues = {
      accountExec: accountExec.value,
      accountSource: accountSource.value,
      industry: industry.value,
      postalCode: postalCode.value,
      numEmployees: numEmployees.value,
      annualRevenue: annualRevenue.value,
      numUsers: numUsers.value[0]
    }
    const newValue = predictions[Math.floor(Math.random() * predictions.length)];
    e.preventDefault();
    let returnValue;
    post('test', postValues)
      .then(data => console.log(data))
      .catch(
        err => console.log('error!!!', err)
      )
    changeForm(false)
    setTotals({...newValue})
  }

  function handleReturnForm(e){
    e.preventDefault();
    accountExec.reset();
    accountSource.reset();
    industry.reset();
    postalCode.reset();
    numEmployees.reset();
    annualRevenue.reset();
    numUsers.reset();
    changeForm(!form)
  }

  useEffect(() => {
    // console.log(form);
  });

  const display = form ? 'none' : 'flex';

  return (
    <div className="App">
      <div className="App-body">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>
          Input Account Lead Info:
        </h2>
        <a
          className="App-link"
          href="https://login.salesforce.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Go To Salesforce
        </a>
        <div className='App-forms'>
          <div className={`form-div ${form}`}>
              <Form onSubmit={handleSubmit}>
                <h3>Input Values</h3>
                <FormGroup>
                  <Label for="accountExec">Account Executive</Label>
                  <Input {...accountExec } id="accountExec" />
                </FormGroup>
                <FormGroup>
                  <Label for="postalCode">Account Source</Label>
                  <Input {...accountSource } id="postalCode" />
                </FormGroup>
                <FormGroup>
                  <Label for="industry">Industry</Label>
                  <Input {...industry } id="industry" />
                </FormGroup>
                <FormGroup>
                  <Label for="postalCode">Zipcode</Label>
                  <Input {...postalCode } id="postalCode" />
                </FormGroup>
                <FormGroup>
                  <Label for="postalCode">Number of Employees?</Label>
                  <Input {...numEmployees } id="postalCode" />
                </FormGroup>
                <FormGroup>
                  <Label for="postalCode">Annual Revenue?</Label>
                  <Input {...annualRevenue } id="postalCode" />
                </FormGroup>
                <FormGroup>
                  <Label for="numUsers">Number Estimated Users?</Label>
                    <Input {...numUsers} type="select" name="selectMulti" id="numUsers" multiple>
                      <option>One</option>
                      <option>Some</option>
                      <option>Many</option>
                    </Input>
                </FormGroup>
                { form ?
                  <Button className={`btn btn-primary`}>Submit</Button> :
                  <Button className={`btn btn-primary`}>Re-Submit</Button> }
              </Form>
          </div>
          <div style={{display:`${display}`}} className='returnData'>
            <h3 className='returnData-color'>Predicted Values</h3>
            <div className='predictionDiv'>
              <p>{
                totals.category === 'First Tier' ?
                   <Star style={{color: 'gold'}} fontSize="large" /> : totals.category === 'Second Tier' ?
                   <HalfStar style={{color: 'gold'}} fontSize="large" /> : totals.category === 'Third Tier' ?
                   <StarBorder style={{color: 'gold'}} fontSize="large" /> : null
              } <span className="predictionVal">{totals.category}</span></p>
              <p> Total Spending: <span className="predictionVal">{totals.totalSpending}</span></p>
              <p className="confidence-score">confidence score: <b>{totals.totalSpendingConfidence}</b></p>
              <p> Total number contracts: <span className="predictionVal">{totals.totalContracts}</span></p>
              <p className="confidence-score">confidence score: <b>{totals.totalContractConfidence}</b></p>
              <p> Number contracts per month: <span className="predictionVal">{totals.numContractsPerMonth}</span></p>
              <p> Time to first contract completion: <span className="predictionVal">{totals.firstContract}</span></p>
            </div>
            <Button
              className='btn btn-primary returnData-color'
              onClick={handleReturnForm}
              >New Lead
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  function useDropdownInput(initialValue){
    const [value, setValue] = useState(initialValue);

    function handleInputChange(e){
      // console.log(e.target.value)
      setValue(e.target.value)
    }

    return{
      value: [value],
      reset: () => setValue(''),
      onChange: handleInputChange
    };
  };

  function useFormInput(initialValue){
    const [value, setValue] = useState(initialValue);

    function handleChange(e){
      setValue(e.target.value)
    }

    return{
      value,
      reset: () => setValue(''),
      onChange: handleChange
    };
  };
}

export default App;
