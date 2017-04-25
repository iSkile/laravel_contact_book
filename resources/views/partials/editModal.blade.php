{{-- edit contact modal--}}
<div class="modal fade" id="edit-contact">
    <div class="modal-dialog">
        <div class="modal-content">
            <form action="/" method="post" id="edit-form" role="form">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title">Редактирование контакта</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="name">Имя:</label>
                        <input placeholder="" value="" class="form-control" name="name">
                        <span class="help-block"></span>
                    </div>
                    <div class="form-group">
                        <label for="phone">Номер телефона:</label>
                        <input placeholder="" value="" class="form-control" name="phone">
                        <span class="help-block"></span>
                    </div>
                    <div class="form-group">
                        <label for="photo">Фото:</label>
                        <input type="file" class="form-control" name="photo">
                        <span class="help-block"></span>
                    </div>
                    <div class="checkbox" id="delete-photo">
                        <label>
                            <input type="checkbox" name="delete-photo"> Удалить текущее фото
                        </label>
                    </div>
                    <input type="hidden" name="id">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Отмена</button>
                    <button type="submit" class="btn btn-primary">Изменить</button>
                </div>
            </form>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->