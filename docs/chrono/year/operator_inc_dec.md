# std::chrono::year::operator++, std::chrono::year::operator--

```cpp
constexpr std::chrono::year& operator++() noexcept;  // (1) (desde C++20)
constexpr std::chrono::year operator++( int ) noexcept;  // (2) (desde C++20)
constexpr std::chrono::year& operator\--() noexcept;  // (3) (desde C++20)
constexpr std::chrono::year operator\--( int ) noexcept;  // (4) (desde C++20)
```

Adiciona ou subtrai 1 do valor do ano.

1,2) Executa `*this += [std::chrono::years](<#/doc/chrono/duration>){1};`.

3,4) Executa `*this -= [std::chrono::years](<#/doc/chrono/duration>){1};`.

### Parâmetros

(nenhum)

### Valor de retorno

1,3) Uma referência a este `year` após a modificação.

2,4) Uma cópia do `year` feita antes da modificação.

### Observações

Se o resultado estiver fora do intervalo `[`-32767`, `32767`]`, o valor armazenado real é não especificado.

### Exemplo

Execute este código
```
    #include <chrono>
    #include <iostream>
     
    int main()
    {
        std::cout << std::boolalpha;
     
        std::chrono::year y{2020};
        std::cout << (++y == std::chrono::year(2021)) << ' ';
        std::cout << (--y == std::chrono::year(2020)) << '\n';
     
        using namespace std::literals::chrono_literals;
        y = 32767y;
        y++; //← unspecified, see ↑ Notes ↑
        std::cout << static_cast<int>(y) << '\n';
    }
```

Saída possível:
```
    true true
    -32768
```

### Veja também

[ operator+=operator-=](<#/doc/chrono/year/operator_arith>) | adiciona ou subtrai um número de anos de um `year`
(função membro pública)
[ operator+operator-](<#/doc/chrono/year/operator_arith_2>)(C++20) | realiza aritmética em `year`s
(função)