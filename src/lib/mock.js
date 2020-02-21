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
        let { query: { pageIndex } } = req
        res.status('200').json(Mock.mock({
            'data|5': [{
                id: '@id',
                url: Mock.Random.image('380x120', '#2db7f5', '#FFF', 'react'),
                text: '@ctitle(10, 20)'
            }, {
                id: '@id',
                url: Mock.Random.image('380x120', '#50B347', '#FFF', 'test2'),
                text: '@ctitle(10, 20)'
            }]
        }))
    }
}
module.exports = delay(data, 1000)