# std::chrono::duration&lt;Rep,Period&gt;::operator+=, -=, *=, /=, %=

```cpp
  // (1)
duration& operator+=( const duration& d );  // (desde C++11)
(constexpr desde C++17)
  // (2)
duration& operator-=( const duration& d );  // (desde C++11)
(constexpr desde C++17)
  // (3)
duration& operator*=( const rep& rhs );  // (desde C++11)
(constexpr desde C++17)
  // (4)
duration& operator/=( const rep& rhs );  // (desde C++11)
(constexpr desde C++17)
  // (5)
duration& operator%=( const rep& rhs );  // (desde C++11)
(constexpr desde C++17)
  // (6)
duration& operator%=( const duration& rhs );  // (desde C++11)
(constexpr desde C++17)
```

  
Realiza atribuições compostas entre duas durations com o mesmo período ou entre uma duration e um valor de contagem de ticks.

Se `rep_` é a variável membro que armazena o número de ticks neste objeto duration,

1) Equivalente a `rep_ += d.count(); return *this;`.

2) Equivalente a `rep_ -= d.count(); return *this;`.

3) Equivalente a `rep_ *= rhs; return *this;`.

4) Equivalente a `rep_ /= rhs; return *this;`.

5) Equivalente a `rep_ %= rhs; return *this;`.

6) Equivalente a `rep_ %= d.count(); return *this;`.

### Parâmetros

d  |  \-  |  duration no lado direito do operador   
---|---|---
rhs  |  \-  |  número de ticks no lado direito do operador   
  
### Valor de retorno

Uma referência a esta duration após a modificação.

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
     
    int main()
    {
        std::chrono::minutes m(11);
        m *= 2;
        m += std::chrono::hours(10); // hours implicitly convert to minutes
        std::cout << m.count() << " minutes equals "
                  << std::chrono::duration_cast<std::chrono::hours>(m).count() 
                  << " hours and ";
        m %= std::chrono::hours(1);
        std::cout << m.count() << " minutes\n";
    }
```

Saída: 
```
    622 minutes equals 10 hours and 22 minutes
```

### Veja também

[ operator++operator++(int)operator--operator--(int)](<#/doc/chrono/duration/operator_arith2>) | incrementa ou decrementa a contagem de ticks   
(função membro pública)  
[ operator+operator-operator*operator/operator%](<#/doc/chrono/duration/operator_arith4>)(C++11) | implementa operações aritméticas com durations como argumentos   
(modelo de função)