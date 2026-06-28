# std::chrono::weekday_indexed::weekday_indexed

```cpp
weekday_indexed() = default;  // (1) (desde C++20)
constexpr weekday_indexed( const std::chrono::weekday& wd, unsigned index ) noexcept;  // (2) (desde C++20)
```

Constrói um `weekday_indexed`.

1) O construtor padrão deixa tanto o `std::chrono::weekday` quanto o valor do índice não inicializados.

2) Constrói um `weekday_indexed` armazenando o weekday `wd` e o índice `index`. Os valores mantidos são não especificados se `!wd.ok() || index > 7`.

### Notes

Uma maneira mais conveniente de construir um `weekday_indexed` é com o `operator[]` de `weekday`, ou seja, `wd[index]`.

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
    using namespace std::chrono;
    
    int main()
    {
        constexpr auto third_friday = weekday_indexed(Friday, 3); // uses constructor (2)
        static_assert(third_friday == Friday[3]);
    
        weekday_indexed wdi = Tuesday[2]; // represents the 2nd Tuesday
        std::cout << year_month_day{ wdi / October / 2019y } << '\n';
    }
```

Saída possível:
```
    2019-10-08
```

### Veja também

[ operator[]](<#/doc/chrono/weekday/operator_at>) | sintaxe de conveniência para construir um [`weekday_indexed`](<#/doc/chrono/weekday_indexed>) ou [`weekday_last`](<#/doc/chrono/weekday_last>) a partir deste `weekday`
(função membro pública de `std::chrono::weekday`)