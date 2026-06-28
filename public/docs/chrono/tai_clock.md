# std::chrono::tai_clock

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
class tai_clock;
```

  
O clock `std::chrono::tai_clock` é um [Clock](<#/doc/named_req/Clock>) que representa o [Tempo Atômico Internacional](<https://en.wikipedia.org/wiki/International_Atomic_Time> "enwiki:International Atomic Time") (TAI). Ele mede o tempo desde 00:00:00, 1º de janeiro de 1958, e está 10 segundos adiantado em relação ao UTC nessa data (ou seja, sua época, 1958-01-01 00:00:00 TAI, é 1957-12-31 23:59:50 UTC). 

Segundos bissextos não são inseridos no TAI. Assim, toda vez que um segundo bissexto é inserido no UTC, o UTC fica mais um segundo atrasado em relação ao TAI. Em dezembro de 2017, o UTC estava 37 segundos atrasado em relação ao TAI, refletindo o deslocamento inicial de 10 segundos e os 27 segundos bissextos inseridos entre 1958 e 2017. Assim, 2018-01-01 00:00:00 UTC é equivalente a 2018-01-01 00:00:37 TAI. 

`tai_clock` atende aos requisitos de [Clock](<#/doc/named_req/Clock>). Ele não atende aos requisitos de [TrivialClock](<#/doc/named_req/TrivialClock>) a menos que a implementação possa garantir que [`now()`](<#/doc/chrono/tai_clock/now>) não lance uma exceção. 

### Família de time_point 

Definido no namespace `std::chrono`

```cpp
template<class Duration>
using tai_time = std::chrono::time_point<std::chrono::tai_clock, Duration>;  // (desde C++20)
using tai_seconds = tai_time<std::chrono::seconds>;  // (desde C++20)
```

[ operator<<(std::chrono::tai_time)](<#/doc/chrono/tai_clock/operator_ltlt>)(C++20) |  realiza a saída de stream em um `tai_time`   
(modelo de função)  
[ from_stream(std::chrono::tai_time)](<#/doc/chrono/tai_clock/from_stream>)(C++20) |  analisa um `tai_time` de um stream de acordo com o formato fornecido   
(modelo de função)  
[ std::formatter<std::chrono::tai_time>](<#/doc/chrono/tai_clock/formatter>)(C++20) |  suporte a formatação para `tai_time`   
(especialização de modelo de classe)  
  
### Tipos de membros 

Tipo de membro  |  Definição   
---|---
`rep` |  tipo aritmético com sinal que representa o número de ticks na duração do clock   
`period` |  um tipo [std::ratio](<#/doc/numeric/ratio/ratio>) que representa o período de tick do clock, em segundos   
`duration` |  [std::chrono::duration](<#/doc/chrono/duration>)<rep, period>, capaz de representar durações negativas   
`time_point` |  [std::chrono::time_point](<#/doc/chrono/time_point>)<std::chrono::tai_clock>  
  
### Constantes de membros 

constexpr bool is_steady[static] |  true se o tempo entre os ticks for sempre constante, ou seja, chamadas para [`now()`](<#/doc/chrono/tai_clock/now>) retornam valores que aumentam monotonicamente mesmo em caso de algum ajuste de clock externo, caso contrário false   
(constante de membro estática pública)  
  
### Funções de membros 

[ now](<#/doc/chrono/tai_clock/now>)[static] |  retorna um [std::chrono::time_point](<#/doc/chrono/time_point>) representando o ponto atual no tempo   
(função de membro estática pública)  
[ to_utc](<#/doc/chrono/tai_clock/to_utc>)[static] |  converte `tai_time` para `utc_time`   
(função de membro estática pública)  
[ from_utc](<#/doc/chrono/tai_clock/from_utc>)[static] |  converte `utc_time` para `tai_time`   
(função de membro estática pública)