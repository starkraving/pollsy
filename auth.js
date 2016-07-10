module.exports = function(role) {
	return function(req, res, next) {
		var sess = req.session;
		if ( sess.userRole && sess.userRole == role ){
			next();
		} else {
			res.redirect('/admin/login');
		}
	}
}