# std::generator&lt;Ref,V,Allocator&gt;::promise_type::yield_value

```cpp
std::suspend_always yield_value( yielded val ) noexcept;  // (1) (desde C++23)
auto yield_value( const std::remove_reference_t<yielded>& lval )
requires std::is_rvalue_reference_v<yielded> &&
std::constructible_from<std::remove_cvref_t<yielded>,
const std::remove_reference_t<yielded>&>;  // (2) (desde C++23)
template< class R2, class V2, class Alloc2, class Unused >
requires std::same_as<typename std::generator<T2, V2, Alloc2>::yielded,
yielded>
auto yield_value( ranges::elements_of<std::generator<T2, V2, Alloc2>&&,
Unused> g ) noexcept;  // (3) (desde C++23)
template< class R2, class V2, class Alloc2, class Unused >
requires std::same_as<typename std::generator<T2, V2, Alloc2>::yielded,
yielded>
auto yield_value( ranges::elements_of<std::generator<T2, V2, Alloc2>&,
Unused> g ) noexcept;  // (4) (desde C++23)
template< ranges::input_range R, class Alloc >
requires std::convertible_to<ranges::range_reference_t<R>, yielded>
auto yield_value( ranges::elements_of<R, Alloc> r );  // (5) (desde C++23)
```

Uma implementação de funções de interface de coroutine usadas internamente para suportar o operador `co_yield`.

(`yielded` é um tipo de referência definido em [std::generator](<#/doc/coroutine/generator>).)

1) Atribui [std::addressof](<#/doc/memory/addressof>)(val) a `_[value_]_`. Retorna `{}`.

2) Retorna um objeto awaitable `x` de um tipo não especificado que armazena um objeto do tipo [std::remove_cvref_t](<#/doc/types/remove_cvref>)<`yielded`>. `x` é [direct-non-list-initialized](<#/doc/language/direct_initialization>) com `lval`, cujas funções membro são configuradas de modo que `_[value_]_` aponte para esse objeto armazenado. Em seguida, suspende a coroutine.

3, 4) Seja `x` um objeto [generator](<#/doc/coroutine/generator>).

Retorna um objeto awaitable de um tipo não especificado para o qual `g.range` é movido,

* cujo membro `await_ready` retorna `false`,
* cujo membro `await_suspend` empurra `g.range.coroutine_` para `*x._[active_]_` e
* retoma a execução da coroutine referenciada por `g.range.coroutine_`, e
* cujo membro `await_resume` avalia

* [std::rethrow_exception](<#/doc/error/rethrow_exception>)(except_) se `bool(except_)` for `true`.
* Se `bool(except_)` for `false`, o membro `await_resume` não tem efeitos.

A coroutine referenciada por `g.range.coroutine_` deve ser suspensa em seu ponto de suspensão inicial. Caso contrário, o comportamento é indefinido.

5) Equivalente a:
```cpp
    auto nested = , Alloc, ranges::iterator_t<R> i,
                     ranges::sentinel_t<R> s) ->
        std::generator<yielded, void, Alloc>
    {
        for (; i != s; ++i)
            co_yield static_cast<yielded>(*i);
    };
     
    return yield_value(ranges::elements_of(nested(
        allocator_arg, r.allocator, ranges::begin(r.range), ranges::end(r.range))));
```

2,3) Um handle referenciando a coroutine cujo objeto `promise` é `*this` deve estar no topo de `*_[active_]_` de algum objeto `generator`. Caso contrário, o comportamento é indefinido.

2-5) Uma [_yield-expression_](<#/doc/language/coroutines>) que chama essas sobrecargas tem o tipo `void`.

### Parâmetros

- **val** — um valor que é o resultado da avaliação da _yield-expression_
- **lval** — um lvalue que é o resultado da avaliação da _yield-expression_
- **g** — um range de elementos produzido por um generator
- **r** — um range de elementos

### Valor de retorno

1) O objeto awaitable do tipo [std::suspend_always](<#/doc/coroutine/suspend_always>).

2-5) Um objeto awaitable de um tipo não especificado, conforme descrito acima.

### Exceções

2,5) Pode lançar qualquer exceção lançada pela inicialização do objeto armazenado.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
[LWG 3899](<https://cplusplus.github.io/LWG/issue3899>) | C++23 | `yield_value` em um range de elementos produzido por um generator lvalue
usava sobrecarga genérica de `elements_of` | usava sobrecarga especial de `elements_of` para tais generators
[LWG 4119](<https://cplusplus.github.io/LWG/issue4119>) | C++23 | `range_value_t` no argumento de template de `generator` como parte
do tipo de retorno de `nested` em ([5](<#/doc/coroutine/generator/promise_type/yield_value>)) pode ser malformado | usava `void`