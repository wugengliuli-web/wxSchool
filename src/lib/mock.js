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
                    url: Mock.Random.image('300x400', '#2db7f5', '#FFF', 'react'),
                    text: '@ctitle(10, 20)'
                }, {
                    id: '@id',
                    url: Mock.Random.image('200x300', '#50B347', '#FFF', 'test2'),
                    text: '@ctitle(10, 20)'
                }, {
                    id: '@id',
                    url: Mock.Random.image('250x360', '#894FC4', '#FFF', 'vue'),
                    text: '@ctitle(10, 20)'
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
                tag: '@ctitle(4)',
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
                tag: '@ctitle(4)',
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
                tag: '@ctitle(4)',
                money: '@integer(100,5000)',
                city: '@county(true)',
                startTime: '@datetime',
                endTime: '@datetime',
                browseTimes: '@integer(0,400)', //浏览次数
                applicantsNum: '@integer(0,50)',  //申请人数
                logo: "@image(64x64, @color, @color, png, logo)",
                name: '@ctitle(5,10)',  //协会名称
                introduce: '@ctitle(5,20)', //协会介绍
                activityPlan: '@ctitle(5,10)', //活动方案
                'associationTag|1-3': [
                    '@ctitle(5,10)'
                ],  //协会tag
                'Recommend|1-5': [{
                    id: '@id',
                    title: '@ctitle(5,15)',
                    tag: '@ctitle(4)',
                    money: '@integer(100,5000)',
                    city: '@county(true)',
                    startTime: '@datetime(yyyy-MM-dd)',
                    endTime: '@datetime(yyyy-MM-dd)'
                }]
            }
        }))
    }
}
module.exports = delay(data, 2000)