# std::ranges::take_view&lt;V&gt;::size

```cpp
constexpr auto size() requires ranges::sized_range<V>;  // (1) (desde C++20)
constexpr auto size() const requires ranges::sized_range<const V>;  // (2) (desde C++20)
```

Retorna o número de elementos, que é o menor entre a contagem passada ao construtor e o tamanho da view subjacente.

Seja [`_base__`](<#/doc/ranges/take_view>) a view subjacente, [`_count__`](<#/doc/ranges/take_view>) o contador subjacente (igual a ​0​ se construído por padrão). Equivalente a
```cpp
    auto n = ranges::size(base_);
    return ranges::min(n, static_cast<decltype(n)>(count_));
```

### Parâmetros

(nenhum)

### Valor de retorno

O número de elementos.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <ranges>
    
    int main()
    {
        constexpr int arr[]{1, 2, 3};
    
        for (int i = 0; i != 6; ++i)
        {
            const auto tv = std::ranges::take_view{arr, i};
            std::cout << tv.size() << ' ';
        }
        std::cout << '\n';
    }
```

Saída:
```
    0 1 2 3 3 3
```

### Veja também

[ ranges::size](<#/doc/ranges/size>)(C++20) | retorna um inteiro igual ao tamanho de um range
(objeto de ponto de customização)
[ ranges::ssize](<#/doc/ranges/ssize>)(C++20) | retorna um inteiro com sinal igual ao tamanho de um range
(objeto de ponto de customização)