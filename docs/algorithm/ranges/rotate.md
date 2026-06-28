# std::ranges::rotate

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::permutable I, std::sentinel_for<I> S >
constexpr ranges::subrange<I>
rotate( I first, I middle, S last );
template< ranges::forward_range R >
requires std::permutable<ranges::iterator_t<R>>
constexpr ranges::borrowed_subrange_t<R>
rotate( R&& r, ranges::iterator_t<R> middle );
```

1) Realiza uma _rotação à esquerda_ em um range de elementos. Especificamente, `ranges::rotate` troca os elementos no range `[`first`, `last`)` de tal forma que o elemento *middle se torna o primeiro elemento do novo range e *(middle - 1) se torna o último elemento.

O comportamento é indefinido se `[`first`, `last`)` não for um range válido ou se middle não estiver em `[`first`, `last`)`.

2) O mesmo que (1), mas usa r como o range, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r) como first e [ranges::end](<#/doc/ranges/end>)(r) como last.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
*   Nenhum deles é visível para [argument-dependent lookup](<#/doc/language/adl>).
*   Quando qualquer um deles é encontrado por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

- **first, last** — o range de elementos a ser rotacionado
- **r** — o range de elementos a ser rotacionado
- **middle** — o iterator para o elemento que deve aparecer no início do range rotacionado

### Valor de retorno

{new_first, last}, onde `_new_first_` compara-se igual a [ranges::next](<#/doc/iterator/ranges/next>)(first, [ranges::distance](<#/doc/iterator/ranges/distance>)(middle, last)) e designa uma nova localização do elemento apontado por first.

### Complexidade

_Linear_ no pior caso: [ranges::distance](<#/doc/iterator/ranges/distance>)(first, last) trocas.

### Notas

`ranges::rotate` tem melhor eficiência em implementações comuns se `I` modela [`bidirectional_iterator`](<#/doc/iterator/bidirectional_iterator>) ou (melhor) [`random_access_iterator`](<#/doc/iterator/random_access_iterator>).

Implementações (por exemplo, [MSVC STL](<https://github.com/microsoft/STL/blob/main/stl/src/vector_algorithms.cpp>)) podem habilitar a vetorização quando o tipo de iterator modela [`contiguous_iterator`](<#/doc/iterator/contiguous_iterator>) e a troca de seu tipo de valor não chama nenhuma função membro especial não trivial nem `swap` encontrado por [ADL](<#/doc/language/adl>).

### Possível implementação

Veja também as implementações em [libstdc++](<https://github.com/gcc-mirror/gcc/blob/14d8a5ae472ca5743016f37da2dd4770d83dea21/libstdc%2B%2B-v3/include/bits/ranges_algo.h#L1361-L1506>) e [MSVC STL](<https://github.com/microsoft/STL/blob/472161105d596192194d4715ccad307c6c163b4a/stl/inc/algorithm#L4407-L4434>).
```cpp
    struct rotate_fn
    {
        template<std::permutable I, std::sentinel_for<I> S>
        constexpr ranges::subrange<I>
            operator()(I first, I middle, S last) const
        {
            if (first == middle)
            {
                auto last_it = ranges::next(first, last);
                return {last_it, last_it};
            }
            if (middle == last)
                return {std::move(first), std::move(middle)};
    
            if constexpr (std::bidirectional_iterator<I>)
            {
                ranges::reverse(first, middle);
                auto last_it = ranges::next(first, last);
                ranges::reverse(middle, last_it);
    
                if constexpr (std::random_access_iterator<I>)
                {
                    ranges::reverse(first, last_it);
                    return {first + (last_it - middle), std::move(last_it)};
                }
                else
                {
                    auto mid_last = last_it;
                    do
                    {
                        ranges::iter_swap(first, --mid_last);
                        ++first;
                    }
                    while (first != middle && mid_last != middle);
                    ranges::reverse(first, mid_last);
    
                    if (first == middle)
                        return {std::move(mid_last), std::move(last_it)};
                    else
                        return {std::move(first), std::move(last_it)};
                }
            }
            else
            { // I is merely a forward_iterator
                auto next_it = middle;
                do
                { // rotate the first cycle
                    ranges::iter_swap(first, next_it);
                    ++first;
                    ++next_it;
                    if (first == middle)
                        middle = next_it;
                }
                while (next_it != last);
    
                auto new_first = first;
                while (middle != last)
                { // rotate subsequent cycles
                    next_it = middle;
                    do
                    {
                        ranges::iter_swap(first, next_it);
                        ++first;
                        ++next_it;
                        if (first == middle)
                            middle = next_it;
                    }
                    while (next_it != last);
                }
    
                return {std::move(new_first), std::move(middle)};
            }
        }
    
        template<ranges::forward_range R>
        requires std::permutable<ranges::iterator_t<R>>
        constexpr ranges::borrowed_subrange_t<R>
            operator()(R&& r, ranges::iterator_t<R> middle) const
        {
            return (*this)(ranges::begin(r), std::move(middle), ranges::end(r));
        }
    };
    
    inline constexpr rotate_fn rotate {};
