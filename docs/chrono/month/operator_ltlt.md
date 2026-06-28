# std::chrono::operator&lt;&lt;(std::chrono::month)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
template< class CharT, class Traits >
std::basic_ostream<CharT, Traits>&
operator<<( std::basic_ostream<CharT, Traits>& os, const std::chrono::month& m );
```

Se !m.ok(), insere unsigned(m) seguido por " is not a valid month" em os. Caso contrário, forma uma [std::basic_string](<#/doc/string/basic_string>)&lt;CharT&gt; s consistindo no nome abreviado do mês para o mês representado por m, determinado usando a locale associada a os, e insere s em os.

Equivalente a

return os << (m.ok() ?
[std::format](<#/doc/utility/format/format>)(os.getloc(), STATICALLY_WIDEN&lt;CharT&gt;("{:L%b}"), m) :
[std::format](<#/doc/utility/format/format>)(os.getloc(), STATICALLY_WIDEN&lt;CharT&gt;("{} is not a valid month"), unsigned(m)));

onde STATICALLY_WIDEN&lt;CharT&gt;("...") é "..." se `CharT` for char, e L"..." se `CharT` for wchar_t.

### Valor de retorno

os

### Observações

Este operator<< é principalmente destinado ao uso em depuração. Para controle sobre a formatação, use [std::format](<#/doc/utility/format/format>).

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[P2372R3](<https://wg21.link/P2372R3>) | C++20 | a locale fornecida era usada por padrão | `L` é necessário para usar a locale fornecida

### Veja também

[ format](<#/doc/utility/format/format>)(C++20) | armazena a representação formatada dos argumentos em uma nova string
(modelo de função)
[ std::formatter<std::chrono::month>](<#/doc/chrono/month/formatter>)(C++20) | suporte de formatação para `month`
(especialização de modelo de classe)