# std::ranges::drop_view&lt;V&gt;::begin

```cpp
constexpr auto begin()
requires (!(/*simple-view*/<V> &&
ranges::random_access_range<const V> &&
ranges::sized_range<const V>));
```
| (1) | (desde C++20) |
|---|---|
```cpp
constexpr auto begin() const
requires ranges::random_access_range<const V> &&
ranges::sized_range<const V>;
```
| (2) | (desde C++20) |
|---|---|

Retorna um iterator para o primeiro elemento da `drop_view`, ou seja, um iterator para o _N_-ésimo elemento da view subjacente, ou para o fim da view subjacente se ela tiver menos de _N_ elementos.

Se `V` não for um [`random_access_range`](<#/doc/ranges/random_access_range>) ou um [`sized_range`](<#/doc/ranges/sized_range>), a fim de fornecer a complexidade de tempo constante amortizada exigida pelo concept [`range`](<#/doc/ranges/range>), a sobrecarga (1) armazena em cache o resultado dentro do objeto `drop_view` para uso em chamadas subsequentes.

### Parameters

(nenhum)

### Return value

[ranges::next](<#/doc/iterator/ranges/next>)([ranges::begin](<#/doc/ranges/begin>)(base_), count_, [ranges::end](<#/doc/ranges/end>)(base_)), onde [`_base__`](<#/doc/ranges/drop_view>) é a view subjacente, e [`_count__`](<#/doc/ranges/drop_view>) é o número de elementos a serem ignorados.

### Example

Execute este código
```cpp
    #include <array>
    #include <concepts>
    #include <iostream>
    #include <iterator>
    #include <ranges>
    
    void println(std::ranges::range auto const& range)
    {
        for (auto const& elem : range)
            std::cout << elem;
        std::cout << '\n';
    }
    
    int main()
    {
        std::array hi{'H', 'e', 'l', 'l', 'o', ',', ' ', 'C', '+', '+', '2', '0', '!'};
        println(hi);
    
        const auto pos = std::distance(hi.begin(), std::ranges::find(hi, 'C'));
        auto cxx = std::ranges::drop_view{hi, pos};
        std::cout << "*drop_view::begin() == '" << *cxx.begin() << "'\n";
    //  *cxx.begin() = 'c'; // undefined: 'views' are to be used as observers
        println(cxx);
    }
```

Saída:
```
    Hello, C++20!
    *drop_view::begin() == 'C'
    C++20!
```

### Defect reports

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[LWG 3482](<https://cplusplus.github.io/LWG/issue3482>) | C++20 | a sobrecarga const pode ser chamada com ranges não dimensionados | a sobrecarga const requer `sized_range`

### See also

[ end](<#/doc/ranges/drop_view/end>) | retorna um iterator ou um sentinel para o fim
(função membro pública)
[ ranges::begin](<#/doc/ranges/begin>)(C++20) | retorna um iterator para o início de um range
(objeto de ponto de customização)
[ ranges::end](<#/doc/ranges/end>)(C++20) | retorna um sentinel indicando o fim de um range
(objeto de ponto de customização)