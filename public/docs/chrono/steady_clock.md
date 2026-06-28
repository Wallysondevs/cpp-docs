# std::chrono::steady_clock

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
class steady_clock;
```

A classe `std::chrono::steady_clock` representa um relógio monotônico. Os pontos no tempo deste relógio não podem diminuir à medida que o tempo físico avança e o tempo entre os ticks deste relógio é constante. Este relógio não está relacionado ao tempo de relógio de parede (por exemplo, pode ser o tempo desde a última reinicialização) e é mais adequado para medir intervalos.

`std::chrono::steady_clock` atende aos requisitos de [TrivialClock](<#/doc/named_req/TrivialClock>).

### Tipos Membro

Tipo Membro | Definição
---|---
`rep` | tipo aritmético representando o número de ticks na duração do relógio
`period` | um tipo [std::ratio](<#/doc/numeric/ratio/ratio>) representando o período de tick do relógio, em segundos
`duration` | [std::chrono::duration](<#/doc/chrono/duration>)<rep, period>
`time_point` | [std::chrono::time_point](<#/doc/chrono/time_point>)<std::chrono::steady_clock>

### Constantes Membro

constexpr bool is_steady[static] | flag de relógio steady, sempre true
(constante membro estática pública)

### Funções Membro

[ now](<#/doc/chrono/steady_clock/now>)[static] | retorna um time_point representando o valor atual do relógio
(função membro estática pública)

### Veja também

[ system_clock](<#/doc/chrono/system_clock>)(C++11) | tempo de relógio de parede do relógio de tempo real de todo o sistema
(classe)
[ high_resolution_clock](<#/doc/chrono/high_resolution_clock>)(C++11) | o relógio com o menor período de tick disponível
(classe)