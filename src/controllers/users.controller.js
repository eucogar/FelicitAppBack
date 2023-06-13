import { getConnection, querys, sql } from "../database";


export const createNewUser = async (req, res) => {
  const { Nombres, FechaNacimiento, Genero, pais, email, password, Imagen} = req.body;
  console.log(req.body);
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("Nombres", sql.VarChar, Nombres)
      .input("FechaNacimiento", sql.VarChar, FechaNacimiento)
      .input("Genero", sql.VarChar, Genero)
      .input("pais", sql.VarChar, pais)
      .input("email", sql.NChar, email)
      .input("password", sql.VarChar, password)
      .input("Imagen", sql.VarChar(sql.MAX), Imagen)
      .query(querys.addNewUsers);
      if (result.rowsAffected == 0) {
        console.log('No registrado');
        res.send('No user')
        await pool.close();
      } else {
        console.log(req.body);
        res.send(req.body)
        await pool.close();
      }
  } catch (error) {
    res.status(500);
    res.send(error.message);
    console.log(error.message);
    await pool.close();
  }
};



export const getUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("email", sql.NChar, email)
      .input("password", sql.VarChar, password)
      .query(querys.getUserLogin);
    if (result.rowsAffected == 0) {
      console.log('No user');
      res.send('Usuario no encontrado')
      await pool.close();
    } else {
      console.log(result.recordset[0]);
      res.send(result.recordset[0])
      await pool.close();
    }
  } catch (error) {
    res.status(500);
    res.send(error.message);
    await pool.close();
  }
};

export const getUser= async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("email", sql.NChar, email)
      .query(querys.getUser);
    if (result.rowsAffected == 0) {
      console.log('No user');
      res.send('Usuario no encontrado')
      await pool.close();
    } else {
      console.log(result.recordset[0]);
      res.send(result.recordset[0])
      await pool.close();
    }
  } catch (error) {
    res.status(500);
    res.send(error.message);
    await pool.close();
  }
};

export const Imagenes = async (req, res) => {
  const { image, email} = req.body;
  const image1 = Buffer.from(image[0]);
  const image2 = Buffer.from(image[1]);
  const image3 = Buffer.from(image[2]);
  const image4 = Buffer.from(image[3]);
  const image5 = Buffer.from(image[4]);
  const image6 = Buffer.from(image[5]);
  const image7 = Buffer.from(image[6]);
  console.log(req.body);
  try {
    const pool = await getConnection();
    try {
      await pool
        .request()
        .input("image1", sql.VarChar(sql.MAX), image1)
        .input("image2", sql.VarChar(sql.MAX), image2)
        .input("image3", sql.VarChar(sql.MAX), image3)
        .input("image4", sql.VarChar(sql.MAX), image4)
        .input("image5", sql.VarChar(sql.MAX), image5)
        .input("image6", sql.VarChar(sql.MAX), image6)
        .input("image7", sql.VarChar(sql.MAX), image7)
        .input("email", sql.NChar, email)
        .query(querys.InsertImg);
      res.json({ image1, image2, image3, image4, image5, image6, image7, email });
    } finally {
      pool.close();
    }
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};


export const getimagenes = async (req, res) => {
  try {
    const { email} = req.body;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("email", sql.NChar, email)
      .query(querys.GetImages);
    if (result.rowsAffected == 0) {
      console.log('No user');
      res.send('Usuario no encontrado')
      await pool.close();
    } else {
      console.log(result.recordset[0]);
      res.send(result.recordset[0])
      await pool.close();
    }
  } catch (error) {
    res.status(500);
    res.send(error.message);
    await pool.close();
  }
};