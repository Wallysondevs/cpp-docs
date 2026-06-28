# std::visit_format_arg

Definido no cabeçalho `[<format>](<#/doc/header/format>)`

```c
template< class Visitor, class Context >
/* see below */ visit_format_arg( Visitor&& vis, std::basic_format_arg<Context> arg );
(obsoleto desde C++26)
```

Aplica o visitor `vis` ao objeto contido em `arg`.

Equivalente a [std::visit](<#/doc/utility/variant/visit>)([std::forward](<#/doc/utility/forward>)&lt;Visitor&gt;(vis), value), onde `value` é o [std::variant](<#/doc/utility/variant/variant>) armazenado em `arg`.

### Parâmetros

- **vis** — um [Callable](<#/doc/named_req/Callable>) que aceita todas as alternativas possíveis de `arg`
- **arg** — um [std::basic_format_arg](<#/doc/utility/format/basic_format_arg>) a ser visitado

### Valor de retorno

O valor retornado pela invocação selecionada do visitor.

### Notas

A partir de C++26, `std::visit_format_arg` é obsoleto em favor das funções membro `visit` de [std::basic_format_arg](<#/doc/utility/format/basic_format_arg>).

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Veja também

[ make_format_argsmake_wformat_args](<#/doc/utility/format/make_format_args>)(C++20)(C++20) | cria um objeto com tipo apagado (type-erased) referenciando todos os argumentos de formatação, conversível para `format_args`
(modelo de função)