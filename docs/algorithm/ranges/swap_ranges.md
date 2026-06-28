# std::ranges::swap_ranges, std::ranges::swap_ranges_result

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::input_iterator I1, std::sentinel_for<I1> S1,
std::input_iterator I2, std::sentinel_for<I2> S2 >
requires std::indirectly_swappable<I1, I2>
constexpr swap_ranges_result<I1, I2>
swap_ranges( I1 first1, S1 last1, I2 first2, S2 last2 );
template< ranges::input_range R1, ranges::input_range R2 >
requires std::indirectly_swappable<ranges::iterator_t<R1>, ranges::iterator_t<R2>>
constexpr swap_ranges_result<ranges::borrowed_iterator_t<R1>,
ranges::borrowed_iterator_t<R2>>
swap_ranges( R1&& r1, R2&& r2 );
Tipos auxiliares
template< class I1, class I2 >
using swap_ranges_result = ranges::in_in_result<I1, I2>;
```

1) Troca elementos entre o primeiro range `[`first1`, `first1 + M`)` e o segundo range `[`first2`, `first2 + M`)` via [ranges::iter_swap](<#/doc/iterator/ranges/iter_swap>)(first1 + i, first2 + i), onde M = [ranges::min](<#/doc/algorithm/ranges/min>)([ranges::distance](<#/doc/iterator/ranges/distance>)(first1, last1), [ranges::distance](<#/doc/iterator/ranges/distance>)(first2, last2)).

Os ranges `[`first1`, `last1`)` e `[`first2`, `last2`)` não devem se sobrepor.

2) O mesmo que (1), mas usa r1 como o primeiro range e r2 como o segundo range, como se estivesse usando [ranges::begin](<#/doc/ranges/begin>)(r1) como first1, [ranges::end](<#/doc/ranges/end>)(r1) como last1, [ranges::begin](<#/doc/ranges/begin>)(r2) como first2, e [ranges::end](<#/doc/ranges/end>)(r2) como last2.

As entidades tipo função descritas nesta página são [_algorithm function objects_](<#/doc/algorithm/ranges>) (informalmente conhecidas como _niebloids_), ou seja:

  * Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer uma delas.
  * Nenhuma delas é visível para [argument-dependent lookup](<#/doc/language/adl>).
  * Quando qualquer uma delas é encontrada por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, [argument-dependent lookup](<#/doc/language/adl>) é inibida.

### Parâmetros

- **first1, last1** — o primeiro range de elementos a serem trocados
- **first2, last2** — o segundo range de elementos a serem trocados
- **r1** — o primeiro range de elementos a serem trocados
- **r2** — o segundo range de elementos a serem trocados.

### Valor de retorno

`{first1 + M, first2 + M}`.

### Complexidade

Exatamente M trocas.

### Observações

Implementações (e.g. [MSVC STL](<https://github.com/microsoft/STL/blob/main/stl/src/vector_algorithms.cpp>)) podem habilitar a vetorização quando o tipo do iterator modela [`contiguous_iterator`](<#/doc/iterator/contiguous_iterator>) e a troca de seu tipo de valor não chama nenhuma função membro especial não trivial nem `swap` encontrado por [ADL](<#/doc/language/adl>).

### Possível implementação
```cpp
    struct swap_ranges_fn
    {
        template<std::input_iterator I1, std::sentinel_for<I1> S1,
                 std::input_iterator I2, std::sentinel_for<I2> S2>
        requires std::indirectly_swappable<I1, I2>
        constexpr ranges::swap_ranges_result<I1, I2>
            operator()(I1 first1, S1 last1, I2 first2, S2 last2) const
        {
            for (; !(first1 == last1 or first2 == last2); ++first1, ++first2)
                ranges::iter_swap(first1, first2);
            return {std::move(first1), std::move(first2)};
        }
    
        template<ranges::input_range R1, ranges::input_range R2>
        requires std::indirectly_swappable<ranges::iterator_t<R1>, ranges::iterator_t<R2>>
        constexpr ranges::swap_ranges_result<ranges::borrowed_iterator_t<R1>,
                                             ranges::borrowed_iterator_t<R2>>
            operator()(R1&& r1, R2&& r2) const
        {
            return (*this)(ranges::begin(r1), ranges::end(r1),
                           ranges::begin(r2), ranges::end(r2));
        }
    };
    
    inline constexpr swap_ranges_fn swap_ranges {};
```

---

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <list>
    #include <string_view>
    #include <vector>
    
    auto print(std::string_view name, auto const& seq, std::string_view term = "\n")
    {
        std::cout << name << " : ";
        for (const auto& elem : seq)
            std::cout << elem << ' ';
        std::cout << term;
    }
    
    int main()
    {
        std::vector<char> p {'A', 'B', 'C', 'D', 'E'};
        std::list<char> q {'1', '2', '3', '4', '5', '6'};
    
        print("p", p);
        print("q", q, "\n\n");
    
        // swap p[0, 2) and q[1, 3):
        std::ranges::swap_ranges(p.begin(),
                                 p.begin() + 4,
                                 std::ranges::next(q.begin(), 1),
                                 std::ranges::next(q.begin(), 3));
        print("p", p);
        print("q", q, "\n\n");
    
        // swap p[0, 5) and q[0, 5):
        std::ranges::swap_ranges(p, q);
    
        print("p", p);
        print("q", q);
    }
```

Saída:
```
    p : A B C D E
    q : 1 2 3 4 5 6
    
    p : 2 3 C D E
    q : 1 A B 4 5 6
    
    p : 1 A B 4 5
    q : 2 3 C D E 6
```

### Ver também

[ iter_swap](<#/doc/iterator/ranges/iter_swap>)(C++20) | troca os valores referenciados por dois objetos desreferenciáveis
(objeto de ponto de customização)
[ ranges::swap](<#/doc/utility/ranges/swap>)(C++20) | troca os valores de dois objetos
(objeto de ponto de customização)
[ swap_ranges](<#/doc/algorithm/swap_ranges>) | troca dois ranges de elementos
(modelo de função)
[ iter_swap](<#/doc/algorithm/iter_swap>) | troca os elementos apontados por dois iterators
(modelo de função)
[ swap](<#/doc/utility/swap>) | troca os valores de dois objetos
(modelo de função)