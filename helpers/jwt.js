const express = require('express');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    res.setHeader('WWW-Authenticate', 'Bearer realm="my-realm"');
    return res.status(401).send('Unauthorized');
  }
  let accesToken = process.env.ACCESS_TOKEN_SECRET || 'secret';

  jwt.verify(token, accesToken, (err, user) => {
    if (err) return res.status(403).send('Forbidden');
    req.user = user;
    next();
  });
}

exports.verifyToken = verifyToken;
