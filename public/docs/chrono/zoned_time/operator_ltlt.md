# std::chrono::operator&lt;&lt;(std::chrono::zoned_time)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
template< class CharT, class Traits, class Duration, class TimeZonePtr >
std::basic_ostream<CharT, Traits>&
operator<<( std::basic_ostream<CharT, Traits>& os,
const std::chrono::zoned_time<Duration, TimeZonePtr>& tp );
```

Envia tp para o stream os, como se por [std::format](<#/doc/utility/format/format>)(os.getloc(), fmt, tp), onde `fmt` é "{:L%F %T %Z}" se `CharT` for char, ou L"{:L%F %T %Z}" se `CharT` for wchar_t.

### Parâmetros

os | \- | stream de saída
---|---|---
tp | \- | `zoned_time` a ser enviado

### Valor de retorno

os

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[P2372R3](<https://wg21.link/P2372R3>) | C++20 | o locale fornecido era usado por padrão | `L` é necessário para usar o locale fornecido

### Veja também

[ std::formatter<std::chrono::zoned_time>](<#/doc/chrono/zoned_time/formatter>)(C++20) | suporte a formatação para `zoned_time`
(especialização de template de classe)