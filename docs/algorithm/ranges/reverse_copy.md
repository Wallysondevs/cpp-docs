# std::ranges::reverse_copy, std::ranges::reverse_copy_result

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::bidirectional_iterator I, std::sentinel_for<I> S,
std::weakly_incrementable O >
requires std::indirectly_copyable<I, O>
constexpr reverse_copy_result<I, O>
reverse_copy( I first, S last, O result );
template< ranges::bidirectional_range R, std::weakly_incrementable O >
requires std::indirectly_copyable<ranges::iterator_t<R>, O>
constexpr reverse_copy_result<ranges::borrowed_iterator_t<R>, O>
reverse_copy( R&& r, O result );
Tipos auxiliares
template< class I, class O >
using reverse_copy_result = ranges::in_out_result<I, O>;
```

1) Copia os elementos do range de origem `[`first`, `last`)` para o range de destino `[`result`, `result + N`)`, onde `N` é [ranges::distance](<#/doc/iterator/ranges/distance>)(first, last), de tal forma que os elementos no novo range estejam em ordem inversa. Comporta-se como se executasse a atribuição *(result + N - 1 - i) = *(first + i) uma vez para cada inteiro `i` em `[`​0​`, `N`)`. O comportamento é indefinido se os ranges de origem e destino se sobrepuserem.

2) O mesmo que (1), mas usa r como o range de origem, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r) como first e [ranges::end](<#/doc/ranges/end>)(r) como last.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

* Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
* Nenhum deles é visível para [pesquisa dependente de argumento](<#/doc/language/adl>).
* Quando qualquer um deles é encontrado por [pesquisa não qualificada normal](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, a [pesquisa dependente de argumento](<#/doc/language/adl>) é inibida.

### Parâmetros

- **first, last** — o range de elementos a copiar
- **r** — o range de elementos a copiar
- **result** — o início do range de destino.

### Valor de retorno

{last, result + N}.

### Complexidade

Exatamente `N` atribuições.

### Notas

Implementações (por exemplo, [MSVC STL](<https://github.com/microsoft/STL/blob/main/stl/src/vector_algorithms.cpp>)) podem habilitar a vetorização quando ambos os tipos de iterator modelam [`contiguous_iterator`](<#/doc/iterator/contiguous_iterator>) e têm o mesmo tipo de valor, e o tipo de valor é [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>).

### Possível implementação

Veja também as implementações em [MSVC STL](<https://github.com/microsoft/STL/blob/472161105d596192194d4715ccad307c6c163b4a/stl/inc/algorithm#L4245-L4323>) e [libstdc++](<https://github.com/gcc-mirror/gcc/blob/14d8a5ae472ca5743016f37da2dd4770d83dea21/libstdc%2B%2B-v3/include/bits/ranges_algo.h#L1330-L1359>).
```cpp
    struct reverse_copy_fn
    {
        template<std::bidirectional_iterator I, std::sentinel_for<I> S,
                 std::weakly_incrementable O>
        requires std::indirectly_copyable<I, O>
        constexpr ranges::reverse_copy_result<I, O>
            operator()(I first, S last, O result) const
        {
            auto ret = ranges::next(first, last);
            for (; last != first; *result = *--last, ++result);
            return {std::move(ret), std::move(result)};
        }
    
        template<ranges::bidirectional_range R, std::weakly_incrementable O>
        requires std::indirectly_copyable<ranges::iterator_t<R>, O>
        constexpr ranges::reverse_copy_result<ranges::borrowed_iterator_t<R>, O>
            operator()(R&& r, O result) const
        {
            return (*this)(ranges::begin(r), ranges::end(r), std::move(result));
        }
    };
    
    inline constexpr reverse_copy_fn reverse_copy {};
```

---

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <string>
    
    int main()
    {
        std::string x {"12345"}, y(x.size(), ' ');
        std::cout << x << " → ";
        std::ranges::reverse_copy(x.begin(), x.end(), y.begin());
        std::cout << y << " → ";
        std::ranges::reverse_copy(y, x.begin());
        std::cout << x << '\n';
    }
```

Saída:
```
    12345 → 54321 → 12345
```

### Veja também

[ ranges::reverse](<#/doc/algorithm/ranges/reverse>)(C++20) | inverte a ordem dos elementos em um range
(objeto de função de algoritmo)
[ reverse_copy](<#/doc/algorithm/reverse_copy>) | cria uma cópia de um range que está invertido
(modelo de função)