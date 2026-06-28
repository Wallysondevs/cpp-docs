# std::chrono::utc_clock

Definido no header `[<chrono>](<#/doc/header/chrono>)`

```cpp
class utc_clock;  // (desde C++20)
```

  
O clock `std::chrono::utc_clock` é um [Clock](<#/doc/named_req/Clock>) que representa o [Tempo Universal Coordenado](<https://en.wikipedia.org/wiki/Coordinated_Universal_Time> "enwiki:Coordinated Universal Time") (UTC). Ele mede o tempo desde 00:00:00 UTC, quinta-feira, 1 de janeiro de 1970, incluindo segundos bissextos. 

`utc_clock` atende aos requisitos de [Clock](<#/doc/named_req/Clock>). Ele não atende aos requisitos de [TrivialClock](<#/doc/named_req/TrivialClock>) a menos que a implementação possa garantir que [`now()`](<#/doc/chrono/utc_clock/now>) não lance uma exceção. 

### Família de time_point 

Definido no namespace `std::chrono`

```cpp
template<class Duration>
using utc_time = std::chrono::time_point<std::chrono::utc_clock, Duration>;  // (desde C++20)
using utc_seconds = utc_time<std::chrono::seconds>;  // (desde C++20)
```

[ operator<<(std::chrono::utc_time)](<#/doc/chrono/utc_clock/operator_ltlt>)(C++20) |  realiza a saída de stream em um `utc_time`   
(modelo de função)  
[ from_stream(std::chrono::utc_time)](<#/doc/chrono/utc_clock/from_stream>)(C++20) |  analisa um `utc_time` de um stream de acordo com o formato fornecido   
(modelo de função)  
[ std::formatter<std::chrono::utc_time>](<#/doc/chrono/utc_clock/formatter>)(C++20) |  suporte de formatação para `utc_time`   
(especialização de modelo de classe)  
  
### Tipos de membro

Tipo de membro  |  Definição   
---|---
`rep` |  tipo aritmético assinado representando o número de ticks na duração do clock   
`period` |  um tipo [std::ratio](<#/doc/numeric/ratio/ratio>) representando o período de tick do clock, em segundos   
`duration` |  [std::chrono::duration](<#/doc/chrono/duration>)<rep, period>, capaz de representar durações negativas   
`time_point` |  [std::chrono::time_point](<#/doc/chrono/time_point>)<std::chrono::utc_clock>  
  
### Constantes de membro

constexpr bool is_steady[static] |  verdadeiro se o tempo entre os ticks for sempre constante, ou seja, chamadas a [`now()`](<#/doc/chrono/utc_clock/now>) retornam valores que aumentam monotonicamente mesmo em caso de algum ajuste externo do clock, caso contrário falso   
(constante de membro estática pública)  
  
### Funções de membro

[ now](<#/doc/chrono/utc_clock/now>)[static] |  retorna um [std::chrono::time_point](<#/doc/chrono/time_point>) representando o ponto atual no tempo   
(função de membro estática pública)  
[ to_sys](<#/doc/chrono/utc_clock/to_sys>)[static] |  converte `utc_time` para `sys_time`   
(função de membro estática pública)  
[ from_sys](<#/doc/chrono/utc_clock/from_sys>)[static] |  converte `sys_time` para `utc_time`   
(função de membro estática pública)  
  
### Funções não-membro

[ get_leap_second_info](<#/doc/chrono/utc_clock/get_leap_second_info>)(C++20) |  obtém informações de inserção de segundo bissexto de um objeto `utc_time`   
(modelo de função)  
  
### Classes auxiliares

[ leap_second_info](<#/doc/chrono/utc_clock/leap_second_info>)(C++20) |  informações de inserção de segundo bissexto   
(classe)  
  
### Notas

A época UTC oficial é 1 de janeiro de 1972. `utc_clock` usa 1 de janeiro de 1970 em vez disso para ser consistente com [std::chrono::system_clock](<#/doc/chrono/system_clock>). 