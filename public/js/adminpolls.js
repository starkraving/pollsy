$(document).on('click', '[data-delegate]', function(evt){
	var objTarget = $(evt.target);
	if ( objTarget.filter('[data-delegate]').length === 0 ) {
		objTarget = objTarget.parents('[data-delegate]').first();
	}
	switch ( objTarget.data('delegate') ) {
		case 'answer_add' :
			$('<section class="form-group"><input class="form-control" type="text" name="answer[]"></section>')
					.insertBefore('section.form-group.checkbox');
			evt.preventDefault();
			break;
		case 'poll_delete' :
			if ( !confirm('Are you sure you want to delete this Poll?') ) {
				evt.preventDefault();
				evt.stopPropagation();
			}
	}
});