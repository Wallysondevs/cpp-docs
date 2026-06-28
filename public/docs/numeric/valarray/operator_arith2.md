# std::valarray&lt;T&gt;::operator+=,-=,*=,/=,%=,&amp;=,|=,&lt;&lt;=,&gt;&gt;=

```cpp
valarray<T>& operator+=( const valarray<T>& v );
valarray<T>& operator-=( const valarray<T>& v );
valarray<T>& operator*=( const valarray<T>& v );
valarray<T>& operator/=( const valarray<T>& v );
valarray<T>& operator%=( const valarray<T>& v );
valarray<T>& operator&=( const valarray<T>& v );
valarray<T>& operator|=( const valarray<T>& v );
valarray<T>& operator^=( const valarray<T>& v );
valarray<T>& operator<<=( const valarray<T>& v );
valarray<T>& operator>>=( const valarray<T>& v );  // (1)
valarray<T>& operator+=( const T& val );
valarray<T>& operator-=( const T& val );
valarray<T>& operator*=( const T& val );
valarray<T>& operator/=( const T& val );
valarray<T>& operator%=( const T& val );
valarray<T>& operator&=( const T& val );
valarray<T>& operator|=( const T& val );
valarray<T>& operator^=( const T& val );
valarray<T>& operator<<=( const T& val );
valarray<T>& operator>>=( const T& val );  // (2)
```

  
Aplica operadores de atribuição composta a cada elemento no array numérico.

1) Cada elemento recebe um valor obtido aplicando o operador correspondente ao valor anterior do elemento e ao elemento correspondente de v.

O comportamento é indefinido se size() != v.size().

O comportamento é indefinido se qualquer um dos valores em v for computado durante a atribuição e depender de qualquer um dos valores em *this, ou seja, se a expressão no lado direito da atribuição se referir a uma variável no lado esquerdo da atribuição.

2) Cada elemento recebe um valor obtido aplicando o operador correspondente ao valor anterior do elemento e ao valor de val.

### Parâmetros

v  |  \-  |  outro array numérico   
---|---|---
val  |  \-  |  um valor   
  
### Valor de retorno

*this

### Exceções

Pode lançar exceções definidas pela implementação.

### Observações

Cada um dos operadores só pode ser instanciado se os seguintes requisitos forem atendidos:

  * O operador indicado pode ser aplicado ao tipo `T`.
  * O valor resultante pode ser convertido de forma não ambígua para `T`.

### Exemplo

Execute este código
```
    #include <iostream>
    #include <string_view>
    #include <type_traits>
    #include <valarray>
     
    void o(std::string_view rem, auto const& v, bool nl = false)
    {
        if constexpr (std::is_scalar_v<std::decay_t<decltype(v)>>)
            std::cout << rem << " : " << v;
        else
        {
            for (std::cout << rem << " : { "; auto const e : v)
                std::cout << e << ' ';
            std::cout << '}';
        }
        std::cout << (nl ? "\n" : ";  ");
    }
     
    int main()
    {
        std::valarray<int> x, y;
     
        o("x", x = {1, 2, 3, 4}), o("y", y = {4, 3, 2, 1}), o("x += y", x += y, 1);
        o("x", x = {4, 3, 2, 1}), o("y", y = {3, 2, 1, 0}), o("x -= y", x -= y, 1);
        o("x", x = {1, 2, 3, 4}), o("y", y = {5, 4, 3, 2}), o("x *= y", x *= y, 1);
        o("x", x = {1, 3, 4, 7}), o("y", y = {1, 1, 3, 5}), o("x &= y", x &= y, 1);
        o("x", x = {0, 1, 2, 4}), o("y", y = {4, 3, 2, 1}), o("x <<=y", x <<=y, 1);
     
        std::cout << '\n';
     
        o("x", x = {1, 2, 3, 4}), o("x += 5", x += 5, 1);
        o("x", x = {1, 2, 3, 4}), o("x *= 2", x *= 2, 1);
        o("x", x = {8, 6, 4, 2}), o("x /= 2", x /= 2, 1);
        o("x", x = {8, 4, 2, 1}), o("x >>=1", x >>=1, 1);
    }
```

Output: 
```
    x : { 1 2 3 4 };  y : { 4 3 2 1 };  x += y : { 5 5 5 5 }
    x : { 4 3 2 1 };  y : { 3 2 1 0 };  x -= y : { 1 1 1 1 }
    x : { 1 2 3 4 };  y : { 5 4 3 2 };  x *= y : { 5 8 9 8 }
    x : { 1 3 4 7 };  y : { 1 1 3 5 };  x &= y : { 1 1 0 5 }
    x : { 0 1 2 4 };  y : { 4 3 2 1 };  x <<=y : { 0 8 8 8 }
     
    x : { 1 2 3 4 };  x += 5 : { 6 7 8 9 }
    x : { 1 2 3 4 };  x *= 2 : { 2 4 6 8 }
    x : { 8 6 4 2 };  x /= 2 : { 4 3 2 1 }
    x : { 8 4 2 1 };  x >>=1 : { 4 2 1 0 }
```

### Veja também

[ operator+operator-operator~operator!](<#/doc/numeric/valarray/operator_arith>) | aplica um operador aritmético unário a cada elemento do valarray   
(função membro pública)  
[ operator+operator-operator*operator/operator%operator&operator|operator^operator<&lt;operator&gt;>operator&&operator||](<#/doc/numeric/valarray/operator_arith3>) | aplica operadores binários a cada elemento de dois valarrays, ou a um valarray e um valor   
(modelo de função)