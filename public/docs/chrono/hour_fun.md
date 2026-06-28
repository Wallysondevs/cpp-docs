# std::chrono::is_am, std::chrono::is_pm, std::chrono::make12, std::chrono::make24

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
constexpr bool is_am( const std::chrono::hours& h ) noexcept;
constexpr bool is_pm( const std::chrono::hours& h ) noexcept;
constexpr std::chrono::hours make12( const std::chrono::hours& h ) noexcept;
constexpr std::chrono::hours make24( const std::chrono::hours& h,
bool is_pm ) noexcept;
```

Estas funções auxiliam na tradução entre um horário do dia no formato de 12 horas e um horário do dia no formato de 24 horas.

1) Detecta se o horário no formato de 24 horas é a.m. (_ante meridiem_ , antes do meio-dia).

2) Detecta se o horário no formato de 24 horas é p.m. (_post meridiem_ , depois do meio-dia).

3) Retorna o equivalente de 12 horas de um horário no formato de 24 horas.

4) Retorna o equivalente de 24 horas de um horário no formato de 12 horas h, onde is_pm determina se o horário é p.m.

### Parâmetros

- **h** — Horário no formato de 12 ou 24 horas a ser detectado
- **is_pm** — se o horário no formato de 12 horas é p.m.

### Valor de retorno

1) 0h <= h && h <= 11h

2) 12h <= h && h <= 23h

3) Se h estiver no intervalo `[`0h`, `23h`]`, retorna o equivalente de 12 horas no intervalo `[`1h`, `12h`]`. Caso contrário, o valor de retorno é não especificado.

4) Se h estiver no intervalo `[`1h`, `12h`]`, retorna o equivalente de 24 horas no intervalo `[`0h`, `11h`]` se is_pm for false, ou no intervalo `[`12h`, `23h`]` caso contrário. Caso contrário, o valor de retorno é não especificado.

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iomanip>
    #include <iostream>
    #include <utility>
    
    int main()
    {
        using namespace std::chrono;
    
        static_assert(
            is_am(10h) &&  is_am(11h) && !is_am(12h) && !is_am(23h) &&
           !is_pm(10h) && !is_pm(11h) &&  is_pm(12h) &&  is_pm(23h)
        );
    
        std::cout << "make12():\n";
    
        for (const hours hh : {0h, 1h, 11h, 12h, 13h, 23h})
        {
            const hours am{make12(hh)};
            std::cout << std::setw(2) << hh.count() << "h == "
                      << std::setw(2) << am.count() << (is_am(hh) ? "h a.m.\n" : "h p.m.\n");
        }
    
        std::cout << "\nmake24():\n";
    
        using p = std::pair<hours, bool>;
    
        for (const auto& [hh, pm] : {p{1h, 0}, p{12h, 0}, p{1h, 1}, p{12h, 1}})
        {
            std::cout << std::setw(2) << hh.count()
                      << (pm ? "h p.m." : "h a.m.")
                      << " == " << std::setw(2)
                      << make24(hh, pm).count() << "h\n";
        }
    }
```

Saída:
```
    make12():
     0h == 12h a.m.
     1h ==  1h a.m.
    11h == 11h a.m.
    12h == 12h p.m.
    13h ==  1h p.m.
    23h == 11h p.m.
    
    make24():
     1h a.m. ==  1h
    12h a.m. ==  0h
     1h p.m. == 13h
    12h p.m. == 12h
```