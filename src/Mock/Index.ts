import Mock from 'mockjs'

//build to mock data
Mock.mock("get/options.mock",{
    code:0,
    "data|9-19":[
        {label: /[a-z]{3,5}/, "value|+1": 99,},
    ]
})