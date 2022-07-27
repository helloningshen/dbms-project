import { conn } from "../db-config.js"


const AuthModel = function ({ id, email, password }) {
  this.id = id;
  this.email = email;
  this.password = password;
}


AuthModel.insert = async (payload, result) => {
  const response = (err, res) => {
    if (err) {
      result(err, null)
      return
    }
    result(null, { ...payload });
  }
  conn.query("INSERT INTO user SET ?", payload, response);
}

AuthModel.findOne = async (id, result) => {
  const response = (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  }
  conn.query(`SELECT * FROM user WHERE id = "${id}"`, response)
}




AuthModel.findByEmail = async (email, result) => {
  const response = (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  }
  conn.query(`SELECT * FROM user WHERE email = "${email}"`, response)
}


AuthModel.updateRefreshToken = async ({ email, refresh_token }, result) => {
  console.log("ref...", refresh_token)
  const response = (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res[0])
      return
    }

    result({ kind: "not_found" }, null)
    conn.query(`update user set refresh_token="${refresh_token}" where email="${email}"`)
  }
}



AuthModel.findAll = async (result) => {
  let query = "SELECT * FROM auth;";
  const response = (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  }
  conn.query(query, response);
}

AuthModel.remove = async (id, result) => {
  const response = (err, res) => {
    if (err) {
      result(null, err);

      result({ kind: "not_found" }, null);
      return;
    }
    result(null, res);
  }
  conn.query("DELETE FROM user WHERE id = ?", id, response)
}


export { AuthModel }