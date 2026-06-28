# std::sinh(std::valarray)

Definido no cabeçalho `[<valarray>](<#/doc/header/valarray>)`

```c
template< class T >
valarray<T> sinh( const valarray<T>& va );
```

Para cada elemento em `va`, calcula o seno hiperbólico do valor do elemento.

### Parâmetros

- **va** — array de valores para aplicar a operação

### Valor de retorno

Array de valores contendo o seno hiperbólico dos valores em `va`.

### Observações

A função não qualificada (`sinh`) é usada para realizar o cálculo. Se tal função não estiver disponível, `[std::sinh](<#/doc/numeric/math/sinh>)` é usada devido à [pesquisa dependente de argumento](<#/doc/language/adl>).

A função pode ser implementada com um tipo de retorno diferente de `[std::valarray](<#/doc/numeric/valarray>)`. Neste caso, o tipo de substituição possui as seguintes propriedades:

*   Todas as funções membro `const` de `[std::valarray](<#/doc/numeric/valarray>)` são fornecidas.
*   `[std::valarray](<#/doc/numeric/valarray>)`, `[std::slice_array](<#/doc/numeric/valarray/slice_array>)`, `[std::gslice_array](<#/doc/numeric/valarray/gslice_array>)`, `[std::mask_array](<#/doc/numeric/valarray/mask_array>)` e `[std::indirect_array](<#/doc/numeric/valarray/indirect_array>)` podem ser construídos a partir do tipo de substituição.
*   Para cada função que recebe um `const [std::valarray](<#/doc/numeric/valarray>)<T>&`, exceto [`begin()`](<#/doc/numeric/valarray/begin2>) e [`end()`](<#/doc/numeric/valarray/end2>)(desde C++11), funções idênticas que recebem os tipos de substituição devem ser adicionadas;
*   Para cada função que recebe dois argumentos `const [std::valarray](<#/doc/numeric/valarray>)<T>&`, funções idênticas que recebem cada combinação de `const [std::valarray](<#/doc/numeric/valarray>)<T>&` e tipos de substituição devem ser adicionadas.
*   O tipo de retorno não adiciona mais de dois níveis de aninhamento de template sobre o tipo de argumento mais profundamente aninhado.

### Possível implementação
```cpp
    template<class T>
    valarray<T> sinh(const valarray<T>& va)
    {
        valarray<T> other = va;
        for (T& i : other)
            i = sinh(i);
    
        return other; // um objeto proxy pode ser retornado
    }
```

---

### Exemplo

Execute este código
```cpp
    #include <cmath>
    #include <complex>
    #include <iomanip>
    #include <iostream>
    #include <valarray>
    
    template<typename T>
    void show(char const* title, const std::valarray<T>& va)
    {
        std::cout << title << " : " << std::right;
        for (T x : va)
            std::cout << std::fixed << x << ' ';
        std::cout << '\n';
    }
    
    template<typename T>
    void sinh_for(std::valarray<T> const& z)
    {
        // O seno hiperbólico é sinh(z) = (eᶻ - e⁻ᶻ) / 2.
    
        const std::valarray<T> sinh_z{std::sinh(z)};
        const std::valarray<T> e_z{std::exp(z)};
        const std::valarray<T> e_neg_z{std::exp(-z)};
        const std::valarray<T> sinh_def{(e_z - e_neg_z) / 2.0f};
    
        show("n         ", z);
        show("sinh(n)   ", sinh_z);
        show("(eⁿ-e⁻ⁿ)/2", sinh_def);
    
        std::cout.put('\n');
    }
    
    int main()
    {
        sinh_for(std::valarray<float>{-.2f, -.1f, 0.f, .1f, .2f, INFINITY});
        sinh_for(std::valarray<std::complex<double>>{{-.2,-.1}, {.2,.1}});
    }
```

Saída:
```
    n         : -0.200000 -0.100000 0.000000 0.100000 0.200000 inf 
    sinh(n)   : -0.201336 -0.100167 0.000000 0.100167 0.201336 inf 
    (eⁿ-e⁻ⁿ)/2: -0.201336 -0.100167 0.000000 0.100167 0.201336 inf 
    
    n         : (-0.200000,-0.100000) (0.200000,0.100000) 
    sinh(n)   : (-0.200330,-0.101837) (0.200330,0.101837) 
    (eⁿ-e⁻ⁿ)/2: (-0.200330,-0.101837) (0.200330,0.101837)
```

### Veja também

[ cosh(std::valarray)](<#/doc/numeric/valarray/cosh>) | aplica a função `[std::cosh](<#/doc/numeric/math/cosh>)` a cada elemento de valarray
(modelo de função)
[ tanh(std::valarray)](<#/doc/numeric/valarray/tanh>) | aplica a função `[std::tanh](<#/doc/numeric/math/tanh>)` a cada elemento de valarray
(modelo de função)
[ sinhsinhfsinhl](<#/doc/numeric/math/sinh>)(C++11)(C++11) | calcula o seno hiperbólico (\\({\small\sinh{x}}\\)sinh(x))
(função)
[ sinh(std::complex)](<#/doc/numeric/complex/sinh>) | calcula o seno hiperbólico de um número complexo (\\({\small\sinh{z}}\\)sinh(z))
(modelo de função)