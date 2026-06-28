# std::hash&lt;std::chrono::time_point&gt;

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
template< class Clock, class Duration >
struct hash<std::chrono::time_point<Clock, Duration>>;
```

A especialização de template de [std::hash](<#/doc/utility/hash>) para [`std::chrono::time_point`](<#/doc/chrono/time_point>) permite aos usuários obter hashes de objetos do tipo [std::chrono::time_point](<#/doc/chrono/time_point>)<Clock, Duration>. Esta especialização é [habilitada](<#/doc/utility/hash>) se e somente se [std::hash](<#/doc/utility/hash>)&lt;Duration&gt; estiver habilitado.

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_chrono`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | Suporte a [Hashing](<#/doc/utility/hash>) para classes de valor `std::chrono`

### Exemplo

Execute este código
```
    #include <chrono>
    #include <cstddef>
    #include <iostream>
    #include <string>
    #include <thread>
    #include <unordered_map>
    
    struct my_system_clock : std::chrono::system_clock
    {
        using time_point = std::chrono::time_point<my_system_clock>;
    
        static time_point now() noexcept
        {
            return time_point{std::chrono::system_clock::now().time_since_epoch()};
        }
    
        template<class CharT, class Traits>
        friend auto operator<<(std::basic_ostream<CharT, Traits>& os, const time_point& tp)
            -> decltype(os)
        {
            return os << std::chrono::system_clock::time_point{tp.time_since_epoch()};
        }
    };
    
    using my_system_clock_tp = std::chrono::time_point<my_system_clock>;
    
    #if __cpp_lib_chrono < 202306L
    // custom specialization of std::hash can be injected in namespace std
    template<>
    struct std::hash<my_system_clock_tp>
    {
        std::size_t operator()(const my_system_clock_tp& d) const noexcept
        {
            return d.time_since_epoch().count();
        }
    };
    #endif
    
    int main()
    {
        using namespace std::chrono_literals;
    
        std::unordered_map<my_system_clock_tp, std::string> log;
    
        for (int i{}; i != 4; ++i)
        {
            std::this_thread::sleep_for(100ms);
            log[my_system_clock::now()] = "event #" + std::to_string(i);
        }
    
        for (auto const& [time, message] : log)
            std::cout << '[' << time << "], message: " << message << '\n';
    }
```

Saída possível:
```
    [2024-03-22 10:47:14.966238436], message: event #3
    [2024-03-22 10:47:14.866096194], message: event #2
    [2024-03-22 10:47:14.765965786], message: event #1
    [2024-03-22 10:47:14.665817365], message: event #0
```

### Veja também

[ hash](<#/doc/utility/hash>)(C++11) | objeto de função hash
(template de classe)