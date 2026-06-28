# std::ranges::nth_element

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::random_access_iterator I, std::sentinel_for<I> S,
class Comp = ranges::less, class Proj = std::identity >
requires std::sortable<I, Comp, Proj>
constexpr I
nth_element( I first, I nth, S last, Comp comp = {}, Proj proj = {} );
template< ranges::random_access_range R,
class Comp = ranges::less, class Proj = std::identity >
requires std::sortable<iterator_t<R>, Comp, Proj>
constexpr ranges::borrowed_iterator_t<R>
nth_element( R&& r, iterator_t<R> nth, Comp comp = {}, Proj proj = {} );
```

Reordena os elementos em `[`first`, `last`)` de tal forma que:

*   O elemento apontado por nth é alterado para qualquer elemento que ocorreria nessa posição se `[`first`, `last`)` fosse ordenado em relação a comp e proj.
*   Todos os elementos antes deste novo elemento `nth` são _menores ou iguais_ aos elementos depois do novo elemento nth. Ou seja, para cada iterator _i_ , _j_ nos ranges `[`first`, `nth`)`, `[`nth`, `last`)` respectivamente, a expressão `[`std::invoke`](<#/doc/utility/functional/invoke>)(comp, `[`std::invoke`](<#/doc/utility/functional/invoke>)(proj, *j), `[`std::invoke`](<#/doc/utility/functional/invoke>)(proj, *i))` avalia para false.
*   Se nth == last, então a função não tem efeito.

1) Os elementos são comparados usando o objeto de função de comparação binária comp e o objeto de projeção proj fornecidos.

2) O mesmo que (1), mas usa r como o range, como se usasse `[`ranges::begin`](<#/doc/ranges/begin>)(r)` como first e `[`ranges::end`](<#/doc/ranges/end>)(r)` como last.

As entidades semelhantes a funções descritas nesta página são `[_objetos de função de algoritmo_](<#/doc/algorithm/ranges>)` (informalmente conhecidos como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
*   Nenhum deles é visível para `[`argument-dependent lookup`](<#/doc/language/adl>)`.
*   Quando qualquer um deles é encontrado por `[`normal unqualified lookup`](<#/doc/language/unqualified_lookup>)` como o nome à esquerda do operador de chamada de função, `[`argument-dependent lookup`](<#/doc/language/adl>)` é inibido.

### Parâmetros

- **first, last** — o range de elementos a serem reordenados
- **r** — o range de elementos a serem reordenados
- **nth** — o iterator que define o ponto de partição
- **comp** — comparador usado para comparar os elementos projetados
- **proj** — projeção a ser aplicada aos elementos

### Valor de retorno

1) Um iterator igual a last.

2) O mesmo que (1) se r for um lvalue ou de um tipo `[`borrowed_range`](<#/doc/ranges/borrowed_range>)`. Caso contrário, retorna `[`std::ranges::dangling`](<#/doc/ranges/dangling>)`.

### Complexidade

Linear em `[`ranges::distance`](<#/doc/iterator/ranges/distance>)(first, last)` em média.

### Observações

O algoritmo usado é tipicamente `[`introselect`](<https://en.wikipedia.org/wiki/Introselect> "enwiki:Introselect")`, embora outros `[`algoritmos de seleção`](<https://en.wikipedia.org/wiki/Selection_algorithm> "enwiki:Selection algorithm")` com complexidade de caso médio adequada sejam permitidos.

### Implementação possível

Veja também a implementação em `[`msvc stl`](<https://github.com/microsoft/STL/blob/e97bb2b50a12816ce68cc5147b7a3a21fb68bfa3/stl/inc/algorithm#L8896-L8969>)`, `[`libstdc++`](<https://github.com/gcc-mirror/gcc/blob/a87819b8f1b890d36a3f05bd9de80be20e9525dd/libstdc%2B%2B-v3/include/bits/ranges_algo.h#L2016-L2044>)`, e libc++: `[`(1)`](<https://github.com/llvm/llvm-project/blob/ed2d3644abee9535eb07333beb1562a651001281/libcxx/include/__algorithm/ranges_nth_element.h>)` / `[`(2)`](<https://github.com/llvm/llvm-project/blob/ed2d364/libcxx/include/__algorithm/nth_element.h>).

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <array>
    #include <functional>
    #include <iostream>
    #include <ranges>
    #include <string_view>
    
    void print(std::string_view rem, std::ranges::input_range auto const& a)
    {
        for (std::cout << rem; const auto e : a)
            std::cout << e << ' ';
        std::cout << '\n';
    }
    
    int main()
    {
        std::array v{5, 6, 4, 3, 2, 6, 7, 9, 3};
        print("Before nth_element: ", v);
    
        std::ranges::nth_element(v, v.begin() + v.size() / 2);
        print("After nth_element:  ", v);
        std::cout << "The median is: " << v[v.size() / 2] << '\n';
    
        std::ranges::nth_element(v, v.begin() + 1, std::greater<int>());
        print("After nth_element:  ", v);
        std::cout << "The second largest element is: " << v[1] << '\n';
        std::cout << "The largest element is: " << v[0] << "\n\n";
    
        using namespace std::literals;
        std::array names
        {
            "Diva"sv, "Cornelius"sv, "Munro"sv, "Rhod"sv,
            "Zorg"sv, "Korben"sv, "Bender"sv, "Leeloo"sv,
        };
        print("Before nth_element: ", names);
        auto fifth_element{std::ranges::next(names.begin(), 4)};
        std::ranges::nth_element(names, fifth_element);
        print("After nth_element:  ", names);
        std::cout << "The 5th element is: " << *fifth_element << '\n';
    }
```

Saída:
```
    Before nth_element: 5 6 4 3 2 6 7 9 3 
    After nth_element:  2 3 3 4 5 6 6 7 9 
    The median is: 5
    After nth_element:  9 7 6 6 5 4 3 3 2 
    The second largest element is: 7
    The largest element is: 9
    
    Before nth_element: Diva Cornelius Munro Rhod Zorg Korben Bender Leeloo 
    After nth_element:  Diva Cornelius Bender Korben Leeloo Rhod Munro Zorg 
    The 5th element is: Leeloo
```

### Veja também

[`ranges::max_element`](<#/doc/algorithm/ranges/max_element>)(C++20) | retorna o maior elemento em um range
(objeto de função de algoritmo)
[`ranges::min_element`](<#/doc/algorithm/ranges/min_element>)(C++20) | retorna o menor elemento em um range
(objeto de função de algoritmo)
[`ranges::partition`](<#/doc/algorithm/ranges/partition>)(C++20) | divide um range de elementos em dois grupos
(objeto de função de algoritmo)
[`ranges::partial_sort`](<#/doc/algorithm/ranges/partial_sort>)(C++20) | ordena os primeiros N elementos de um range
(objeto de função de algoritmo)
[`nth_element`](<#/doc/algorithm/nth_element>) | ordena parcialmente o range fornecido garantindo que ele seja particionado pelo elemento dado
(modelo de função)