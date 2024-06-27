import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import './Style.css';
import { useNavigate } from 'react-router-dom'




export default function List() {

    const navigate = useNavigate();

    const [patients, setPatient] = useState([])

    const [selectedOption, setSelectedOption] = useState('');

    let [mergeArray, setMergeArray] = useState([]);

    const [modalValue, setModalValue] = useState(null);
    const [question, setQuestion] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [answer1, setAnswer1] = useState(null);
    const [answer2, setAnswer2] = useState(null);
    const [answer3, setAnswer3] = useState(null);
    const [answer4, setAnswer4] = useState(null);


    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const [formData, setFormData] = useState({
        qId:'',
        name: '',
        answer1: '',
        answer2: '',
        answer3: '',
        answer4: '',
        verseNo: '',
        correctAnswer:'',
      });



    const handleChange = (event) => {
      const value = event.target.value;
      setSelectedOption(value);

      console.log('Selected option:', value);

      const surah_no = { id : value };

        axios.post(`http://localhost:8000/mapi/search`, surah_no).then(({ data }) => {
         
        console.log(data);
        
         setPatient(data.data)

        })
      
    };
  
    let stringWithoutBraces = null;
    let arrayValues = null;


    const handleRowClick = (qId,question,answer,verseNo,correctAnswer) => {
       // setModalValue(question);
      //  setShowModal(true);

      stringWithoutBraces = answer.slice(1, -1); // Remove curly braces
      arrayValues = stringWithoutBraces.split(','); 
       console.log(arrayValues);
       // setQuestion(answer);

        setFormData({
            qId: qId,
            question: question,
            answer1: arrayValues[0].replace(/["']/g, ''),
            answer2: arrayValues[1].replace(/["']/g, ''),
            answer3: arrayValues[2].replace(/["']/g, ''),
            answer4: arrayValues[3].replace(/["']/g, ''),
            verseNo: verseNo,
            correctAnswer: correctAnswer
          });

    };

    const handleChange1 = (e) => {
      

        const { name, value } = e.target;

        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }));
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);

        await axios.post(`http://localhost:8000/mapi/update`, formData).then(({ data }) => {

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
        //  navigate('/create')
          window.location.reload();
        }
      }).catch(({ response }) => {
        console.log(response);
  
     //  setValidationError(response);
  
        if (response === 422) {
         // setValidationError(response.data.errors)
        } else {
  
        }
      })
    }



    // const handleCloseModal = () => {
    //     setShowModal(false);
    // };
   

    const fetch = async () => {

  
     
        // axios.post(`http://localhost:8000/mapi/search`, article).then(({ data }) => {
        //     setPatient(data.data)
        // })

    }

    const getInputValue = (event) => {

        console.log('working');
        const userValue = event.target.value;

        const article = { title: userValue };

        console.log(patients);
    }

    // const fetchPatients = async () => {
    //     await axios.get(`http://localhost:8000/mapi/listSurah`).then(({ data }) => {
    //         setPatient(data.data)
    //         console.log(data)
    //     })
    // }

    useEffect(() => {
       // fetchPatients()
        fetch();
       }, [])

    return (

        <div className="container">
            <div className="row">
                <div className='col-12'>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                appElement={document.getElementById('root')} // Pass the appElement prop
            >
                
                <p>{modalValue}</p>


                <form onSubmit={handleSubmit} class="form-container">
                <h5> Update </h5>
                  <Row>
                <Col>
  <div class="form-group">
    <label htmlFor="name" class="form-label">Name:</label>
    <input
      type="text"
      id="question"
      name="question"
      value={formData.question}
      onChange={handleChange1}
      class="form-input"
    />
  </div>
   </Col>
   <Col>

   <div class="form-group">
    <label htmlFor="verseNo" class="form-label">Verse No:</label>
    <input
      type="text"
      id="verseNo"
      name="verseNo"
      value={formData.verseNo}
      onChange={handleChange1}
      class="form-input"
    />
  </div>
   

  </Col>
  </Row>
  <Row>
                <Col>

                <div class="form-group">
    <label htmlFor="answer1" class="form-label">Answer 1:</label>
    <input
      type="text"
      id="answer1"
      name="answer1"
      value={formData.answer1}
      onChange={handleChange1}
      class="form-input"
    />
  </div>
 
  </Col>
  <Col>

  <div class="form-group">
    <label htmlFor="answer2" class="form-label">Answer 2:</label>
    <input
      type="text"
      id="answer2"
      name="answer2"
      value={formData.answer2}
      onChange={handleChange1}
      class="form-input"
    />
  </div>

</Col>
</Row>

<Row>
  <Col>


  <div class="form-group">
    <label htmlFor="answer3" class="form-label">Answer 3:</label>
    <input
      type="text"
      id="answer3"
      name="answer3"
      value={formData.answer3}
      onChange={handleChange1}
      class="form-input"
    />
  </div>

 
  </Col>

  <Col>
  <div class="form-group">
    <label htmlFor="answer4" class="form-label">Answer 4:</label>
    <input
      type="text"
      id="answer4"
      name="answer4"
      value={formData.answer4}
      onChange={handleChange1}
      class="form-input"
    />
  </div>
  </Col>

  </Row>
 <Col>
  <div class="form-group">
    <label htmlFor="correctAnswer" class="form-label">Correct Answer</label>
    <input
      type="text"
      id="correctAnswer"
      name="correctAnswer"
      value={formData.correctAnswer}
      onChange={handleChange1}
      class="form-input"
    />
  </div>
  </Col>
  <Row>

  </Row>

  <button type="submit" class="form-submit-button">Submit</button>

</form>

<div className="div-center">
<button class="close-button" onClick={closeModal}>Close Modal</button>
</div>
            
            </Modal>
                
                <div>
      <select value={selectedOption} onChange={handleChange}>
        <option value="">Select an option</option>
        <option value="89">Surah 89</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
    </div>

                    <Col>
                        <input type="text" onChange={getInputValue} placeholder="Search here" />
                    </Col>

                    <Col>
                        <Link className='btn btn-primary mb-2 float-end' to={"/create"}>
                            Create Appointment
                        </Link>
                    </Col>
                </div>
                
                <div className="col-12">
                    <div className="card card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered mb-0 text-center">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Verse No</th>
                                        <th>Answers</th>
                                        <th>Correct Answer</th>
                                        <th>Update</th> 
                                    </tr>
                                </thead>
                                <tbody>
                                    {

                                        // patients.length > 0 && (

                                            patients.map((row, key) => (

                                                <tr key={key} onClick={() => handleRowClick(row.q_id,row.question,row.answer,row.verse_no,row.correct_answer)}>
                                                    <td >{row.q_id}</td>
                                                    <td>{row.question}</td>
                                                    <td>{row.verse_no}</td>
                                                    <td>{row.answer}</td>
                                                    <td>{row.correct_answer}</td>
                                                    <td><button onClick={openModal} class="form-input">Update</button></td>
                                                </tr>
                                            ))
                                        // )
                                    }
                                </tbody>
                            </table>

                            <div>
          
        </div>


                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}