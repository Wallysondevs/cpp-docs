# std::chrono::time_point

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
template<
class Clock,
class Duration = typename Clock::duration
> class time_point;
```

O template de classe `std::chrono::time_point` representa um ponto no tempo. Ele é implementado como se armazenasse um valor do tipo `Duration` indicando o intervalo de tempo desde o início da época do `Clock`.

`Clock` deve atender aos requisitos para [Clock](<#/doc/named_req/Clock>) ou ser `std::chrono::local_t` (desde C++20). | (ate C++23)

### Tipos Membro

Tipo Membro | Definição
---|---
`clock` | `Clock`, o relógio no qual este ponto no tempo é medido
`duration` | `Duration`, um tipo [std::chrono::duration](<#/doc/chrono/duration>) usado para medir o tempo desde a época
`rep` | `Rep`, um tipo aritmético representando o número de "ticks" da duração
`period` | `Period`, um tipo [std::ratio](<#/doc/numeric/ratio/ratio>) representando o período de "tick" da duração

### Funções Membro

[ (construtor)](<#/doc/chrono/time_point/time_point>) | constrói um novo ponto no tempo
(função membro pública)
[ time_since_epoch](<#/doc/chrono/time_point/time_since_epoch>) | retorna o ponto no tempo como duração desde o início do seu relógio
(função membro pública)
[ operator+=operator-=](<#/doc/chrono/time_point/operator_arith>) | modifica o ponto no tempo pela duração fornecida
(função membro pública)
[ operator++operator++(int)operator--operator--(int)](<#/doc/chrono/time_point/operator_inc_dec>)(C++20) | incrementa ou decrementa a duração
(função membro pública)
[ min](<#/doc/chrono/time_point/min>)[static] | retorna o ponto no tempo correspondente à menor duração
(função membro estática pública)
[ max](<#/doc/chrono/time_point/max>)[static] | retorna o ponto no tempo correspondente à maior duração
(função membro estática pública)

### Funções Não-Membro

[ operator+operator-](<#/doc/chrono/time_point/operator_arith2>)(C++11) | realiza operações de adição e subtração envolvendo um ponto no tempo
(template de função)
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/chrono/time_point/operator_cmp>)(C++11)(C++11)(removido em C++20)(C++11)(C++11)(C++11)(C++11)(C++20) | compara dois pontos no tempo
(template de função)
[ time_point_cast](<#/doc/chrono/time_point/time_point_cast>)(C++11) | converte um ponto no tempo para outro ponto no tempo no mesmo relógio, com uma duração diferente
(template de função)
[ floor(std::chrono::time_point)](<#/doc/chrono/time_point/floor>)(C++17) | converte um time_point para outro, arredondando para baixo
(template de função)
[ ceil(std::chrono::time_point)](<#/doc/chrono/time_point/ceil>)(C++17) | converte um time_point para outro, arredondando para cima
(template de função)
[ round(std::chrono::time_point)](<#/doc/chrono/time_point/round>)(C++17) | converte um time_point para outro, arredondando para o mais próximo, empates para o par
(template de função)

### Classes Auxiliares

[ std::common_type<std::chrono::time_point>](<#/doc/chrono/time_point/common_type>)(C++11) | especializa a trait [std::common_type](<#/doc/types/common_type>)
(especialização de template de classe)
[ std::hash<std::chrono::time_point>](<#/doc/chrono/time_point/hash>)(C++26) | suporte a hash para `std::chrono::time_point`
(especialização de template de classe)

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <chrono>
    #include <ctime>
    #include <iomanip>
    #include <iostream>
    
    void slow_motion()
    {
        static int a[]{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12};
        // Generate Γ(13) == 12! permutations:
        while (std::ranges::next_permutation(a).found) {}
    }
    
    int main()
    {
        using namespace std::literals; // enables literal suffixes, e.g. 24h, 1ms, 1s.
    
        const std::chrono::time_point<std::chrono::system_clock> now =
            std::chrono::system_clock::now();
    
        const std::time_t t_c = std::chrono::system_clock::to_time_t(now - 24h);
        std::cout << "24 hours ago, the time was "
                  << std::put_time(std::localtime(&t_c), "%F %T.\n") << std::flush;
    
        const std::chrono::time_point<std::chrono::steady_clock> start =
            std::chrono::steady_clock::now();
    
        std::cout << "Different clocks are not comparable: \n"
                     "  System time: " << now.time_since_epoch() << "\n"
                     "  Steady time: " << start.time_since_epoch() << '\n';
    
        slow_motion();
    
        const auto end = std::chrono::steady_clock::now();
        std::cout
            << "Slow calculations took "
            << std::chrono::duration_cast<std::chrono::microseconds>(end - start) << " ≈ "
            << (end - start) / 1ms << "ms ≈ " // almost equivalent form of the above, but
            << (end - start) / 1s << "s.\n";  // using milliseconds and seconds accordingly
    }
```

Saída possível:
```
    24 hours ago, the time was 2021-02-15 18:28:52.
    Different clocks are not comparable:
      System time: 1666497022681282572ns
      Steady time: 413668317434475ns
    Slow calculations took 2090448µs ≈ 2090ms ≈ 2s.
```

### Veja também

[ duration](<#/doc/chrono/duration>)(C++11) | um intervalo de tempo
(template de classe)
[ year_month_day](<#/doc/chrono/year_month_day>)(C++20) | representa um [`year`](<#/doc/chrono/year>), [`month`](<#/doc/chrono/month>) e [`day`](<#/doc/chrono/day>) específicos
(classe)