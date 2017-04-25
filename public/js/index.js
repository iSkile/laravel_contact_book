$(document).ready(function () {
	/*var
		massActions = $('#mass-actions'),
		studentsTable = $('#students-table'),
		selectedItems = [],
		editData = {id: 0, elem: null},
		addModal = $('#addModal'),
		addForm = $('#create_form'),
		editModal = $('#editModal'),
		editForm = $('#edit_form'),
		StudentAddForm, StudentEditForm;

	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
	});

	function StudentForm(form) {
		this.form = form;

		this.setInputData = function (name, value) {
			this.form.find('input[name="' + name + '"]').val(value);
		};

		this.getInputData = function () {
			return {
				name: this.form.find('input[name="name"]').val(),
				age: this.form.find('input[name="age"]').val(),
				email: this.form.find('input[name="email"]').val(),
				course: this.form.find('input[name="course"]').val()
			};
		};

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

	function addStudent() {
		var requestData = StudentAddForm.getInputData();

		$.ajax({
			url: '{{ url("students/store") }}', // point to server-side PHP script
			dataType: 'json',
			data: requestData,
			type: 'post',
			success: function (data) {
				studentsTable.find('tbody').append(data.html);
				StudentAddForm.clear();
				addModal.modal('hide');
			},
			error: function (xhr) {
				StudentAddForm.clearErrors();
				if (xhr.status == 422) {
					var errors_response = JSON.parse(xhr.responseText);
					StudentAddForm.showErrors(errors_response);
				} else {
					alert('An error occurred while processing the request.');
				}
			}
		});
	}

	function editStudent() {
		var requestData = StudentEditForm.getInputData();
		requestData.id = editData.id;

		$.ajax({
			url: '{{ url("students/edit") }}', // point to server-side PHP script
			dataType: 'json',
			data: requestData,
			type: 'put',
			success: function (data) {
				if (data.success) {
					editData.elem.replaceWith(data.html);
					StudentEditForm.clear();
					editModal.modal('hide');
				} else {
					alert(
						'An error occurred while processing the request:\n * ' +
						data.errors.join('\n * ')
					);
				}
			},
			error: function (xhr) {
				StudentEditForm.clearErrors();
				if (xhr.status == 422) {
					var errors_response = JSON.parse(xhr.responseText);
					StudentEditForm.showErrors(errors_response);
				} else {
					alert('An error occurred while processing the request.');
				}
			}
		});
	}

	studentsTable.on('click', ':checkbox', function () {
		selectedItems = studentsTable.find('td :checkbox').filter(':checked');

		if (selectedItems.length) {
			$(massActions).show();
		} else {
			$(massActions).hide();
		}
	});

	studentsTable.on('click', '.btn-edit', function () {
		editData.elem = $(this).closest('tr');
		editData.id = editData.elem.attr('data-id');

		editData.elem.find('td[data-name]').each(function () {
			StudentEditForm.setInputData(
				$(this).attr('data-name'),
				$(this).text()
			);
		});

		editModal.modal('show');
	});

	studentsTable.on('click', '.btn-delete', function () {
		var tr = $(this).closest('tr');
		var id = $(tr).attr('data-id');

		$.get('{{ url("students/delete") }}' + '/' + id, function () {
			tr.hide(300, function () {
				$(this).remove();
			});
		});
	});


	$('#create_form_submit').on('click', addStudent);
	$('#edit_form_submit').on('click', editStudent);

	addModal.keypress(function (e) {
		if (e.which == 13) { // when press enter
			addStudent();
		}
	}).on('show.bs.modal', function () {
		StudentAddForm.clear();
	});
	editModal.keypress(function (e) {
		if (e.which == 13) { // when press enter
			editStudent();
		}
	});

	$('#file_import_form_submit').on('click', function () {
		var file_data = $('#file_import').prop('files')[0];
		var form_data = new FormData();
		form_data.append('import_file', file_data);

		$.ajax({
			url: '{{ url("students/import") }}', // point to server-side PHP script
			cache: false,
			contentType: false,
			processData: false,
			data: form_data,
			type: 'post',
			success: function (response) {
//						 console.log(response);
				studentsTable.find('tbody').html(response.html);
				$('#fileImportModal').modal('hide');
			}
		});
	});

	$('#checkAll').click(function () {
		var status = this.checked;
		studentsTable.find('tbody :checkbox').each(function () {
			this.checked = status;
		});
	});

	massActions.on('click', '.btn', function () {
		var action = $(this).text().trim().toLowerCase();
		var idList = [];

		selectedItems.each(function () {
			idList.push($(this).closest('tr').attr('data-id'));
		});

		switch (action) {
			case 'delete':
				$.ajax({
					url: '{{ url("students/delete") }}',
					dataType: 'json',
					data: {list: idList},
					type: 'delete',
					success: function () {
						$.each(idList, function (val, key) {
							studentsTable.find('tr[data-id="' + key + '"]').hide(300, function () {
								$(this).remove();
							});
						});
					}
				});
				break;
		}
	});

	// ------------------------------------------------------------
	// init variables

	StudentAddForm = new StudentForm(addForm);
	StudentEditForm = new StudentForm(editForm);*/

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