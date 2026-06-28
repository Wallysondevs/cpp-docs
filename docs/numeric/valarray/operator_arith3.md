# operator+,-,*,/,%,&amp;,|,^,&lt;&lt;,&gt;&gt;,&amp;&amp;,|| (std::valarray)

Definido no cabeçalho `[<valarray>](<#/doc/header/valarray>)`

```c
template< class T >
std::valarray<T> operator+ ( const std::valarray<T>& lhs, const std::valarray<T>& rhs );
template< class T >
std::valarray<T> operator- ( const std::valarray<T>& lhs, const std::valarray<T>& rhs );
template< class T >
std::valarray<T> operator* ( const std::valarray<T>& lhs, const std::valarray<T>& rhs );
template< class T >
std::valarray<T> operator/ ( const std::valarray<T>& lhs, const std::valarray<T>& rhs );
template< class T >
std::valarray<T> operator% ( const std::valarray<T>& lhs, const std::valarray<T>& rhs );
template< class T >
std::valarray<T> operator& ( const std::valarray<T>& lhs, const std::valarray<T>& rhs );
template< class T >
std::valarray<T> operator
template< class T >
std::valarray<T> operator^ ( const std::valarray<T>& lhs, const std::valarray<T>& rhs );
template< class T >
std::valarray<T> operator<<( const std::valarray<T>& lhs, const std::valarray<T>& rhs );
template< class T >
std::valarray<T> operator>>( const std::valarray<T>& lhs, const std::valarray<T>& rhs );
template< class T >
std::valarray<bool> operator&&( const std::valarray<T>& lhs, const std::valarray<T>& rhs );
template< class T >
std::valarray<bool> operator
template< class T >
std::valarray<T> operator+ ( const typename std::valarray<T>::value_type & val,
const std::valarray<T>& rhs );
template< class T >
std::valarray<T> operator- ( const typename std::valarray<T>::value_type & val,
const std::valarray<T>& rhs );
template< class T >
std::valarray<T> operator* ( const typename std::valarray<T>::value_type & val,
const std::valarray<T>& rhs );
template< class T >
std::valarray<T> operator/ ( const typename std::valarray<T>::value_type & val,
const std::valarray<T>& rhs );
template< class T >
std::valarray<T> operator% ( const typename std::valarray<T>::value_type & val,
const std::valarray<T>& rhs );
template< class T >
std::valarray<T> operator& ( const typename std::valarray<T>::value_type & val,
const std::valarray<T>& rhs );
template< class T >
std::valarray<T> operator
const std::valarray<T>& rhs );
template< class T >
std::valarray<T> operator^ ( const typename std::valarray<T>::value_type & val,
const std::valarray<T>& rhs );
template< class T >
std::valarray<T> operator<<( const typename std::valarray<T>::value_type & val,
const std::valarray<T>& rhs );
template< class T >
std::valarray<T> operator>>( const typename std::valarray<T>::value_type & val,
const std::valarray<T>& rhs );
template< class T >
std::valarray<bool> operator&&( const typename std::valarray<T>::value_type & val,
const std::valarray<T>& rhs );
template< class T >
std::valarray<bool> operator
const std::valarray<T>& rhs );
template< class T >
std::valarray<T> operator+ ( const std::valarray<T>& lhs,
const typename std::valarray<T>::value_type & val );
template< class T >
std::valarray<T> operator- ( const std::valarray<T>& lhs,
const typename std::valarray<T>::value_type & val );
template< class T >
std::valarray<T> operator* ( const std::valarray<T>& lhs,
const typename std::valarray<T>::value_type & val );
template< class T >
std::valarray<T> operator/ ( const std::valarray<T>& lhs,
const typename std::valarray<T>::value_type & val );
template< class T >
std::valarray<T> operator% ( const std::valarray<T>& lhs,
const typename std::valarray<T>::value_type & val );
template< class T >
std::valarray<T> operator& ( const std::valarray<T>& lhs,
const typename std::valarray<T>::value_type & val );
template< class T >
std::valarray<T> operator
const typename std::valarray<T>::value_type & val );
template< class T >
std::valarray<T> operator^ ( const std::valarray<T>& lhs,
const typename std::valarray<T>::value_type & val );
template< class T >
std::valarray<T> operator<<( const std::valarray<T>& lhs,
const typename std::valarray<T>::value_type & val );
template< class T >
std::valarray<T> operator>>( const std::valarray<T>& lhs,
const typename std::valarray<T>::value_type & val );
template< class T >
std::valarray<bool> operator&&( const std::valarray<T>& lhs,
const typename std::valarray<T>::value_type & val );
template< class T >
std::valarray<bool> operator
const typename std::valarray<T>::value_type & val );
```

