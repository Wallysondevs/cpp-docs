# std::chrono::year_month_day_last

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
class year_month_day_last;
```

A classe `year_month_day_last` representa o último dia de um ano e mês específicos. É um ponto no tempo baseado em campos, com uma resolução de std::chrono::days, sujeito à limitação de que só pode representar o último dia de um mês.

A aritmética orientada a std::chrono::years e std::chrono::months é suportada diretamente. Uma conversão implícita para std::chrono::sys_days permite que a aritmética orientada a std::chrono::days seja realizada de forma eficiente.

`year_month_day_last` é um [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>) [StandardLayoutType](<#/doc/named_req/StandardLayoutType>).

### Funções membro

[ (constructor)](<#/doc/chrono/year_month_day_last/year_month_day_last>) | constrói um objeto `year_month_day_last`
(função membro pública)
[ operator+=operator-=](<#/doc/chrono/year_month_day_last/operator_arith>) | modifica o ponto no tempo por um certo número de meses ou anos
(função membro pública)
[ yearmonthdaymonth_day_last](<#/doc/chrono/year_month_day_last/accessors>) | acessa os campos deste objeto
(função membro pública)
[ operator sys_daysoperator local_days](<#/doc/chrono/year_month_day_last/operator_days>) | converte para um [std::chrono::time_point](<#/doc/chrono/time_point>)
(função membro pública)
[ ok](<#/doc/chrono/year_month_day_last/ok>) | verifica se este objeto representa uma data válida
(função membro pública)

### Funções não-membro

[ operator==operator<=>](<#/doc/chrono/year_month_day_last/operator_cmp>)(C++20) | compara dois valores `year_month_day_last`
(função)
[ operator+operator-](<#/doc/chrono/year_month_day_last/operator_arith_2>)(C++20) | adiciona ou subtrai um `year_month_day_last` e um certo número de anos ou meses
(função)
[ operator<<](<#/doc/chrono/year_month_day_last/operator_ltlt>)(C++20) | envia um `year_month_day_last` para um stream
(template de função)

### Classes auxiliares

[ std::formatter<std::chrono::year_month_day_last>](<#/doc/chrono/year_month_day_last/formatter>)(C++20) | suporte a formatação para `year_month_day_last`
(especialização de template de classe)
[ std::hash<std::chrono::year_month_day_last>](<#/doc/chrono/year_month_day_last/hash>)(C++26) | suporte a hash para `std::chrono::year_month_day_last`
(especialização de template de classe)

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
    
    int main()
    {
        const auto ymd = []
        {
            return std::chrono::floor<std::chrono::days>(std::chrono::system_clock::now());
        };
    
        const std::chrono::year_month_day_last ymdl
        {
            ymd().year(), yd().month() / std::chrono::last
        };
    
        std::cout << "The last day of present month (" << ymdl << ") is: "
                  << std::chrono::year_month_day{ymdl}.day() << '\n';
    
        // The 'last' object can be placed wherever it is legal to place a 'day':
        using namespace std::chrono;
        constexpr std::chrono::year_month_day_last
            ymdl1 = 2023y / February / last,
            ymdl2 = last / February / 2023y,
            ymdl3 = February / last / 2023y;
        static_assert(ymdl1 == ymdl2 && ymdl2 == ymdl3);
    }
```

Saída possível:
```
    The last day of present month (2023/Aug/last) is: 31
```

### Veja também

[ year_month_day](<#/doc/chrono/year_month_day>)(C++20) | representa um [`year`](<#/doc/chrono/year>), [`month`](<#/doc/chrono/month>) e [`day`](<#/doc/chrono/day>) específicos
(classe)