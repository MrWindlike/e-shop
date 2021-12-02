import axios from 'axios';

let token = '';

export function setToken(ticket: string) {
  token = ticket;
}

const http = axios.create({
  headers: {
    Token: token,
  }
});

export default http;