Aplica operadores binários a cada elemento de dois valarrays, ou de um valarray e um valor.

1) Os operadores funcionam em valarrays do mesmo tamanho e retornam um valarray com o mesmo tamanho dos parâmetros, com a operação aplicada a cada elemento dos dois argumentos.

2,3) Aplica o operador entre cada elemento do valarray e o escalar.

### Parâmetros

- **rhs** — um array numérico
- **lhs** — um array numérico
- **val** — um valor do tipo `T`

### Valor de retorno

Um valarray com o mesmo tamanho do parâmetro.

### Nota

O comportamento é indefinido quando os dois argumentos são valarrays com tamanhos diferentes.

A função pode ser implementada com um tipo de retorno diferente de [std::valarray](<#/doc/numeric/valarray>). Neste caso, o tipo de substituição possui as seguintes propriedades:

*   Todas as funções membro const de [std::valarray](<#/doc/numeric/valarray>) são fornecidas.
*   [std::valarray](<#/doc/numeric/valarray>), [std::slice_array](<#/doc/numeric/valarray/slice_array>), [std::gslice_array](<#/doc/numeric/valarray/gslice_array>), [std::mask_array](<#/doc/numeric/valarray/mask_array>) e [std::indirect_array](<#/doc/numeric/valarray/indirect_array>) podem ser construídos a partir do tipo de substituição.
*   Para cada função que aceita um const [std::valarray](<#/doc/numeric/valarray>)&lt;T&gt;&, exceto [`begin()`](<#/doc/numeric/valarray/begin2>) e [`end()`](<#/doc/numeric/valarray/end2>)(desde C++11), funções idênticas que aceitam os tipos de substituição devem ser adicionadas;
*   Para cada função que aceita dois argumentos const [std::valarray](<#/doc/numeric/valarray>)&lt;T&gt;&, funções idênticas que aceitam cada combinação de const [std::valarray](<#/doc/numeric/valarray>)&lt;T&gt;& e tipos de substituição devem ser adicionadas.
*   O tipo de retorno não adiciona mais de dois níveis de aninhamento de template sobre o tipo de argumento mais profundamente aninhado.

### Exemplo

Encontra raízes reais de múltiplas [equações quadráticas](<https://en.wikipedia.org/wiki/Quadratic_equation> "enwiki:Quadratic equation").

Execute este código
```cpp
    #include <cstddef>
    #include <iostream>
    #include <valarray>
     
    int main()
    {
        std::valarray<double> a(1, 8);
        std::valarray<double> b{1, 2, 3, 4, 5, 6, 7, 8};
        std::valarray<double> c = -b;
        // literals must also be of type T until LWG3074 (double in this case)
        std::valarray<double> d = std::sqrt(b * b - 4.0 * a * c);
        std::valarray<double> x1 = 2.0 * c / (-b + d);
        std::valarray<double> x2 = 2.0 * c / (-b - d);
        std::cout << "quadratic equation:  root 1:    root 2:   b: c:\n";
        for (std::size_t i = 0; i < a.size(); ++i)
            std::cout << a[i] << "·x² + " << b[i] << "·x + "
                      << c[i] << " = 0  " << std::fixed << x1[i]
                      << "  " << x2[i] << std::defaultfloat
                      << "  " << -x1[i] - x2[i]
                      << "  " << x1[i] * x2[i] << '\n';
    }
```

Saída:
```
    quadratic equation:  root 1:    root 2:   b: c:
    1·x² + 1·x + -1 = 0  -1.618034  0.618034  1  -1
    1·x² + 2·x + -2 = 0  -2.732051  0.732051  2  -2
    1·x² + 3·x + -3 = 0  -3.791288  0.791288  3  -3
    1·x² + 4·x + -4 = 0  -4.828427  0.828427  4  -4
    1·x² + 5·x + -5 = 0  -5.854102  0.854102  5  -5
    1·x² + 6·x + -6 = 0  -6.872983  0.872983  6  -6
    1·x² + 7·x + -7 = 0  -7.887482  0.887482  7  -7
    1·x² + 8·x + -8 = 0  -8.898979  0.898979  8  -8
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3074](<https://cplusplus.github.io/LWG/issue3074>) | C++98 | `T` é deduzido tanto do escalar quanto do `valarray` para (2,3), impedindo chamadas de tipos mistos | deduzir `T` apenas do `valarray`

### Veja também

[ operator+operator-operator~operator!](<#/doc/numeric/valarray/operator_arith>) | aplica um operador aritmético unário a cada elemento do valarray
(função membro pública)
[ operator+=operator-=operator*=operator/=operator%=operator&=operator|=operator^=operator<<=operator>>=](<#/doc/numeric/valarray/operator_arith2>) | aplica um operador de atribuição composta a cada elemento do valarray
(função membro pública)