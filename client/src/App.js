import './App.css';
import { useState, useProps } from 'react'
/*
  Creating a small page for our user. Sine this is backend focused, I won't worry too much about the frontend structure.
*/

function App() {
  const axios = require('axios')
  const [url, setUrl] = useState("")
  const [message, setMessage] = useState("")
  const [owner, setOwner] = useState("")
  const [repo, setRepo] = useState("")

  const validateURL = () => {
    const rgx = new RegExp(/^(http(|s)\:\/\/)(github.com+(:\d+)?)(?::|\/)([\d\/\w.-]+?)?$/) //Regex to validate github urls EX: https://github.com/colinhacks/zod or https://github.com/
    
    if (rgx.test(url)) {
      setOwner(url.split('/')[url.split('/').length - 2 ])
      setRepo(url.split('/')[url.split('/').length - 1 ])
      return true
    } else {
      return false
    }
  }

  let handleSubmit = async (e) => {
    e.preventDefault();

    if (!await validateURL()) {
      window.alert('Please Enter a Valid Repository URL')
      setMessage('')
      return;
    }
    try {
      let res = await axios({
        method: "POST",
        url: `http://localhost:5000/queryRepository`,
        params: {
          repo: repo,
          owner: owner
        },
        headers: {
          contentType: "application/json"
        }
      });
      console.log(res)
      if (res.status === 200) {
        setUrl("");
        setMessage("Grabbed Your Repo!");
        window.alert(res.status)
      } else {
        console.log(res)
        window.alert(res.status)
        setMessage("Something went wrong");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="App">
      <div className="container">
        <h1>Github Pull Request API</h1>
        <div className="container--form">
          <form onSubmit={handleSubmit}>
            <input
              type="url"
              value={url}
              placeholder="Github Repository Url"
              onChange={(e) => setUrl(e.target.value)}
            />

            <button type="submit">Query</button>

            <div className="message">{message ? <p>{message}</p> : null}</div>
          </form>
        </div>
      </div>
    </div>
  );
}




export default App;
