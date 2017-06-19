/**
 * Created by Lincoln on 6/18/2017.
 */

import {host} from '../config'
import request from 'superagent'

export const get_all_user = function (cb) {
  request
    .get(host + 'user')
    .end(function (err, res) {
      cb(res.body);
    })
}
