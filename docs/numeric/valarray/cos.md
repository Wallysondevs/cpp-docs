# std::cos(std::valarray)

Definido no cabeçalho `[<valarray>](<#/doc/header/valarray>)`

```c
template< class T >
valarray<T> cos( const valarray<T>& va );
```

Para cada elemento em va, calcula o cosseno do valor do elemento.

### Parâmetros

- **va** — array de valores para aplicar a operação

### Valor de retorno

Array de valores contendo os cossenos dos valores em va.

### Observações

Uma função não qualificada (cos) é usada para realizar o cálculo. Se tal função não estiver disponível, [std::cos](<#/doc/numeric/math/cos>) é usado devido à [pesquisa dependente de argumento](<#/doc/language/adl>).

A função pode ser implementada com um tipo de retorno diferente de [std::valarray](<#/doc/numeric/valarray>). Neste caso, o tipo de substituição possui as seguintes propriedades:

*   Todas as funções membro const de [std::valarray](<#/doc/numeric/valarray>) são fornecidas.
*   [std::valarray](<#/doc/numeric/valarray>), [std::slice_array](<#/doc/numeric/valarray/slice_array>), [std::gslice_array](<#/doc/numeric/valarray/gslice_array>), [std::mask_array](<#/doc/numeric/valarray/mask_array>) e [std::indirect_array](<#/doc/numeric/valarray/indirect_array>) podem ser construídos a partir do tipo de substituição.
*   Para cada função que recebe um const [std::valarray](<#/doc/numeric/valarray>)&lt;T&gt;&, exceto [`begin()`](<#/doc/numeric/valarray/begin2>) e [`end()`](<#/doc/numeric/valarray/end2>)(desde C++11), funções idênticas que recebem os tipos de substituição devem ser adicionadas;
*   Para cada função que recebe dois argumentos const [std::valarray](<#/doc/numeric/valarray>)&lt;T&gt;&, funções idênticas que recebem cada combinação de const [std::valarray](<#/doc/numeric/valarray>)&lt;T&gt;& e tipos de substituição devem ser adicionadas.
*   O tipo de retorno não adiciona mais de dois níveis de aninhamento de template sobre o tipo de argumento mais profundamente aninhado.

### Possível implementação
```cpp
    template<class T>
    valarray<T> cos(const valarray<T>& va)
    {
        valarray<T> other = va;
        for (T& i : other)
            i = cos(i);
    
        return other; // proxy object may be returned
    }
```

---

### Exemplo

Execute este código
```cpp
    #include <cmath>
    #include <iomanip>
    #include <iostream>
    #include <valarray>
    
    void show(const char* title, const std::valarray<float>& data)
    {
        const int w{9};
        std::cout << std::setw(w) << title << " | ";
        for (float x : data)
            std::cout << std::setw(w) << x << " | ";
        std::cout << '\n';
    }
    
    int main()
    {
        const std::valarray<float> x{.1, .2, .3, .4};
        const auto sin = std::sin(x);
        const auto cos = std::cos(x);
        const auto z = (sin * sin) + (cos * cos);
    
        show("x", x);
        show("sin(x)", sin);
        show("cos(x)", cos);
        show("z", z);
    }
```

Saída:
```text
            x |       0.1 |       0.2 |       0.3 |       0.4 | 
       sin(x) | 0.0998334 |  0.198669 |   0.29552 |  0.389418 | 
       cos(x) |  0.995004 |  0.980067 |  0.955337 |  0.921061 | 
            z |         1 |         1 |         1 |         1 |
```

### Veja também

[ sin(std::valarray)](<#/doc/numeric/valarray/sin>) | aplica a função [std::sin](<#/doc/numeric/math/sin>) a cada elemento de valarray
(modelo de função)
[ tan(std::valarray)](<#/doc/numeric/valarray/tan>) | aplica a função [std::tan](<#/doc/numeric/math/tan>) a cada elemento de valarray
(modelo de função)
[ acos(std::valarray)](<#/doc/numeric/valarray/acos>) | aplica a função [std::acos](<#/doc/numeric/math/acos>) a cada elemento de valarray
(modelo de função)
[ coscosfcosl](<#/doc/numeric/math/cos>)(C++11)(C++11) | calcula o cosseno (\\({\small\cos{x}}\\)cos(x))
(função)
[ cos(std::complex)](<#/doc/numeric/complex/cos>) | calcula o cosseno de um número complexo (\\({\small\cos{z}}\\)cos(z))
(modelo de função)