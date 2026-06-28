# std::chrono::operator==,&lt;=&gt;(std::chrono::month)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
constexpr bool operator==( const std::chrono::month& x,
const std::chrono::month& y ) noexcept;
constexpr std::strong_ordering operator<=>( const std::chrono::month& x,
const std::chrono::month& y ) noexcept;
```

  
Compara os dois std::chrono::month x e y.

Os operadores `<`, `<=`, `>`, `>=`, e `!=` são [sintetizados](<#/doc/language/operators>) a partir de operator<=> e operator==, respectivamente.

### Valor de retorno

1) unsigned(x) == unsigned(y)

2) unsigned(x) <=> unsigned(y)

### Exemplo

Execute este código
```
    #include <chrono>
     
    int main()
    {
        constexpr std::chrono::month m1{6}, m2{8};
     
        static_assert
        (
            m1 < m2 && m1 == m1 && m1 <= m2 &&
            m2 > m1 && m2 != m1 && m2 >= m1 &&
            m1 <=> m2 != 0
        );
    }
```