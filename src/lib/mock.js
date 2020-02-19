const delay = require('mocker-api/utils/delay'); // 延时 模拟请求异步问题
const Mock = require('mockjs');

const data = {
    'GET /api/bannerUrl': (req, res) => {
        const { query } = req
        res.status('200').json(Mock.mock({
            'data|1-2':[{
                url: Mock.Random.image('688x240', '#2db7f5', '#FFF', 'react'),
                link: Mock.Random.url()
            }, {
                url: Mock.Random.image('688x240', '#50B347', '#FFF', 'test2'),
                link: Mock.Random.url()
            }, {
                url: Mock.Random.image('688x240', '#894FC4', '#FFF', 'test3'),
                link: Mock.Random.url()
            }, {
                url: Mock.Random.image('688x240', '#2db7f5', '#FFF', 'test6'),
                link: Mock.Random.url()
            }]
        }))
    }
}
module.exports = delay(data, 1000)