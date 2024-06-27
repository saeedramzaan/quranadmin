import React, { useState , useEffect } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'

export default function CreateProduct() {

  const navigate = useNavigate();


  const [patients, setPatient] = useState([])
  
  const [word, setWord] = useState("")
  const [answer1, setAnswer1] = useState("")
  const [answer2, setAnswer2] = useState("")
  const [answer3, setAnswer3] = useState("")
  const [answer4, setAnswer4] = useState("")
  
  const [verse_no,setVerse_no] = useState("");
  const [correctAnswer,setCorrectAnswer] = useState("");
  const [date, setDate] = useState("")
  

  const [validationError, setValidationError] = useState({})

  useEffect(() => {
    fetchPatients()
   // fetch();
   }, [])



   const today = new Date();

   const formattedDate = today.toISOString().split('T')[0];

   console.log(formattedDate);

  // 

   const fetchPatients = async () => {
    // await axios.get(`http://localhost:8000/mapi/listLastVerse`).then(({ data }) => {
    //     setPatient(data.data)
    //     console.log(data)
    // })

    const surah_no = { id : 89 };

    axios.post(`http://localhost:8000/mapi/listLastVerse`, surah_no).then(({ data }) => {
     
    console.log(data);
    
     setPatient(data.data)

   
    })
}

  const createProduct = async (e) => {
    
    e.preventDefault();

    const formData = new FormData()

    formData.append('word', word)
    formData.append('answer1', answer1)
    formData.append('answer2', answer2)
    formData.append('answer3', answer3)
    formData.append('answer4', answer4)
    formData.append('verseNo', verse_no)
    formData.append('correctAnswer', correctAnswer)
    formData.append('date',formattedDate)
  //  setDate(formattedDate);
 

    console.log(formData);

    await axios.post(`http://localhost:8000/mapi/store`, formData).then(({ data }) => {

      console.log(data.status);
      if (data.status == false) {
        Swal.fire({
          icon: "error",
          text: "Error"
        })
      } else {

        Swal.fire({
          icon: "success",
          text: "Success"
        })
    
       const timer = setTimeout(() => {
        // navigate('/')
        window.location.reload();
      }, 2000); // Time in milliseconds (5000ms = 5 seconds)
      }
    }).catch(({ response }) => {
      console.log(response);

     setValidationError(response);

      if (response === 422) {
        setValidationError(response.data.errors)
      } else {

      }
    })
  }

  return (

    <div className="container">

<div className="table-responsive">
                            <table className="table table-bordered mb-0 text-center">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Verse No</th>
                                        <th>Answers</th>
                                        <th>Date</th>                                         
                                    </tr>
                                </thead>
                                <tbody>
                                    {

                                        // patients.length > 0 && (

                                            patients.map((row, key) => (

                                                <tr key={key}>
                                                    <td >{row.q_id}</td>
                                                    <td>{row.question}</td>
                                                    <td>{row.verse_no}</td>
                                                    <td>{row.answer}</td>
                                                    <td>{row.updated_date}</td>
                                                </tr>
                                            ))
                                        // )
                                       
                                    }
                                </tbody>
                            </table>

                            <div>
          
        </div>


                           
                        </div>
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6">




          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Add Appointment</h4>
           
              <div className="form-wrapper">

              <div className="col-12">
                    <div className="card card-body">
                    
                    </div>
                </div>



                {
                  Object.keys(validationError).length > 0 && (

                    <div className="row">
                      <div className="col-12">
                        <div className="alert alert-danger">
                          <ul className="mb-0">
                            {
                              Object.entries(validationError).map(([key, value]) => (
                                <li key={key}>{value}</li>
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  )
                }

                <Form onSubmit={createProduct}>
                  <Row>
                    <Col>
                      <Form.Group controlId="Name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={word} onChange={(event) => {
                          setWord(event.target.value)
                        }} />
                      </Form.Group>
                    </Col>
                                  
                    <Col>
                      <Form.Group controlId="Email">
                        <Form.Label>Verse No</Form.Label>
                        <Form.Control type="text" value={verse_no} onChange={(event) => {
                          setVerse_no(event.target.value)
                        }} />
                      </Form.Group>
                    </Col>

                  </Row>
                  <Row className="my-3">
                  <Col>
                      <Form.Group controlId="Email">
                        <Form.Label>Answer1</Form.Label>
                        <Form.Control type="text" value={answer1} onChange={(event) => {
                          setAnswer1(event.target.value)
                        }} />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="Address">
                        <Form.Label>Answer 2</Form.Label>
                        <Form.Control type="text" value={answer2} onChange={(event) => {
                          setAnswer2(event.target.value)
                        }} />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="my-3">
                    <Col>
                      <Form.Group controlId="mobile_no">
                        <Form.Label>Answer 3</Form.Label>
                        <Form.Control type="text" value={answer3} onChange={(event) => {
                          setAnswer3(event.target.value)
                        }} />
                      </Form.Group>
                    </Col>
               
                    
                    <Col>
                      <Form.Group controlId="mobile_no">
                        <Form.Label>Answer 4</Form.Label>
                        <Form.Control type="text" value={answer4} onChange={(event) => {
                          setAnswer4(event.target.value)
                        }} />
                      </Form.Group>
                    </Col>
                  </Row>


                  <Row className="my-3">
                    <Col>
                      <Form.Group controlId="Date">
                         <Form.Label>Date</Form.Label>
                        <Form.Label>{formattedDate}</Form.Label>
                      </Form.Group>
                    </Col>

                    <Col>
                      <Form.Group controlId="mobile_no">
                        <Form.Label>Correct Answer</Form.Label>
                        <Form.Control type="text" value={correctAnswer} onChange={(event) => {
                          setCorrectAnswer(event.target.value)
                        }} />
                      </Form.Group>
                    </Col>

                  </Row>

                  <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                    Add
                  </Button>
                </Form>
                

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
