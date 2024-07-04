const db = require('./connection');

let querys = {
    getproducto: 'SELECT * FROM producto',
    getproductoID: 'SELECT * FROM producto WHERE id = ?',
    getcategory: 'SELECT * FROM category',
    getcategoryID: 'SELECT * FROM category WHERE id = ?',
    insertproducto: 'INSERT INTO producto (code, name, brand, model, description, price, category_id) VALUES(?, ?, ?, ?, ?, ?, ?)',
    insertcategory: 'INSERT INTO category(name) VALUES(?)',
    updateproducto: 'UPDATE producto SET code = ?, name = ?, brand = ?, model = ?, description = ?, price = ?, category_id = ? WHERE id = ?',
    updatecategory: 'UPDATE category SET name = ? WHERE id = ?',
    deleteproducto: 'DELETE FROM producto WHERE id = ?',
    deletecategory: 'DELETE FROM category WHERE id = ?'
}

    module.exports = {

        getproducto(){
            return new Promise((resolve, reject)=>{
                db.all(querys.getproducto, (err,rows)=>{
                    if(err) reject(err);
                    resolve(rows);
                })
            })
        },

        getproductoID(id){
            return new Promise((resolve, reject) => {
                db.all(querys.getproductoID, [id], (err, rows) => {
                    if(err) reject(err);
                    resolve(rows);
                })
            })
        },

        insertproducto(code, name, brand, model, description, price, category_id){
            return new Promise((resolve, reject) => {
                db.run(querys.insertproducto, [code, name, brand, model, description, price, category_id], (err) => {
                    if(err) reject(err);
                        resolve()
                })
            })
        
        },

        updateproducto(id, code, name, brand, model, description, price, category_id){
            return new Promise((resolve, reject) => {
                db.run(querys.updateproducto, [code, name, brand, model, description, price, category_id, id], (err) => {
                    if(err) reject(err);
                    resolve();
                })
            })
        },

        deleteproducto(id){
            return new Promise((resolve, reject) => {
                db.run(querys.deleteproducto, [id], (err) => {
                    if(err) reject(err);
                    resolve();
                })
            })
        },

        getcategory(){
            return new Promise((resolve, reject) => {
                db.all(querys.getcategory, (err, rows) => {
                    if(err) reject(err);
                    resolve(rows);
                })
            })
        },

        getcategoryID(id){
            return new Promise((resolve, reject) => {
                db.all(querys.getcategoryID, [id], (err, rows) => {
                    if(err) reject(err);
                    resolve(rows);
                })
            })
        },

        insertcategory(name, id){
            return new Promise((resolve, reject) => {
                db.all(querys.insertcategory, [name, id], (err) => {
                    if(err) reject(err);
                    resolve();
                })
            })
        },

        updatecategory(id, name){
            return new Promise((resolve, reject) => {
                db.run(querys.updatecategory, [name, id], (err) => {
                    if(err) reject(err);
                    resolve();
                })
            })
        },
    
        deletecategory(id){
            return new Promise((resolve, reject) => {
                db.run(querys.deletecategory, [id], (err) => {
                    if(err) reject(err);
                    resolve();
                })
            })
        },
}
