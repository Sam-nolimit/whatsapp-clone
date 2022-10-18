import createError, { HttpError } from 'http-errors'
import express, { Request, Response, NextFunction } from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import dotenv from 'dotenv'
import indexRouter from './routes/index'
import authRouter from './routes/auth'
import groupRouter from './routes/groupRoute'
import UserRouter from './routes/userRoute'
import SearchRouter from './routes/searchRoute'
import { googleStrategy, facebookStrategy } from './middlewares/passport'
import messageRouter from './routes/messageRoute'
import path from 'path'
import passport from 'passport'
import session from 'express-session'
import fileUpload from 'express-fileupload'
import callCloudinary from './utils/cloudinary';
import cors from 'cors'
import dotenv_safe from 'dotenv-safe'

//documentation rendering
import swaggerUI from 'swagger-ui-express'
import YAML from 'yamljs'
const swaggerDocument = YAML.load('document.yaml')

dotenv_safe.config()
dotenv.config()
const app = express()
googleStrategy(passport)
facebookStrategy(passport)

// // view engine setup
app.set('views', path.join(`${__dirname}/../`, 'views'))
app.set('view engine', 'ejs')

app.use(
  session({
    secret: 'jlkhjlhkhlhlkjhlkjhlkj',
    resave: true,
    saveUninitialized: true,
  })
)
//start up passport function
app.use(passport.initialize())
app.use(passport.session())

app.use(cors())

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(`${__dirname}/../`, 'public')))
app.use(fileUpload({ useTempFiles: true })) //cloudinary setup
callCloudinary()

//Routes middleware
app.use("/", indexRouter);
app.use("/users", UserRouter)
app.use("/auth", authRouter);
app.use("/group", groupRouter);
app.use("/messages", messageRouter);
app.use("/search", SearchRouter);
app.use('/api', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  // render the error page

  console.log(err.message)
  res.status(err.status || 500).json({
    status: 'fail',
    message: err.message,
  })
})

const httpServer = 'hws'

// export { httpServer, app };
// module.exports = {
//   app,
//   httpServer,
// }

export default app
