# std::tanh(std::valarray)

Definido no cabeçalho `[<valarray>](<#/doc/header/valarray>)`

```c
template< class T >
valarray<T> tanh( const valarray<T>& va );
```

Para cada elemento em `va`, calcula a tangente hiperbólica do valor do elemento.

### Parâmetros

- **va** — array de valores para aplicar a operação

### Valor de retorno

Array de valores contendo a tangente hiperbólica dos valores em `va`.

### Observações

A função não qualificada (`tanh`) é usada para realizar o cálculo. Se tal função não estiver disponível, `[std::tanh](<#/doc/numeric/math/tanh>)` é usada devido à [pesquisa dependente de argumento](<#/doc/language/adl>).

A função pode ser implementada com um tipo de retorno diferente de `[std::valarray](<#/doc/numeric/valarray>)`. Neste caso, o tipo de substituição possui as seguintes propriedades:

*   Todas as funções membro `const` de `[std::valarray](<#/doc/numeric/valarray>)` são fornecidas.
*   `[std::valarray](<#/doc/numeric/valarray>)`, `[std::slice_array](<#/doc/numeric/valarray/slice_array>)`, `[std::gslice_array](<#/doc/numeric/valarray/gslice_array>)`, `[std::mask_array](<#/doc/numeric/valarray/mask_array>)` e `[std::indirect_array](<#/doc/numeric/valarray/indirect_array>)` podem ser construídos a partir do tipo de substituição.
*   Para cada função que recebe um `const [std::valarray](<#/doc/numeric/valarray>)<T>&`, exceto [`begin()`](<#/doc/numeric/valarray/begin2>) e [`end()`](<#/doc/numeric/valarray/end2>)(desde C++11), funções idênticas que recebem os tipos de substituição devem ser adicionadas;
*   Para cada função que recebe dois argumentos `const [std::valarray](<#/doc/numeric/valarray>)<T>&`, funções idênticas que recebem cada combinação de `const [std::valarray](<#/doc/numeric/valarray>)<T>&` e tipos de substituição devem ser adicionadas.
*   O tipo de retorno não adiciona mais de dois níveis de aninhamento de template sobre o tipo de argumento mais profundamente aninhado.

### Possível implementação
```cpp
    template<class T>
    valarray<T> tanh(const valarray<T>& va)
    {
        valarray<T> other = va;
        for (T& i : other)
            i = tanh(i);
    
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
    
    auto show = 
    {
        std::cout << title << " :";
        for (auto x : va)
            std::cout << "  " << std::fixed << x;
        std::cout << '\n';
    };
    
    int main()
    {
        const std::valarray<double> x = {.0, .1, .2, .3};
        const std::valarray<double> sinh = std::sinh(x);
        const std::valarray<double> cosh = std::cosh(x);
        const std::valarray<double> tanh = std::tanh(x);
        const std::valarray<double> tanh_by_def = sinh / cosh;
        const std::valarray<double> tanh_2x = std::tanh(2.0 * x);
        const std::valarray<double> tanh_2x_by_def = 
            (2.0 * tanh) / (1.0 + std::pow(tanh, 2.0));
    
        show("x              ", x);
        show("tanh(x)        ", tanh);
        show("tanh(x) (def)  ", tanh_by_def);
        show("tanh(2*x)      ", tanh_2x);
        show("tanh(2*x) (def)", tanh_2x_by_def);
    }
```

Saída:
```
    x              :  0.000000  0.100000  0.200000  0.300000
    tanh(x)        :  0.000000  0.099668  0.197375  0.291313
    tanh(x) (def)  :  0.000000  0.099668  0.197375  0.291313
    tanh(2*x)      :  0.000000  0.197375  0.379949  0.537050
    tanh(2*x) (def):  0.000000  0.197375  0.379949  0.537050
```

### Veja também

[ sinh(std::valarray)](<#/doc/numeric/valarray/sinh>) | aplica a função `[std::sinh](<#/doc/numeric/math/sinh>)` a cada elemento de valarray
(modelo de função)
[ cosh(std::valarray)](<#/doc/numeric/valarray/cosh>) | aplica a função `[std::cosh](<#/doc/numeric/math/cosh>)` a cada elemento de valarray
(modelo de função)
[ tanhtanhftanhl](<#/doc/numeric/math/tanh>)(C++11)(C++11) | calcula a tangente hiperbólica (\\({\small\tanh{x}}\\)tanh(x))
(função)
[ tanh(std::complex)](<#/doc/numeric/complex/tanh>) | calcula a tangente hiperbólica de um número complexo (\\({\small\tanh{z}}\\)tanh(z))
(modelo de função)