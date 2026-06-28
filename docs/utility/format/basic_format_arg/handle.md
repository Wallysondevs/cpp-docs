# std::basic_format_arg&lt;Context&gt;::handle

Definido no cabeçalho `[<format>](<#/doc/header/format>)`

```c
template< class Context >
class basic_format_arg<Context>::handle;
```

Um wrapper com type-erasure que permite formatar um objeto de um tipo definido pelo usuário.

Objetos `handle` são tipicamente criados por [std::make_format_args](<#/doc/utility/format/make_format_args>) e acessados através de [std::visit_format_arg](<#/doc/utility/format/visit_format_arg>) ou das funções membro `visit` de [std::basic_format_arg](<#/doc/utility/format/basic_format_arg>)(desde C++26).

### Membros de dados

Uma implementação típica de `handle` é [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>) e armazena apenas dois membros de dados não estáticos:

  * um ponteiro `const void*` para o objeto a ser formatado, e
  * um ponteiro para função `void (*)([std::basic_format_parse_context](<#/doc/utility/format/basic_format_parse_context>)<Context::char_type>&, Context&, const void*)` para a função que executa as operações necessárias na função membro `format` (veja abaixo).

### Funções membro

format(C++20) | formata o objeto referenciado com os contextos fornecidos
(função membro pública)

## std::basic_format_arg&lt;Context&gt;::handle::format

void format( [std::basic_format_parse_context](<#/doc/utility/format/basic_format_parse_context>)<Context::char_type>& parse_ctx,
Context& format_ctx ) const; | | (desde C++20)

Seja

  * `T` o tipo do argumento de formatação,
  * `TD` seja [std::remove_const_t](<#/doc/types/remove_cv>)&lt;T&gt;,
  * `TQ` seja `const TD` se `const TD` satisfaz [`___formattable_with_`](<#/doc/utility/format/formattable>) &lt;Context&gt; ou `TD` caso contrário, e
  * `ref` seja uma referência para o argumento de formatação.

Equivalente a: typename Context::template formatter_type&lt;TD&gt; f;
parse_ctx.advance_to(f.parse(parse_ctx));
format_ctx.advance_to(f.format(const_cast<TQ&>(static_cast&lt;const TD&&gt;(ref)), format_ctx));

### Notas

Um `handle` possui semântica de referência para o argumento formatado e não estende sua vida útil. É responsabilidade do programador garantir que o argumento sobreviva ao `handle`. Geralmente, um `handle` é usado apenas dentro de funções de formatação.

### Veja também

[ basic_format_arg](<#/doc/utility/format/basic_format_arg>)(C++20) | class template que fornece acesso a um argumento de formatação para formatadores definidos pelo usuário
(modelo de classe)
[ make_format_argsmake_wformat_args](<#/doc/utility/format/make_format_args>)(C++20)(C++20) | cria um objeto com type-erasure referenciando todos os argumentos de formatação, conversível para `format_args`
(modelo de função)