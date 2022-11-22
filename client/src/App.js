import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [inputT, setInputT] = useState('text')
  const [inputL, setInputL] = useState('')
  const [inputP, setInputP] = useState('')

  const [visible, setVisible] = useState(false)
  const [vis, setVis] = useState(false)

  const [data, setData] = useState([])
  const [id, setId] = useState()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (data && data.length <= 20) {
      setData([...data, {
        type: inputT,
        label: inputL,
        placeholder: inputP
      }])
    } else if (!data) {
      setData([{
        type: inputT,
        label: inputL,
        placeholder: inputP
      }])
    } else {
      alert('Maximum limit reached')
    }
  }
  const removeInput = (value) => {
    setData(data.filter(item => item !== value))
  }

  useEffect(() => {
    if (data?.length > 0)
      setVisible(true)
  }, [data])

  const finalSubmit = e => {
    e.preventDefault()
    console.log(data);
    axios.post('http://localhost:3009/form-submit', { data }).then(response => {
      alert(response.data.msg)
      setData()
      setVisible(false)
    }).catch(error => {
      alert('Error: ' + error)
    })
  }
  const getPreviousForm = () => {
    axios.get('http://localhost:3009/form-submit').then(response => {
      console.log(response.data[0]);
      setData(response.data[0].data)
      setId(response.data[0]._id)
      setVis(true)
    }).catch(error => {
      alert('Error: ' + error)
    })
  }
  const updateForm = () => {
    axios.put('http://localhost:3009/form-submit', { data, id }).then(response => {
      alert(response.data.msg)
      setVis(false)
      setVisible(false)
      setData()
    }).catch(error => {
      alert('Error: ' + error)
    })
  }
  const deleteForm = () => {
    axios.delete('http://localhost:3009/form-submit').then(response => {
      alert(response.data.msg)
    }).catch(error => {
      alert('Error: ' + error)
    })
  }


  return (
    <div className="App">
      <div className='input-container'>
        <form onSubmit={handleSubmit}>
          <select onChange={e => setInputT(e.target.value)}>
            <option value='text'>Text</option>
            <option value='number'>Number</option>
            <option value='email'>Email</option>
            <option value='date'>Date</option>
          </select>
          <input type='text' placeholder='enter the label of the input required' required onChange={e => setInputL(e.target.value)} />
          <input type='text' placeholder='enter the placeholder of the input required' required onChange={e => setInputP(e.target.value)} />
          <button type='submit'>Add</button>
        </form>
      </div>
      {visible &&
        <div className='result-container'>
          {data && data.map((item, index) => (
            <div className='form-input' key={index}>
              <label htmlFor={index} >{item.label}</label>
              <input name={index}
                type={item.type}
                placeholder={item.placeholder}
                disabled
              />
              <button onClick={() => removeInput(item)} style={{ marginRight: '10px  ' }}>X</button>
            </div>
          ))}
          {!vis &&
            <div className='button'>
              <button onClick={e => finalSubmit(e)}>Save form</button>
            </div>
          }
        </div>
      }
      <div className='button-container'>
        <button onClick={getPreviousForm} className='previous-form'>Get previous form</button>
        {vis && <button onClick={updateForm} className='previous-form'>Update previous form</button>}
        <button onClick={deleteForm} className='previous-form'>Clear all forms</button>
      </div>
    </div>
  );
}

export default App;
