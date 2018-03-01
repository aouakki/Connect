@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header" style="text-align: center;">Dashboard : Connected users</div>

                    <div class="card-body">
                        <ul id="connected-users" data-token="{{$token}}">
                        </ul>


                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
