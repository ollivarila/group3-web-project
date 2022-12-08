/* eslint-disable react/react-in-jsx-scope */
import React from 'react'
import './ItemForm.css'
// import { useState } from 'react'

// const API_URL=process.env.REACT_APP_API_URL;

const ItemForm = () => {
  /* const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()

  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  // const [error, setError] = useState(null)
  // const [emptyFields, setEmptyFields] = useState([])
  */
  /*
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const workout = { title, load, reps }

    const response = await fetch(`${API_URL}/workouts/`, {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setTitle('')
      setLoad('')
      setReps('')
      setError(null)
      setEmptyFields([])
      dispatch({ type: 'CREATE_WORKOUT', payload: json })
    }
  }
*/
  return (
    <>
      <form>
        <h3>Add a New Item</h3>
        <div className="insideFrame">
          <label className='item'>Name:</label>
          <input />
          <label className='item'>Amount:</label>
          <input />
          <label className='item'>Unit:</label>
          <input />
          <label className='item'>Comment:</label>
          <input />
          <button>Add Item</button>
          <button>Save List</button>
        </div>
      </form>
    </>
  )
}

export default ItemForm
