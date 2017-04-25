@foreach($contacts as $contact)
    <div data-id="{{ $contact->id }}" class="row contact-row">
        <div class="col-sm-2 col-md-1 hidden-xs">
            <img src="{{$contact->photo == '' ? '/img/no_photo.png' : '/storage/' . $contact->photo}}" alt="user photo" class="user-photo">
        </div>
        <div class="col-md-9 col-xs-8">
            <div data-name="name" class="contact-name">{{ $contact->name }}</div>
            <span data-name="phone">{{ phone($contact->phone, 'UA') }}</span>
        </div>
        <div class="col-sm-1 col-xs-2">
            <button class="btn btn-link btn-edit"><img src="/img/edit.png" alt="edit"></button>
        </div>
        <div class="col-sm-1 col-xs-2">
            <button class="btn btn-link btn-delete"><img src="/img/delete.png" alt="delete"></button>
        </div>
    </div>
@endforeach