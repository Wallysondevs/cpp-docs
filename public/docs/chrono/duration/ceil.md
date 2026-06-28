# std::chrono::ceil(std::chrono::duration)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
template< class ToDuration, class Rep, class Period >
constexpr ToDuration ceil( const std::chrono::duration<Rep, Period>& d );
```

  
Retorna a menor duration `t` representável em `ToDuration` que é maior ou igual a d.

A função não participa da resolução de sobrecarga a menos que `ToDuration` seja uma especialização de [std::chrono::duration](<#/doc/chrono/duration>).

### Parâmetros

d  |  \-  |  duration a ser convertida   
  
### Valor de retorno

`d` arredondada para cima para uma duration do tipo `ToDuration`.

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
    constexpr To ceil(const std::chrono::duration<Rep, Period>& d)
    {
        To t = std::chrono::duration_cast<To>(d);
        if (t < d)
            return t + To{1};
        return t;
    }
```
  
---  
  
### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
     
    int main()
    {
        using namespace std::chrono_literals;
        using Min = std::chrono::minutes;
     
        std::cout
            << std::showpos
            << "ceil(+2.4min) = " << std::chrono::ceil<Min>(+2.4min).count() << "min\n"
            << "ceil(-2.4min) = " << std::chrono::ceil<Min>(-2.4min).count() << "min\n"
            << "ceil(+0.0min) = " << std::chrono::ceil<Min>(+0.0min).count() << "min\n";
    }
```

Saída: 
```
    ceil(+2.4min) = +3min
    ceil(-2.4min) = -2min
    ceil(+0.0min) = +0min
```

### Veja também

[ duration_cast](<#/doc/chrono/duration/duration_cast>)(desde C++11) |  converte uma duration para outra, com um intervalo de tick diferente   
(function template)  
[ floor(std::chrono::duration)](<#/doc/chrono/duration/floor>)(desde C++17) |  converte uma duration para outra, arredondando para baixo   
(function template)  
[ round(std::chrono::duration)](<#/doc/chrono/duration/round>)(desde C++17) |  converte uma duration para outra, arredondando para o mais próximo, empates para o par   
(function template)  
[ ceil(std::chrono::time_point)](<#/doc/chrono/time_point/ceil>)(desde C++17) |  converte um time_point para outro, arredondando para cima   
(function template)  
[ ceilceilfceill](<#/doc/numeric/math/ceil>)(desde C++11)(desde C++11) |  inteiro mais próximo não menor que o valor dado   
(function)