import React , {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { initializeUser} from '../../reducers/userReducer'
import '../../components/styles/defaultviewstyle.css'

const DefaultView = () => {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(initializeUser())
    }, [dispatch])
return (
    <div className='text'>
    <h1>Welcome, {user.username}</h1> 
    <p><b>To add a new list</b> to your shopping lists, click "+ Add a new list"</p>
    <p><b>To see and edit</b> your shopping lists, click on any of your existing lists on the left side of the page</p>
    </div>
)
}
export default DefaultView