import { useState, useEffect } from 'react'
import { SERVER_URL } from './const'

const Test = () => {
  const [data, setData] = useState([{}])
  useEffect(() => {
    fetch(`${SERVER_URL}/test`).then(res => res.json())
      .then(
        data => {
          setData(data)
          console.log(data)
        }
      )
  }, [])
  

  return (
    <div>
      {(typeof data.members === 'undefined') ? (<p>Loading...</p>) :
        (
          data.members.map((member, i) => (
            <p key={i}>{member}</p>
          ))
        )}
    </div>
  )
}

export default Test