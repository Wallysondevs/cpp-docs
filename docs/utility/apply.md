# std::apply

Definido no cabeçalho `[<tuple>](<#/doc/header/tuple>)`

```c
template< class F, class Tuple >
constexpr decltype(auto) apply( F&& f, Tuple&& t );
(até C++23)
template< class F, tuple-like Tuple >
constexpr decltype(auto) apply( F&& f, Tuple&& t ) noexcept(/* veja abaixo */);
```

Invoca o objeto `[Callable](<#/doc/named_req/Callable>)` f com os elementos de t como argumentos.

Dada a função apenas para exposição `_apply-impl_` definida como segue:

template&lt;class F,class Tuple, [std::size_t](<#/doc/types/size_t>)... I&gt;
constexpr decltype(auto)
` ` _apply-impl_`(F&& f, Tuple&& t, [std::index_sequence](<#/doc/utility/integer_sequence>)<I...>) // apenas para exposição
`{`
` `return` `[` _INVOKE_`](<#/doc/utility/functional>)`([std::forward](<#/doc/utility/forward>)<F>(f), std::get<I>([std::forward](<#/doc/utility/forward>)<Tuple>(t))...);
`}`

O efeito é equivalente a:

return` ` _apply-impl_`([std::forward](<#/doc/utility/forward>)<F>(f), [std::forward](<#/doc/utility/forward>)<Tuple>(t),
` `[std::make_index_sequence](<#/doc/utility/integer_sequence>)<
` `[std::tuple_size_v](<#/doc/utility/tuple_size>)<[std::decay_t](<#/doc/types/decay>)<Tuple>>>{}); .

### Parâmetros

- **f** — Objeto `[Callable](<#/doc/named_req/Callable>)` a ser invocado
- **t** — tuple cujos elementos serão usados como argumentos para f

### Valor de retorno

O valor retornado por f.

### Exceções

```cpp
(nenhuma)  // (até C++23)
Especificação `noexcept`: noexcept(
noexcept(std::invoke(std::forward<F>(f),
std::get<Is>(std::forward<Tuple>(t))...))
) onde `Is...` denota o `pack`:
```

  * 0, 1, ..., `[std::tuple_size_v](<#/doc/utility/tuple_size>)`<[`std::remove_reference_t`](<#/doc/types/remove_reference>)<Tuple>> - 1.

| (desde C++23)

### Observações

`Tuple` não precisa ser `[std::tuple](<#/doc/utility/tuple>)`, e em vez disso pode ser qualquer coisa que suporte `[std::get](<#/doc/utility/tuple/get>)` e `[std::tuple_size](<#/doc/utility/tuple_size>)`; em particular, `[std::array](<#/doc/container/array>)` e `[std::pair](<#/doc/utility/pair>)` podem ser usados. | (até C++23)
---|---
`Tuple` é restrito a ser tuple-like, ou seja, cada tipo nele é exigido ser uma especialização de `[std::tuple](<#/doc/utility/tuple>)` ou outro tipo (como `[std::array](<#/doc/container/array>)` e `[std::pair](<#/doc/utility/pair>)`) que modela `[_tuple-like_](<#/doc/utility/tuple/tuple-like>)`. | (desde C++23)
Macro de teste de recurso | Valor | Std | Recurso
`[__cpp_lib_apply](<#/doc/feature_test>)` | `[201603L](<#/>)` | (C++17) | `std::apply`

### Exemplo

Run this code
```cpp
    #include <iostream>
    #include <tuple>
    #include <utility>
    
    int add(int first, int second) { return first + second; }
    
    template<typename T>
    T add_generic(T first, T second) { return first + second; }
    
    auto add_lambda =  { return first + second; };
    
    template<typename... Ts>
    std::ostream& operator<<(std::ostream& os, std::tuple<Ts...> const& theTuple)
    {
        std::apply
        (
            &os
            {
                os << '[';
                std::size_t n{0};
                ((os << tupleArgs << (++n != sizeof...(Ts) ? ", " : "")), ...);
                os << ']';
            }, theTuple
        );
        return os;
    }
    
    int main()
    {
        // OK
        std::cout << std::apply(add, std::pair(1, 2)) << '\n';
    
        // Error: can't deduce the function type
        // std::cout << std::apply(add_generic, std::make_pair(2.0f, 3.0f)) << '\n'; 
    
        // OK
        std::cout << std::apply(add_lambda, std::pair(2.0f, 3.0f)) << '\n'; 
    
        // advanced example
        std::tuple myTuple{25, "Hello", 9.31f, 'c'};
        std::cout << myTuple << '\n';
    }
```

Output:
```
    3
    5
    [25, Hello, 9.31, c]
```

### Veja também

`[make_tuple](<#/doc/utility/tuple/make_tuple>)`(C++11) | cria um objeto `tuple` do tipo definido pelos tipos dos argumentos
(modelo de função)
`[forward_as_tuple](<#/doc/utility/tuple/forward_as_tuple>)`(C++11) | cria um `tuple` de `[forwarding references](<#/doc/language/reference>)`
(modelo de função)
`[make_from_tuple](<#/doc/utility/make_from_tuple>)`(C++17) | constrói um objeto com um tuple de argumentos
(modelo de função)
`[invokeinvoke_r](<#/doc/utility/functional/invoke>)`(C++17)(C++23) | invoca qualquer objeto `[Callable](<#/doc/named_req/Callable>)` com os argumentos fornecidos e possibilidade de especificar o tipo de retorno(desde C++23)
(modelo de função)