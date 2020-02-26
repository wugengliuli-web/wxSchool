const delay = require('mocker-api/utils/delay'); // 延时 模拟请求异步问题
const Mock = require('mockjs');

const data = {
    'GET /api/bannerUrl': (req, res) => {
        res.status('200').json(Mock.mock({
            'data|1-2':[{
                url: Mock.Random.image('380x120', '#2db7f5', '#FFF', 'react'),
                link: Mock.Random.url()
            }, {
                url: Mock.Random.image('380x120', '#50B347', '#FFF', 'test2'),
                link: Mock.Random.url()
            }, {
                url: Mock.Random.image('380x120', '#894FC4', '#FFF', 'test3'),
                link: Mock.Random.url()
            }, {
                url: Mock.Random.image('380x120', '#2db7f5', '#FFF', 'test6'),
                link: Mock.Random.url()
            }]
        }))
    },
    'GET /api/homeSearchPlaceHolder': (req, res) => {
        res.status('200').json(Mock.mock('@ctitle(3, 5)'))
    },
    'GET /api/getContent': (req, res) => {
        let { query: { pageIndex, place } } = req
        if(pageIndex >= 3) {
            res.status('200').json(Mock.mock({
                'data': []
            }))
        } else {
            res.status('200').json(Mock.mock({
                'data|2': [{
                    id: '@id',
                    url: "@image(300x400, @color, @color, @word(5))",
                    text: '@ctitle(10, 20)',
                    logo: "@image(32x32, @color, @color)",
                    name: '@ctitle(3,5)'
                }, {
                    id: '@id',
                    url: "@image(300x400, @color, @color, @word(5))",
                    text: '@ctitle(10, 20)',
                    logo: "@image(32x32, @color, @color)",
                    name: '@ctitle(3,5)'
                }, {
                    id: '@id',
                    url: "@image(300x400, @color, @color, @word(5))",
                    text: '@ctitle(10, 20)',
                    logo: "@image(32x32, @color, @color)",
                    name: '@ctitle(3,5)'
                }]
            }))
        }
    },
    'POST /api/getSearchContent': (req, res) => {
        let { body } = req
        res.status('200').json(Mock.mock({
            'data|10': [{
                id: '@id',
                title: '@ctitle(5,15)',
                tag: [ '文艺汇演', '体育竞技', '设计开发' ],
                money: '@integer(100,5000)',
                city: '@county(true)',
                startTime: '@datetime(yyyy-MM-dd)',
                endTime: '@datetime(yyyy-MM-dd)',
                sort: '@increment',
                good: '@integer(0,1000)'
            }]
        }))
    },
    'GET /api/getMainContent': (req, res) => {
        res.status('200').json(Mock.mock({
            'data|10': [{
                id: '@id',
                title: '@ctitle(5,15)',
                tag: [ '文艺汇演', '体育竞技', '设计开发' ],
                money: '@integer(100,5000)',
                city: '@county(true)',
                startTime: '@datetime(yyyy-MM-dd)',
                endTime: '@datetime(yyyy-MM-dd)',
                sort: '@increment',
                good: '@integer(0,1000)'
            }]
        }))
    },
    'GET /api/activitesContnet': (req, res) => {
        let { query: { id } } = req
        console.log(req.query)
        res.status('200').json(Mock.mock({
            'data': {
                id: id,
                title: '@ctitle(5,15)',
                img: "@image(720x900, @color, @color, png, @word(5))",
                tag: [ '文艺汇演', '体育竞技', '设计开发' ],
                money: '@integer(100,5000)',
                city: '@county(true)',
                startTime: '@datetime(yyyy-MM-dd)',
                endTime: '@datetime(yyyy-MM-dd)',
                browseTimes: '@integer(0,400)', //浏览次数
                applicantsNum: '@integer(0,50)',  //申请人数
                logo: "@image(64x64, @color, @color, png, logo)",
                name: '@ctitle(5,10)',  //发布人名
                introduce: '@ctitle(5,20)', //协会介绍
                activityPlan: '@ctitle(5,10)', //活动方案
                associationId: '@id',
                associationName: '@ctitle(5,10)',
                'associationSize|+1': [
                    '少于40人',
                    '40-100人',
                    '100人以上'
                ],
                'Recommend|1-5': [{
                    id: '@id',
                    title: '@ctitle(5,15)',
                    tag: [ '文艺汇演', '体育竞技', '设计开发' ],
                    money: '@integer(100,5000)',
                    city: '@county(true)',
                    startTime: '@datetime(yyyy-MM-dd)',
                    endTime: '@datetime(yyyy-MM-dd)'
                }]
            }
        }))
    },
    'POST /api/addTeam': (req, res) => {
        let { body } = req
        let { info: { name } } = body
        res.status('200').json({
            result: 'success',
            name
        })
    },
    'POST /api/getTeamName': (req, res) => {
        let { body } = req
        res.status('200').json(Mock.mock({
            'data|3': ['@ctitle(3.5)']
        }))
    },
    'GET /api/getGoing': (req, res) => {
        res.status('200').json(Mock.mock({
            'data|3': [{
                id: '@id',
                title: '@ctitle(5,15)',
                tag: [ '文艺汇演', '体育竞技', '设计开发' ],
                money: '@integer(100,5000)',
                city: '@county(true)',
                startTime: '@datetime(yyyy-MM-dd)',
                endTime: '@datetime(yyyy-MM-dd)',
                friend: {
                    name: '@ctitle(5,15)',
                    id: '@id'
                }
            }]
        }))
    },
    'GET /api/getEvaluated': (req, res) => {
        res.status('200').json(Mock.mock({
            'data|3': [{
                id: '@id',
                title: '@ctitle(5,15)',
                tag: [ '文艺汇演', '体育竞技', '设计开发' ],
                money: '@integer(100,5000)',
                city: '@county(true)',
                startTime: '@datetime(yyyy-MM-dd)',
                endTime: '@datetime(yyyy-MM-dd)',
                evaluate: '@ctitle(0, 10)',
                'people|0-100': 100
            }]
        }))
    },
    'GET /api/setEvaluated': (req, res) => {
        res.status('200').json(Mock.mock({
            "data|1-2": true
        }))
    },
    'GET /api/getUserInfo': (req, res) => {
        res.status('200').json(Mock.mock({
            name: '@ctitle(1,8)',
            'identityAuthentication': true,
            'realNameAuthentication': true,
            headLogo: '@image(96x96, @color, @color)',
            sign: '@ctitle(5,20)'
        }))
    },
    'GET /api/getIdentityInfo': (req, res) => {
        res.status('200').json(Mock.mock({
            associationName: '@ctitle(1,8)',
            associationLogo: '@image(64x64, @color, @color)',
            sign: '@ctitle(5,20)',
            'associationSize|+1': [
                '少于40人',
                '40-100人',
                '100人以上'
            ],
            associationSchoold: '@ctitle(1,8)',
            associationType: [ '文艺汇演', '体育竞技', '设计开发' ],
            associationPosition: '@ctitle(1,8)'
        }))
    },
    'GET /api/getRecommend': (req, res) => {
        res.status('200').json(Mock.mock({
            'data|3': [{
                id: '@id',
                associationName: '@ctitle(1,8)',
                associationLogo: '@image(64x64, @color, @color)',
                sign: '@ctitle(5,20)',
                'associationSize|+1': [
                    '少于40人',
                    '40-100人',
                    '100人以上'
                ],
                associationSchoold: '@ctitle(1,8)',
                associationType: [ '文艺汇演', '体育竞技', '设计开发' ],
                associationPosition: '@ctitle(1,8)'
            }]
        }))
    },
}
module.exports = delay(data, 2000)