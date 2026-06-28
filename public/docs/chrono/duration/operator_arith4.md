# operator+,-,*,/,%(std::chrono::duration)

```cpp
template< class Rep1, class Period1, class Rep2, class Period2 >
typename std::common_type<duration<Rep1,Period1>, duration<Rep2,Period2>>::type
constexpr operator+( const duration<Rep1,Period1>& lhs,
const duration<Rep2,Period2>& rhs );  // (1) (desde C++11)
template< class Rep1, class Period1, class Rep2, class Period2 >
typename std::common_type<duration<Rep1,Period1>, duration<Rep2,Period2>>::type
constexpr operator-( const duration<Rep1,Period1>& lhs,
const duration<Rep2,Period2>& rhs );  // (2) (desde C++11)
template< class Rep1, class Period, class Rep2 >
duration<typename std::common_type<Rep1,Rep2>::type, Period>
constexpr operator*( const duration<Rep1,Period>& d,
const Rep2& s );  // (3) (desde C++11)
template< class Rep1, class Rep2, class Period >
duration<typename std::common_type<Rep1,Rep2>::type, Period>
constexpr operator*( const Rep1& s,
const duration<Rep2,Period>& d );  // (4) (desde C++11)
template< class Rep1, class Period, class Rep2 >
duration<typename std::common_type<Rep1,Rep2>::type, Period>
constexpr operator/( const duration<Rep1,Period>& d,
const Rep2& s );  // (5) (desde C++11)
template< class Rep1, class Period1, class Rep2, class Period2 >
typename std::common_type<Rep1,Rep2>::type
constexpr operator/( const duration<Rep1,Period1>& lhs,
const duration<Rep2,Period2>& rhs );  // (6) (desde C++11)
template< class Rep1, class Period, class Rep2 >
duration<typename std::common_type<Rep1,Rep2>::type, Period>
constexpr operator%( const duration<Rep1, Period>& d,
const Rep2& s );  // (7) (desde C++11)
template< class Rep1, class Period1, class Rep2, class Period2 >
typename std::common_type<duration<Rep1,Period1>, duration<Rep2,Period2>>::type
constexpr operator%( const duration<Rep1,Period1>& lhs,
const duration<Rep2,Period2>& rhs );  // (8) (desde C++11)
```

  
Realiza operações aritméticas básicas entre duas durations ou entre uma duration e uma contagem de ticks. 

1) Converte as duas durations para o seu tipo comum e cria uma duration cuja contagem de ticks é a soma das contagens de ticks após a conversão.

2) Converte as duas durations para o seu tipo comum e cria uma duration cuja contagem de ticks é o número de ticks de rhs subtraído do número de ticks de lhs após a conversão.

3,4) Converte a duration d para uma cujo `rep` é o tipo comum entre `Rep1` e `Rep2`, e multiplica o número de ticks após a conversão por s. Essas sobrecargas participam da resolução de sobrecarga apenas se s for conversível para typename [std::common_type](<#/doc/types/common_type>)<Rep1, Rep2>::type.

5) Converte a duration d para uma cujo `rep` é o tipo comum entre `Rep1` e `Rep2`, e divide o número de ticks após a conversão por s. Essa sobrecarga participa da resolução de sobrecarga apenas se s for conversível para typename [std::common_type](<#/doc/types/common_type>)<Rep1, Rep2>::type e `Rep2` não for uma especialização de `duration`.

6) Converte as duas durations para o seu tipo comum e divide a contagem de ticks de lhs após a conversão pela contagem de ticks de rhs após a conversão. Note que o valor de retorno deste operador não é uma duration.

7) Converte a duration d para uma cujo `rep` é o tipo comum entre `Rep1` e `Rep2`, e cria uma duration cuja contagem de ticks é o resto da divisão da contagem de ticks, após a conversão, por s. Essa sobrecarga participa da resolução de sobrecarga apenas se s for conversível para typename [std::common_type](<#/doc/types/common_type>)<Rep1, Rep2>::type e `Rep2` não for uma especialização de `duration`.

8) Converte as duas durations para o seu tipo comum e cria uma duration cuja contagem de ticks é o resto das contagens de ticks após a conversão.

### Parâmetros

lhs  |  \-  |  duration no lado esquerdo do operador   
---|---|---
rhs  |  \-  |  duration no lado direito do operador   
d  |  \-  |  o argumento duration para operadores de argumentos mistos   
s  |  \-  |  argumento não-duration para operadores de argumentos mistos   
  
### Valor de retorno

Assumindo que CD é o tipo de retorno da função e CD<A, B> = [std::common_type](<#/doc/types/common_type>)<A, B>::type, então: 

1) CD(CD(lhs).count() + CD(rhs).count())

2) CD(CD(lhs).count() - CD(rhs).count())

3,4) CD(CD(d).count() * s)

5) CD(CD(d).count() / s)

6) CD(lhs).count() / CD(rhs).count() (o tipo de retorno deste operador não é uma duration)

7) CD(CD(d).count() % s)

8) CD(CD(lhs).count() % CD(rhs).count())

### Exemplo

Execute este código
```cpp 
    #include <chrono>
    #include <iostream>
     
    int main()
    {
        // Simple arithmetic:
        std::chrono::seconds s = std::chrono::hours(1)
                               + 2 * std::chrono::minutes(10)
                               + std::chrono::seconds(70) / 10;
        std::cout << "1 hour + 2*10 min + 70/10 sec = " << s << " (seconds)\n";
     
        using namespace std::chrono_literals;
     
        // Difference between dividing a duration by a number
        // and dividing a duration by another duration:
        std::cout << "Dividing that by 2 minutes gives "
                  << s / 2min << '\n'
                  << "Dividing that by 2 gives "
                  << (s / 2).count() << " seconds\n";
     
        // The remainder operator is useful in determining where
        // in a time frame is this particular duration, e.g. to
        // break it down into hours, minutes, and seconds:
        std::cout << s << " (seconds) = "
                  << std::chrono::duration_cast<std::chrono::hours>(
                     s) << " (hour) + "
                  << std::chrono::duration_cast<std::chrono::minutes>(
                     s % 1h) << " (minutes) + "
                  << std::chrono::duration_cast<std::chrono::seconds>(
                     s % 1min) << " (seconds)\n";
     
        constexpr auto sun_earth_distance{150'000'000ULL}; // km
        constexpr auto speed_of_light{300000ULL}; // km/sec
        std::chrono::seconds t(sun_earth_distance / speed_of_light); // sec
        std::cout << "A photon flies from the Sun to the Earth in "
                  << t / 1min << " minutes " << t % 1min << " (seconds)\n";
    }
```

Saída: 
```
    1 hour + 2*10 min + 70/10 sec = 4807s (seconds)
    Dividing that by 2 minutes gives 40
    Dividing that by 2 gives 2403 seconds
    4807s (seconds) = 1h (hour) + 20min (minutes) + 7s (seconds)
    A photon flies from the Sun to the Earth in 8 minutes 20s (seconds)
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento como publicado  | Comportamento correto   
---|---|---|---
[LWG 3050](<https://cplusplus.github.io/LWG/issue3050>) | C++11  | restrição de conversibilidade usava xvalue não-const  | usar lvalues const em vez disso 