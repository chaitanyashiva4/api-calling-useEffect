import { useState, useEffect } from 'react'
const url = "https://jsonplaceholder.typicode.com/users"

const App = () => {
  const [userData, setuserData] = useState([])
  const [loading, setloading] = useState(false)
  const [isError, setErrMsg] = useState({ status: false, msg: "" })

  const fetchUserData = async (url) => {
    setloading(true)
    setErrMsg({ status: false, msg: "" })
    try {
      const response = await fetch(url)
      const data = await response.json();
      console.log(data);
      setuserData(data)
      setloading(false)
      setErrMsg({ status: false, msg: "" })
    }
    catch (error) {
      setloading(false)
      setErrMsg({ status: true, msg: "Something went wrong please try again" })
    }
  }
  useEffect(() => {
    fetchUserData(url);
  }, [])
  if (loading) {
    return <div>
      <h3>Loading....</h3>
    </div>
  }
  if(isError?.status){
    return <div>
      {isError?.msg}
    </div>
  }

  return (
    <>
      <div className='data'>
        <h1>Data from Api</h1>
        <ul>
          {userData.map((eachUser) => {
            const { id, name, email, phone } = eachUser;
            return (
              <div key={id}>
                <li>{name}</li>
                <li>{email}</li>
                <li>{phone}</li>
              </div>
            )
          })}
        </ul>
      </div>
    </>
  )
}
export default App