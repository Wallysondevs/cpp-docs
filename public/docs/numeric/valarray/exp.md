# std::exp(std::valarray)

Definido no cabeçalho `[<valarray>](<#/doc/header/valarray>)`

```c
template< class T >
valarray<T> exp( const valarray<T>& va );
```

  
Para cada elemento em `va`, calcula _e_ elevado à potência igual ao valor do elemento.

### Parâmetros

va  |  \-  |  array de valores para aplicar a operação   
  
### Valor de retorno

Array de valores contendo _e_ elevado pelos valores em `va`.

### Observações

A função não qualificada (`exp`) é usada para realizar o cálculo. Se tal função não estiver disponível, [std::exp](<#/doc/numeric/math/exp>) é usada devido à [pesquisa dependente de argumento](<#/doc/language/adl>).

A função pode ser implementada com um tipo de retorno diferente de [std::valarray](<#/doc/numeric/valarray>). Neste caso, o tipo de substituição possui as seguintes propriedades:

  * Todas as funções membro `const` de [std::valarray](<#/doc/numeric/valarray>) são fornecidas.
  * [std::valarray](<#/doc/numeric/valarray>), [std::slice_array](<#/doc/numeric/valarray/slice_array>), [std::gslice_array](<#/doc/numeric/valarray/gslice_array>), [std::mask_array](<#/doc/numeric/valarray/mask_array>) e [std::indirect_array](<#/doc/numeric/valarray/indirect_array>) podem ser construídos a partir do tipo de substituição.
  * Para cada função que recebe um `const [std::valarray](<#/doc/numeric/valarray>)<T>&`, exceto [`begin()`](<#/doc/numeric/valarray/begin2>) e [`end()`](<#/doc/numeric/valarray/end2>)(desde C++11), funções idênticas que recebem os tipos de substituição devem ser adicionadas;
  * Para cada função que recebe dois argumentos `const [std::valarray](<#/doc/numeric/valarray>)<T>&`, funções idênticas que recebem cada combinação de `const [std::valarray](<#/doc/numeric/valarray>)<T>&` e tipos de substituição devem ser adicionadas.
  * O tipo de retorno não adiciona mais de dois níveis de aninhamento de template sobre o tipo de argumento mais profundamente aninhado.

### Possível implementação
```cpp
    template<class T>
    valarray<T> exp(const valarray<T>& va)
    {
        valarray<T> other = va;
        for (T& i : other)
            i = exp(i);
     
        return other; // proxy object may be returned
    }
```
---  
  
### Exemplo

Este exemplo demonstra a [identidade de Euler eiπ = -1](<https://en.wikipedia.org/wiki/Euler's_identity> "enwiki:Euler's identity") e os expoentes relacionados.

Execute este código
```cpp
    #include <complex>
    #include <iostream>
    #include <numbers>
    #include <valarray>
     
    int main()
    {
        const double pi = std::numbers::pi;
        std::valarray<std::complex<double>> v =
        {
            {0, 0}, {0, pi / 2}, {0, pi}, {0, 3 * pi / 2}, {0, 2 * pi}
        };
        std::valarray<std::complex<double>> v2 = std::exp(v);
        for (std::cout << std::showpos << std::fixed; auto n : v2)
            std::cout << n << '\n';
    }
```

Saída: 
```
    (+1.000000,+0.000000)
    (+0.000000,+1.000000)
    (-1.000000,+0.000000)
    (-0.000000,-1.000000)
    (+1.000000,-0.000000)
```

### Veja também

[ log(std::valarray)](<#/doc/numeric/valarray/log>) | aplica a função [std::log](<#/doc/numeric/math/log>) a cada elemento de valarray   
(modelo de função)  
[ expexpfexpl](<#/doc/numeric/math/exp>)(C++11)(C++11) | retorna e elevado à potência dada (\\({\small e^x}\\)ex)   
(função)  
[ exp(std::complex)](<#/doc/numeric/complex/exp>) | exponencial complexa de base _e_   
(modelo de função)