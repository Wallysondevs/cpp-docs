# std::basic_format_arg

Definido no cabeçalho `[<format>](<#/doc/header/format>)`

```c
template< class Context >
class basic_format_arg;
```

Fornece acesso a um argumento de formatação.

Objetos `basic_format_arg` são tipicamente criados por [std::make_format_args](<#/doc/utility/format/make_format_args>) e acessados através de [std::visit_format_arg](<#/doc/utility/format/visit_format_arg>) ou das funções membro `visit` (desde C++26).

Um objeto `basic_format_arg` se comporta como se armazenasse um [std::variant](<#/doc/utility/variant>) dos seguintes tipos:

  * [std::monostate](<#/doc/utility/variant/monostate>) (somente se o objeto foi construído por padrão)
  * bool
  * Context::char_type
  * int
  * unsigned int
  * long long int
  * unsigned long long int
  * float
  * double
  * long double
  * const Context::char_type*
  * [std::basic_string_view](<#/doc/string/basic_string_view>)<Context::char_type>
  * const void*
  * basic_format_arg::handle

### Classes membro

[ handle](<#/doc/utility/format/basic_format_arg/handle>)(C++20) | wrapper com type-erasure que permite formatar um objeto de tipo definido pelo usuário
(classe membro pública)

### Funções membro

(construtor)(C++20) | constrói um `std::basic_format_arg`
(função membro pública)
operator bool(C++20) | verifica se o objeto atual contém um argumento de formatação
(função membro pública)
visit(C++26) | visita o argumento de formatação armazenado
(função membro pública)

### Funções não-membro

[ visit_format_arg](<#/doc/utility/format/visit_format_arg>)(C++20) (obsoleto desde C++26) | interface de visitação de argumento para formatadores definidos pelo usuário
(template de função)

## std::basic_format_arg::basic_format_arg

```cpp
basic_format_arg() noexcept;  // (desde C++20)
```

Construtor padrão. Constrói um `basic_format_arg` que não contém um argumento de formatação. O objeto armazenado tem o tipo [std::monostate](<#/doc/utility/variant/monostate>).

Para criar um `basic_format_arg` que contém um argumento de formatação, [std::make_format_args](<#/doc/utility/format/make_format_args>) deve ser usado.

## std::basic_format_arg::operator bool

```cpp
explicit operator bool() const noexcept;  // (desde C++20)
```

Verifica se `*this` contém um argumento de formatação.

Retorna `true` se `*this` contém um argumento de formatação (ou seja, o objeto armazenado não tem o tipo [std::monostate](<#/doc/utility/variant/monostate>)), `false` caso contrário.

## std::basic_format_arg::visit

```cpp
template< class Visitor >
decltype(auto) visit( this basic_format_arg arg, Visitor&& vis );  // (1) (desde C++26)
template< class R, class Visitor >
R visit( this basic_format_arg arg, Visitor&& vis );  // (2) (desde C++26)
```

Aplica o visitor `vis` ao objeto contido em `arg`.

As funções `visit` não modificam o objeto `basic_format_arg` no qual são chamadas porque uma cópia do objeto é usada ao chamar `vis`.

1) Equivalente a `return [std::visit](<#/doc/utility/variant/visit>)([std::forward](<#/doc/utility/forward>)<Visitor>(vis), v);`, onde `v` é o [std::variant](<#/doc/utility/variant>) armazenado em `arg`.

2) Equivalente a `return [std::visit](<#/doc/utility/variant/visit>)<R>([std::forward](<#/doc/utility/forward>)<Visitor>(vis), v);`, onde `v` é o [std::variant](<#/doc/utility/variant>) armazenado em `arg`.

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_format`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | Membro [`visit`](<#/doc/utility/format/basic_format_arg>)

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ basic_format_argsformat_argswformat_args](<#/doc/utility/format/basic_format_args>)(C++20)(C++20)(C++20) | classe que fornece acesso a todos os argumentos de formatação
(template de classe)