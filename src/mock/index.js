import Mock from 'mockjs';
import mainAPI from './main';
import base from "@/api/base.js"

Mock.mock(new RegExp(`${base.sq}\/main\/batch`), 'get', mainAPI.batchAPI)

Mock.mock(new RegExp(`${base.sq}\/main\/warn`), 'get', mainAPI.warnAPI)

Mock.mock(new RegExp(`${base.sq}\/main\/basicData`), 'get', mainAPI.basicDataAPI)
