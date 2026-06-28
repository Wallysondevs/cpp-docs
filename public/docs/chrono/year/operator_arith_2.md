# std::chrono::operator+, std::chrono::operator- (std::chrono::year)

```cpp
constexpr std::chrono::year operator+( const std::chrono::year& y,
const std::chrono::years& ys ) noexcept;  // (1) (desde C++20)
constexpr std::chrono::year operator+( const std::chrono::years& ys,
const std::chrono::year& y ) noexcept;  // (2) (desde C++20)
constexpr std::chrono::year operator-( const std::chrono::year& y,
const std::chrono::years& ys ) noexcept;  // (3) (desde C++20)
constexpr std::chrono::years operator-( const std::chrono::year& y1,
const std::chrono::year& y2 ) noexcept;  // (4) (desde C++20)
```

  
1,2) Adiciona ys.count() anos a y. 

3) Subtrai ys.count() anos de y.

4) Retorna a diferença em anos entre y1 e y2.

### Valor de retorno

1,2) [std::chrono::year](<#/doc/chrono/year>)(int(y) + ys.count())

3) [std::chrono::year](<#/doc/chrono/year>)(int(y) - ys.count())

4) [std::chrono::years](<#/doc/chrono/duration>)(int(y1) - int(y2))

### Observações

Se o valor do ano resultante para (1-3) estiver fora do intervalo `[`-32767`, `32767`]`, o valor real armazenado é não especificado. 

O resultado da subtração de dois valores `year` é uma duration do tipo std::chrono::years. Esta unidade de duration representa a duração média do ano Gregoriano, e a duration resultante não tem relação com o número de dias nos anos específicos representados pelos operandos. Por exemplo, o resultado de 2018y - 2017y é [std::chrono::years](<#/doc/chrono/duration>)(1), que representa 365.2425 dias, não 365 dias. 

### Exemplo

Execute este código
```cpp 
    #include <cassert>
    #include <chrono>
     
    int main()
    {
        std::chrono::year y{2020};
     
        y = std::chrono::years(12) + y; // overload (2): duration + time point
        assert(y == std::chrono::year(2032));
     
        y = y - std::chrono::years(33); // overload (3): time point - duration
        assert(y == std::chrono::year(1999));
     
        // y = std::chrono::years(33) - y; // not supported: duration - time point
     
        using namespace std::chrono;
        constexpr std::chrono::years ys = 2025y - 2020y; // overload (4)
        static_assert(ys == std::chrono::years(5));
    }
```

### Veja também

[ operator++operator++(int)operator--operator--(int)](<#/doc/chrono/month/operator_inc_dec>) |  incrementa ou decrementa o mês   
(função membro pública de `std::chrono::month`)  
[ operator+=operator-=](<#/doc/chrono/month/operator_arith>) |  adiciona ou subtrai um número de meses   
(função membro pública de `std::chrono::month`)