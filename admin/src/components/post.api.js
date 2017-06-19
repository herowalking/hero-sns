/**
 * Created by Lincoln on 6/18/2017.
 */

import {host} from '../config'
import request from 'superagent'

export const get_all_post = function (cb) {
  request
    .get(host + 'post/detail')
    .end(function (err, res) {
      cb(res.body)
    })
}
