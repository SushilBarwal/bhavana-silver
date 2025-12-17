<div class="d-flex align-items-center mb-4">
    <div>
        <h2 class="h3 fw-light text-dark mb-0">Dashboard</h2>
        <p class="text-muted small mb-0">Overview of your store's performance.</p>
    </div>
</div>

<div class="row g-3 mb-5">
    
    {{-- Users (Blue) --}}
    <div class="col-md-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100" style="background-color: #0d6efd; color: white;">
            <div class="card-body p-4">
                <h5 class="card-title text-opacity-75 text-white mb-2">Total Users</h5>
                <div class="display-6 fw-bold text-white">{{ $users_count ?? 0 }}</div>
            </div>
            <a href="{{ route('platform.systems.users') }}" class="card-footer bg-transparent border-top-0 d-flex justify-content-between align-items-center text-white text-decoration-none py-3" style="background-color: rgba(0,0,0,0.1) !important;">
                <span>View Details</span>
                <x-orchid-icon path="arrow-right"/>
            </a>
        </div>
    </div>

    {{-- Products (Yellow/Amber) --}}
    <div class="col-md-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100" style="background-color: #ffc107; color: white;">
            <div class="card-body p-4">
                <h5 class="card-title text-opacity-75 text-white mb-2">Total Products</h5>
                <div class="display-6 fw-bold text-white">{{ $products_count ?? 0 }}</div>
            </div>
            <a href="{{ route('platform.products') }}" class="card-footer bg-transparent border-top-0 d-flex justify-content-between align-items-center text-white text-decoration-none py-3" style="background-color: rgba(0,0,0,0.1) !important;">
                <span>View Details</span>
                <x-orchid-icon path="arrow-right"/>
            </a>
        </div>
    </div>

    {{-- Categories (Green) --}}
    <div class="col-md-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100" style="background-color: #198754; color: white;">
            <div class="card-body p-4">
                <h5 class="card-title text-opacity-75 text-white mb-2">Categories</h5>
                <div class="display-6 fw-bold text-white">{{ $categories_count ?? 0 }}</div>
            </div>
            <a href="{{ route('platform.categories') }}" class="card-footer bg-transparent border-top-0 d-flex justify-content-between align-items-center text-white text-decoration-none py-3" style="background-color: rgba(0,0,0,0.1) !important;">
                <span>View Details</span>
                <x-orchid-icon path="arrow-right"/>
            </a>
        </div>
    </div>

    {{-- Gemstones (Red) --}}
    <div class="col-md-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100" style="background-color: #dc3545; color: white;">
            <div class="card-body p-4">
                <h5 class="card-title text-opacity-75 text-white mb-2">Gemstones</h5>
                <div class="display-6 fw-bold text-white">{{ $stones_count ?? 0 }}</div>
            </div>
            <a href="{{ route('platform.stones') }}" class="card-footer bg-transparent border-top-0 d-flex justify-content-between align-items-center text-white text-decoration-none py-3" style="background-color: rgba(0,0,0,0.1) !important;">
                <span>View Details</span>
                <x-orchid-icon path="arrow-right"/>
            </a>
        </div>
    </div>

    {{-- Homepage (Blue - Row 2) --}}
    <div class="col-md-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100" style="background-color: #0dcaf0; color: white;">
            <div class="card-body p-4">
                <h5 class="card-title text-opacity-75 text-white mb-2">Homepage Setup</h5>
                <div class="fs-1 text-white mb-0"><x-orchid-icon path="monitor" width="1em" height="1em"/></div>
            </div>
            <a href="{{ route('platform.homepage.settings') }}" class="card-footer bg-transparent border-top-0 d-flex justify-content-between align-items-center text-white text-decoration-none py-3" style="background-color: rgba(0,0,0,0.1) !important;">
                <span>View Details</span>
                <x-orchid-icon path="arrow-right"/>
            </a>
        </div>
    </div>

     {{-- Site Settings (Yellow - Row 2) --}}
     <div class="col-md-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100" style="background-color: #fd7e14; color: white;">
            <div class="card-body p-4">
                <h5 class="card-title text-opacity-75 text-white mb-2">Site Settings</h5>
                <div class="fs-1 text-white mb-0"><x-orchid-icon path="settings" width="1em" height="1em"/></div>
            </div>
            <a href="{{ route('platform.settings.header') }}" class="card-footer bg-transparent border-top-0 d-flex justify-content-between align-items-center text-white text-decoration-none py-3" style="background-color: rgba(0,0,0,0.1) !important;">
                <span>View Details</span>
                <x-orchid-icon path="arrow-right"/>
            </a>
        </div>
    </div>

     {{-- Best Sellers (Green - Row 2) --}}
     <div class="col-md-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100" style="background-color: #20c997; color: white;">
            <div class="card-body p-4">
                <h5 class="card-title text-opacity-75 text-white mb-2">Best Sellers</h5>
                <div class="fs-1 text-white mb-0"><x-orchid-icon path="star" width="1em" height="1em"/></div>
            </div>
            <a href="{{ route('platform.homepage.best_seller.list') }}" class="card-footer bg-transparent border-top-0 d-flex justify-content-between align-items-center text-white text-decoration-none py-3" style="background-color: rgba(0,0,0,0.1) !important;">
                <span>View Details</span>
                <x-orchid-icon path="arrow-right"/>
            </a>
        </div>
    </div>

    {{-- Profile (Red - Row 2) --}}
    <div class="col-md-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100" style="background-color: #d63384; color: white;">
            <div class="card-body p-4">
                <h5 class="card-title text-opacity-75 text-white mb-2">My Profile</h5>
                <div class="fs-1 text-white mb-0"><x-orchid-icon path="user" width="1em" height="1em"/></div>
            </div>
            <a href="{{ route('platform.profile') }}" class="card-footer bg-transparent border-top-0 d-flex justify-content-between align-items-center text-white text-decoration-none py-3" style="background-color: rgba(0,0,0,0.1) !important;">
                <span>View Details</span>
                <x-orchid-icon path="arrow-right"/>
            </a>
        </div>
    </div>

</div>