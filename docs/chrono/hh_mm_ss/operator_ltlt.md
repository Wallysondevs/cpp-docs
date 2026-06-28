# std::chrono::operator&lt;&lt;(std::chrono::hh_mm_ss)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
template< class CharT, class Traits, class Duration >
std::basic_ostream<CharT, Traits>&
operator<<( std::basic_ostream<CharT, Traits>& os,
const std::chrono::hh_mm_ss<Duration>& t );
```

  
Imprime t no stream os.

Equivalente a return os << [std::format](<#/doc/utility/format/format>)(os.getloc(), STATICALLY_WIDEN&lt;CharT&gt;("{:L%T}"), hms); onde STATICALLY_WIDEN&lt;CharT&gt;("{:L%T}") é "{:L%T}" se `CharT` for char, e L"{:L%T}" se `CharT` for wchar_t.

### Parâmetros

os  |  \-  |  o stream de saída   
---|---|---
t  |  \-  |  a hora do dia a ser impressa   
  
### Valor de retorno

os

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[P2372R3](<https://wg21.link/P2372R3>) | C++20  | o locale fornecido era usado por padrão  | `L` é necessário para usar o locale fornecido   
  
### Veja também

[ format](<#/doc/utility/format/format>)(C++20) |  armazena a representação formatada dos argumentos em uma nova string   
(modelo de função)  
[ std::formatter<std::chrono::hh_mm_ss>](<#/doc/chrono/hh_mm_ss/formatter>)(C++20) |  suporte a formatação para `hh_mm_ss`   
(especialização de modelo de classe)