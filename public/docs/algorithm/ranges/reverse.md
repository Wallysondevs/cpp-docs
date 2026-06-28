# std::ranges::reverse

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::bidirectional_iterator I, std::sentinel_for<I> S >
requires std::permutable<I>
constexpr I
reverse( I first, S last );
template< ranges::bidirectional_range R >
requires std::permutable<ranges::iterator_t<R>>
constexpr ranges::borrowed_iterator_t<R>
reverse( R&& r );
```

1) Inverte a ordem dos elementos no range `[`first`, `last`)`.

Comporta-se como se aplicasse `[ranges::iter_swap](<#/doc/iterator/ranges/iter_swap>)` a cada par de iteradores first + i, last - i - 1 para cada inteiro `i`, onde 0 ≤ i < (last - first) / 2.

2) O mesmo que (1), mas usa r como o range, como se usasse `[ranges::begin](<#/doc/ranges/begin>)(r)` como first e `[ranges::end](<#/doc/ranges/end>)(r)` como last.

As entidades tipo função descritas nesta página são `[_objetos de função de algoritmo_](<#/doc/algorithm/ranges>)` (informalmente conhecidos como _niebloids_), ou seja:

  * Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
  * Nenhum deles é visível para `[argument-dependent lookup](<#/doc/language/adl>)`.
  * Quando qualquer um deles é encontrado por `[normal unqualified lookup](<#/doc/language/unqualified_lookup>)` como o nome à esquerda do operador de chamada de função, `[argument-dependent lookup](<#/doc/language/adl>)` é inibido.

### Parâmetros

- **first, last** — o range de elementos a ser invertido
- **r** — o range de elementos a ser invertido

### Valor de retorno

Um iterator igual a last.

### Complexidade

Exatamente (last - first) / 2 trocas.

### Notas

Implementações (por exemplo, `[MSVC STL](<https://github.com/microsoft/STL/blob/main/stl/src/vector_algorithms.cpp>`) podem habilitar a vetorização quando o tipo de iterator modela `[contiguous_iterator](<#/doc/iterator/contiguous_iterator>)` e a troca de seu tipo de valor não chama nenhuma função membro especial não trivial nem `[ADL](<#/doc/language/adl>)`-encontrada `swap`.

### Implementação possível

Veja também implementações em `[libstdc++](<https://github.com/gcc-mirror/gcc/blob/14d8a5ae472ca5743016f37da2dd4770d83dea21/libstdc%2B%2B-v3/include/bits/ranges_algo.h#L1278-L1325>)` e `[MSVC STL](<https://github.com/microsoft/STL/blob/472161105d596192194d4715ccad307c6c163b4a/stl/inc/algorithm#L4154-L4180>`)`.
```cpp
    struct reverse_fn
    {
        template<std::bidirectional_iterator I, std::sentinel_for<I> S>
        requires std::permutable<I>
        constexpr I operator()(I first, S last) const
        {
            auto last2 {ranges::next(first, last)};
            for (auto tail {last2}; !(first == tail or first == --tail); ++first)
                ranges::iter_swap(first, tail);
            return last2;
        }
    
        template<ranges::bidirectional_range R>
        requires std::permutable<ranges::iterator_t<R>>
        constexpr ranges::borrowed_iterator_t<R>
            operator()(R&& r) const
        {
            return (*this)(ranges::begin(r), ranges::end(r));
        }
    };
    
    inline constexpr reverse_fn reverse {};
```

---

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <array>
    #include <iostream>
    #include <string>
    
    int main()
    {
        std::string s {"ABCDEF"};
        std::cout << s << " → ";
        std::ranges::reverse(s.begin(), s.end());
        std::cout << s << " → ";
        std::ranges::reverse(s);
        std::cout << s << " │ ";
    
        std::array a {1, 2, 3, 4, 5};
        for (auto e : a)
            std::cout << e << ' ';
        std::cout << "→ ";
        std::ranges::reverse(a);
        for (auto e : a)
            std::cout << e << ' ';
        std::cout << '\n';
    }
```

Saída:
```
    ABCDEF → FEDCBA → ABCDEF │ 1 2 3 4 5 → 5 4 3 2 1
```

### Veja também

`[ranges::reverse_copy](<#/doc/algorithm/ranges/reverse_copy>)`(C++20) | cria uma cópia de um range que é invertido
(objeto de função de algoritmo)
`[ranges::reverse_viewviews::reverse](<#/doc/ranges/reverse_view>)`(C++20) | uma `[view](<#/doc/ranges/view>)` que itera sobre os elementos de outra view bidirecional em ordem inversa
(modelo de classe) (objeto adaptador de range)
`[reverse](<#/doc/algorithm/reverse>)` | inverte a ordem dos elementos em um range
(modelo de função)