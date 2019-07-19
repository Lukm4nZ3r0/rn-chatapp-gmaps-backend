'use strict'

const connection = require('./connect')

exports.register = (req,res) =>{
    const registerData = {
        username: req.body.username,
        name: req.body.name,
        password: req.body.password,
        city: req.body.city
    }

    connection.query(`SELECT username FROM user WHERE username=?`, [registerData.username], (error,rows,field)=>{
        if(error){
            throw error
        }
        else{
            if(rows.length>0){
                return res.status(200).send({
                    data:rows,
                    success:false,
                    message:'duplicate data'
                })
            }
            else{
                connection.query(`INSERT INTO user SET username=?, password=?, name=?, city=?, image_link=?`, [registerData.username, registerData.name, registerData.password, registerData.city, 'https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png'], (error,rows,field)=>{
                    if(error){
                        throw error
                    }
                    else{
                        return res.status(200).send({
                            status:200,
                            success:true,
                            data:rows
                        })
                    }
                })
            }
        }
    })
}

exports.getUserById = (req,res) =>{
    const id = req.params.id
    connection.query(`SELECT username,name,city,image_link,created FROM user WHERE id=?`,[id], (error, rows, field)=>{
        if(error){
            throw error
        }
        else{
            return res.status(200).send({
                status:200,
                data:rows
            })
        }
    })
}

exports.getUsers = (req,res) =>{
    connection.query(`SELECT id,username,name,image_link FROM user ORDER BY name ASC`, (error, rows, field)=>{
        if(error){
            throw error
        }
        else{
            return res.status(200).send({
                status:200,
                data:rows
            })
        }
    })
}

exports.setProfile = (req,res) =>{
    const dataUser = {
        id: req.params.id,
        name: req.body.name,
        imageLink: req.body.imageLink,
        city: req.body.city
    }

    connection.query(`UPDATE user SET name=?,image_link=?,city=? WHERE id=?`, [dataUser.name, dataUser.imageLink, dataUser.city, dataUser.id], (error,rows,field)=>{
        if(error){
            throw error
        }
        else{
            return res.status(200).send({
                status:200,
                data:rows
            })
        }
    })
}

exports.login = (req,res) =>{
    const loginData = {
        username: req.body.username,
        password: req.body.password
    }

    connection.query(`SELECT * FROM user WHERE username=? AND password=?`, [loginData.username, loginData.password], (error, rows, field)=>{
        if(error){
            throw error
        }
        else{
            return res.status(200).send({
                status:200,
                data:rows
            })
        }
    })
}

exports.setOnline = (io,username) =>{
    connection.query(`UPDATE user SET is_login=1 WHERE username=?`,[username], (error,rows,field)=>{
        if(error){
            throw error
        }
        else{
            connection.query(`SELECT username,name,coordinate FROM user WHERE is_login=1`, (error,rows,field)=>{
                return io.emit('onlineUser', rows)
            })
        }
    })
}

exports.setOffline = (io,username) =>{
    connection.query(`UPDATE user SET is_login=0 WHERE username=?`,[username])
}

exports.getRealtimeCoordinate = (io) =>{
    connection.query(`SELECT id,username,name,coordinate,image_link FROM user`, (error,rows,field)=>{
        if(error){
            throw error
        }
        else{
            return io.emit('getRealtimePerson', rows)
        }
    })
}

exports.setCurrentPosition = (req,res) =>{
    let currentCoordinate = {
        username:req.params.username,
        latitude:req.body.latitude,
        longitude:req.body.longitude
    }

    connection.query(`UPDATE user SET coordinate=? WHERE username=?`,[currentCoordinate.latitude+','+currentCoordinate.longitude,currentCoordinate.username], (error,rows,field)=>{
        if(error){
            throw error
        }
        else{
            return res.status(200).send({
                status:200,
                data:rows
            })
        }
    })
}

exports.getCoordinate = (req,res) =>{
    connection.query(`SELECT id, username, name, coordinate, image_link FROM user`, (error,rows,field)=>{
        if(error){
            throw error
        }
        else{
            return res.status(200).send({
                status:200,
                data:rows
            })
        }
    })
}

exports.postChat = (io,Chat) =>{
    const chatData = {
        msgFrom : Chat.msgFrom,
        msgTo : Chat.msgTo,
        msg : Chat.msg
    }
    
    connection.query(`INSERT INTO chat SET msg=?, msg_from=?, msg_to=?`, [chatData.msg, chatData.msgFrom, chatData.msgTo], (error, rows, field)=>{
        if(error){
            throw error
        }
        else{
            const socketResult = {
                no: rows.insertId,
                msgFrom:chatData.msgFrom,
                msgTo:chatData.msgTo,
                msg:chatData.msg
            }
            return io.emit('ChatAdded', socketResult)
        }
    })
}

exports.getChat = (req,res) =>{
    const chatData = {
        msgFrom: req.params.msgFrom,
        msgTo: req.params.msgTo
    }
    
    connection.query(`SELECT no,msg,msg_from AS 'msgFrom',msg_to AS 'msgTo' FROM chat WHERE msg_from=? AND msg_to=? OR msg_from=? AND msg_to=? `, [chatData.msgFrom, chatData.msgTo, chatData.msgTo, chatData.msgFrom], (error, rows, field)=>{
        if(error){
            throw error
        }
        else{
            return res.status(200).send({
                status:200,
                message:'Ok!',
                data: rows
            })
        }
    })
}