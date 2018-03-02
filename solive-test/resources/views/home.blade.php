@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header" style="text-align: center;">Dashboard : Connected users</div>

                    <div class="card-body">
                        <ul style="list-style: none" id="connected-users" data-token="{{$token}}" class="list-group">
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
