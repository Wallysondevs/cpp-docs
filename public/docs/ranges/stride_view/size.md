# std::ranges::stride_view&lt;V&gt;::size

```cpp
constexpr auto size() requires ranges::sized_range<V>;  // (desde C++23)
constexpr auto size() const requires ranges::sized_range<const V>;  // (desde C++23)
```

Retorna o número de elementos.

Seja [`_base__`](<#/doc/ranges/stride_view>) a view subjacente e [`_stride__`](<#/doc/ranges/stride_view>) o valor de stride armazenado. Equivalente a:
```cpp
    return /*to-unsigned-like*/(/*div-ceil*/(ranges::distance(base_), stride_));
```

### Parâmetros

(nenhum)

### Valor de retorno

O número de elementos. O valor retornado é calculado como se pela expressão

([ranges::size](<#/doc/ranges/size>)(base_) / stride_) + (([ranges::size](<#/doc/ranges/size>)(base_) % stride_ ? 1 : 0).

### Exemplo

Execute este código
```cpp
    #include <forward_list>
    #include <ranges>
    
    int main()
    {
        namespace vs = std::views;
        constexpr static auto v = {1, 2, 3, 4, 5};
        static_assert
        (
            vs::stride(v, 1).size() == 5 and
            vs::stride(v, 2).size() == 3 and
            vs::stride(v, 3).size() == 2 and
            vs::stride(v, 4).size() == 2 and
            vs::stride(v, 5).size() == 1 and
            vs::stride(v, 6).size() == 1
        );
    
        std::forward_list list{v};
    //  auto s = vs::stride(list, 2).size(); // Error: not a sized_range
    }
```

### Veja também

[ ranges::size](<#/doc/ranges/size>)(C++20) | retorna um inteiro igual ao tamanho de um range
(objeto de ponto de customização)
[ ranges::ssize](<#/doc/ranges/ssize>)(C++20) | retorna um inteiro com sinal igual ao tamanho de um range
(objeto de ponto de customização)