# std::chrono::operator+, std::chrono::operator- (std::chrono::year_month)

```cpp
constexpr std::chrono::year_month operator+( const std::chrono::year_month& ym,
const std::chrono::years& dy ) noexcept;  // (1) (desde C++20)
constexpr std::chrono::year_month operator+( const std::chrono::years& dy,
const std::chrono::year_month& ym ) noexcept;  // (2) (desde C++20)
constexpr std::chrono::year_month operator+( const std::chrono::year_month& ym,
const std::chrono::months& dm ) noexcept;  // (3) (desde C++20)
constexpr std::chrono::year_month operator+( const std::chrono::months& dm,
const std::chrono::year_month& ym ) noexcept;  // (4) (desde C++20)
constexpr std::chrono::year_month operator-( const std::chrono::year_month& ym,
const std::chrono::years& dy ) noexcept;  // (5) (desde C++20)
constexpr std::chrono::year_month operator-( const std::chrono::year_month& ym,
const std::chrono::months& dm ) noexcept;  // (6) (desde C++20)
constexpr std::chrono::months operator-( const std::chrono::year_month& ym1,
const std::chrono::year_month& ym2 ) noexcept;  // (7) (desde C++20)
```

  
1,2) Adiciona dy.count() anos a ym.

3,4) Adiciona dm.count() meses a ym.

5) Subtrai dy.count() anos de ym.

6) Subtrai dm.count() meses de ym.

7) Retorna a diferença em meses entre os dois pontos no tempo representados por ym1 e ym2.

Para durações que são conversíveis tanto para std::chrono::years quanto para std::chrono::months, as sobrecargas de `years` (1,2,5) são preferidas se a chamada fosse ambígua de outra forma.

### Valor de retorno

1,2) [std::chrono::year_month](<#/doc/chrono/year_month>)(ym.year() + dy, ym.month())

3,4) Um valor `year_month` `z` tal que z - ym == dm e z.ok() == true.

5) ym + -dy

6) ym + -dm

7)   
ym1.year() - ym2.year() + [std::chrono::months](<#/doc/chrono/duration>)(int(unsigned(ym1.month())) -  
int(unsigned(ym2.month())))

### Observações

O resultado da subtração de dois valores `year_month` é uma duração do tipo std::chrono::months. Esta unidade de duração representa o comprimento do mês Gregoriano médio (30.436875 dias), e a duração resultante não tem relação com o número real de dias no período de tempo em questão. Por exemplo, o resultado de 2017y/3 - 2017y/2 é [std::chrono::months](<#/doc/chrono/duration>)(1), mesmo que Fevereiro de 2017 contenha apenas 28 dias.

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <chrono>
     
    int main()
    {
        auto ym{std::chrono::year(2021)/std::chrono::July};
     
        ym = ym + std::chrono::months(14);
        assert(ym.month() == std::chrono::September);
        assert(ym.year() == std::chrono::year(2022));
     
        ym = ym - std::chrono::years(3);
        assert(ym.month() == std::chrono::month(9));
        assert(ym.year() == std::chrono::year(2019));
     
        ym = ym + (std::chrono::September - std::chrono::month(2));
        assert(ym.month() == std::chrono::April);
        assert(ym.year() == std::chrono::year(2020));
    }
```

### Veja também

[ operator+=operator-=](<#/doc/chrono/year_month/operator_arith>) | modifica o `year_month` por um certo número de meses ou anos   
(função membro pública)  