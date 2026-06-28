# std::chrono::operator&lt;&lt;(std::chrono::weekday)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
template< class CharT, class Traits >
std::basic_ostream<CharT, Traits>&
operator<<( std::basic_ostream<CharT, Traits>& os, const std::chrono::weekday& wd );
```

Se !wd.ok(), insere wd.c_encoding() seguido por " is not a valid weekday" em os. Caso contrário, forma uma [std::basic_string](<#/doc/string/basic_string>)&lt;CharT&gt; s consistindo do nome abreviado do dia da semana para o dia da semana representado por wd, determinado usando a locale associada a os, e insere s em os.

Equivalente a

return os << (wd.ok() ?
[std::format](<#/doc/utility/format/format>)(os.getloc(), STATICALLY_WIDEN&lt;CharT&gt;("{:L%a}"), wd) :
[std::format](<#/doc/utility/format/format>)(os.getloc(), STATICALLY_WIDEN&lt;CharT&gt;("{} is not a valid weekday"),
wd.c_encoding()));

onde STATICALLY_WIDEN&lt;CharT&gt;("...") é "..." se `CharT` for char, e L"..." se `CharT` for wchar_t.

### Valor de retorno

os

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[P2372R3](<https://wg21.link/P2372R3>) | C++20 | a locale fornecida era usada por padrão | `L` é necessário para usar a locale fornecida

### Ver também

[ format](<#/doc/utility/format/format>)(C++20) | armazena a representação formatada dos argumentos em uma nova string
(function template)
[ std::formatter<std::chrono::weekday>](<#/doc/chrono/weekday/formatter>)(C++20) | suporte de formatação para `weekday`
(class template specialization)