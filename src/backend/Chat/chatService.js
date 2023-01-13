const { nextTick } = require("process");
const { Chat, Room } = require("../models");
const Mentoring = require('../models/mentoring');
const Op = require('sequelize').Op;
const detailResponse = require('../config/responseDetail');
const errorResponse = require('../config/errorResponse');

exports.checkMentoring = async function(mentoringId){
    try{
        const result = await Mentoring.findOne({
            where:{
                mentoringId
            }
        });
        return result;
    }catch(error){
        console.error(error);
        throw new errorResponse(detailResponse.DB_ERROR, 500);
    }
};

exports.getRoomNumber = async function(roomid){
    try{
        const result = await Room.findOne({
            raw:true,
            attributes:['roomid'],
            where:{
                roomid
            }
        });
        return result;
    }catch(error){
        console.error(error);
        throw new errorResponse(detailResponse.DB_ERROR, 500);
    }
};
exports.postChat = async function(nickname, content, roomid){
    try{
        await Chat.create({
            nickname,
            roomid,
            content
        });
    }catch(error){
        console.error(error);
        throw new errorResponse(detailResponse.DB_ERROR, 500);
    }
};

exports.getRoom = async function(userid){
    try{
        const result = await Room.findAll({
            raw:true,
            attributes: ['roomid', 'createdAt'],
            where:{
                [Op.or]: [{
                    mentoid: userid,
                },{
                    menteeid : userid
                }]
            },
            order:  [['createdAt', 'DESC']]
        })
        return result;
    }catch(error){
        console.error(error);
        throw new errorResponse(detailResponse.DB_ERROR, 500);
    }
}
exports.getChat = async function(mentoringId){
    try{
        const result = await Chat.findAll({
            attributes: ['message', 'created_at'],
            where:{
                mentoringId
            }
        });
    }catch(error){
        console.error(error);
        throw new errorResponse(detailResponse.DB_ERROR, 500);
    }
}


