# std::basic_format_context

Definido no cabeçalho `[<format>](<#/doc/header/format>)`

```c
template< class OutputIt, class CharT >
class basic_format_context;
using format_context = basic_format_context</* unspecified */, char>;
using wformat_context = basic_format_context</* unspecified */, wchar_t>;
```

Fornece acesso ao estado de formatação, que consiste nos argumentos de formatação e no iterator de saída.

2) O argumento de template não especificado é um iterator de saída que anexa a [std::string](<#/doc/string/basic_string>), como [std::back_insert_iterator](<#/doc/iterator/back_insert_iterator>)<[std::string](<#/doc/string/basic_string>)>. As implementações tipicamente usam um iterator para um tipo de buffer com type-erasure que suporta anexar a qualquer container contíguo e redimensionável.

3) O argumento de template não especificado é um iterator de saída que anexa a [std::wstring](<#/doc/string/basic_string>).

O comportamento é indefinido se `OutputIt` não modelar [std::output_iterator](<#/doc/iterator/output_iterator>)&lt;const CharT&&gt;.

Um programa que declara uma especialização explícita ou parcial de `std::basic_format_context` é malformado, sem diagnóstico requerido.

Objetos `std::basic_format_context` só podem ser criados pela implementação. Códigos de usuário só podem modificar o contexto de formatação através da função `format` de especializações de [std::formatter](<#/doc/utility/format/formatter>).

### Tipos de membros

Type | Definition
---|---
`iterator` | `OutputIt`
`char_type` | `CharT`

### Alias de template de membros

Type | Definition
---|---
formatter_type&lt;T&gt; | [std::formatter](<#/doc/utility/format/formatter>)<T, CharT>

### Funções membro

(construtor)[deletado] | `basic_format_context` não pode ser construído por código de usuário
(função membro pública)
operator=[deletado] | `basic_format_context` não é atribuível
(função membro pública)
arg | retorna o argumento no índice fornecido
(função membro pública)
locale | retorna a locale usada para formatação específica da locale
(função membro pública)
out | retorna o iterator para o buffer de saída
(função membro pública)
advance_to | avança o iterator de saída para a posição fornecida
(função membro pública)

## std::basic_format_context::arg

[std::basic_format_arg](<#/doc/utility/format/basic_format_arg>)<basic_format_context> arg( [std::size_t](<#/doc/types/size_t>) id ) const;

Retorna um `std::basic_format_arg` contendo o `id`-ésimo argumento em `args`, onde `args` é o parameter pack ou objeto `std::basic_format_args` passado para a função de formatação.

Se `id` não for menor que o número de argumentos de formatação, retorna um `std::basic_format_arg` construído por padrão (contendo um objeto [std::monostate](<#/doc/utility/variant/monostate>)).

## std::basic_format_context::locale

[std::locale](<#/doc/locale/locale>) locale();

Retorna a locale passada para a função de formatação, ou uma [std::locale](<#/doc/locale/locale>) construída por padrão se a função de formatação não aceitar uma locale.

## std::basic_format_context::out

iterator out();

Retorna o iterator para o buffer de saída. O resultado é move-construído a partir do iterator armazenado.

## std::basic_format_context::advance_to

void advance_to( iterator it );

Move atribui `it` ao iterator de saída armazenado. Após uma chamada a `advance_to`, a próxima chamada a `out()` retornará um iterator com o valor que `it` tinha antes da atribuição.

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3567](<https://cplusplus.github.io/LWG/issue3567>) | C++20 | `basic_format_context` não funciona com tipos de iterator move-only | feito para mover iterators
[LWG 3975](<https://cplusplus.github.io/LWG/issue3975>) | C++20 | especialização de usuário de `basic_format_context` era permitida | desautorizada
[LWG 4061](<https://cplusplus.github.io/LWG/issue4061>) | C++20 | `basic_format_context` era construível e atribuível por código de usuário | feito para não ser nem construível nem atribuível