```

---

### Exemplo

`ranges::rotate` é um bloco de construção comum em muitos algoritmos. Este exemplo demonstra [insertion sort](<https://en.wikipedia.org/wiki/insertion_sort> "enwiki:insertion sort").

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <numeric>
    #include <string>
    #include <vector>
    
    int main()
    {
        std::string s(16, ' ');
    
        for (int k {}; k != 5; ++k)
        {
            std::iota(s.begin(), s.end(), 'A');
            std::ranges::rotate(s, s.begin() + k);
            std::cout << "Rotate left (" << k << "): " << s << '\n';
        }
        std::cout << '\n';
    
        for (int k {}; k != 5; ++k)
        {
            std::iota(s.begin(), s.end(), 'A');
            std::ranges::rotate(s, s.end() - k);
            std::cout << "Rotate right (" << k << "): " << s << '\n';
        }
    
        std::cout << "\nInsertion sort using `rotate`, step-by-step:\n";
    
        s = {'2', '4', '2', '0', '5', '9', '7', '3', '7', '1'};
    
        for (auto i = s.begin(); i != s.end(); ++i)
        {
            std::cout << "i = " << std::ranges::distance(s.begin(), i) << ": ";
            std::ranges::rotate(std::ranges::upper_bound(s.begin(), i, *i), i, i + 1);
            std::cout << s << '\n';
        }
        std::cout << (std::ranges::is_sorted(s) ? "Sorted!" : "Not sorted.") << '\n';
    }
```

Saída:
```
    Rotate left (0): ABCDEFGHIJKLMNOP
    Rotate left (1): BCDEFGHIJKLMNOPA
    Rotate left (2): CDEFGHIJKLMNOPAB
    Rotate left (3): DEFGHIJKLMNOPABC
    Rotate left (4): EFGHIJKLMNOPABCD
    
    Rotate right (0): ABCDEFGHIJKLMNOP
    Rotate right (1): PABCDEFGHIJKLMNO
    Rotate right (2): OPABCDEFGHIJKLMN
    Rotate right (3): NOPABCDEFGHIJKLM
    Rotate right (4): MNOPABCDEFGHIJKL
    
    Insertion sort using `rotate`, step-by-step:
    i = 0: 2420597371
    i = 1: 2420597371
    i = 2: 2240597371
    i = 3: 0224597371
    i = 4: 0224597371
    i = 5: 0224597371
    i = 6: 0224579371
    i = 7: 0223457971
    i = 8: 0223457791
    i = 9: 0122345779
    Sorted!
```

### Veja também

[ ranges::rotate_copy](<#/doc/algorithm/ranges/rotate_copy>)(C++20) | copia e rotaciona um range de elementos
(objeto de função de algoritmo)
[ ranges::reverse](<#/doc/algorithm/ranges/reverse>)(C++20) | inverte a ordem dos elementos em um range
(objeto de função de algoritmo)
[ rotate](<#/doc/algorithm/rotate>) | rotaciona a ordem dos elementos em um range
(template de função)