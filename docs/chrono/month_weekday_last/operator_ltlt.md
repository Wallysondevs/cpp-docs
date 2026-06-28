# std::chrono::operator&lt;&lt;(std::chrono::month_weekday_last)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
template< class CharT, class Traits >
std::basic_ostream<CharT, Traits>&
operator<<( std::basic_ostream<CharT, Traits>& os,
const std::chrono::month_weekday_last& mwdl );
```

Gera uma representação textual de `mwdl` em `os`, como se por

os << [std::format](<#/doc/utility/format/format>)(os.getloc(), STATICALLY_WIDEN&lt;CharT&gt;("{:L}/{:L}"),
mwdl.month(), mwdl.weekday_last());

onde STATICALLY_WIDEN&lt;CharT&gt;("{:L}/{:L}") é "{:L}/{:L}" se `CharT` for `char`, e L"{:L}/{:L}" se `CharT` for `wchar_t`.

### Valor de retorno

os

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[P2372R3](<https://wg21.link/P2372R3>) | C++20 | o locale fornecido era usado por padrão | `L` é necessário para usar o locale fornecido

### Ver também

[ format](<#/doc/utility/format/format>)(C++20) | armazena a representação formatada dos argumentos em uma nova string
(modelo de função)
[ std::formatter<std::chrono::month>](<#/doc/chrono/month/formatter>)(C++20) | suporte de formatação para `month`
(especialização de modelo de classe)