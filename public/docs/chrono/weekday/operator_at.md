# std::chrono::weekday::operator[]

```cpp
constexpr std::chrono::weekday_indexed
operator const noexcept;  // (1) (desde C++20)
constexpr std::chrono::weekday_last
operator ) const noexcept;  // (2) (desde C++20)
```

  
1) Constrói um weekday_indexed a partir de *this e `index`. O resultado representa o `index`-ésimo dia da semana em algum mês ainda a ser especificado. Se `index` não estiver no intervalo `[`​0​`, `7`]` ou se !ok(), os valores (um dia da semana subjacente e um índice) mantidos no resultado são não especificados.

2) Constrói um weekday_last a partir de *this. O resultado representa o último dia da semana em algum mês ainda a ser especificado.

### Valor de retorno

1) [std::chrono::weekday_indexed](<#/doc/chrono/weekday_indexed>)(*this, index)

2) [std::chrono::weekday_last](<#/doc/chrono/weekday_last>)(*this)

### Exemplo

Run this code
```
    #include <chrono>
    #include <iostream>
    using namespace std::chrono;
     
    int main()
    {
        constexpr auto second_tuesday_in_October_2019 =
            year_month_day{Tuesday[2] / October / 2019y};
     
        constexpr auto last_tuesday_in_October_2019 =
            year_month_day{Tuesday[last] / October / 2019y};
     
        std::cout << second_tuesday_in_October_2019 << '\n'
                  << last_tuesday_in_October_2019 << '\n'; 
    }
```

Possible output: 
```
    2019-10-08
    2019-10-29
```