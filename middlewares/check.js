module.exports = {
  checkLogin: function checkLogin(req, res, next) {
    if (!req.session.user) {
      //req.flash('error', '未登录'); 
      return res.redirect('/users/signin');
    }
    next();
  },

  checkNotLogin: function checkNotLogin(req, res, next) {
    if (req.session.user) {
      //req.flash('error', '已登录'); 
     res.redirect('back');//返回之前的页面
    }
    next();
  },
  
  //是否是管理员
  hasRole: function hasRole(req, res, next) {
      if (req.session.user.role.indexOf('admin') > -1 ) {
        next();
      }
      else {
        return res.status(403).send();
      }
    }
}
