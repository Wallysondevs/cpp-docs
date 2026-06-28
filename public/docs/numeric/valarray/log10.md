# std::log10(std::valarray)

Definido no cabeçalho `[<valarray>](<#/doc/header/valarray>)`

```c
template< class T >
valarray<T> log10( const valarray<T>& va );
```

Para cada elemento em va, calcula o logaritmo comum (base 10) do valor do elemento.

### Parâmetros

- **va** — array de valores para aplicar a operação

### Valor de retorno

Array de valores contendo os logaritmos comuns dos valores em va.

### Notas

A função não qualificada (log10) é usada para realizar o cálculo. Se tal função não estiver disponível, [std::log10](<#/doc/numeric/math/log10>) é usada devido à [pesquisa dependente de argumento](<#/doc/language/adl>).

A função pode ser implementada com um tipo de retorno diferente de [std::valarray](<#/doc/numeric/valarray>). Neste caso, o tipo de substituição possui as seguintes propriedades:

*   Todas as funções membro const de [std::valarray](<#/doc/numeric/valarray>) são fornecidas.
*   [std::valarray](<#/doc/numeric/valarray>), [std::slice_array](<#/doc/numeric/valarray/slice_array>), [std::gslice_array](<#/doc/numeric/valarray/gslice_array>), [std::mask_array](<#/doc/numeric/valarray/mask_array>) e [std::indirect_array](<#/doc/numeric/valarray/indirect_array>) podem ser construídos a partir do tipo de substituição.
*   Para cada função que recebe um const [std::valarray](<#/doc/numeric/valarray>)&lt;T&gt;&, exceto [`begin()`](<#/doc/numeric/valarray/begin2>) e [`end()`](<#/doc/numeric/valarray/end2>)(desde C++11), funções idênticas que recebem os tipos de substituição devem ser adicionadas;
*   Para cada função que recebe dois argumentos const [std::valarray](<#/doc/numeric/valarray>)&lt;T&gt;&, funções idênticas que recebem cada combinação de const [std::valarray](<#/doc/numeric/valarray>)&lt;T&gt;& e tipos de substituição devem ser adicionadas.
*   O tipo de retorno não adiciona mais de dois níveis de aninhamento de template sobre o tipo de argumento mais profundamente aninhado.

### Possível implementação
```cpp
    template<class T>
    valarray<T> log10(const valarray<T>& va)
    {
        valarray<T> other = va;
        for (T& i : other)
            i = log10(i);
    
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
    
    void show(char const* title, const std::valarray<float>& va)
    {
        std::cout << title << " : " << std::right;
        for (float x : va)
            std::cout << std::setw(6) << x;
        std::cout << '\n';
    }
    
    int main()
    {
        const std::valarray<float> n{-2.f, -1.f, 0.f, 1.f, 2.f, 3.f, INFINITY};
        const std::valarray<float> pow10{std::pow(10.f, n)};
        const std::valarray<float> log10_pow10{std::log10(pow10)};
    
        show("n      ", n);
        show("10ⁿ    ", pow10);
        show("lg(10ⁿ)", log10_pow10);
    }
```

Saída:
```
    n       :     -2    -1     0     1     2     3   inf
    10ⁿ     :   0.01   0.1     1    10   100  1000   inf
    lg(10ⁿ) :     -2    -1     0     1     2     3   inf
```

### Veja também

[ log(std::valarray)](<#/doc/numeric/valarray/log>) | aplica a função [std::log](<#/doc/numeric/math/log>) a cada elemento de valarray
(modelo de função)
[ log10log10flog10l](<#/doc/numeric/math/log10>)(C++11)(C++11) | calcula o logaritmo comum (base 10) (\\({\small\log_{10}{x}}\\)log10(x))
(função)
[ log10(std::complex)](<#/doc/numeric/complex/log10>) | logaritmo comum complexo com os cortes de ramo ao longo do eixo real negativo
(modelo de função)