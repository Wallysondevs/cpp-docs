# std::cosh(std::valarray)

Definido no cabeçalho `[<valarray>](<#/doc/header/valarray>)`

```c
template< class T >
valarray<T> cosh( const valarray<T>& va );
```

Para cada elemento em va, calcula o cosseno hiperbólico do valor do elemento.

### Parâmetros

- **va** — array de valores para aplicar a operação

### Valor de retorno

Array de valores contendo o cosseno hiperbólico dos valores em va.

### Notas

A função não qualificada (cosh) é usada para realizar o cálculo. Se tal função não estiver disponível, [std::cosh](<#/doc/numeric/math/cosh>) é usada devido à [pesquisa dependente de argumento](<#/doc/language/adl>).

A função pode ser implementada com um tipo de retorno diferente de [std::valarray](<#/doc/numeric/valarray>). Neste caso, o tipo de substituição possui as seguintes propriedades:

* Todas as funções membro const de [std::valarray](<#/doc/numeric/valarray>) são fornecidas.
* [std::valarray](<#/doc/numeric/valarray>), [std::slice_array](<#/doc/numeric/valarray/slice_array>), [std::gslice_array](<#/doc/numeric/valarray/gslice_array>), [std::mask_array](<#/doc/numeric/valarray/mask_array>) e [std::indirect_array](<#/doc/numeric/valarray/indirect_array>) podem ser construídos a partir do tipo de substituição.
* Para cada função que recebe um const [std::valarray](<#/doc/numeric/valarray>)&lt;T&gt;&, exceto [`begin()`](<#/doc/numeric/valarray/begin2>) e [`end()`](<#/doc/numeric/valarray/end2>)(desde C++11), funções idênticas que recebem os tipos de substituição devem ser adicionadas;
* Para cada função que recebe dois argumentos const [std::valarray](<#/doc/numeric/valarray>)&lt;T&gt;&, funções idênticas que recebem cada combinação de const [std::valarray](<#/doc/numeric/valarray>)&lt;T&gt;& e tipos de substituição devem ser adicionadas.
* O tipo de retorno não adiciona mais de dois níveis de aninhamento de template sobre o tipo de argumento mais profundamente aninhado.

### Possível implementação
```
    template<class T>
    valarray<T> cosh(const valarray<T>& va)
    {
        valarray<T> other = va;
        for (T& i : other)
            i = cosh(i);
    
        return other; // um objeto proxy pode ser retornado
    }
```

---

### Exemplo

Execute este código
```
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
        const auto sinh = std::sinh(x);
        const auto cosh = std::cosh(x);
        const auto z = (cosh * cosh) - (sinh * sinh);
    
        show("x", x);
        show("sinh(x)", sinh);
        show("cosh(x)", cosh);
        show("z", z);
    }
```

Saída:
```text
            x |       0.1 |       0.2 |       0.3 |       0.4 |
      sinh(x) |  0.100167 |  0.201336 |   0.30452 |  0.410752 |
      cosh(x) |     1.005 |   1.02007 |   1.04534 |   1.08107 |
            z |         1 |         1 |         1 |         1 |
```

### Veja também

[ sinh(std::valarray)](<#/doc/numeric/valarray/sinh>) | aplica a função [std::sinh](<#/doc/numeric/math/sinh>) a cada elemento de valarray
(modelo de função)
[ tanh(std::valarray)](<#/doc/numeric/valarray/tanh>) | aplica a função [std::tanh](<#/doc/numeric/math/tanh>) a cada elemento de valarray
(modelo de função)
[ coshcoshfcoshl](<#/doc/numeric/math/cosh>)(C++11)(C++11) | calcula o cosseno hiperbólico (\\({\small\cosh{x}}\\)cosh(x))
(função)
[ cosh(std::complex)](<#/doc/numeric/complex/cosh>) | calcula o cosseno hiperbólico de um número complexo (\\({\small\cosh{z}}\\)cosh(z))
(modelo de função)