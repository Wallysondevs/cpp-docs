# std::chrono::operator&lt;&lt;(std::chrono::year_month_day)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
template< class CharT, class Traits >
std::basic_ostream<CharT, Traits>&
operator<<( std::basic_ostream<CharT, Traits>& os,
const std::chrono::year_month_day& ymd );
```

Gera uma representação textual de `ymd` no stream `os`. Isso primeiro forma uma `[std::basic_string](<#/doc/string/basic_string>)<CharT> s` consistindo em uma representação textual da data no formato `yyyy-mm-dd` (o mesmo que o gerado por [`formatter`](<#/doc/chrono/year_month_day/formatter>) com o especificador %F). Então, se `!ymd.ok()`, anexa " is not a valid date" a `s`. Insere `s` em `os`.

Equivalente a

```cpp
return os << (ymd.ok() ?
std::format(STATICALLY_WIDEN<CharT>("{:%F}"), ymd) :
std::format(STATICALLY_WIDEN<CharT>("{:%F} is not a valid date"), ymd));
```

onde `STATICALLY_WIDEN<CharT>("...")` é "..." se `CharT` é `char`, e `L"..."` se `CharT` é `wchar_t`.

### Valor de retorno

`os`

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ format](<#/doc/utility/format/format>)(C++20) | armazena a representação formatada dos argumentos em uma nova string
(modelo de função)
[ std::formatter<std::chrono::year_month_day>](<#/doc/chrono/year_month_day/formatter>)(C++20) | suporte de formatação para `year_month_day`
(especialização de modelo de classe)