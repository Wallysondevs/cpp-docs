# std::chrono::operator+, std::chrono::operator- (std::chrono::day)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
constexpr std::chrono::day operator+( const std::chrono::day& d,
const std::chrono::days& ds ) noexcept;
constexpr std::chrono::day operator+( const std::chrono::days& ds,
const std::chrono::day& d ) noexcept;
constexpr std::chrono::day operator-( const std::chrono::day& d,
const std::chrono::days& ds ) noexcept;
constexpr std::chrono::days operator-( const std::chrono::day& x,
const std::chrono::day& y ) noexcept;
```

  
1,2) Adiciona ds.count() dias a d.

3) Subtrai ds.count() dias de d.

4) Calcula a diferença, em dias, entre dois objetos day x e y.

### Valor de retorno

1,2) [std::chrono::day](<#/doc/chrono/day>)(unsigned(d) + ds.count())

3) [std::chrono::day](<#/doc/chrono/day>)(unsigned(d) - ds.count())

4) [std::chrono::days](<#/doc/chrono/duration>)(int(unsigned(x)) - int(unsigned(y)))

### Observações

1-3) Se o resultado estiver fora do intervalo `[`​0​`, `255`]`, o valor armazenado real é não especificado.

### Exemplo

Run this code
```cpp
    #include <cassert>
    #include <chrono>
    
    int main()
    {
        std::chrono::day d{15};
    
        d = d + std::chrono::days(2);
        assert(d == std::chrono::day(17));
    
        d = d - std::chrono::days(3);
        assert(d == std::chrono::day(14));
    
        constexpr std::chrono::days ds = std::chrono::day(16) - std::chrono::day(14);
        static_assert(ds == std::chrono::days(2));
    }
```

### Veja também

[ operator++operator++(int)operator--operator--(int)](<#/doc/chrono/day/operator_inc_dec>) |  incrementa ou decrementa o dia   
(função membro pública)  
[ operator+=operator-=](<#/doc/chrono/day/operator_arith>) |  adiciona ou subtrai um número de dias   
(função membro pública)