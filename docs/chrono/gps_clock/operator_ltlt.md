# std::chrono::operator&lt;&lt;(std::chrono::gps_time)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
template< class CharT, class Traits, class Duration >
std::basic_ostream<CharT, Traits>&
operator<<( std::basic_ostream<CharT, Traits>& os,
const std::chrono::gps_time<Duration>& tp );
```

Imprime `tp` no stream `os`, como se por `os << [std::format](<#/doc/utility/format/format>)(os.getloc(), STATICALLY-WIDEN("{:L%F %T}"), tp)`, onde `STATICALLY_WIDEN<CharT>("{:L%F %T}")` é `"{:L%F %T}"` se `CharT` for `char`, e `L"{:L%F %T}"` se `CharT` for `wchar_t`.

### Valor de retorno

`os`

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[P2372R3](<https://wg21.link/P2372R3>) | C++20 | o locale fornecido era usado por padrão | `L` é necessário para usar o locale fornecido

### Ver também

[ std::formatter<std::chrono::gps_time>](<#/doc/chrono/gps_clock/formatter>)(C++20) | suporte de formatação para `gps_time`
(especialização de modelo de classe)
[ format](<#/doc/utility/format/format>)(C++20) | armazena a representação formatada dos argumentos em uma nova string
(modelo de função)