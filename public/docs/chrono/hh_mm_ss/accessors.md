# std::chrono::hh_mm_ss&lt;Duration&gt;::is_negative, std::chrono::hh_mm_ss&lt;Duration&gt;::hours, std::chrono::hh_mm_ss&lt;Duration&gt;::minutes, std::chrono::hh_mm_ss&lt;Duration&gt;::seconds, std::chrono::hh_mm_ss&lt;Duration&gt;::subseconds

```cpp
constexpr bool is_negative() const noexcept;  // (1)
constexpr std::chrono::hours hours() const noexcept;  // (2)
constexpr std::chrono::minutes minutes() const noexcept;  // (3)
constexpr std::chrono::seconds seconds() const noexcept;  // (4)
constexpr precision subseconds() const noexcept;  // (5)
```

  
Obtém os componentes do tempo "decomposto" armazenado.

### Valor de retorno

Seja `d` a duração representada:

1) verdadeiro se `d` for negativo, falso caso contrário.

2) [std::chrono::duration_cast](<#/doc/chrono/duration/duration_cast>)<[std::chrono::hours](<#/doc/chrono/duration>)>(abs(d))

3) [std::chrono::duration_cast](<#/doc/chrono/duration/duration_cast>)<[std::chrono::minutes](<#/doc/chrono/duration>)>(abs(d) - hours())

4) [std::chrono::duration_cast](<#/doc/chrono/duration/duration_cast>)<[std::chrono::seconds](<#/doc/chrono/duration>)>(abs(d) - hours() - minutes())

5) abs(d) - hours() - minutes() - seconds() se [std::chrono::treat_as_floating_point_v](<#/doc/chrono/treat_as_floating_point>)<precision::rep> for verdadeiro; caso contrário [std::chrono::duration_cast](<#/doc/chrono/duration/duration_cast>)&lt;precision&gt;(abs(d) - hours() - minutes() - seconds()).

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   