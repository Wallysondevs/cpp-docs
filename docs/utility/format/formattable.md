# std::formattable

Definido no cabeçalho `[<format>](<#/doc/header/format>)`

```c
template< class T, class CharT >
concept formattable = /* formattable_with */<
std::remove_reference_t<T>,
std::basic_format_context</* fmt_iter_for */<CharT>, CharT>
>;
Templates auxiliares
template< class CharT >
using /* fmt_iter_for */ = /* unspecified */;
template< class T, class Context,
class Formatter =
typename Context::template
formatter_type<std::remove_const_t<T>> >
concept /* formattable_with */ =
std::semiregular<Formatter> &&
requires (Formatter& f, const Formatter& cf, T&& t, Context fc,
std::basic_format_parse_context<
typename Context::char_type
> pc) {
{ f.parse(pc) } -> std::same_as<typename decltype(pc)::iterator>;
{ cf.format(t, fc) } -> std::same_as<typename Context::iterator>;
};
```

O concept `formattable` especifica que [std::formatter](<#/doc/utility/format/formatter>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;T&gt;, CharT> atende aos requisitos de [BasicFormatter](<#/doc/named_req/BasicFormatter>) e [Formatter](<#/doc/named_req/Formatter>) (se [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;T&gt; for qualificado como `const`).

O alias template apenas para exposição `/* fmt_iter_for */` produz um tipo não especificado que satisfaz [std::output_iterator](<#/doc/iterator/output_iterator>)&lt;const CharT&&gt;.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3925](<https://cplusplus.github.io/LWG/issue3925>) | C++23 | o segundo argumento de template de [std::basic_format_context](<#/doc/utility/format/basic_format_context>) não foi fornecido | fornecido

### Ver também

[ formatter](<#/doc/utility/format/formatter>)(C++20) | define regras de formatação para um dado tipo
(template de classe)
[BasicFormatter](<#/doc/named_req/BasicFormatter>)(C++20) | abstrai operações de formatação para um dado tipo de argumento de formatação e tipo de caractere
(requisito nomeado)
[Formatter](<#/doc/named_req/Formatter>)(C++20) | define funções usadas pela [biblioteca de formatação](<#/doc/utility/format>)
(requisito nomeado)