# std::ranges::partial_sort

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::random_access_iterator I, std::sentinel_for<I> S,
class Comp = ranges::less, class Proj = std::identity >
requires std::sortable<I, Comp, Proj>
constexpr I
partial_sort( I first, I middle, S last, Comp comp = {}, Proj proj = {} );
template< ranges::random_access_range R,
class Comp = ranges::less, class Proj = std::identity >
requires std::sortable<ranges::iterator_t<R>, Comp, Proj>
constexpr ranges::borrowed_iterator_t<R>
partial_sort( R&& r, ranges::iterator_t<R> middle, Comp comp = {},
Proj proj = {} );
```

1) Reorganiza os elementos de forma que o range `[`first`, `middle`)` contenha os `middle - first` menores elementos ordenados no range `[`first`, `last`)`.

A ordem de elementos iguais _não_ é garantida de ser preservada. A ordem dos elementos restantes no range `[`middle`, `last`)` é _não especificada_.

Os elementos são comparados usando a função de comparação binária `comp` fornecida e projetados usando o function object `proj`.

2) O mesmo que (1), mas usa `r` como o range, como se usasse `[`ranges::begin`](<#/doc/ranges/begin>)`(r)` como `first` e `[`ranges::end`](<#/doc/ranges/end>)`(r)` como `last`.

As entidades tipo função descritas nesta página são [_algorithm function objects_](<#/doc/algorithm/ranges>) (informalmente conhecidas como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer uma delas.
*   Nenhuma delas é visível para `[`argument-dependent lookup`](<#/doc/language/adl>)`.
*   Quando qualquer uma delas é encontrada por `[`normal unqualified lookup`](<#/doc/language/unqualified_lookup>)` como o nome à esquerda do operador de chamada de função, `[`argument-dependent lookup`](<#/doc/language/adl>)` é inibida.

### Parâmetros

- **first, last** — iterator-sentinel que define o range a ser ordenado
- **r** — o range a ser ordenado
- **middle** — o iterator que define o último elemento a ser ordenado
- **comp** — comparador a ser aplicado aos elementos projetados
- **proj** — projeção a ser aplicada aos elementos

### Valor de retorno

Um iterator igual a `last`.

### Complexidade

\\(\scriptsize \mathcal{O}(N\cdot\log{(M)})\\)𝓞(N·log(M)) comparações e o dobro de projeções, onde \\(\scriptsize N\\)N é `[`ranges::distance`](<#/doc/iterator/ranges/distance>)`(first, last), \\(\scriptsize M\\)M é `[`ranges::distance`](<#/doc/iterator/ranges/distance>)`(first, middle).

### Possível implementação
```cpp
    struct partial_sort_fn
    {
        template<std::random_access_iterator I, std::sentinel_for<I> S,
                 class Comp = ranges::less, class Proj = std::identity>
        requires std::sortable<I, Comp, Proj>
        constexpr I
            operator()(I first, I middle, S last, Comp comp = {}, Proj proj = {}) const
        {
            if (first == middle)
                return ranges::next(first, last);
            ranges::make_heap(first, middle, comp, proj);
            auto it {middle};
            for (; it != last; ++it)
            {
                if (std::invoke(comp, std::invoke(proj, *it), std::invoke(proj, *first)))
                {
                    ranges::pop_heap(first, middle, comp, proj);
                    ranges::iter_swap(middle - 1, it);
                    ranges::push_heap(first, middle, comp, proj);
                }
            }
            ranges::sort_heap(first, middle, comp, proj);
            return it;
        }
    
        template<ranges::random_access_range R, class Comp = ranges::less,
                 class Proj = std::identity>
        requires std::sortable<ranges::iterator_t<R>, Comp, Proj>
        constexpr ranges::borrowed_iterator_t<R>
            operator()(R&& r, ranges::iterator_t<R> middle, Comp comp = {}, Proj proj = {}) const
        {
            return (*this)(ranges::begin(r), std::move(middle), ranges::end(r),
                           std::move(comp), std::move(proj));
        }
    };
    
    inline constexpr partial_sort_fn partial_sort {};
```

---

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <functional>
    #include <iostream>
    #include <string>
    #include <vector>
    
    void print(const auto& v)
    {
        for (const char e : v)
            std::cout << e << ' ';
        std::cout << '\n';
    }
    
    void underscore(int n)
    {
        while (n-- > 0)
            std::cout << "^ ";
        std::cout << '\n';
    }
    
    int main()
    {
        static_assert('A' < 'a');
        std::vector<char> v {'x', 'P', 'y', 'C', 'z', 'w', 'P', 'o'};
        print(v);
        const int m {3};
        std::ranges::partial_sort(v, v.begin() + m);
        print(v), underscore(m);
    
        static_assert('1' < 'a');
        std::string s {"3a1b41c5"};
        print(s);
        std::ranges::partial_sort(s.begin(), s.begin() + m, s.end(), std::greater {});
        print(s), underscore(m);
    }
```

Saída:
```
    x P y C z w P o
    C P P y z x w o
    ^ ^ ^
    3 a 1 b 4 1 c 5
    c b a 1 3 1 4 5
    ^ ^ ^
```

### Veja também

[ ranges::partial_sort_copy](<#/doc/algorithm/ranges/partial_sort_copy>)(C++20) | copia e ordena parcialmente um range de elementos
(algorithm function object)
[ ranges::sort](<#/doc/algorithm/ranges/sort>)(C++20) | ordena um range em ordem crescente
(algorithm function object)
[ ranges::stable_sort](<#/doc/algorithm/ranges/stable_sort>)(C++20) | ordena um range de elementos enquanto preserva a ordem entre elementos iguais
(algorithm function object)
[ ranges::nth_element](<#/doc/algorithm/ranges/nth_element>)(C++20) | ordena parcialmente o range fornecido, garantindo que ele seja particionado pelo elemento dado
(algorithm function object)
[ ranges::make_heap](<#/doc/algorithm/ranges/make_heap>)(C++20) | cria um max heap a partir de um range de elementos
(algorithm function object)
[ ranges::pop_heap](<#/doc/algorithm/ranges/pop_heap>)(C++20) | remove o maior elemento de um max heap
(algorithm function object)
[ ranges::push_heap](<#/doc/algorithm/ranges/push_heap>)(C++20) | adiciona um elemento a um max heap
(algorithm function object)
[ ranges::sort_heap](<#/doc/algorithm/ranges/sort_heap>)(C++20) | transforma um max heap em um range de elementos ordenados em ordem crescente
(algorithm function object)
[ partial_sort](<#/doc/algorithm/partial_sort>) | ordena os primeiros N elementos de um range
(function template)