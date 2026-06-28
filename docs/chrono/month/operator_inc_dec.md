# std::chrono::month::operator++, std::chrono::month::operator--

```cpp
constexpr std::chrono::month& operator++() noexcept;  // (1) (desde C++20)
constexpr std::chrono::month operator++( int ) noexcept;  // (2) (desde C++20)
constexpr std::chrono::month& operator\--() noexcept;  // (3) (desde C++20)
constexpr std::chrono::month operator\--( int ) noexcept;  // (4) (desde C++20)
```

  
Adiciona ou subtrai 1 do valor do mês, reduzindo o resultado módulo 12 para um inteiro no intervalo `[`1`, `12`]`. 

1,2) Executa *this += [std::chrono::months](<#/doc/chrono/duration>){1};.

3,4) Executa *this -= [std::chrono::months](<#/doc/chrono/duration>){1};.

### Parâmetros

(nenhum) 

### Valor de retorno

1,3) Uma referência a este `month` após a modificação.

2,4) Uma cópia do `month` feita antes da modificação.

### Observações

Após uma chamada a uma dessas funções, ok() é sempre verdadeiro. 

### Exemplo

Execute este código
```cpp 
    #include <cassert>
    #include <chrono>
    #include <iostream>
    
    int main()
    {
        std::chrono::month m{6};
    
        ++m;
        assert(m == std::chrono::month(7));
    
        --m;
        assert(m == std::chrono::month(6));
    
        m = std::chrono::December;
        m++; // rounds up to January
        assert(m.ok());
        std::cout << unsigned(m) << '\n';
    
        m = std::chrono::January;
        m--; // rounds down to December
        assert(m.ok());
        std::cout << unsigned(m) << '\n';
    }
```

Saída: 
```
    1
    12
```

### Veja também

[ operator+=operator-=](<#/doc/chrono/month/operator_arith>) | adiciona ou subtrai um número de meses   
(função membro pública)  
[ operator+operator-](<#/doc/chrono/month/operator_arith_2>)(C++20) | realiza aritmética em `month`s   
(função)