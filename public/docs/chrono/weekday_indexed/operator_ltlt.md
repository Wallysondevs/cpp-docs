# std::chrono::operator&lt;&lt;(std::chrono::weekday_indexed)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
template< class CharT, class Traits >
std::basic_ostream<CharT, Traits>&
operator<<( std::basic_ostream<CharT, Traits>& os,
const std::chrono::weekday_indexed& wdi );
```

Gera uma representação textual de `wdi` no stream `os`, como se por:

```cpp
if (wdi.index() >=1 && wdi.index() <= 5)
os << std::format(os.getloc(), STATICALLY_WIDEN<CharT>("{:L}[{}]"),
wdi.weekday(), wdi.index());
else
os << std::format(os.getloc(), STATICALLY_WIDEN<CharT>("{:L}[{} is not a valid index]"),
wdi.weekday(), wdi.index());
```

onde `STATICALLY_WIDEN<CharT>("...")` é `"..."` se `CharT` é `char`, e `L"..."` se `CharT` é `wchar_t`.

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
[ std::formatter<std::chrono::weekday>](<#/doc/chrono/weekday/formatter>)(C++20) | suporte de formatação para `weekday`
(especialização de modelo de classe)