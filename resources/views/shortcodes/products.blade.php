<div class="products-grid">
    @foreach ($products as $product)
        <div class="product-card">
            <h3>{{ $product['name'] }}</h3>
            <p>{{ $product['description'] }}</p>
        </div>
    @endforeach
</div>
