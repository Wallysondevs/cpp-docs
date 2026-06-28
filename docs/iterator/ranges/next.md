# std::ranges::next

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
Assinatura da chamada
template< std::input_or_output_iterator I >
constexpr I next( I i );
template< std::input_or_output_iterator I >
constexpr I next( I i, std::iter_difference_t<I> n );
template< std::input_or_output_iterator I, std::sentinel_for<I> S >
constexpr I next( I i, S bound );
template< std::input_or_output_iterator I, std::sentinel_for<I> S >
constexpr I next( I i, std::iter_difference_t<I> n, S bound );
```

Retorna o n-ésimo sucessor do iterator i.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
*   Nenhum deles é visível para [argument-dependent lookup](<#/doc/language/adl>).
*   Quando qualquer um deles é encontrado por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

- **i** — um iterator
- **n** — número de elementos para avançar
- **bound** — sentinel denotando o fim do range para o qual i aponta

### Valor de retorno

1) O sucessor do iterator i.

2) O n-ésimo sucessor do iterator i.

3) O primeiro iterator equivalente a bound.

4) O n-ésimo sucessor do iterator i, ou o primeiro iterator equivalente a bound, o que vier primeiro.

### Complexidade

1) Constante.

2) Constante se `I` modela [std::random_access_iterator](<#/doc/iterator/random_access_iterator>); caso contrário, linear.

3) Constante se `I` e `S` modelam ambos [std::random_access_iterator](<#/doc/iterator/random_access_iterator>)&lt;I&gt; e [std::sized_sentinel_for](<#/doc/iterator/sized_sentinel_for>)<S, I>, ou se `I` e `S` modelam [std::assignable_from](<#/doc/concepts/assignable_from>)<I&, S>; caso contrário, linear.

4) Constante se `I` e `S` modelam ambos [std::random_access_iterator](<#/doc/iterator/random_access_iterator>)&lt;I&gt; e [std::sized_sentinel_for](<#/doc/iterator/sized_sentinel_for>)<S, I>; caso contrário, linear.

### Possível implementação
```cpp
    struct next_fn
    {
        template<std::input_or_output_iterator I>
        constexpr I operator()(I i) const
        {
            ++i;
            return i;
        }
    
        template<std::input_or_output_iterator I>
        constexpr I operator()(I i, std::iter_difference_t<I> n) const
        {
            ranges::advance(i, n);
            return i;
        }
    
        template<std::input_or_output_iterator I, std::sentinel_for<I> S>
        constexpr I operator()(I i, S bound) const
        {
            ranges::advance(i, bound);
            return i;
        }
    
        template<std::input_or_output_iterator I, std::sentinel_for<I> S>
        constexpr I operator()(I i, std::iter_difference_t<I> n, S bound) const
        {
            ranges::advance(i, n, bound);
            return i;
        }
    };
    
    inline constexpr auto next = next_fn();
```

---

### Notas

Embora a expressão `++x.begin()` frequentemente compile, não há garantia de que o faça: `x.begin()` é uma expressão rvalue, e não há requisito que especifique que o incremento de um rvalue tenha garantia de funcionar. Em particular, quando iterators são implementados como ponteiros ou seu `operator++` é lvalue-ref-qualified, `++x.begin()` não compila, enquanto `ranges::next(x.begin())` compila.

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <iterator>
    
    int main() 
    {
        auto v = {3, 1, 4};
        {
            auto n = std::ranges::next(v.begin());
            assert(*n == 1);
        }
        {
            auto n = std::ranges::next(v.begin(), 2);
            assert(*n == 4);
        }
        {
            auto n = std::ranges::next(v.begin(), v.end());
            assert(n == v.end());
        }
        {
            auto n = std::ranges::next(v.begin(), 42, v.end());
            assert(n == v.end());
        }
    }
```

### Veja também

[ ranges::prev](<#/doc/iterator/ranges/prev>)(C++20) | decrementa um iterator por uma dada distância ou até um limite
(objeto de função de algoritmo)
[ ranges::advance](<#/doc/iterator/ranges/advance>)(C++20) | avança um iterator por uma dada distância ou até um dado limite
(objeto de função de algoritmo)
[ next](<#/doc/iterator/next>)(C++11) | incrementa um iterator
(template de função)