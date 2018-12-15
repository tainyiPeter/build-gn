#!/usr/bin/env node

// Copyright 2016 Cheng Zhao. All rights reserved.
// Use of this source code is governed by the license that can be found in the
// LICENSE file.

const https = require('https')
const fs    = require('fs')
const path  = require('path')

const sha1 = {
  linux64: '3523d50538357829725d4ed74b777a572ce0ac74',
  mac: 'd43122f6140d0711518aa909980cb009c4fbce3d',
  win: 'e20768d93a6b4400de0d03bb8ceb46facdbe3883',
}

const platform = {
  linux: 'linux64',
  darwin: 'mac',
  win32: 'win',
}[process.platform]

const buildtools = path.resolve(__dirname, '..', 'buildtools')
const filename = platform === 'win' ? 'gn.exe' : 'gn'
const gnPath = path.join(buildtools, platform, filename)

if (!fs.existsSync(gnPath)) {
  downloadGn(sha1[platform], gnPath)
}

function downloadGn(sha1, target) {
  const url = `https://storage.googleapis.com/chromium-gn/${sha1}`
  const file = fs.createWriteStream(target)
  file.on('finish', () => fs.chmodSync(target, 0755))
  https.get(url, (response) => response.pipe(file))
}
