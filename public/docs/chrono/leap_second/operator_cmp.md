# std::chrono::operator==,&lt;,&lt;=,&gt;,&gt;=,&lt;=&gt;(std::chrono::leap_second)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
constexpr bool operator==( const std::chrono::leap_second& x,
const std::chrono::leap_second& y ) noexcept;
constexpr std::strong_ordering operator<=>( const std::chrono::leap_second& x,
const std::chrono::leap_second& y ) noexcept;
template< class Duration >
constexpr bool operator==( const std::chrono::leap_second& x,
const std::chrono::sys_time<Duration>& y ) noexcept;
template< class Duration >
constexpr bool operator< ( const std::chrono::leap_second& x,
const std::chrono::sys_time<Duration>& y ) noexcept;
template< class Duration >
constexpr bool operator< ( const std::chrono::sys_time<Duration>& x,
const std::chrono::leap_second& y ) noexcept;
template< class Duration >
constexpr bool operator> ( const std::chrono::leap_second& x,
const std::chrono::sys_time<Duration>& y ) noexcept;
template< class Duration >
constexpr bool operator> ( const std::chrono::sys_time<Duration>& x,
const std::chrono::leap_second& y ) noexcept;
template< class Duration >
constexpr bool operator<=( const std::chrono::leap_second& x,
const std::chrono::sys_time<Duration>& y ) noexcept;
template< class Duration >
constexpr bool operator<=( const std::chrono::sys_time<Duration>& x,
const std::chrono::leap_second& y ) noexcept;
template< class Duration >
constexpr bool operator>=( const std::chrono::leap_second& x,
const std::chrono::sys_time<Duration>& y ) noexcept;
template< class Duration >
constexpr bool operator>=( const std::chrono::sys_time<Duration>& x,
const std::chrono::leap_second& y ) noexcept;
template< class Duration >
requires std::three_way_comparable_with<
std::chrono::sys_seconds, std::chrono::sys_time<Duration>>
constexpr auto operator<=>( const std::chrono::leap_second& x,
const std::chrono::sys_time<Duration>& y ) noexcept;
```

Compara a data e hora representadas pelos objetos x e y.

O tipo de retorno de (12) é deduzido de x.date() <=> y, e consequentemente o tipo de resultado da comparação de três vias de [std::chrono::seconds](<#/doc/chrono/duration>) e `Duration`.

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`.

### Valor de retorno

1) x.date() == y.date()

2) x.date() <=> y.date()

3) x.date() == y

4) x.date() < y

5) x < y.date()

6) x.date() > y

7) x > y.date()

8) x.date() <= y

9) x <= y.date()

10) x.date() >= y

11) x >= y.date()

12) x.date() <=> y