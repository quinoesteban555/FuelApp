import connection from "../database/database.js";

export const user = async (req, res) => {
    const [foundUser] = await connection.query(`SELECT * FROM usercredential WHERE Username = "` + req.body.name + `"`);

    if (foundUser.length == 0) {
        return res.status(400).json({ message: "No user Found" })
    }
    else if (foundUser[0].Password == req.body.password) {
        return res.status(200).json({ message: "True" })
    }
    else {
        return res.status(400).json({ message: "Incorrect Password" })
    }
};
