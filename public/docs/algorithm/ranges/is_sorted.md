# std::ranges::is_sorted

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::forward_iterator I, std::sentinel_for<I> S,
class Proj = std::identity,
std::indirect_strict_weak_order<std::projected<I, Proj>>
Comp = ranges::less >
constexpr bool
is_sorted( I first, S last, Comp comp = {}, Proj proj = {} );
template< ranges::forward_range R, class Proj = std::identity,
std::indirect_strict_weak_order<
std::projected<ranges::iterator_t<R>, Proj>>
Comp = ranges::less >
constexpr bool
is_sorted( R&& r, Comp comp = {}, Proj proj = {} );
```

Verifica se os elementos no range `[`first`, `last`)` estão ordenados em ordem não decrescente.

Uma sequência é ordenada em relação a um comparador `comp` se para qualquer iterator `it` apontando para a sequência e qualquer inteiro não negativo `n` tal que `it + n` é um iterator válido apontando para um elemento da sequência, `[std::invoke](<#/doc/utility/functional/invoke>)(comp, [std::invoke](<#/doc/utility/functional/invoke>)(proj, *(it + n)), [std::invoke](<#/doc/utility/functional/invoke>)(proj, *it))` avalia para `false`.

1) Os elementos são comparados usando a função de comparação binária `comp` fornecida.

2) O mesmo que (1), mas usa `r` como o range de origem, como se usasse `[ranges::begin](<#/doc/ranges/begin>)(r)` como `first` e `[ranges::end](<#/doc/ranges/end>)(r)` como `last`.

As entidades tipo função descritas nesta página são _objetos de função de algoritmo_ (informalmente conhecidos como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer uma delas.
*   Nenhuma delas é visível para [argument-dependent lookup](<#/doc/language/adl>).
*   Quando qualquer uma delas é encontrada por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

- **first, last** — iterator-sentinel definindo o range a ser verificado se está ordenado
- **r** — o range a ser verificado se está ordenado
- **comp** — função de comparação a ser aplicada aos elementos projetados
- **proj** — projeção a ser aplicada aos elementos

### Valor de retorno

`true` se os elementos no range estiverem ordenados de acordo com `comp`.

### Complexidade

Linear na distância entre `first` e `last`.

### Possível implementação
```cpp
    struct is_sorted_fn
    {
        template<std::forward_iterator I, std::sentinel_for<I> S,
                 class Proj = std::identity,
                 std::indirect_strict_weak_order<std::projected<I, Proj>>
                     Comp = ranges::less>
        constexpr bool operator()(I first, S last, Comp comp = {}, Proj proj = {}) const
        {
            return ranges::is_sorted_until(first, last, comp, proj) == last;
        }
    
        template<ranges::forward_range R, class Proj = std::identity,
                 std::indirect_strict_weak_order<
                     std::projected<ranges::iterator_t<R>, Proj>>
                         Comp = ranges::less>
        constexpr bool operator()(R&& r, Comp comp = {}, Proj proj = {}) const
        {
            return (*this)(ranges::begin(r), ranges::end(r), std::ref(comp), std::ref(proj));
        }
    };
    
    inline constexpr is_sorted_fn is_sorted;
```

---

### Notas

`ranges::is_sorted` retorna `true` para ranges vazios e ranges de comprimento um.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <array>
    #include <functional>
    #include <iostream>
    #include <iterator>
    
    int main()
    {
        namespace ranges = std::ranges;
    
        std::array digits {3, 1, 4, 1, 5};
    
        ranges::copy(digits, std::ostream_iterator<int>(std::cout, " "));
        ranges::is_sorted(digits)
            ? std::cout << ": sorted\n"
            : std::cout << ": not sorted\n";
    
        ranges::sort(digits);
    
        ranges::copy(digits, std::ostream_iterator<int>(std::cout, " "));
        ranges::is_sorted(ranges::begin(digits), ranges::end(digits))
            ? std::cout << ": sorted\n"
            : std::cout << ": not sorted\n";
    
        ranges::reverse(digits);
    
        ranges::copy(digits, std::ostream_iterator<int>(std::cout, " "));
        ranges::is_sorted(digits, ranges::greater {})
            ? std::cout << ": sorted (with 'greater')\n"
            : std::cout << ": not sorted\n";
    }
```

Saída:
```
    3 1 4 1 5 : not sorted
    1 1 3 4 5 : sorted
    5 4 3 1 1 : sorted (with 'greater')
```

### Veja também

[ ranges::is_sorted_until](<#/doc/algorithm/ranges/is_sorted_until>)(C++20) | encontra o maior subrange ordenado
(objeto de função de algoritmo)
[ is_sorted](<#/doc/algorithm/is_sorted>)(C++11) | verifica se um range está ordenado em ordem crescente
(modelo de função)