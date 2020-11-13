const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');

// index.js 에서 body-parser를 선언하여 req.body.movieId를 사용할 수 있다

router.post('/favoriteNumber', (req, res)=>{
   
    // mongoDB favorite 숫자를 가져오기
     Favorite.find({"movieId" : req.body.movieId})
        .exec((err, info) => {
            if(err){
                return res.status(400).send(err);
            }

             // 그다음에 프런트에 다시 숫자 정보 보내기
            return res.status(200).json({
                success : true,
                favoriteNumber : info.length
            })

        })
   
})

router.post('/favorited', (req, res)=>{
    // 내가 이 영화를 Favorite 리스트에 넣었는지 정보를 DB에서 가져오기

    // mongoDB에서 favorite 숫자를 가져오기
    Favorite.find({"movieId" : req.body.movieId, "userFrom" : req.body.userFrom})
        .exec((err, info) => {
            if(err){
                return res.status(400).send(err);
            }
            
            let result = false;

            // find 조건의 해당하는 데이터가 없으면 빈 배열이 info에 담겨짐
            // 그러므로 info.length로 분기처리를 한다

            if(info.length !== 0){
                result = true;
            }

            return res.status(200).json({
                success : true,
                favorited : result
            })
        })
})

router.post('/removeFromFavorite', (req, res) => {
    
    // 조건에 맞는 것을 찾고 삭제하는 구문

    Favorite.findOneAndDelete({'userFrom' : req.body.userFrom, 'movieId' : req.body.movieId})
        .exec((err, doc) => {
            if(err){
                return res.status(400).send(err);
            }

            return res.status(200).json({
                success : true,
                doc
            })
        })
})

router.post('/addToFavorite', (req, res)=>{
    
   const favorite = new Favorite(req.body);

    favorite.save((err, document) => {
        if(err){
            return res.status(400).send(err);
        }

        return res.status(200).json({
            success : true
        })
    })
})

router.use('/getFavoritedMovie', (req, res) => {

    Favorite.find({ 'userFrom' : req.body.userFrom })
        .exec((err, favorites) => {
            if(err){
                return res.status(400).send(err);
            }

            return res.status(200).json({
                success : true,
                favorites : favorites
            })
        })
})

router.post('/deleteFavoriteMovie', (req, res) => {
    
    Favorite.findOneAndDelete({ 'movieId' : req.body.movieId, 'userFrom' : req.body.userFrom })
        .exec((err, result) => {
            if(err){
                return res.status(400).send(err);
            }

            return res.status(200).json({
                success : true,
                result
            })
        })

})

module.exports = router;
