# std::ranges::rotate_copy, std::ranges::rotate_copy_result

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::forward_iterator I, std::sentinel_for<I> S,
std::weakly_incrementable O >
requires std::indirectly_copyable<I, O>
constexpr rotate_copy_result<I, O>
rotate_copy( I first, I middle, S last, O result );
template< ranges::forward_range R, std::weakly_incrementable O >
requires std::indirectly_copyable<ranges::iterator_t<R>, O>
constexpr rotate_copy_result<ranges::borrowed_iterator_t<R>, O>
rotate_copy( R&& r, ranges::iterator_t<R> middle, O result );
Tipos auxiliares
template< class I, class O >
using rotate_copy_result = in_out_result<I, O>;
```

1) Copia os elementos do range de origem `[`first`, `last`)` para o range de destino começando em `result` de tal forma que o elemento `*middle` se torna o primeiro elemento do range de destino e `*(middle - 1)` se torna o último elemento. O resultado é que o range de destino contém uma cópia _rotacionada à esquerda_ do range de origem.

O comportamento é indefinido se `[`first`, `middle`)` ou `[`middle`, `last`)` não for um range válido, ou se os ranges de origem e destino se sobrepuserem.

2) O mesmo que (1), mas usa `r` como o range de origem, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r) como `first` e [ranges::end](<#/doc/ranges/end>)(r) como `last`.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (conhecidos informalmente como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
*   Nenhum deles é visível para [argument-dependent lookup](<#/doc/language/adl>).
*   Quando qualquer um deles é encontrado por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

- **first, last** — o range de origem dos elementos a serem copiados
- **r** — o range de origem dos elementos a serem copiados
- **middle** — o iterator para o elemento que deve aparecer no início do range de destino
- **result** — início do range de destino

### Valor de retorno

{last, result + N}, onde N = [ranges::distance](<#/doc/iterator/ranges/distance>)(first, last).

### Complexidade

_Linear_ : exatamente N atribuições.

### Observações

Se o tipo de valor for [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>) e os tipos de iterator satisfizerem [`contiguous_iterator`](<#/doc/iterator/contiguous_iterator>), as implementações de `ranges::rotate_copy` geralmente evitam múltiplas atribuições usando uma função de "cópia em massa" como [std::memmove](<#/doc/string/byte/memmove>).

### Possível implementação

Veja também as implementações em [libstdc++](<https://github.com/gcc-mirror/gcc/blob/14d8a5ae472ca5743016f37da2dd4770d83dea21/libstdc%2B%2B-v3/include/bits/ranges_algo.h#L1511-L1539>) e [MSVC STL](<https://github.com/microsoft/STL/blob/472161105d596192194d4715ccad307c6c163b4a/stl/inc/algorithm#L4466-L4514>).
```
    struct rotate_copy_fn
    {
        template<std::forward_iterator I, std::sentinel_for<I> S, std::weakly_incrementable O>
        requires std::indirectly_copyable<I, O>
        constexpr ranges::rotate_copy_result<I, O>
            operator()(I first, I middle, S last, O result) const
        {
            auto c1 {ranges::copy(middle, std::move(last), std::move(result))};
            auto c2 {ranges::copy(std::move(first), std::move(middle), std::move(c1.out))};
            return {std::move(c1.in), std::move(c2.out)};
        }

        template<ranges::forward_range R, std::weakly_incrementable O>
        requires std::indirectly_copyable<ranges::iterator_t<R>, O>
        constexpr ranges::rotate_copy_result<ranges::borrowed_iterator_t<R>, O>
            operator()(R&& r, ranges::iterator_t<R> middle, O result) const
        {
            return (*this)(ranges::begin(r), std::move(middle),
                           ranges::end(r), std::move(result));
        }
    };

    inline constexpr rotate_copy_fn rotate_copy {};
```

---

### Exemplo

Execute este código
```
    #include <algorithm>
    #include <iostream>
    #include <iterator>
    #include <vector>

    int main()
    {
        std::vector<int> src {1, 2, 3, 4, 5};
        std::vector<int> dest(src.size());
        auto pivot = std::ranges::find(src, 3);

        std::ranges::rotate_copy(src, pivot, dest.begin());
        for (int i : dest)
            std::cout << i << ' ';
        std::cout << '\n';

        // copia o resultado da rotação diretamente para o std::cout
        pivot = std::ranges::find(dest, 1);
        std::ranges::rotate_copy(dest, pivot, std::ostream_iterator<int>(std::cout, " "));
        std::cout << '\n';
    }
```

Saída:
```
    3 4 5 1 2
    1 2 3 4 5
```

### Ver também

[ ranges::rotate](<#/doc/algorithm/ranges/rotate>)(C++20) | rotaciona a ordem dos elementos em um range
(objeto de função de algoritmo)
[ ranges::copyranges::copy_if](<#/doc/algorithm/ranges/copy>)(C++20)(C++20) | copia um range de elementos para um novo local
(objeto de função de algoritmo)
[ rotate_copy](<#/doc/algorithm/rotate_copy>) | copia e rotaciona um range de elementos
(template de função)