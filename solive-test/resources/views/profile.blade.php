@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <img src="/uploads/avatars/{{ $user->avatar }}" style="width:150px; height:150px; float:left; border-radius:50%; margin-right:25px; border: 1px solid #878787">
                <h4 >{{ $user->name }}'s Profile</h4>
                <form enctype="multipart/form-data" action="/profile" method="POST">
                    <label>Update Profile Image</label> <br>
                    <input type="file" name="avatar">
                    <input type="hidden" name="_token" value="{{ csrf_token() }}"><br><br>
                    <input type="submit" class="pull-left btn btn-sm btn-primary" value="Update">
                </form>
            </div>
        </div>
    </div>
@endsection
