# std::chrono::clock_time_conversion

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
template< class Dest, class Source >
struct clock_time_conversion {};
```

`std::chrono::clock_time_conversion` é um trait que especifica como converter um [std::chrono::time_point](<#/doc/chrono/time_point>) do clock `Source` para o clock `Dest`. Ele faz isso fornecendo um `operator()` const-chamável que aceita um argumento do tipo [std::chrono::time_point](<#/doc/chrono/time_point>)<Source, Duration> e retorna um [std::chrono::time_point](<#/doc/chrono/time_point>)<Dest, OtherDuration> que representa um ponto equivalente no tempo. A duração do time point retornado é calculada a partir da duração de origem de uma maneira que varia para cada especialização. `clock_time_conversion` é normalmente usado apenas indiretamente, via std::chrono::clock_cast.

Um programa pode especializar `clock_time_conversion` se pelo menos um dos parâmetros de template for um tipo de clock definido pelo usuário.

O template primário é uma struct vazia. O padrão define as seguintes especializações:

```cpp
template< class Clock >
struct clock_time_conversion<Clock, Clock>;  // (1) (desde C++20)
template<>
struct clock_time_conversion<std::chrono::system_clock, std::chrono::system_clock>;  // (2) (desde C++20)
template<>
struct clock_time_conversion<std::chrono::utc_clock, std::chrono::utc_clock>;  // (3) (desde C++20)
template<>
struct clock_time_conversion<std::chrono::system_clock, std::chrono::utc_clock>;  // (4) (desde C++20)
template<>
struct clock_time_conversion<std::chrono::utc_clock, std::chrono::system_clock>;  // (5) (desde C++20)
template< class Clock >
struct clock_time_conversion<Clock, std::chrono::system_clock>;  // (6) (desde C++20)
template< class Clock >
struct clock_time_conversion<std::chrono::system_clock, Clock>;  // (7) (desde C++20)
template< class Clock >
struct clock_time_conversion<Clock, std::chrono::utc_clock>;  // (8) (desde C++20)
template< class Clock >
struct clock_time_conversion<std::chrono::utc_clock, Clock>;  // (9) (desde C++20)
```

1-3) Conversão de identidade: `operator()` retorna uma cópia do argumento.

4,5) Conversões entre std::chrono::sys_time e std::chrono::utc_time: `operator()` chama std::chrono::utc_clock::to_sys e std::chrono::utc_clock::from_sys, respectivamente.

6,7) Conversões para e de std::chrono::sys_time quando `Clock` suporta `from_sys` e `to_sys`: `operator()` chama Clock::to_sys e Clock::from_sys, respectivamente.

8,9) Conversões para e de std::chrono::utc_time quando `Clock` suporta `from_utc` e `to_utc`: `operator()` chama Clock::to_utc e Clock::from_utc, respectivamente.

### Funções membro

Cada especialização possui um construtor padrão, construtor de cópia, construtor de movimento, operador de atribuição de cópia, operador de atribuição de movimento e destrutor implicitamente declarados.

## std::chrono::clock_time_conversion::operator()

template< class Duration >
[std::chrono::time_point](<#/doc/chrono/time_point>)<Clock, Duration>
operator()( const [std::chrono::time_point](<#/doc/chrono/time_point>)<Clock, Duration>& t ) const; | (1) | (membro da especialização (1))
template< class Duration >
[std::chrono::sys_time](<#/doc/chrono/system_clock>)&lt;Duration&gt;
operator()( const [std::chrono::sys_time](<#/doc/chrono/system_clock>)&lt;Duration&gt; & t ) const; | (2) | (membro da especialização (2))
template< class Duration >
[std::chrono::utc_time](<#/doc/chrono/utc_clock>)&lt;Duration&gt;
operator()( const [std::chrono::utc_time](<#/doc/chrono/utc_clock>)&lt;Duration&gt;& t ) const; | (3) | (membro da especialização (3))
template< class Duration >
[std::chrono::sys_time](<#/doc/chrono/system_clock>)&lt;Duration&gt;
operator()( const [std::chrono::utc_time](<#/doc/chrono/utc_clock>)&lt;Duration&gt;& t ) const; | (4) | (membro da especialização (4))
template< class Duration >
[std::chrono::utc_time](<#/doc/chrono/utc_clock>)&lt;Duration&gt;
operator()( const [std::chrono::sys_time](<#/doc/chrono/system_clock>)&lt;Duration&gt;& t ) const; | (5) | (membro da especialização (5))
template< class Duration >
auto operator()( const [std::chrono::sys_time](<#/doc/chrono/system_clock>)&lt;Duration&gt;& t ) const
-> decltype(Clock::from_sys(t)); | (6) | (membro da especialização (6))
template< class Duration >
auto operator()( const [std::chrono::time_point](<#/doc/chrono/time_point>)<SourceClock, Duration>& t ) const
-> decltype(Clock::to_sys(t)); | (7) | (membro da especialização (7))
template< class Duration >
auto operator()( const [std::chrono::utc_time](<#/doc/chrono/utc_clock>)&lt;Duration&gt;& t ) const
-> decltype(Clock::from_utc(t)); | (8) | (membro da especialização (8))
template< class Duration >
auto operator()( const [std::chrono::time_point](<#/doc/chrono/time_point>)<Clock, Duration>& t ) const
-> decltype(Clock::to_utc(t)); | (9) | (membro da especialização (9))

Converte o argumento [std::chrono::time_point](<#/doc/chrono/time_point>) para o clock de destino.

1-3) Conversão de identidade. Retorna `t` inalterado.

4) Retorna [std::chrono::utc_clock::to_sys](<#/doc/chrono/utc_clock/to_sys>)(t).

5) Retorna [std::chrono::utc_clock::from_sys](<#/doc/chrono/utc_clock/from_sys>)(t).

6) Retorna Clock::from_sys(t). Esta sobrecarga participa da resolução de sobrecarga apenas se a expressão Clock::from_sys(t) for bem-formada. O programa é malformado se Clock::from_sys(t) não retornar [std::chrono::time_point](<#/doc/chrono/time_point>)<Clock, Duration> onde `Duration` é alguma especialização válida de [std::chrono::duration](<#/doc/chrono/duration>).

7) Retorna Clock::to_sys(t). Esta sobrecarga participa da resolução de sobrecarga apenas se a expressão Clock::to_sys(t) for bem-formada. O programa é malformado se Clock::to_sys(t) não retornar [std::chrono::sys_time](<#/doc/chrono/system_clock>)&lt;Duration&gt; onde `Duration` é alguma especialização válida de [std::chrono::duration](<#/doc/chrono/duration>).

8) Retorna Clock::from_utc(t). Esta sobrecarga participa da resolução de sobrecarga apenas se a expressão Clock::from_utc(t) for bem-formada. O programa é malformado se Clock::from_utc(t) não retornar [std::chrono::time_point](<#/doc/chrono/time_point>)<Clock, Duration> onde `Duration` é alguma especialização válida de [std::chrono::duration](<#/doc/chrono/duration>).

9) Retorna Clock::to_utc(t). Esta sobrecarga participa da resolução de sobrecarga apenas se a expressão Clock::to_utc(t) for bem-formada. O programa é malformado se Clock::to_utc(t) não retornar [std::chrono::utc_time](<#/doc/chrono/utc_clock>)&lt;Duration&gt; onde `Duration` é alguma especialização válida de [std::chrono::duration](<#/doc/chrono/duration>).

### Parâmetros

- **t** — time point a ser convertido

### Valor de retorno

O resultado da conversão conforme descrito acima:

1-3) t.

4) [std::chrono::utc_clock::to_sys](<#/doc/chrono/utc_clock/to_sys>)(t).

5) [std::chrono::utc_clock::from_sys](<#/doc/chrono/utc_clock/from_sys>)(t).

6) Clock::from_sys(t).

7) Clock::to_sys(t).

8) Clock::from_utc(t).

9) Clock::to_utc(t).

### Veja também

[ clock_cast](<#/doc/chrono/clock_cast>)(C++20) | converte time points de um clock para outro
---|---
(modelo de função) |