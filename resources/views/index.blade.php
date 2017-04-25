@extends('layouts.app')

@section('title', 'Contact book')

@section('content')
    <div class="container main">
        <div class="page-header">
            <div class="pull-right">
                <button class="btn btn-default" data-toggle="modal" href="#add-contact">Добавить</button>
            </div>
            <h1>Список контактов</h1>
        </div>

        <div id="contact-list">
            @include('partials.contacts')
        </div>
    </div>
    @include('partials.addModal')
    @include('partials.editModal')
@endsection

@section('extra')
    <script src="/js/index.js"></script>
@endsection