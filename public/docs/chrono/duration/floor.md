# std::chrono::floor(std::chrono::duration)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
template< class ToDuration, class Rep, class Period >
constexpr ToDuration floor( const std::chrono::duration<Rep, Period>& d );
```

Retorna a maior duração `t` representável em `ToDuration` que é menor ou igual a d.

A função não participa da resolução de sobrecarga a menos que `ToDuration` seja uma especialização de `[std::chrono::duration](<#/doc/chrono/duration>)`.

### Parâmetros

- **d** — duração a ser convertida

### Valor de retorno

d arredondado para baixo para uma duração do tipo `ToDuration`.

### Possível implementação
```cpp
    namespace detail
    {
        template<class> inline constexpr bool is_duration_v = false;
        template<class Rep, class Period> inline constexpr bool is_duration_v<
            std::chrono::duration<Rep, Period>> = true;
    }
    
    template<class To, class Rep, class Period,
             class = std::enable_if_t<detail::is_duration_v<To>>>
    constexpr To floor(const duration<Rep, Period>& d)
    {
        To t = std::chrono::duration_cast<To>(d);
        if (t > d)
            return t - To{1};
        return t;
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

Output:
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
(function template)
[ ceil(std::chrono::duration)](<#/doc/chrono/duration/ceil>)(C++17) | converte uma duração para outra, arredondando para cima
(function template)
[ round(std::chrono::duration)](<#/doc/chrono/duration/round>)(C++17) | converte uma duração para outra, arredondando para o mais próximo, empates para o par
(function template)
[ floor(std::chrono::time_point)](<#/doc/chrono/time_point/floor>)(C++17) | converte um time_point para outro, arredondando para baixo
(function template)
[ floorfloorffloorl](<#/doc/numeric/math/floor>)(C++11)(C++11) | inteiro mais próximo não maior que o valor dado
(function)