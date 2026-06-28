# std::chrono::round(std::chrono::duration)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
template< class ToDuration, class Rep, class Period >
constexpr ToDuration round( const std::chrono::duration<Rep, Period>& d );
```

Retorna o valor `t` representável em `ToDuration` que é o mais próximo de d. Se houver dois desses valores, retorna o valor par (ou seja, o valor `t` tal que t % 2 == 0).

A função não participa da resolução de sobrecarga a menos que `ToDuration` seja uma especialização de `[std::chrono::duration](<#/doc/chrono/duration>)` e `[std::chrono::treat_as_floating_point_v](<#/doc/chrono/treat_as_floating_point>)<typename ToDuration::rep>` seja false.

### Parâmetros

- **d** — duração a converter

### Valor de retorno

d arredondado para a duração mais próxima do tipo `ToDuration`, arredondando para o par em casos de empate.

### Possível implementação
```cpp
    namespace detail
    {
        template<class> inline constexpr bool is_duration_v = false;
        template<class Rep, class Period> inline constexpr bool is_duration_v<
            std::chrono::duration<Rep, Period>> = true;
    }
    
    template<class To, class Rep, class Period,
             class = std::enable_if_t<detail::is_duration_v<To> &&
                    !std::chrono::treat_as_floating_point_v<typename To::rep>>>
    constexpr To round(const std::chrono::duration<Rep, Period>& d)
    {
        To t0 = std::chrono::floor<To>(d);
        To t1 = t0 + To{1};
        auto diff0 = d - t0;
        auto diff1 = t1 - d;
        if (diff0 == diff1)
        {
            if (t0.count() & 1)
                return t1;
            return t0;
        }
        else if (diff0 < diff1)
            return t0;
        return t1;
    }
```

---

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iomanip>
    #include <iostream>
    
    int main()
    {
        using namespace std::chrono_literals;
        std::cout << "Duration\tFloor\tRound\tCeil\n";
        for (using Sec = std::chrono::seconds;
            auto const d : {+4999ms, +5000ms, +5001ms, +5499ms, +5500ms, +5999ms,
                            -4999ms, -5000ms, -5001ms, -5499ms, -5500ms, -5999ms})
            std::cout << std::showpos << d << "\t\t"
                      << std::chrono::floor<Sec>(d) << '\t'
                      << std::chrono::round<Sec>(d) << '\t'
                      << std::chrono::ceil <Sec>(d) << '\n';
    }
```

Saída:
```
    Duration	Floor	Round	Ceil
    +4999ms		+4s	+5s	+5s
    +5000ms		+5s	+5s	+5s
    +5001ms		+5s	+5s	+6s
    +5499ms		+5s	+5s	+6s
    +5500ms		+5s	+6s	+6s
    +5999ms		+5s	+6s	+6s
    -4999ms		-5s	-5s	-4s
    -5000ms		-5s	-5s	-5s
    -5001ms		-6s	-5s	-5s
    -5499ms		-6s	-5s	-5s
    -5500ms		-6s	-6s	-5s
    -5999ms		-6s	-6s	-5s
```

### Veja também

[ duration_cast](<#/doc/chrono/duration/duration_cast>)(C++11) | converte uma duração para outra, com um intervalo de tick diferente
(modelo de função)
[ floor(std::chrono::duration)](<#/doc/chrono/duration/floor>)(C++17) | converte uma duração para outra, arredondando para baixo
(modelo de função)
[ ceil(std::chrono::duration)](<#/doc/chrono/duration/ceil>)(C++17) | converte uma duração para outra, arredondando para cima
(modelo de função)
[ round(std::chrono::time_point)](<#/doc/chrono/time_point/round>)(C++17) | converte um time_point para outro, arredondando para o mais próximo, empates para o par
(modelo de função)
[ roundroundfroundllroundlroundflroundlllroundllroundfllroundl](<#/doc/numeric/math/round>)(C++11)(C++11)(C++11)(C++11)(C++11)(C++11)(C++11)(C++11)(C++11) | inteiro mais próximo, arredondando para longe de zero em casos de empate
(função)