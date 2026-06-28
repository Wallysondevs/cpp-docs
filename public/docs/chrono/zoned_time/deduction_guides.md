# Guias de dedução para std::chrono::zoned_time

```cpp
zoned_time() -> zoned_time<std::chrono::seconds>;  // (1) (desde C++20)
template< class Duration >
zoned_time( std::chrono::sys_time<Duration> )
-> zoned_time<std::common_type_t<Duration, std::chrono::seconds>>;  // (2) (desde C++20)
template< class TimeZonePtrOrName >
zoned_time( TimeZonePtrOrName&& ) -> zoned_time<std::chrono::seconds, /* see below */>;  // (3) (desde C++20)
template< class TimeZonePtrOrName, class Duration >
zoned_time( TimeZonePtrOrName&&, std::chrono::sys_time<Duration> )
-> zoned_time<std::common_type_t<Duration, std::chrono::seconds>, /* see below */>;  // (4) (desde C++20)
template< class TimeZonePtrOrName, class Duration >
zoned_time( TimeZonePtrOrName&&, std::chrono::local_time<Duration>,
std::chrono::choose = std::chrono::choose::earliest )
-> zoned_time<std::common_type_t<Duration, std::chrono::seconds>, /* see below */>;  // (5) (desde C++20)
template< class TimeZonePtrOrName, class Duration, class TimeZonePtr2 >
zoned_time( TimeZonePtrOrName&&, std::chrono::zoned_time<Duration, TimeZonePtr2>,
std::chrono::choose = std::chrono::choose::earliest )
-> zoned_time<std::common_type_t<Duration, std::chrono::seconds>, /* see below */>;  // (6) (desde C++20)
```

Esses guias de dedução normalizam `Duration` para uma resolução mínima de [std::chrono::seconds](<#/doc/chrono/duration>), e fornecem tratamento correto para nomes de fuso horário especificados usando tipos conversíveis para [std::string_view](<#/doc/string/basic_string_view>).

3-6) Se [std::is_convertible_v](<#/doc/types/is_convertible>)<TimeZonePtrOrName, [std::string_view](<#/doc/string/basic_string_view>)> for verdadeiro, o segundo argumento de template deduzido é const [std::chrono::time_zone](<#/doc/chrono/time_zone>)*. Caso contrário, é [std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;TimeZonePtrOrName&gt;.