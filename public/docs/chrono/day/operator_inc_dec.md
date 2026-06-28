# std::chrono::day::operator++, std::chrono::day::operator--

```cpp
constexpr std::chrono::day& operator++() noexcept;  // (1) (desde C++20)
constexpr std::chrono::day operator++( int ) noexcept;  // (2) (desde C++20)
constexpr std::chrono::day& operator\--() noexcept;  // (3) (desde C++20)
constexpr std::chrono::day operator\--( int ) noexcept;  // (4) (desde C++20)
```

Adiciona ou subtrai 1 do valor do dia.

1,2) Executa `*this += [std::chrono::days](<#/doc/chrono/duration>){1};`.

3,4) Executa `*this -= [std::chrono::days](<#/doc/chrono/duration>){1};`.

### Parâmetros

(nenhum)

### Valor de retorno

1,3) Uma referência a este `day` após a modificação.

2,4) Uma cópia do `day` feita antes da modificação.

### Notas

Se o resultado estiver fora do intervalo `[`​0​`, `255`]`, o valor armazenado real é não especificado.

### Exemplo

Execute este código
```
    #include <cassert>
    #include <chrono>
     
    int main()
    {
        std::chrono::day d{15};
     
        ++d;
        assert(d == std::chrono::day(16));
     
        --d;
        assert(d == std::chrono::day(15));
    }
```

### Veja também

[ operator+=operator-=](<#/doc/chrono/day/operator_arith>) | adiciona ou subtrai um número de dias
(função membro pública)
[ operator+operator-](<#/doc/chrono/day/operator_arith_2>)(C++20) | adiciona ou subtrai um número de dias e um `day`, ou encontra a diferença entre dois `day`s
(função)