# operator==,!=,&lt;,&lt;=,&gt;,&gt;=,&lt;=&gt;(std::chrono::duration)

```cpp
template< class Rep1, class Period1, class Rep2, class Period2 >
constexpr bool operator==( const std::chrono::duration<Rep1, Period1>& lhs,
const std::chrono::duration<Rep2, Period2>& rhs );  // (1) (desde C++11)
template< class Rep1, class Period1, class Rep2, class Period2 >
constexpr bool operator!=( const std::chrono::duration<Rep1, Period1>& lhs,
const std::chrono::duration<Rep2, Period2>& rhs );  // (2) (desde C++11)
(ate C++20)
template< class Rep1, class Period1, class Rep2, class Period2 >
constexpr bool operator<( const std::chrono::duration<Rep1, Period1>& lhs,
const std::chrono::duration<Rep2, Period2>& rhs );  // (3) (desde C++11)
template< class Rep1, class Period1, class Rep2, class Period2 >
constexpr bool operator<=( const std::chrono::duration<Rep1, Period1>& lhs,
const std::chrono::duration<Rep2, Period2>& rhs );  // (4) (desde C++11)
template< class Rep1, class Period1, class Rep2, class Period2 >
constexpr bool operator>( const std::chrono::duration<Rep1, Period1>& lhs,
const std::chrono::duration<Rep2, Period2>& rhs );  // (5) (desde C++11)
template< class Rep1, class Period1, class Rep2, class Period2 >
constexpr bool operator>=( const std::chrono::duration<Rep1, Period1>& lhs,
const std::chrono::duration<Rep2, Period2>& rhs );  // (6) (desde C++11)
template< class Rep1, class Period1, class Rep2, class Period2 >
requires std::three_way_comparable<std::common_type_t<Rep1, Rep2>>
constexpr auto operator<=>( const std::chrono::duration<Rep1, Period1>& lhs,
const std::chrono::duration<Rep2, Period2>& rhs );  // (7) (desde C++20)
```

  
Compara duas durations. Seja `CT` [std::common_type](<#/doc/types/common_type>)<[std::chrono::duration](<#/doc/chrono/duration>)<Rep1, Period1>, [std::chrono::duration](<#/doc/chrono/duration>)<Rep2, Period2>>::type: 

1,2) Verifica se lhs e rhs são iguais, ou seja, se o número de ticks para o tipo comum a ambas as durations é igual.

3-6) Compara lhs com rhs, ou seja, compara o número de ticks para o tipo comum a ambas as durations.

7) Compara lhs com rhs, ou seja, compara o número de ticks para o tipo comum a ambas as durations. O tipo de retorno é deduzido de CT(lhs).count() <=> CT(rhs).count().

```cpp
O operador `!=` é sintetizado a partir de `operator==`.  // (desde C++20)
```
  
### Parâmetros

lhs  |  \-  |  duration no lado esquerdo do operador   
---|---|---
rhs  |  \-  |  duration no lado direito do operador   
  
### Valor de retorno

1) CT(lhs).count() == CT(rhs).count()

2) !(lhs == rhs)

3) CT(lhs).count() < CT(rhs).count()

4) !(rhs < lhs)

5) rhs < lhs

6) !(lhs < rhs)

7) CT(lhs).count() <=> CT(rhs).count()

### Exemplo

Execute este código
```
    #include <chrono>
    #include <iostream>
     
    int main()
    {
        constexpr auto t1 = std::chrono::seconds(2);
        constexpr auto t2 = std::chrono::milliseconds(2000);
     
        if constexpr (t1 == t2)
            std::cout << t1 << " == " << t2 << '\n';
        else
            std::cout << t1 << " != " << t2 << '\n';
     
        constexpr auto t3 = std::chrono::seconds(61);
        constexpr auto t4 = std::chrono::minutes(1);
     
        if constexpr (t3 > t4)
            std::cout << t3 << " > " << t4 << '\n';
        else
            std::cout << t3 << " <= " << t4 << '\n';
     
        using namespace std::chrono_literals;
     
        static_assert(1h == 60min);
        static_assert(1min == 60s);
        static_assert(1s == 1'000ms);
        static_assert(1ms == 1'000us);
        static_assert(1us == 1'000ns);
    }
```

Saída: 
```
    2s == 2000ms
    61s > 1min
```