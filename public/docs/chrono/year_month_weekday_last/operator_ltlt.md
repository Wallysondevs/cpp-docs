# std::chrono::operator&lt;&lt;(std::chrono::year_month_weekday_last)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
template< class CharT, class Traits >
std::basic_ostream<CharT, Traits>&
operator<<( std::basic_ostream<CharT, Traits>& os,
const std::chrono::year_month_weekday_last& ymwdl );
```

Gera uma representação textual de `ymwdl` em `os`, como se por

```cpp
os << std::format(os.getloc(), STATICALLY_WIDEN<CharT>("{}/{:L}/{:L}"),
ymwdl.year(), ymwdl.month(), ymwdl.weekday_last());
```

onde `STATICALLY_WIDEN<CharT>("{}/{:L}/{:L}")` é `"{}/{:L}/{:L}"` se `CharT` for `char`, e `L"..."` se `CharT` for `wchar_t`.

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