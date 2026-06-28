# std::atan2(std::valarray)

Definido no cabeçalho `[<valarray>](<#/doc/header/valarray>)`

```c
template< class T >
std::valarray<T> atan2( const std::valarray<T>& y, const std::valarray<T>& x );
template< class T >
std::valarray<T> atan2( const std::valarray<T>& y,
const typename std::valarray<T>::value_type& vx );
template< class T >
std::valarray<T> atan2( const typename std::valarray<T>::value_type& vy,
const std::valarray<T>& x );
```

Calcula a tangente inversa de y / x usando os sinais dos argumentos para determinar corretamente o quadrante.

1) Calcula a tangente inversa de cada par de valores correspondentes de y e x.

O comportamento é indefinido se x.size() != y.size().

2) Calcula a tangente inversa de vx e de cada valor no array numérico y.

3) Calcula a tangente inversa de vy e de cada valor no array numérico x.

### Parâmetros

- **x, y** — arrays numéricos para calcular a tangente inversa
- **vy, vx** — valores para calcular a tangente inversa

### Valor de retorno

Um array numérico contendo os resultados do cálculo da tangente inversa.

### Observações

A função não qualificada (atan2) é usada para realizar o cálculo. Se tal função não estiver disponível, [std::atan2](<#/doc/numeric/math/atan2>) é usada devido à [pesquisa dependente de argumento](<#/doc/language/adl>).

A função pode ser implementada com um tipo de retorno diferente de [std::valarray](<#/doc/numeric/valarray>). Neste caso, o tipo de substituição possui as seguintes propriedades:

* Todas as funções membro const de [std::valarray](<#/doc/numeric/valarray>) são fornecidas.
* [std::valarray](<#/doc/numeric/valarray>), [std::slice_array](<#/doc/numeric/valarray/slice_array>), [std::gslice_array](<#/doc/numeric/valarray/gslice_array>), [std::mask_array](<#/doc/numeric/valarray/mask_array>) e [std::indirect_array](<#/doc/numeric/valarray/indirect_array>) podem ser construídos a partir do tipo de substituição.
* Para cada função que recebe um const [std::valarray](<#/doc/numeric/valarray>)&lt;T&gt;&, exceto [`begin()`](<#/doc/numeric/valarray/begin2>) e [`end()`](<#/doc/numeric/valarray/end2>)(desde C++11), funções idênticas que recebem os tipos de substituição devem ser adicionadas;
* Para cada função que recebe dois argumentos const [std::valarray](<#/doc/numeric/valarray>)&lt;T&gt;&, funções idênticas que recebem cada combinação de const [std::valarray](<#/doc/numeric/valarray>)&lt;T&gt;& e tipos de substituição devem ser adicionadas.
* O tipo de retorno não adiciona mais de dois níveis de aninhamento de template sobre o tipo de argumento mais profundamente aninhado.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cmath>
    #include <iomanip>
    #include <iostream>
    #include <valarray>
    
    void show(char const* title, const std::valarray<double>& va)
    {
        std::cout << title << ' ';
        std::for_each(std::begin(va), std::end(va), 
        { 
            std::cout << ' ' << std::right << std::setw(4) << x << "°";
        });
        std::cout << '\n';
    }
    
    const double pi = std::acos(-1.0); // C++20: std::numbers::pi
    
    int main()
    {
        auto degrees_to_radians =  { return (pi * x / 180); };
        auto radians_to_degrees =  { return (180 * x / pi); };
    
        const std::valarray<double> degrees{-90, -60, -45, -30, 0, 30, 45, 60, 90};
        const std::valarray<double> radians = degrees.apply(degrees_to_radians);
    
        const auto sin = std::sin(radians);
        const auto cos = std::cos(radians);
    
        show("(1)", std::atan2(sin, cos).apply(radians_to_degrees));
        show("(2)", std::atan2(sin/cos, 1.0).apply(radians_to_degrees));
        show("(3)", std::atan2(1.0, cos/sin).apply(radians_to_degrees));
    }
```

Saída:
```
    (1)   -90°  -60°  -45°  -30°    0°   30°   45°   60°   90°
    (2)   -90°  -60°  -45°  -30°    0°   30°   45°   60°   90°
    (3)    90°  120°  135°  150°    0°   30°   45°   60°   90°
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3074](<https://cplusplus.github.io/LWG/issue3074>) | C++98 | `T` é deduzido tanto do escalar quanto do `valarray` para (2,3), não permitindo chamadas de tipos mistos | deduzir `T` apenas do `valarray`

### Veja também

[ asin(std::valarray)](<#/doc/numeric/valarray/asin>) | aplica a função [std::asin](<#/doc/numeric/math/asin>) a cada elemento de valarray
(modelo de função)
[ acos(std::valarray)](<#/doc/numeric/valarray/acos>) | aplica a função [std::acos](<#/doc/numeric/math/acos>) a cada elemento de valarray
(modelo de função)
[ atan(std::valarray)](<#/doc/numeric/valarray/atan>) | aplica a função [std::atan](<#/doc/numeric/math/atan>) a cada elemento de valarray
(modelo de função)
[ atan2atan2fatan2l](<#/doc/numeric/math/atan2>)(C++11)(C++11) | arco tangente, usando sinais para determinar quadrantes
(função)
[ arg](<#/doc/numeric/complex/arg>) | retorna o ângulo de fase
(modelo de função)