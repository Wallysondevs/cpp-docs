# std::ranges::cartesian_product_view&lt;First, Vs...&gt;::size

```cpp
constexpr /* see description */ size()  
requires /*cartesian-product-is-sized*/<First, Vs...>;
```
| (1) | (desde C++23) |
|---|---|
```cpp
constexpr /* see description */ size() const  
requires /*cartesian-product-is-sized*/<const First, const Vs...>;
```
| (2) | (desde C++23) |
|---|---|
  
Retorna o número de elementos. O tipo de retorno é um tipo U /*semelhante a inteiro sem sinal*/ definido pela implementação.

Seja [`_bases__`](<#/doc/ranges/cartesian_product_view>) a tupla subjacente de views, e `prod` o produto dos tamanhos de todos os ranges em `_bases__`.

1,2) Retorna `prod`. O comportamento é indefinido se `prod` não puder ser representado pelo tipo de retorno `U`.

Equivalente a:
```cpp
    return [&]<std::size_t... Is>(std::index_sequence<Is...>)
    {
        auto prod = static_cast<U>(1);
        prod = (static_cast<U>(ranges::size(std::get<Is>(bases_))) * ...);
        return prod;
    }
    (std::make_index_sequence<1U + sizeof...(Vs)>{});
```

### Parâmetros

(nenhum)

### Valor de retorno

O número de elementos, ou seja, o produto dos tamanhos de todos os ranges subjacentes.

### Observações

O tipo de retorno é o menor tipo /*semelhante a inteiro sem sinal*/ que é suficientemente largo para armazenar o produto dos tamanhos máximos de todos os ranges subjacentes, se tal tipo existir.

### Exemplo

Execute este código
```cpp
    #include <ranges>
     
    int main()
    {
        constexpr static auto w = {1};
        constexpr static auto x = {2, 3};
        constexpr static auto y = {4, 5, 6};
        constexpr static auto z = {7, 8, 9, 10, 11, 12, 13};
        constexpr auto v = std::ranges::cartesian_product_view(w, x, y, z);
        static_assert(v.size() == w.size() * x.size() * y.size() * z.size() and v.size() == 42);
    }
```

### Veja também

[ ranges::size](<#/doc/ranges/size>)(C++20) | retorna um inteiro igual ao tamanho de um range
(objeto de ponto de customização)
[ ranges::ssize](<#/doc/ranges/ssize>)(C++20) | retorna um inteiro com sinal igual ao tamanho de um range
(objeto de ponto de customização)