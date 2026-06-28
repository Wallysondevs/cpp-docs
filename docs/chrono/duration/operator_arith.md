# std::chrono::duration&lt;Rep,Period&gt;::operator+(unary), std::chrono::duration&lt;Rep,Period&gt;::operator-(unary)

```cpp
  // (1)
constexpr duration operator+() const;  // (até C++17)
constexpr std::common_type_t<duration> operator+() const;  // (desde C++17)
  // (2)
constexpr duration operator-() const;  // (até C++17)
constexpr std::common_type_t<duration> operator-() const;  // (desde C++17)
```

  
Implementa o mais unário e o menos unário para as durations.

Se `rep_` é uma variável membro que armazena o número de ticks em um objeto duration, e `D` é o tipo de retorno,

1) Equivalente a return D(*this);.

2) Equivalente a return D(-rep_);.

### Parâmetros

(nenhum) 

### Valor de retorno

1) Uma cópia deste objeto duration.

2) Uma cópia deste objeto duration, com o número de ticks negado.

### Exemplo

Execute este código
```cpp 
    #include <chrono>
    #include <iostream>
     
    int main()
    {
        constexpr std::chrono::seconds s1(-052);
        constexpr std::chrono::seconds s2 = -s1;
     
        std::cout << "Negated " << s1 << " are " << s2 << '\n';
    }
```

Saída: 
```
    Negated -42s are 42s
```

### Veja também

[ operator++operator++(int)operator--operator--(int)](<#/doc/chrono/duration/operator_arith2>) | incrementa ou decrementa a contagem de ticks   
(função membro pública)  
[ operator+operator-operator*operator/operator%](<#/doc/chrono/duration/operator_arith4>)(C++11) | implementa operações aritméticas com durations como argumentos   
(modelo de função)