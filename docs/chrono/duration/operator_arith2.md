# std::chrono::duration&lt;Rep,Period&gt;::operator++, std::chrono::duration&lt;Rep,Period&gt;::operator--

```cpp
duration& operator++();  // (1) (desde C++11)
(constexpr desde C++17)
duration operator++( int );  // (2) (desde C++11)
(constexpr desde C++17)
duration& operator\--();  // (3) (desde C++11)
(constexpr desde C++17)
duration operator\--( int );  // (4) (desde C++11)
(constexpr desde C++17)
```

  
Incrementa ou decrementa o número de ticks para esta duration.

Se `rep_` for uma variável membro que armazena o número de ticks em um objeto duration, 

1) Equivalente a `++rep_; return *this;`.

2) Equivalente a `return duration(rep_++);`.

3) Equivalente a `--rep_; return *this;`.

4) Equivalente a `return duration(rep_--);`.

### Parâmetros

(nenhum) 

### Valor de retorno

1,3) Uma referência a esta duration após a modificação.

2,4) Uma cópia da duration feita antes da modificação.

### Exemplo

Execute este código
```
    #include <chrono>
    #include <iostream>
     
    int main()
    {
        std::chrono::hours h(1);
        std::chrono::minutes m = ++h;
        m--;
        std::cout << m.count() << " minutes\n";
    }
```

Saída: 
```
    119 minutes
```

### Veja também

[ operator+=operator-=operator*=operator/=operator%=](<#/doc/chrono/duration/operator_arith3>) |  implementa atribuição composta entre duas durations   
(função membro pública)  
[ operator+operator-operator*operator/operator%](<#/doc/chrono/duration/operator_arith4>)(C++11) |  implementa operações aritméticas com durations como argumentos   
(modelo de função)