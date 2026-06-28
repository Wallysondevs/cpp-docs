# std::advance

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class InputIt, class Distance >
void advance( InputIt& it, Distance n );
template< class InputIt, class Distance >
constexpr void advance( InputIt& it, Distance n );
```

Incrementa o iterator `it` fornecido por `n` elementos.

Se `n` for negativo, o iterator é decrementado. Neste caso, `InputIt` deve atender aos requisitos de [LegacyBidirectionalIterator](<#/doc/named_req/BidirectionalIterator>), caso contrário, o comportamento é indefinido.

### Parâmetros

- **it** — iterator a ser avançado
- **n** — número de elementos pelos quais ele deve ser avançado
Requisitos de tipo
-`InputIt` deve atender aos requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).

### Valor de retorno

(nenhum)

### Complexidade

Linear.

No entanto, se `InputIt` adicionalmente atender aos requisitos de [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>), a complexidade é constante.

### Notas

O comportamento é indefinido se a sequência especificada de incrementos ou decrementos exigisse que um iterator não incrementável (como o iterator `past-the-end`) fosse incrementado, ou que um iterator não decrementável (como o iterator inicial ou o iterator [singular](<#/doc/iterator>)) fosse decrementado.

### Possível implementação

Veja também as implementações em [libstdc++](<https://github.com/gcc-mirror/gcc/blob/d9375e490072d1aae73a93949aa158fcd2a27018/libstdc%2B%2B-v3/include/bits/stl_iterator_base_funcs.h#L200>) e [libc++](<https://github.com/llvm-mirror/libcxx/blob/a12cb9d211019d99b5875b6d8034617cbc24c2cc/include/iterator#L582>).

[Versão não-constexpr](<#/doc/iterator/advance>)
---
```
    namespace detail
    {
        template<class It>
        void do_advance(It& it, typename std::iterator_traits<It>::difference_type n,
                        std::input_iterator_tag)
        {
            while (n > 0)
            {
                --n;
                ++it;
            }
        }

        template<class It>
        void do_advance(It& it, typename std::iterator_traits<It>::difference_type n,
                        std::bidirectional_iterator_tag)
        {
            while (n > 0)
            {
                --n;
                ++it;
            }
            while (n < 0)
            {
                ++n;
                --it;
            }
        }

        template<class It>
        void do_advance(It& it, typename std::iterator_traits<It>::difference_type n,
                        std::random_access_iterator_tag)
        {
            it += n;
        }
    } // namespace detail

    template<class It, class Distance>
    void advance(It& it, Distance n)
    {
        detail::do_advance(it, typename std::iterator_traits<It>::difference_type(n),
                           typename std::iterator_traits<It>::iterator_category());
    }
```

[Versão constexpr](<#/doc/iterator/advance>)
```
    template<class It, class Distance>
    constexpr void advance(It& it, Distance n)
    {
        using category = typename std::iterator_traits<It>::iterator_category;
        static_assert(std::is_base_of_v<std::input_iterator_tag, category>);

        auto dist = typename std::iterator_traits<It>::difference_type(n);
        if constexpr (std::is_base_of_v<std::random_access_iterator_tag, category>)
            it += dist;
        else
        {
            while (dist > 0)
            {
                --dist;
                ++it;
            }
            if constexpr (std::is_base_of_v<std::bidirectional_iterator_tag, category>)
                while (dist < 0)
                {
                    ++dist;
                    --it;
                }
        }
    }
```

### Exemplo

Execute este código
```
    #include <iostream>
    #include <iterator>
    #include <vector>

    int main()
    {
        std::vector<int> v{3, 1, 4};

        auto vi = v.begin();
        std::advance(vi, 2);
        std::cout << *vi << ' ';

        vi = v.end();
        std::advance(vi, -2);
        std::cout << *vi << '\n';
    }
```

Saída:
```
    4 1
```

### Veja também

[ next](<#/doc/iterator/next>)(C++11) | incrementa um iterator
(modelo de função)
[ prev](<#/doc/iterator/prev>)(C++11) | decrementa um iterator
(modelo de função)
[ distance](<#/doc/iterator/distance>) | retorna a distância entre dois iterators
(modelo de função)
[ ranges::advance](<#/doc/iterator/ranges/advance>)(C++20) | avança um iterator por uma dada distância ou até um dado limite
(objeto de função de algoritmo)