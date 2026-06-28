# std::chrono::weekday::operator++, std::chrono::weekday::operator--

```cpp
constexpr std::chrono::weekday& operator++() noexcept;  // (1) (desde C++20)
constexpr std::chrono::weekday operator++( int ) noexcept;  // (2) (desde C++20)
constexpr std::chrono::weekday& operator\--() noexcept;  // (3) (desde C++20)
constexpr std::chrono::weekday operator\--( int ) noexcept;  // (4) (desde C++20)
```

Adiciona ou subtrai 1 do valor do dia da semana, reduzindo o resultado módulo 7 para um inteiro no intervalo `[`0`, `6`]`.

1,2) Executa `*this += [std::chrono::days](<#/doc/chrono/duration>){1};`.

3,4) Executa `*this -= [std::chrono::days](<#/doc/chrono/duration>){1};`.

### Parâmetros

(nenhum)

### Valor de retorno

1,3) Uma referência a este `weekday` após a modificação.

2,4) Uma cópia do `weekday` feita antes da modificação.

### Observações

Após uma chamada a uma dessas funções, [`ok()`](<#/doc/chrono/weekday/ok>) é sempre `true`.

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <chrono>
    #include <iostream>
    
    int main()
    {
        std::cout << std::boolalpha;
    
        std::chrono::weekday wd{0}; // Sunday is 0 or 7
    
        --wd;
        std::cout << (wd == std::chrono::Saturday) << ' ';
    
        ++wd;
        std::cout << (wd == std::chrono::Sunday) << '\n';
    
        wd = std::chrono::weekday{13};
        assert(!wd.ok());
        wd++;
        assert(wd.ok());
    }
```

Saída:
```
    true true
```

### Veja também

[ operator+=operator-=](<#/doc/chrono/weekday/operator_arith>) | adiciona ou subtrai um número de dias
(função membro pública)
[ operator+operator-](<#/doc/chrono/weekday/operator_arith_2>)(C++20) | realiza aritmética em `weekday`s
(função)