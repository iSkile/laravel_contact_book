$(document).ready(function () {
	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
	});

	var addForm = $('#add-form');
	var editModal = $('#edit-contact');
	var editForm = $('#edit-form');
	var contactList = $('#contact-list');
	var editData = {id: 0, elem: null};

	function ModalForm(form) {
		this.form = form;

		this.clearErrors = function () {
			// clear old errors
			this.form.find('.help-block').text('');
			this.form.find('.form-group.has-error').attr('class', 'form-group');
		};

		this.clear = function () {
			this.form.find('input').val('');
			this.clearErrors();
		};

		this.showErrors = function (errors_response) {
			var _this = this;

			var errors, inputHelpBlock;
			$.each(errors_response, function (key, value) {
				errors = '';

				inputHelpBlock = _this.form.find('input[name="' + key + '"]').next('.help-block');
				for (var i = 0; i < value.length; i++) {
					errors += value[i] + '<br>';
				}

				$(inputHelpBlock)
					.html(errors)
					.parent().addClass('has-error');
			});
		};
	}

	var addModalForm = new ModalForm(addForm);
	var editModalForm = new ModalForm(editForm);

	addForm.submit(function(){
		addModalForm.clearErrors();
		var formData = new FormData(this);

		formData.set('phone', formData.get('phone').replace(/[^\d\+]/g, ''));

		$.ajax({
			url: this.action,
			data: formData,
			processData: false,
			contentType: false,
			dataType: 'json',
			type: 'POST',
			success: function(data) {
				console.log(data);
				if (data.success) {
					addModalForm.clear();
					contactList.append(data.html);

					console.log(contactList, data.html);
					$('#add-contact').modal('hide');
				} else {
					alert(
						'An error occurred while processing the request:\n * ' +
						data.errors.join('\n * ')
					);
				}
			},
			error: function (xhr) {
				if (xhr.status === 422) {
					var errors_response = JSON.parse(xhr.responseText);
					addModalForm.showErrors(errors_response);
				} else {
					alert('An error occurred while processing the request.');
				}
			}
		});
		return false;
	});

	editForm.submit(function(){
		editModalForm.clearErrors();
		var formData = new FormData(this);
		formData.append('_method', 'PUT');

		formData.set('phone', formData.get('phone').replace(/[^\d\+]/g, ''));
		formData.set('delete-photo', editForm.find('#delete-photo :checkbox').prop('checked'));

		$.ajax({
			url: '/update/' + editData.id,
			data: formData,
			processData: false,
			contentType: false,
			dataType: 'json',
			type: 'POST',
			success: function(data) {
				if (data.success) {
					editModalForm.clear();
					editData.elem.replaceWith(data.html);
					editModal.modal('hide');
				} else {
					alert(
						'An error occurred while processing the request:\n * ' +
						data.errors.join('\n * ')
					);
				}
			},
			error: function (xhr) {
				if (xhr.status === 422) {
					var errors_response = JSON.parse(xhr.responseText);
					editModalForm.showErrors(errors_response);
				} else {
					alert('An error occurred while processing the request.');
				}
			}
		});
		return false;
	});

	contactList.on('click', '.btn-edit', function () {
		editData.elem = $(this).closest('.contact-row');
		editData.id = editData.elem.attr('data-id');

		var noImage = editData.elem.find('img.user-photo[src^="/img/"]').length;
		editForm.find('#delete-photo').css('display', noImage ? 'none' : 'block');
		editForm.find('#delete-photo :checkbox').prop('checked', false);

		editData.elem.find('*[data-name]').each(function () {
			editForm
				.find('input[name="' + $(this).attr('data-name') + '"]')
				.val($(this).text());
		});

		editForm
			.find('input[name="id"]')
			.val(editData.id);

		editModal.modal('show');
	});

	contactList.on('click', '.btn-delete', function () {
		var row = $(this).closest('.contact-row');
		var id = row.attr('data-id');

		$.ajax({
			url: '/destroy/' + id, // point to server-side PHP script
			dataType: 'json',
			data: {'_method': 'DELETE'},
			type: 'post',
			success: function (data) {
				if (data.success) {
					row.hide(300, function () {
						$(this).remove();
					});
				} else {
					alert(
						'An error occurred while processing the request:\n * ' +
						data.errors.join('\n * ')
					);
				}
			},
			error: function (xhr) {
				if (xhr.status == 422) {
					alert(
						'An error occurred while processing the request:\n * ' +
						xhr.responseText
					);
				} else {
					alert('An error occurred while processing the request.');
				}
			}
		});
	});
});