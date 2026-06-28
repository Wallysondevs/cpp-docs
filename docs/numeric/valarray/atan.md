# std::atan(std::valarray)

Definido no cabeçalho `[<valarray>](<#/doc/header/valarray>)`

```c
template< class T >
valarray<T> atan( const valarray<T>& va );
```

Para cada elemento em `va`, calcula o arco tangente do valor do elemento.

### Parâmetros

- **va** — array de valores para aplicar a operação

### Valor de retorno

Array de valores contendo os arcos tangentes dos valores em `va`.

### Observações

A função não qualificada (`atan`) é usada para realizar o cálculo. Se tal função não estiver disponível, `[std::atan](<#/doc/numeric/math/atan>)` é usada devido à [pesquisa dependente de argumento](<#/doc/language/adl>).

A função pode ser implementada com um tipo de retorno diferente de `[std::valarray](<#/doc/numeric/valarray>)`. Neste caso, o tipo de substituição possui as seguintes propriedades:

*   Todas as funções membro `const` de `[std::valarray](<#/doc/numeric/valarray>)` são fornecidas.
*   `[std::valarray](<#/doc/numeric/valarray>)`, `[std::slice_array](<#/doc/numeric/valarray/slice_array>)`, `[std::gslice_array](<#/doc/numeric/valarray/gslice_array>)`, `[std::mask_array](<#/doc/numeric/valarray/mask_array>)` e `[std::indirect_array](<#/doc/numeric/valarray/indirect_array>)` podem ser construídos a partir do tipo de substituição.
*   Para cada função que recebe um `const [std::valarray](<#/doc/numeric/valarray>)<T>&`, exceto [`begin()`](<#/doc/numeric/valarray/begin2>) e [`end()`](<#/doc/numeric/valarray/end2>)(desde C++11), funções idênticas que recebem os tipos de substituição devem ser adicionadas;
*   Para cada função que recebe dois argumentos `const [std::valarray](<#/doc/numeric/valarray>)<T>&`, funções idênticas que recebem cada combinação de `const [std::valarray](<#/doc/numeric/valarray>)<T>&` e tipos de substituição devem ser adicionadas.
*   O tipo de retorno não adiciona mais de dois níveis de aninhamento de template sobre o tipo de argumento mais profundamente aninhado.

### Possível implementação
```cpp
    template<class T>
    valarray<T> atan(const valarray<T>& va)
    {
        valarray<T> other = va;
        for (T& i : other)
            i = atan(i);
    
        return other; // um objeto proxy pode ser retornado
    }
```

---

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cmath>
    #include <iostream>
    #include <valarray>
    
    auto show = <float>& va)
    {
        std::cout << title << " :";
        std::for_each(std::begin(va), std::end(va), 
             { std::cout << "  " << std::fixed << x; });
        std::cout << '\n';
    };
    
    int main()
    {
        const std::valarray<float> x = {.1f, .3f, .6f, .9f};
        const std::valarray<float> f = std::atan(x);
        const std::valarray<float> g = std::tan(f);
    
        show("x          ", x);
        show("f = atan(x)", f);
        show("g = tan(f) ", g);
    }
```

Saída:
```
    x          :  0.100000  0.300000  0.600000  0.900000
    f = atan(x):  0.099669  0.291457  0.540420  0.732815
    g = tan(f) :  0.100000  0.300000  0.600000  0.900000
```

### Veja também

[ asin(std::valarray)](<#/doc/numeric/valarray/asin>) | aplica a função `[std::asin](<#/doc/numeric/math/asin>)` a cada elemento de valarray
(modelo de função)
[ acos(std::valarray)](<#/doc/numeric/valarray/acos>) | aplica a função `[std::acos](<#/doc/numeric/math/acos>)` a cada elemento de valarray
(modelo de função)
[ atan2(std::valarray)](<#/doc/numeric/valarray/atan2>) | aplica a função `[std::atan2](<#/doc/numeric/math/atan2>)` a um valarray e um valor
(modelo de função)
[ tan(std::valarray)](<#/doc/numeric/valarray/tan>) | aplica a função `[std::tan](<#/doc/numeric/math/tan>)` a cada elemento de valarray
(modelo de função)
[ atanatanfatanl](<#/doc/numeric/math/atan>)(C++11)(C++11) | calcula o arco tangente (\\({\small\arctan{x}}\\)arctan(x))
(função)
[ atan(std::complex)](<#/doc/numeric/complex/atan>)(C++11) | calcula o arco tangente de um número complexo (\\({\small\arctan{z}}\\)arctan(z))
(modelo de função)