# std::chrono::year_month_day

Definido no header `[<chrono>](<#/doc/header/chrono>)`

```cpp
class year_month_day;  // (desde C++20)
```

A classe `year_month_day` representa um ano, mês e dia específicos. É um ponto no tempo baseado em campos, com uma resolução de std::chrono::days. A aritmética orientada a std::chrono::years e std::chrono::months é suportada diretamente. Uma conversão implícita para e de std::chrono::sys_days permite que a aritmética orientada a std::chrono::days seja realizada eficientemente.

`year_month_day` é um [`TriviallyCopyable`](<#/doc/named_req/TriviallyCopyable>) [`StandardLayoutType`](<#/doc/named_req/StandardLayoutType>).

### Funções membro

[ (constructor)](<#/doc/chrono/year_month_day/year_month_day>) | constrói um `year_month_day`
(função membro pública)
[ operator+=operator-=](<#/doc/chrono/year_month_day/operator_arith>) | modifica o ponto no tempo por um certo número de meses ou anos
(função membro pública)
[ yearmonthday](<#/doc/chrono/year_month_day/accessors>) | acessa o ano, mês e dia armazenados neste objeto
(função membro pública)
[ operator sys_daysoperator local_days](<#/doc/chrono/year_month_day/operator_days>) | converte para um [std::chrono::time_point](<#/doc/chrono/time_point>)
(função membro pública)
[ ok](<#/doc/chrono/year_month_day/ok>) | verifica se o `year_month_day` representa uma data válida
(função membro pública)

### Funções não-membro

[ operator==operator<=>](<#/doc/chrono/year_month_day/operator_cmp>)(C++20) | compara dois valores `year_month_day`
(função)
[ operator+operator-](<#/doc/chrono/year_month_day/operator_arith_2>)(C++20) | adiciona ou subtrai um `year_month_day` e um certo número de anos ou meses
(função)
[ operator<<](<#/doc/chrono/year_month_day/operator_ltlt>)(C++20) | envia um `year_month_day` para um stream
(template de função)
[ from_stream](<#/doc/chrono/year_month_day/from_stream>)(C++20) | analisa um `year_month_day` de um stream de acordo com o formato fornecido
(template de função)

### Classes auxiliares

[ std::formatter<std::chrono::year_month_day>](<#/doc/chrono/year_month_day/formatter>)(C++20) | suporte a formatação para `year_month_day`
(especialização de template de classe)
[ std::hash<std::chrono::year_month_day>](<#/doc/chrono/year_month_day/hash>)(C++26) | suporte a hash para `std::chrono::year_month_day`
(especialização de template de classe)

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
    
    int main()
    {
        const std::chrono::time_point now{std::chrono::system_clock::now()};
    
        const std::chrono::year_month_day ymd{std::chrono::floor<std::chrono::days>(now)};
    
        std::cout << "Current Year: " << static_cast<int>(ymd.year()) << ", "
                     "Month: " << static_cast<unsigned>(ymd.month()) << ", "
                     "Day: " << static_cast<unsigned>(ymd.day()) << "\n"
                     "ymd: " << ymd << '\n';
    }
```

Saída possível:
```
    Current Year: 2023, Month: 9, Day: 4
    ymd: 2023-09-04
```