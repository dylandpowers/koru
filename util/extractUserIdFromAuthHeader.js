import jwt_decode from 'jwt-decode';

export default (header) => {
  const token = header.split(' ')[1];
  const { id } = jwt_decode(token);
  return id;
}