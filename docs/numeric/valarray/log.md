# std::log(std::valarray)

Definido no cabeçalho `[<valarray>](<#/doc/header/valarray>)`

```c
template< class T >
valarray<T> log( const valarray<T>& va );
```

Para cada elemento em va, calcula o logaritmo natural do valor do elemento.

### Parâmetros

- **va** — array de valores para aplicar a operação

### Valor de retorno

Array de valores contendo os logaritmos naturais dos valores em va.

### Observações

A função não qualificada (log) é usada para realizar o cálculo. Se tal função não estiver disponível, [std::log](<#/doc/numeric/math/log>) é usada devido à [pesquisa dependente de argumento](<#/doc/language/adl>).

A função pode ser implementada com um tipo de retorno diferente de [std::valarray](<#/doc/numeric/valarray>). Neste caso, o tipo de substituição possui as seguintes propriedades:

*   Todas as funções membro const de [std::valarray](<#/doc/numeric/valarray>) são fornecidas.
*   [std::valarray](<#/doc/numeric/valarray>), [std::slice_array](<#/doc/numeric/valarray/slice_array>), [std::gslice_array](<#/doc/numeric/valarray/gslice_array>), [std::mask_array](<#/doc/numeric/valarray/mask_array>) e [std::indirect_array](<#/doc/numeric/valarray/indirect_array>) podem ser construídos a partir do tipo de substituição.
*   Para cada função que recebe um const [std::valarray](<#/doc/numeric/valarray>)&lt;T&gt;&, exceto [`begin()`](<#/doc/numeric/valarray/begin2>) e [`end()`](<#/doc/numeric/valarray/end2>)(desde C++11), funções idênticas que recebem os tipos de substituição devem ser adicionadas;
*   Para cada função que recebe dois argumentos const [std::valarray](<#/doc/numeric/valarray>)&lt;T&gt;&, funções idênticas que recebem cada combinação de const [std::valarray](<#/doc/numeric/valarray>)&lt;T&gt;& e tipos de substituição devem ser adicionadas.
*   O tipo de retorno não adiciona mais de dois níveis de aninhamento de template sobre o tipo de argumento mais profundamente aninhado.

### Possível implementação
```cpp
    template<class T>
    valarray<T> log(const valarray<T>& va)
    {
        valarray<T> other = va;
        for (T& i : other)
            i = log(i);
    
        return other; // proxy object may be returned
    }
```

---

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <valarray>
    
    void show(char const* title, const std::valarray<double>& va)
    {
        std::cout << title << " : " << std::right << std::fixed;
        for (double x : va)
            std::cout << std::setw(10) << x;
        std::cout << '\n';
    }
    
    int main()
    {
        const std::valarray<double> n{0.0, 1.0, 2.0, 3.0};
        const std::valarray<double> exp_n{std::exp(n)};
        const std::valarray<double> log_exp_n{std::log(exp_n)};
    
        show("n      ", n);
        show("eⁿ     ", exp_n);
        show("log(eⁿ)", log_exp_n);
    }
```

Saída:
```
    n      :   0.000000  1.000000  2.000000  3.000000
    eⁿ     :   1.000000  2.718282  7.389056 20.085537
    log(eⁿ):   0.000000  1.000000  2.000000  3.000000
```

### Veja também

[ log10(std::valarray)](<#/doc/numeric/valarray/log10>) | aplica a função [std::log10](<#/doc/numeric/math/log10>) a cada elemento de valarray
(modelo de função)
[ exp(std::valarray)](<#/doc/numeric/valarray/exp>) | aplica a função [std::exp](<#/doc/numeric/math/exp>) a cada elemento de valarray
(modelo de função)
[ loglogflogl](<#/doc/numeric/math/log>)(C++11)(C++11) | calcula o logaritmo natural (base e) (\\({\small\ln{x}}\\)ln(x))
(função)
[ log(std::complex)](<#/doc/numeric/complex/log>) | logaritmo natural complexo com os cortes de ramo ao longo do eixo real negativo
(modelo de função)