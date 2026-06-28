# std::chrono::zoned_time&lt;Duration,TimeZonePtr&gt;::zoned_time

```cpp
zoned_time();  // (1) (desde C++20)
zoned_time( const std::chrono::sys_time<Duration>& st );  // (2) (desde C++20)
zoned_time( const zoned_time& other ) = default;  // (3) (desde C++20)
template< class Duration2 >
zoned_time( const std::chrono::zoned_time<Duration2, TimeZonePtr>& other );  // (4) (desde C++20)
explicit zoned_time( TimeZonePtr z );  // (5) (desde C++20)
explicit zoned_time( std::string_view name );  // (6) (desde C++20)
zoned_time( TimeZonePtr z, const std::chrono::sys_time<Duration>& st );  // (7) (desde C++20)
zoned_time( std::string_view name, const std::chrono::sys_time<Duration>& st );  // (8) (desde C++20)
zoned_time( TimeZonePtr z, const std::chrono::local_time<Duration>& tp );  // (9) (desde C++20)
zoned_time( std::string_view name, const std::chrono::local_time<Duration>& tp );  // (10) (desde C++20)
zoned_time( TimeZonePtr z, const std::chrono::local_time<Duration>& tp,
std::chrono::choose c );  // (11) (desde C++20)
zoned_time( std::string_view name,
const std::chrono::local_time<Duration>& tp, std::chrono::choose c );  // (12) (desde C++20)
template< class Duration2, class TimeZonePtr2 >
zoned_time( TimeZonePtr z,
const std::chrono::zoned_time<Duration2, TimeZonePtr2>& zt );  // (13) (desde C++20)
template< class Duration2, class TimeZonePtr2 >
zoned_time( TimeZonePtr z,
const std::chrono::zoned_time<Duration2, TimeZonePtr2>& zt,
std::chrono::choose );  // (14) (desde C++20)
template< class Duration2, class TimeZonePtr2 >
zoned_time( std::string_view name,
const std::chrono::zoned_time<Duration2, TimeZonePtr2>& zt );  // (15) (desde C++20)
template< class Duration2, class TimeZonePtr2 >
zoned_time( std::string_view name,
const std::chrono::zoned_time<Duration2, TimeZonePtr2>& zt,
std::chrono::choose );  // (16) (desde C++20)
```

Constrói um objeto `zoned_time`, inicializando o ponteiro de fuso horário armazenado e o ponto no tempo de acordo com a tabela a seguir, onde `traits` é [std::chrono::zoned_traits](<#/doc/chrono/zoned_traits>)&lt;TimeZonePtr&gt;:

Sobrecarga | Ponteiro de fuso horário (denotado `zone`) | Ponto no tempo (um [std::chrono::sys_time](<#/doc/chrono/system_clock>)&lt;duration&gt;) | Notas
---|---|---|---
(1) | traits::default_zone() | construído por padrão | (a)
(2) | `st`
(3) | other.get_time_zone() | other.get_sys_time() | (b)
(4) | other.get_time_zone() | other.get_sys_time() | (e)
(5) | std::move(z) | construído por padrão |
(6) | traits::locate_zone(name) | (c)
(7) | std::move(z) | `st` |
(8) | traits::locate_zone(name) | (c)
(9) | std::move(z) | zone->to_sys(tp) | (d)
(10) | traits::locate_zone(name) | (c,d)
(11) | std::move(z) | zone->to_sys(tp, c) | (d)
(12) | traits::locate_zone(name) | (c,d)
(13,14) | std::move(z) | zt.get_sys_time() | (e)
(15,16) | traits::locate_zone(name) | (c,e)

a) Construtores especificados para chamar traits::default_zone() (1,2) não participam da resolução de sobrecarga se essa expressão não for bem-formada.

b) O construtor de cópia padrão (3) é definido como deletado se [std::is_copy_constructible_v](<#/doc/types/is_copy_constructible>)&lt;TimeZonePtr&gt; for falso.

c) Construtores com um parâmetro [std::string_view](<#/doc/string/basic_string_view>) `name` (6,8,10,12,15,16) não participam da resolução de sobrecarga se traits::locate_zone(name) não for bem-formado ou se essa expressão não for conversível para `TimeZonePtr`.

d) Construtores especificados para chamar zone->to_sys (9-12) não participam da resolução de sobrecarga se essa expressão de chamada não for bem-formada ou se o resultado não for conversível para [std::chrono::sys_time](<#/doc/chrono/system_clock>)&lt;duration&gt;.

e) Construtores com um parâmetro de template `Duration2` (4,13-16) não participam da resolução de sobrecarga se `Duration2` não for conversível para `Duration`.

O comportamento é indefinido se o ponteiro de fuso horário (inicializado conforme descrito acima) não se referir a um fuso horário.

### Notas

`zoned_time` não possui um construtor de movimento e tentar mover um realizará uma cópia em vez disso, usando o construtor de cópia padrão (3). Assim, quando `TimeZonePtr` é um tipo somente-movível, `zoned_time` é imovível: ele não pode ser movido nem copiado.

Os construtores (14,16) aceitam um parâmetro std::chrono::choose, mas esse parâmetro não tem efeito.

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
    #include <string_view>
    
    int main()
    {
        using std::chrono_literals::operator""y;
        using std::operator""sv;
    
        std::cout << std::chrono::zoned_time{} << " : default\n";
    
        constexpr std::string_view location1{"America/Phoenix"sv};
        std::cout << std::chrono::zoned_time{location1} << " : " << location1 << '\n';
    
        const std::chrono::time_zone* timeZonePtr = std::chrono::locate_zone("UTC");
        std::cout << std::chrono::zoned_time{timeZonePtr} << " : UTC time zone\n";
    
        constexpr auto location2{"Europe/Rome"sv};
        std::cout << std::chrono::zoned_time{location2, std::chrono::local_days{2021y/12/31}}
                  << " : " << location2 << '\n';
    
        constexpr auto location3{"Europe/Rome"sv};
        constexpr auto some_date = std::chrono::sys_time<std::chrono::days>{2021y/12/31};
        std::cout << std::chrono::zoned_time{location3, some_date}
                  << " : " << location3 << '\n';
    
        const auto now =
            std::chrono::floor<std::chrono::minutes>(std::chrono::system_clock::now());
        constexpr auto location4{"Europe/Rome"sv};
        std::cout << std::chrono::zoned_time{location4, now} << " : " << location4 << '\n';
    
        constexpr auto NewYork{"America/New_York"sv};
        constexpr auto Tokyo{"Asia/Tokyo"sv};
        const std::chrono::zoned_time tz_Tokyo{Tokyo, now};
        const std::chrono::zoned_time tz_NewYork{NewYork, now};
        std::cout << std::chrono::zoned_time{Tokyo, tz_NewYork} << " : " << Tokyo << '\n';
        std::cout << std::chrono::zoned_time{NewYork, tz_Tokyo} << " : " << NewYork << '\n';
    }
```

Saída possível:
```
    1970-01-01 00:00:00 UTC : default
    1969-12-31 17:00:00 MST : America/Phoenix
    1970-01-01 00:00:00 UTC : UTC time zone
    2021-12-31 00:00:00 CET : Europe/Rome
    2021-12-31 01:00:00 CET : Europe/Rome
    2021-09-20 23:04:00 CEST : Europe/Rome
    2021-09-21 06:04:00 JST : Asia/Tokyo
    2021-09-20 17:04:00 EDT : America/New_York
```