var express = require('express');
var request = require('request');
var config = require('../config/config');
var router = express.Router();

const PING_PATTERN_RTT = '= ([0-9\.]+)/([0-9\.]+)/([0-9\.]+)/([0-9\.]+) ms';
const PING_PATTERN_COUNT = '([0-9]+) packets transmitted, ([0-9]+) received';

function createHost(host, callback) {
  var hostConfig = config.hosts[host];

  var headers = {
    'Content-Type':'application/json'
  }

  var options = {
    url: 'http://' + hostConfig.tester_set + ':3000/hosts/' + host,
    method: 'PUT',
    headers: headers,
    json: hostConfig.host_info
  }

  request(options, callback);
}

function sendPing(src, dest, callback) {
  var srcHostConfig = config.hosts[src];
  var destHostConfig = config.hosts[dest];

  var headers = {
    'Content-Type':'application/json'
  }

  var body  = {
    host_name: src,
    command: 'ping -q -c 4 -i 0.2 -w 1 ' + destHostConfig.host_info.ip_address,
    // command: 'ping -q -c 1 127.0.0.1'
    initial_wait: 0,
    process_wait: 0
  }

  var options = {
    url: 'http://' + srcHostConfig.tester_set + ':3000/processes',
    method: 'POST',
    headers: headers,
    json: body
  }

  request(options, callback);
}

function waitPingFinished(src, id, callback) {
  var srcHostConfig = config.hosts[src];

  var options = {
    url: 'http://' + srcHostConfig.tester_set + ':3000/processes/' + id,
    method: 'GET',
    json: true
  }

  var wait = setInterval(function () {
    request(options, function (err, res, body) {
      // TODO: error handling
      if (body.status == 'finished') {
        clearInterval(wait);
        callback(err, res, body);
      }
    });
  }, 1000);
}

function state(src, dest, callback) {
  createHost(src, function (serr, sres, sbody) {
    // TODO: error handling
    createHost(dest, function (derr, dres, dbody) {
      // TODO: error handling
      sendPing(src, dest, function (perr, pres, pbody) {
        // TODO: error handling
        var id = pbody.id;
        waitPingFinished(src, id, function (werr, wres, wbody) {
          // TODO: error handling
          callback(werr, wres, wbody);
       });
      });
    });
  });
}

router.get('/:src/:dest', function(req, res, next) {
  var src = req.params.src;
  var dest = req.params.dest;
  state(src, dest, function (serr, sres, sbody) {
    // TODO: error handling
    var result = {
      min: -1,
      avg: -1,
      max: -1,
      mdev: -1,
      success_rate: -1
    }
    if (sbody.stdout != '') {
      var match = sbody.stdout.match(PING_PATTERN_RTT);
      result.min = parseFloat(match[1]);
      result.avg = parseFloat(match[2]);
      result.max = parseFloat(match[3]);
      result.mdev = parseFloat(match[4]);
      match = sbody.stdout.match(PING_PATTERN_COUNT);
      result.success_rate = parseFloat(match[2]) / parseFloat(match[1]);
    }
    res.send(result);
  });
});

module.exports = router;
