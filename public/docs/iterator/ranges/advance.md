# std::ranges::advance

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
Assinatura da chamada
template< std::input_or_output_iterator I >
constexpr void advance( I& i, std::iter_difference_t<I> n );
template< std::input_or_output_iterator I, std::sentinel_for<I> S >
constexpr void advance( I& i, S bound );
template< std::input_or_output_iterator I, std::sentinel_for<I> S >
constexpr std::iter_difference_t<I> advance( I& i, std::iter_difference_t<I> n, S bound );
```

1) Incrementa o iterator `i` fornecido `n` vezes.

2) Incrementa o iterator `i` fornecido até que `i == bound`.

3) Incrementa o iterator `i` fornecido `n` vezes, ou até que `i == bound`, o que ocorrer primeiro.

Se `n` for negativo, o iterator é decrementado. Neste caso, `I` deve modelar [std::bidirectional_iterator](<#/doc/iterator/bidirectional_iterator>), e `S` deve ser do mesmo tipo que `I` se `bound` for fornecido, caso contrário o comportamento é indefinido.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
*   Nenhum deles é visível para [argument-dependent lookup](<#/doc/language/adl>).
*   Quando qualquer um deles é encontrado por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, o [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

- **i** — iterator a ser avançado
- **bound** — sentinel que denota o fim do range para o qual `i` é um iterator
- **n** — número máximo de incrementos de `i`

### Valor de retorno

3) A diferença entre `n` e a distância real percorrida por `i`.

### Complexidade

Linear.

No entanto, se `I` adicionalmente modelar [std::random_access_iterator](<#/doc/iterator/random_access_iterator>), ou `S` modelar [std::sized_sentinel_for](<#/doc/iterator/sized_sentinel_for>)&lt;I&gt;, ou `I` e `S` modelarem [std::assignable_from](<#/doc/concepts/assignable_from>)<I&, S>, a complexidade é constante.

### Notas

O comportamento é indefinido se a sequência especificada de incrementos ou decrementos exigiria que um iterator não incrementável (como o iterator *past-the-end*) fosse incrementado, ou que um iterator não decrementável (como o iterator *front* ou o iterator singular) fosse decrementado.

### Implementação possível
```cpp
    struct advance_fn
    {
        template<std::input_or_output_iterator I>
        constexpr void operator()(I& i, std::iter_difference_t<I> n) const
        {
            if constexpr (std::random_access_iterator<I>)
                i += n;
            else
            {
                while (n > 0)
                {
                    --n;
                    ++i;
                }
    
                if constexpr (std::bidirectional_iterator<I>)
                {
                    while (n < 0)
                    {
                        ++n;
                        --i;
                    }
                }
            }
        }
    
        template<std::input_or_output_iterator I, std::sentinel_for<I> S>
        constexpr void operator()(I& i, S bound) const
        {
            if constexpr (std::assignable_from<I&, S>)
                i = std::move(bound);
            else if constexpr (std::sized_sentinel_for<S, I>)
                (*this)(i, bound - i);
            else
                while (i != bound)
                    ++i;
        }
    
        template<std::input_or_output_iterator I, std::sentinel_for<I> S>
        constexpr std::iter_difference_t<I>
        operator()(I& i, std::iter_difference_t<I> n, S bound) const
        {
            if constexpr (std::sized_sentinel_for<S, I>)
            {
                // std::abs is not constexpr until C++23
                auto abs = <I> x) { return x < 0 ? -x : x; };
    
                if (const auto dist = abs(n) - abs(bound - i); dist < 0)
                {
                    (*this)(i, bound);
                    return -dist;
                }
    
                (*this)(i, n);
                return 0;
            }
            else
            {
                while (n > 0 && i != bound)
                {
                    --n;
                    ++i;
                }
    
                if constexpr (std::bidirectional_iterator<I>)
                {
                    while (n < 0 && i != bound)
                    {
                        ++n;
                        --i;
                    }
                }
    
                return n;
            }
        }
    };
    
    inline constexpr auto advance = advance_fn();
```

---

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <iterator>
    #include <vector>
    
    int main()
    {
        std::vector<int> v {3, 1, 4};
    
        auto vi = v.begin();
    
        std::ranges::advance(vi, 2);
        std::cout << "1) value: " << *vi << '\n' << std::boolalpha;
    
        std::ranges::advance(vi, v.end());
        std::cout << "2) vi == v.end(): " << (vi == v.end()) << '\n';
    
        std::ranges::advance(vi, -3);
        std::cout << "3) value: " << *vi << '\n';
    
        std::cout << "4) diff: " << std::ranges::advance(vi, 2, v.end())
                  << ", value: " << *vi << '\n';
    
        std::cout << "5) diff: " << std::ranges::advance(vi, 4, v.end())
                  << ", vi == v.end(): " << (vi == v.end()) << '\n';
    }
```

Saída:
```
    1) value: 4
    2) vi == v.end(): true
    3) value: 3
    4) diff: 0, value: 4
    5) diff: 3, vi == v.end(): true
```

### Veja também

[ ranges::next](<#/doc/iterator/ranges/next>)(C++20) | incrementa um iterator por uma dada distância ou até um limite
(objeto de função de algoritmo)
[ ranges::prev](<#/doc/iterator/ranges/prev>)(C++20) | decrementa um iterator por uma dada distância ou até um limite
(objeto de função de algoritmo)
[ ranges::distance](<#/doc/iterator/ranges/distance>)(C++20) | retorna a distância entre um iterator e um sentinel, ou entre o início e o fim de um range
(objeto de função de algoritmo)
[ advance](<#/doc/iterator/advance>) | avança um iterator por uma dada distância
(modelo de função)