# std::abs(std::valarray)

Definido no cabeçalho `[<valarray>](<#/doc/header/valarray>)`

```c
template< class T >
valarray<T> abs( const valarray<T>& va );
```

Calcula o valor absoluto de cada elemento no array de valores.

### Parâmetros

- **va** — array de valores para aplicar a operação

### Valor de retorno

Array de valores contendo os valores absolutos dos valores em va.

### Observações

A função não qualificada (abs) é usada para realizar o cálculo. Se tal função não estiver disponível, std::abs é usada devido à [pesquisa dependente de argumento](<#/doc/language/adl>).

A função pode ser implementada com um tipo de retorno diferente de [std::valarray](<#/doc/numeric/valarray>). Neste caso, o tipo de substituição possui as seguintes propriedades:

*   Todas as funções membro const de [std::valarray](<#/doc/numeric/valarray>) são fornecidas.
*   [std::valarray](<#/doc/numeric/valarray>), [std::slice_array](<#/doc/numeric/valarray/slice_array>), [std::gslice_array](<#/doc/numeric/valarray/gslice_array>), [std::mask_array](<#/doc/numeric/valarray/mask_array>) e [std::indirect_array](<#/doc/numeric/valarray/indirect_array>) podem ser construídos a partir do tipo de substituição.
*   Para cada função que recebe um const [std::valarray](<#/doc/numeric/valarray>)&lt;T&gt;&, exceto [`begin()`](<#/doc/numeric/valarray/begin2>) e [`end()`](<#/doc/numeric/valarray/end2>)(desde C++11), funções idênticas que recebem os tipos de substituição devem ser adicionadas;
*   Para cada função que recebe dois argumentos const [std::valarray](<#/doc/numeric/valarray>)&lt;T&gt;&, funções idênticas que recebem cada combinação de const [std::valarray](<#/doc/numeric/valarray>)&lt;T&gt;& e tipos de substituição devem ser adicionadas.
*   O tipo de retorno não adiciona mais de dois níveis de aninhamento de template sobre o tipo de argumento mais profundamente aninhado.

### Possível implementação
```cpp
    template<class T>
    valarray<T> abs(const valarray<T>& va)
    {
        valarray<T> other = va;
        for (T& i : other)
            i = abs(i);
    
        return other; // proxy object may be returned
    }
```

---

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <valarray>
    
    int main()
    {
        std::valarray<int> v{1, -2, 3, -4, 5, -6, 7, -8};
        std::valarray<int> v2 = std::abs(v);
        for (auto n : v2)
            std::cout << n << ' ';
        std::cout << '\n';
    }
```

Saída:
```
    1 2 3 4 5 6 7 8
```

### Veja também

[ abs(int)labsllabs](<#/doc/numeric/math/abs>)(C++11) | calcula o valor absoluto de um valor integral (\\(\small{|x|}\\)|x|)
(função)
[ abs(float)fabsfabsffabsl](<#/doc/numeric/math/fabs>)(C++11)(C++11) | valor absoluto de um valor de ponto flutuante (\\(\small{|x|}\\)|x|)
(função)
[ abs(std::complex)](<#/doc/numeric/complex/abs>) | retorna a magnitude de um número complexo
(template de função)