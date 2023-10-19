const sessionMiddleware=(req,res,next)=>{
    res.locals.message=req.session.message;
    delete req.session.message;
    next();
}


export {sessionMiddleware}