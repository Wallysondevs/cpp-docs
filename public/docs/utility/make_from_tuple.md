# std::make_from_tuple

Definido no cabeçalho `[<tuple>](<#/doc/header/tuple>)`

```c
template< class T, class Tuple >
constexpr T make_from_tuple( Tuple&& t );
(até C++23)
template< class T, tuple-like Tuple >
constexpr T make_from_tuple( Tuple&& t );
```

Constrói um objeto do tipo `T`, usando os elementos da tuple t como argumentos para o construtor.

Dada a função apenas para exposição /*make-from-tuple-impl*/ definida como segue:
template&lt;class T,` `[` _tuple-like_`](<#/doc/utility/tuple/tuple-like>)` `Tuple, [std::size_t](<#/doc/types/size_t>)... I&gt; // sem restrição em Tuple antes de C++23
constexpr T /*make-from-tuple-impl*/(Tuple&& t, [std::index_sequence](<#/doc/utility/integer_sequence>)<I...>)
`{`
` `return T(std::get&lt;I&gt;([std::forward](<#/doc/utility/forward>)&lt;Tuple&gt;(t))...);
`}`

O efeito é equivalente a:
return /*make-from-tuple-impl*/&lt;T&gt;(
[std::forward](<#/doc/utility/forward>)&lt;Tuple&gt;(t),
[std::make_index_sequence](<#/doc/utility/integer_sequence>)<[std::tuple_size_v](<#/doc/utility/tuple_size>)<[std::remove_reference_t](<#/doc/types/remove_reference>)&lt;Tuple&gt;>>{}
);.

Se

*   [std::tuple_size_v](<#/doc/utility/tuple_size>)<[std::remove_reference_t](<#/doc/types/remove_reference>)&lt;Tuple&gt;> for 1 e std::reference_constructs_from_temporary_v<
    T, decltype(std::get<0>([std::declval](<#/doc/utility/declval>)<Tuple>()))> for verdadeiro, ou

| (desde C++23)

*   [std::is_constructible_v](<#/doc/types/is_constructible>)<T, decltype(std::get&lt;I&gt;([std::declval](<#/doc/utility/declval>)&lt;Tuple&gt;()))...> for falso,

o programa é malformado.

### Parâmetros

- **t** — tuple cujos elementos serão usados como argumentos para o construtor de `T`

### Valor de retorno

O objeto `T` construído ou referência.

### Notas

`Tuple` não precisa ser [std::tuple](<#/doc/utility/tuple>), e em vez disso pode ser qualquer coisa que suporte [`std::get`](<#/doc/utility/tuple/get>) e [`std::tuple_size`](<#/doc/utility/tuple_size>); em particular, [std::array](<#/doc/container/array>) e [std::pair](<#/doc/utility/pair>) podem ser usados. | (até C++23)
---|---
`Tuple` é restrito a ser tuple-like, ou seja, cada tipo nele é requerido para ser uma especialização de [std::tuple](<#/doc/utility/tuple>) ou outro tipo (como [std::array](<#/doc/container/array>) e [std::pair](<#/doc/utility/pair>)) que modela [`_tuple-like_`](<#/doc/utility/tuple/tuple-like>). | (desde C++23)

Devido à [eliminação de cópia garantida](<#/doc/language/copy_elision>), `T` não precisa ser movível.

Macro de teste de funcionalidade | Valor | Padrão | Funcionalidade
---|---|---|---
[`__cpp_lib_make_from_tuple`](<#/doc/feature_test>) | [`201606L`](<#/>) | (C++17) | `std::make_from_tuple`

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <tuple>
    
    struct Foo
    {
        Foo(int first, float second, int third)
        {
            std::cout << first << ", " << second << ", " << third << '\n';
        }
    };
    
    int main()
    {
        auto tuple = std::make_tuple(42, 3.14f, 0);
        std::make_from_tuple<Foo>(std::move(tuple));
    }
```

Saída:
```
    42, 3.14, 0
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 3528](<https://cplusplus.github.io/LWG/issue3528>) | C++17 | cast contendo reinterpret_cast etc. era permitido no caso de 1-tuple | proibido

### Ver também

[ make_tuple](<#/doc/utility/tuple/make_tuple>)(C++11) | cria um objeto `tuple` do tipo definido pelos tipos dos argumentos
(modelo de função)
[ forward_as_tuple](<#/doc/utility/tuple/forward_as_tuple>)(C++11) | cria uma `tuple` de [referências de encaminhamento](<#/doc/language/reference>)
(modelo de função)
[ apply](<#/doc/utility/apply>)(C++17) | chama uma função com uma tuple de argumentos
(modelo de função)