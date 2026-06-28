# std::common_type&lt;std::chrono::duration&gt;

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
template< class Rep1, class Period1, class Rep2, class Period2 >
struct common_type<std::chrono::duration<Rep1, Period1>,
std::chrono::duration<Rep2, Period2>>;
```

Expõe o tipo nomeado `type`, que é o tipo comum de duas [std::chrono::duration](<#/doc/chrono/duration>)s, cujo período é o maior divisor comum de `Period1` e `Period2`.

### Tipos de membros

Tipo de membro | Definição
---|---
`type` | [std::chrono::duration](<#/doc/chrono/duration>)<typename [std::common_type](<#/doc/types/common_type>)<Rep1, Rep2>::type, /* veja a nota */>

### Nota

O período da duration resultante pode ser calculado formando uma razão do maior divisor comum de Period1::num e Period2::num e o mínimo múltiplo comum de Period1::den e Period2::den.

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
    #include <type_traits>
    
    // std::chrono já encontra o maior divisor comum,
    // provavelmente usando std::common_type<>. Fazemos a dedução
    // de tipo externamente. 
    
    template<typename T,typename S>
    constexpr auto durationDiff(const T& t, const S& s)
        -> typename std::common_type<T,S>::type
    {
        typedef typename std::common_type<T,S>::type Common;
        return Common(t) - Common(s);
    }
    
    int main() 
    {
        using namespace std::literals;
    
        constexpr auto ms = 30ms;
        constexpr auto us = 1100us;
        constexpr auto diff = durationDiff(ms, us);
    
        std::cout << ms << " - " << us << " = " << diff << '\n';
    }
```

Saída:
```
    30ms - 1100us = 28900us
```

### Veja também

[ std::common_type<std::chrono::time_point>](<#/doc/chrono/time_point/common_type>)(C++11) | especializa o trait [std::common_type](<#/doc/types/common_type>)
(especialização de modelo de classe)
[ common_type](<#/doc/types/common_type>)(C++11) | determina o tipo comum de um grupo de tipos
(modelo de classe)