import './App.css';
import { useState, useEffect } from 'react'
import DisplayResults from './components/displayResults'
import PacmanLoader from 'react-spinners/PacmanLoader'

/*
  Creating a small page for our user. Sine this is backend focused, I won't worry too much about the frontend structure.
*/

function App() {
  const axios = require('axios')
  const [url, setUrl] = useState("")
  const [message, setMessage] = useState("")
  const [owner, setOwner] = useState("")
  const [repo, setRepo] = useState("")
  const [results, setResults] = useState("")
  let [loading, setLoading] = useState(false);

  //Make sure we get the last character of the URL
  useEffect(() => {
    validateURL();
  }, [url])

  const validateURL = () => {
    const rgx = new RegExp(/^(http(|s)\:\/\/)(github.com+(:\d+)?)(?::|\/)([\d\/\w.-]+?)?$/) //Regex to validate github urls EX: https://github.com/colinhacks/zod or https://github.com/

    if (rgx.test(url)) {
      setOwner(url.split('/')[url.split('/').length - 2])
      setRepo(url.split('/')[url.split('/').length - 1])
      return true
    } else {
      return false
    }
  }
  let handleSubmit = async (e) => {
    e.preventDefault();
    setResults("")
    setMessage("")
    if (!await validateURL()) {
      setMessage('Please Enter a Valid GitHub URL')
      return
    }
    try {

      setLoading(true)

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
      if (res.status === 200) {
        setUrl("");
        setResults(res.data)
      } else {
        window.alert(res.status)
        setMessage("Oh No. Something went wrong!");
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false)
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
              placeholder="GitHub Repository URL Goes Here"
              onChange={(e) => setUrl(e.target.value)}
            />
            <button type="submit">Query</button>
          </form>
          {message ? <div className="message">{message}</div> : null}
        </div>
        {loading ? <PacmanLoader color="#000"/> : null}
        {results ? <DisplayResults results={results} /> : null }
      </div>
    </div>
  );
}




export default App;
