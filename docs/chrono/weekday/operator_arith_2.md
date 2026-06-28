# std::chrono::operator+, std::chrono::operator- (std::chrono::weekday)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
constexpr std::chrono::weekday operator+( const std::chrono::weekday& wd,
const std::chrono::days& d ) noexcept;
constexpr std::chrono::weekday operator+( const std::chrono::days& d,
const std::chrono::weekday& wd ) noexcept;
constexpr std::chrono::weekday operator-( const std::chrono::weekday& wd,
const std::chrono::days& d ) noexcept;
constexpr std::chrono::days operator-( const std::chrono::weekday& wd1,
const std::chrono::weekday& wd2 ) noexcept;
```

1,2) Adiciona d.count() dias a wd. O valor do dia da semana contido no resultado é calculado primeiro avaliando static_cast&lt;long long&gt;(wd.c_encoding()) + d.count() e reduzindo-o módulo 7 para um inteiro no intervalo `[`​0​`, `6`]`.

3) Subtrai d.count() dias de wd. Equivalente a return wd + -d;.

4) Se wd1.ok() e wd2.ok() forem ambos verdadeiros, retorna um valor std::chrono::days d tal que d.count() está no intervalo `[`​0​`, `6`]` e wd2 + d == wd1. Caso contrário, o valor retornado é não especificado.

### Valor de retorno

1-3) Um std::chrono::weekday contendo um valor de dia da semana calculado conforme descrito acima.

4) Um std::chrono::days representando a distância entre wd1 e wd2.

### Observações

Desde que o cálculo não cause overflow, (1-3) sempre retornam um `weekday` válido mesmo que wd.ok() seja falso.

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
    
    int main()
    {
        std::cout << std::boolalpha;
    
        std::chrono::weekday wd{4};
        wd = wd + std::chrono::days(2);
        std::cout << (wd == std::chrono::weekday(6)) << ' '
                  << (wd == std::chrono::Saturday) << ' ';
    
        wd = wd - std::chrono::days(3);
        std::cout << (wd == std::chrono::weekday(3)) << ' '
                  << (wd == std::chrono::Wednesday) << ' ';
    
        wd = std::chrono::Tuesday;
        wd = wd + std::chrono::days{8}; // (((2 + 8) == 10) % 7) == 3;
        std::cout << (wd == std::chrono::Wednesday) << ' ';
    
        wd = wd + (std::chrono::Sunday - std::chrono::Thursday); // (3 + 3) == 6
        std::cout << (wd == std::chrono::Saturday) << '\n';
    }
```

Saída:
```
    true true true true true true
```

### Veja também

[ operator++operator++(int)operator--operator--(int)](<#/doc/chrono/weekday/operator_inc_dec>) | incrementa ou decrementa o dia da semana
(função membro pública)
[ operator+=operator-=](<#/doc/chrono/weekday/operator_arith>) | adiciona ou subtrai um número de dias
(função membro pública)