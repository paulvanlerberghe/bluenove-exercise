import React from "react";
import "./App.css";

import MessageList from "./components/MessageList/MessageList";
import MessageForm from "./components/MessageForm/MessageForm";

//import translate from "translate";

const API_KEY = process.env.REACT_APP_GOOGLE_TRANSLATE_API_KEY;
const API_URL = `https://translation.googleapis.com/language/translate/v2`;


class App extends React.Component {
  constructor(props) {
    super(props);
    
    //let's populate our state with some messages
    this.state = {
      pending: false,
      username: "Jack",
      messages: [
        {
          author: "John",
          date: new Date(1621257595841),
          text: "Bonjour !",
        },
        {
          author: "Jack",
          date: new Date(1621257666260),
          text: "Goodbye.",
        },
      ],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  fetchTranslation(text, target, source) {
    let data = new URLSearchParams();
    data.append("q", text);
    data.append("target", target);
    data.append("source", source);
    data.append("key", API_KEY);

    const options = { method: `POST`, body: data };

    fetch(API_URL, options)
      .then(response => response.json())
      .then(({data}) => {
        this.setNewMessage(this.state.username, new Date(), data.translations[0].translatedText);
      })
      // catch any error in the network call.
      .catch(error => {
        //show error returned by google if necessary
        this.setNewMessage("Système", new Date(), `ERROR GOOGLE TRAD: ${error}`)
      });
  }


  handleSubmit(text, translateMode) {
    //handle the message typed by the user and translate it if necessary 

    this.setState({pending: true}, () => {
      if (translateMode === "off") {
        this.setNewMessage(this.state.username, new Date(), text)
      } else {
        const source = translateMode === "en" ? "fr" : "en";
        this.fetchTranslation(text, translateMode, source);
      }
    });
  }

  setNewMessage(author, date, text) {
    this.setState({
      pending: false,
      //let's keep immutable...
      messages: [...this.state.messages, {author, date, text}]
    });
  }

  render() {
    const { messages, pending } = this.state;

    return (
      <div>
        <MessageList messages={messages} />
        <MessageForm onHandleSubmit={this.handleSubmit} pending={pending} />
      </div>
    );
  }
}

export default App;
