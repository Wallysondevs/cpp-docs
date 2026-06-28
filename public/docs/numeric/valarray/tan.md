# std::tan(std::valarray)

Definido no cabeçalho `[<valarray>](<#/doc/header/valarray>)`

```c
template< class T >
valarray<T> tan( const valarray<T>& va );
```

Para cada elemento em `va`, calcula a tangente do valor do elemento.

### Parâmetros

- **va** — array de valores para aplicar a operação

### Valor de retorno

Array de valores contendo as tangentes dos valores em `va`.

### Observações

A função não qualificada (`tan`) é usada para realizar o cálculo. Se tal função não estiver disponível, `[std::tan](<#/doc/numeric/math/tan>)` é usada devido à [pesquisa dependente de argumento](<#/doc/language/adl>).

A função pode ser implementada com um tipo de retorno diferente de `[std::valarray](<#/doc/numeric/valarray>)`. Neste caso, o tipo de substituição possui as seguintes propriedades:

*   Todas as funções membro `const` de `[std::valarray](<#/doc/numeric/valarray>)` são fornecidas.
*   `[std::valarray](<#/doc/numeric/valarray>)`, `[std::slice_array](<#/doc/numeric/valarray/slice_array>)`, `[std::gslice_array](<#/doc/numeric/valarray/gslice_array>)`, `[std::mask_array](<#/doc/numeric/valarray/mask_array>)` e `[std::indirect_array](<#/doc/numeric/valarray/indirect_array>)` podem ser construídos a partir do tipo de substituição.
*   Para cada função que recebe um `const [std::valarray](<#/doc/numeric/valarray>)<T>&`, exceto [`begin()`](<#/doc/numeric/valarray/begin2>) e [`end()`](<#/doc/numeric/valarray/end2>)(desde C++11), funções idênticas que recebem os tipos de substituição devem ser adicionadas;
*   Para cada função que recebe dois argumentos `const [std::valarray](<#/doc/numeric/valarray>)<T>&`, funções idênticas que recebem cada combinação de `const [std::valarray](<#/doc/numeric/valarray>)<T>&` e tipos de substituição devem ser adicionadas.
*   O tipo de retorno não adiciona mais de dois níveis de aninhamento de template sobre o tipo de argumento mais profundamente aninhado.

### Possível implementação
```cpp
    template<class T>
    valarray<T> tan(const valarray<T>& va)
    {
        valarray<T> other = va;
        for (T& i : other)
            i = tan(i);
    
        return other; // um objeto proxy pode ser retornado
    }
```

---

### Exemplo

Execute este código
```cpp
    #include <cmath>
    #include <iostream>
    #include <valarray>
    
    auto show = <double>& va)
    {
        std::cout << title << " :";
        for (auto x : va)
            std::cout << "  " << std::fixed << x;
        std::cout << '\n';
    };
    
    int main()
    {
        const std::valarray<double> x = {.0, .1, .2, .3};
        const std::valarray<double> y = std::tan(x);
        const std::valarray<double> z = std::atan(y);
    
        show("x          ", x);
        show("y = tan(x) ", y);
        show("z = atan(y)", z);
    }
```

Saída:
```
    x          :  0.000000  0.100000  0.200000  0.300000
    y = tan(x) :  0.000000  0.100335  0.202710  0.309336
    z = atan(y):  0.000000  0.100000  0.200000  0.300000
```

### Veja também

[ sin(std::valarray)](<#/doc/numeric/valarray/sin>) | aplica a função `[std::sin](<#/doc/numeric/math/sin>)` a cada elemento de valarray
(modelo de função)
[ cos(std::valarray)](<#/doc/numeric/valarray/cos>) | aplica a função `[std::cos](<#/doc/numeric/math/cos>)` a cada elemento de valarray
(modelo de função)
[ atan(std::valarray)](<#/doc/numeric/valarray/atan>) | aplica a função `[std::atan](<#/doc/numeric/math/atan>)` a cada elemento de valarray
(modelo de função)
[ tantanftanl](<#/doc/numeric/math/tan>)(C++11)(C++11) | calcula a tangente (\\({\small\tan{x}}\\)tan(x))
(função)
[ tan(std::complex)](<#/doc/numeric/complex/tan>) | calcula a tangente de um número complexo (\\({\small\tan{z}}\\)tan(z))
(modelo de função)