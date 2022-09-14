import passport from 'passport';
import {Strategy} from 'passport-jwt';

import {pool} from '../db';
import { Request } from 'express';

const cookieExtractor = function (req:Request) {
  let token = null
  if (req && req.cookies) token = req.cookies['token']
  return token
}

const opts = {
  secretOrKey: process.env.SECRET || "abc",
  jwtFromRequest: cookieExtractor,
}

passport.use(
  new Strategy(opts, async ({ id }, done) => {
    try {
      const { rows } = await pool.query(
        'SELECT account_id, email FROM account WHERE account_id = $1',
        [id]
      )

      if (!rows.length) {
        throw new Error('401 not authorized')
      }

      const user = { id: rows[0].account_id, email: rows[0].email }

      return await done(null, user)
    } catch (error:any) {
      console.log(error.message)
      done(null, false)
    }
  })
)