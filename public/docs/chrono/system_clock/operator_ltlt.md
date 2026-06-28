# std::chrono::operator&lt;&lt;(std::chrono::sys_time)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
template< class CharT, class Traits, class Duration >
std::basic_ostream<CharT, Traits>&
operator<<( std::basic_ostream<CharT, Traits>& os,
const std::chrono::sys_time<Duration>& tp );
template< class CharT, class Traits, class Duration >
std::basic_ostream<CharT, Traits>&
operator<<( std::basic_ostream<CharT, Traits>& os,
const std::chrono::sys_days& tp );
```

Imprime tp no stream os.

1) Equivalente a:
```cpp
    return os << std::format(os.getloc(), STATICALLY-WIDEN<CharT>("{:L%F %T}"), tp);
```

onde STATICALLY_WIDEN&lt;CharT&gt;("{:L%F %T}") é "{:L%F %T}" se `CharT` for char, e L"{:L%F %T}" se `CharT` for wchar_t.

Esta sobrecarga participa da resolução de sobrecarga somente se [std::chrono::treat_as_floating_point_v](<#/doc/chrono/treat_as_floating_point>)&lt;typename Duration::rep&gt; for false e Duration(1) < [std::chrono::days](<#/doc/chrono/duration>)(1).

2) Equivalente a os << [std::chrono::year_month_day](<#/doc/chrono/year_month_day>)(tp);.

### Valor de retorno

os

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[P2372R3](<https://wg21.link/P2372R3>) | C++20 | o locale fornecido era usado por padrão | `L` é necessário para usar o locale fornecido

### Veja também

[ std::formatter<std::chrono::sys_time>](<#/doc/chrono/system_clock/formatter>)(C++20) | suporte de formatação para `sys_time`
(especialização de template de classe)
[ format](<#/doc/utility/format/format>)(C++20) | armazena a representação formatada dos argumentos em uma nova string
(template de função)
[ operator<<](<#/doc/chrono/year_month_day/operator_ltlt>)(C++20) | imprime um `year_month_day` em um stream
(template de função)