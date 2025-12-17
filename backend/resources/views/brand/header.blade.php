@guest
    <div class="text-center w-100">
        <a href="{{ route(config('platform.index')) }}">
            <img src="{{ asset('images/b-logo.png') }}" alt="Bhavana Silver" style="height: 80px;" />
        </a>
    </div>
    @if($errors->any())
        <div class="alert alert-danger mt-3 mb-0 text-center small">
            @foreach ($errors->all() as $error)
                <div>{{ $error }}</div>
            @endforeach
        </div>
    @endif
@else
    <div class="o-header-brand" style="background-color: #1a1b2e; padding: 15px 25px; display: flex; align-items: center; justify-content: center; width: 100%;">
        <a href="{{ route(config('platform.index')) }}" class="brand-link">
            <img src="{{ asset('images/b-logo.png') }}" alt="Bhavana Silver" class="brand-logo" style="max-height: 50px;" />
        </a>
    </div>
@endguest
