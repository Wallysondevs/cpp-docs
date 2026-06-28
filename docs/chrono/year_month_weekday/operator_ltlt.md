# std::chrono::operator&lt;&lt;(std::chrono::year_month_weekday)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
template< class CharT, class Traits >
std::basic_ostream<CharT, Traits>&
operator<<( std::basic_ostream<CharT, Traits>& os,
const std::chrono::year_month_weekday& ymwd );
```

Gera uma representação textual de `ymwd` em `os`, como se por

os << [std::format](<#/doc/utility/format/format>)(os.getloc(), STATICALLY_WIDEN&lt;CharT&gt;("{}/{:L}/{:L}"),
ymwd.year(), ymwd.month(), ymwd.weekday_indexed());

onde `STATICALLY_WIDEN<CharT>("{}/{:L}/{:L}")` é `"{}/{:L}/{:L}"` se `CharT` for `char`, e `L"{}/{:L}/{:L}"` se `CharT` for `wchar_t`.

### Valor de retorno

`os`

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[P2372R3](<https://wg21.link/P2372R3>) | C++20 | o locale fornecido era usado por padrão | `L` é necessário para usar o locale fornecido

### Veja também

[ format](<#/doc/utility/format/format>)(C++20) | armazena a representação formatada dos argumentos em uma nova string
(modelo de função)
[ std::formatter<std::chrono::year_month_day>](<#/doc/chrono/year_month_day/formatter>)(C++20) | suporte de formatação para `year_month_day`
(especialização de modelo de classe)