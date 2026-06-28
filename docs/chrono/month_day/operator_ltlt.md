# std::chrono::operator&lt;&lt;(std::chrono::month_day)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
template< class CharT, class Traits >
std::basic_ostream<CharT, Traits>&
operator<<( std::basic_ostream<CharT, Traits>& os, const std::chrono::month_day& md );
```

  
Gera uma representação textual de md no stream os, como se por 

os << [std::format](<#/doc/utility/format/format>)(os.getloc(), STATICALLY_WIDEN&lt;CharT&gt;("{:L}/{}"), md.month(), md.day())

onde STATICALLY_WIDEN&lt;CharT&gt;("{:L}/{}") é "{:L}/{}" se `CharT` for char, e L"{:L}/{}" se `CharT` for wchar_t. 

### Valor de retorno

os

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento como publicado  | Comportamento correto   
---|---|---|---
[P2372R3](<https://wg21.link/P2372R3>) | C++20  | o locale fornecido era usado por padrão  | `L` é necessário para usar o locale fornecido   
  
### Veja também

[ format](<#/doc/utility/format/format>)(C++20) |  armazena a representação formatada dos argumentos em uma nova string   
(modelo de função)  
[ std::formatter<std::chrono::month_day>](<#/doc/chrono/month_day/formatter>)(C++20) |  suporte a formatação para `month_day`   
(especialização de modelo de classe)