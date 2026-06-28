# std::indirectly_unary_invocable, std::indirectly_regular_unary_invocable

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
`std::indirectly_unary_invocable`
template< class F, class I >
concept indirectly_unary_invocable =
std::indirectly_readable<I> &&
std::copy_constructible<F> &&
std::invocable<F&, /*indirect-value-t*/<I>> &&
std::invocable<F&, std::iter_reference_t<I>> &&
std::common_reference_with<
std::invoke_result_t<F&, /*indirect-value-t*/<I>>,
std::invoke_result_t<F&, std::iter_reference_t<I>>>;
`std::indirectly_regular_unary_invocable`
template< class F, class I >
concept indirectly_regular_unary_invocable =
std::indirectly_readable<I> &&
std::copy_constructible<F> &&
std::regular_invocable<F&, /*indirect-value-t*/<I>> &&
std::regular_invocable<F&, std::iter_reference_t<I>> &&
std::common_reference_with<
std::invoke_result_t<F&, /*indirect-value-t*/<I>>,
std::invoke_result_t<F&, std::iter_reference_t<I>>>;
```

Os concepts `indirectly_unary_invocable` e `indirectly_regular_unary_invocable` especificam requisitos para algoritmos que chamam invocables unários (regulares) como seus argumentos. A principal diferença entre esses concepts e `std::invocable` é que eles são aplicados ao tipo que `I` referencia, em vez de `I` em si.

### Notas

A distinção entre `indirectly_unary_invocable` e `indirectly_regular_unary_invocable` é puramente semântica.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iterator>
    #include <print>
    #include <ranges>
    
    struct IntWrapper
    {
        int i;
    
        explicit IntWrapper(int i) : i(i) {}
        IntWrapper(IntWrapper&&) = default;
        IntWrapper& operator=(IntWrapper&&) = default;
    };
    
    int main()
    {
        auto ints  = std::views::iota(1, 10);
        auto print = [] (IntWrapper w) { std::print("{} ", w.i); };
        auto wrap  = [] (int i) { return IntWrapper{i}; };
    
        using Proj = std::projected<decltype(ints.begin()), decltype(wrap)>;
    
        // error (evaluated to false) until P2609R3:
        // this was because 'std::iter_value_t<Proj> &' is the same as 'IntWrapper&'
        // which is not convertible to 'IntWrapper' (implicitly deleted copy ctor)
        static_assert(std::indirectly_unary_invocable<decltype(print), Proj>);
    
        // if the compile-time check above evaluates to true, then this is well-formed:
        std::ranges::for_each(ints, print, wrap);
    }
```

Saída:
```
    1 2 3 4 5 6 7 8 9
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[P2609R3](<https://wg21.link/P2609R3>) | C++20 | alguns requisitos eram definidos em termos de [std::iter_value_t](<#/doc/iterator/iter_t>)&lt;I&gt;&, o que lidava mal com projeções, resultando em incompatibilidade com F& invocável | definido em termos de /*indirect-value-t*/&lt;I&gt; para lidar corretamente com tais projeções
[P2997R1](<https://wg21.link/P2997R1>) | C++20 | os concepts correspondentes exigiam que F& satisfizesse [`invocable`](<#/doc/concepts/invocable>) e [`regular_invocable`](<#/doc/concepts/invocable>), respectivamente, com [std::iter_common_reference_t](<#/doc/iterator/iter_t>)&lt;I&gt; | não exige