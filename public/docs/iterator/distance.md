# std::distance

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class InputIt >
typename std::iterator_traits<InputIt>::difference_type
distance( InputIt first, InputIt last );
```

Retorna o número de "saltos" de first para last.

Se `InputIt` não for um [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>), o comportamento é indefinido se last não for [alcançável](<#/doc/iterator>) a partir de first.

Se `InputIt` for um [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>), o comportamento é indefinido se first e last não forem alcançáveis um do outro.

### Parâmetros

- **first** — iterator apontando para o primeiro elemento
- **last** — iterator apontando para o final do range
Requisitos de tipo
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>). A operação é mais eficiente se `InputIt` adicionalmente satisfizer os requisitos de [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>).

### Valor de retorno

O número de incrementos necessários para ir de first a last.

O valor pode ser negativo se iterators de acesso aleatório forem usados e first for alcançável a partir de last. | (desde C++11)

### Complexidade

Linear.

No entanto, se `InputIt` adicionalmente satisfizer os requisitos de [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>), a complexidade é constante.

### Possível implementação

Veja também as implementações em [libstdc++](<https://github.com/gcc-mirror/gcc/blob/d9375e490072d1aae73a93949aa158fcd2a27018/libstdc%2B%2B-v3/include/bits/stl_iterator_base_funcs.h#L135>) e [libc++](<https://github.com/llvm-mirror/libcxx/blob/a12cb9d211019d99b5875b6d8034617cbc24c2cc/include/iterator#L611>).

Implementação C++98 via tag dispatch, com constexpr removido
---
```cpp
    namespace detail
    {
        template<class It>
        constexpr // required since C++17
        typename std::iterator_traits<It>::difference_type
            do_distance(It first, It last, std::input_iterator_tag)
        {
            typename std::iterator_traits<It>::difference_type result = 0;
            while (first != last)
            {
                ++first;
                ++result;
            }
            return result;
        }

        template<class It>
        constexpr // required since C++17
        typename std::iterator_traits<It>::difference_type
            do_distance(It first, It last, std::random_access_iterator_tag)
        {
            return last - first;
        }
    } // namespace detail

    template<class It>
    constexpr // since C++17
    typename std::iterator_traits<It>::difference_type
        distance(It first, It last)
    {
        return detail::do_distance(first, last,
                                   typename std::iterator_traits<It>::iterator_category());
    }
```

Implementação C++17 via if constexpr
```cpp
    template<class It>
    constexpr typename std::iterator_traits<It>::difference_type
        distance(It first, It last)
    {
        using category = typename std::iterator_traits<It>::iterator_category;
        static_assert(std::is_base_of_v<std::input_iterator_tag, category>);

        if constexpr (std::is_base_of_v<std::random_access_iterator_tag, category>)
            return last - first;
        else
        {
            typename std::iterator_traits<It>::difference_type result = 0;
            while (first != last)
            {
                ++first;
                ++result;
            }
            return result;
        }
    }
```

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <iterator>
    #include <vector>

    int main()
    {
        std::vector<int> v{3, 1, 4};
        std::cout << "distance(first, last) = "
                  << std::distance(v.begin(), v.end()) << '\n'
                  << "distance(last, first) = "
                  << std::distance(v.end(), v.begin()) << '\n';
                  // the behavior is undefined (until LWG940)

        static constexpr auto il = {3, 1, 4};
        // Since C++17 `distance` can be used in constexpr context.
        static_assert(std::distance(il.begin(), il.end()) == 3);
        static_assert(std::distance(il.end(), il.begin()) == -3);
    }
```

Saída:
```
    distance(first, last) = 3
    distance(last, first) = -3
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 940](<https://cplusplus.github.io/LWG/issue940>) | C++98 | a redação era pouco clara para o caso em que first é alcançável a partir de last | esclarecido

### Veja também

[ advance](<#/doc/iterator/advance>) | avança um iterator por uma dada distância
(modelo de função)
[ countcount_if](<#/doc/algorithm/count>) | retorna o número de elementos que satisfazem critérios específicos
(modelo de função)
[ ranges::distance](<#/doc/iterator/ranges/distance>)(C++20) | retorna a distância entre um iterator e um sentinel, ou entre o início e o fim de um range
(objeto de função de algoritmo)