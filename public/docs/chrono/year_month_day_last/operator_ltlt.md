# std::chrono::operator&lt;&lt;(std::chrono::year_month_day_last)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
template< class CharT, class Traits >
std::basic_ostream<CharT, Traits>&
operator<<( std::basic_ostream<CharT, Traits>& os,
const std::chrono::year_month_day_last& ymdl );
```

  
Imprime uma representação textual de ymdl em os, como se por 

os << [std::format](<#/doc/utility/format/format>)(os.getloc(), STATICALLY_WIDEN&lt;CharT&gt;("{}/{:L}"),  
ymdl.year(), ymdl.month_day_last());

onde STATICALLY_WIDEN&lt;CharT&gt;("{}/{:L}") é "{}/{:L}" se `CharT` for char, e L"{}/{:L}" se `CharT` for wchar_t. 

### Valor de retorno

os

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento como publicado  | Comportamento correto   
---|---|---|---
[P2372R3](<https://wg21.link/P2372R3>) | C++20  | o locale fornecido era usado por padrão  | `L` é necessário para usar o locale fornecido   
  
### Ver também

[ format](<#/doc/utility/format/format>)(C++20) | armazena a representação formatada dos argumentos em uma nova string   
(function template)  
[ std::formatter<std::chrono::year_month_day>](<#/doc/chrono/year_month_day/formatter>)(C++20) | suporte de formatação para `year_month_day`   
(class template specialization)