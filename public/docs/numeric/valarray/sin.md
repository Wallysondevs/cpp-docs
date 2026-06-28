# std::sin(std::valarray)

Definido no cabeçalho `[<valarray>](<#/doc/header/valarray>)`

```c
template< class T >
valarray<T> sin( const valarray<T>& va );
```

Para cada elemento em `va`, calcula o seno do valor do elemento.

### Parâmetros

- **va** — array de valores para aplicar a operação

### Valor de retorno

Array de valores contendo o seno dos valores em `va`.

### Notas

A função não qualificada (`sin`) é usada para realizar o cálculo. Se tal função não estiver disponível, [std::sin](<#/doc/numeric/math/sin>) é usada devido à [pesquisa dependente de argumento](<#/doc/language/adl>).

A função pode ser implementada com um tipo de retorno diferente de [std::valarray](<#/doc/numeric/valarray>). Neste caso, o tipo de substituição possui as seguintes propriedades:

*   Todas as funções membro `const` de [std::valarray](<#/doc/numeric/valarray>) são fornecidas.
*   [std::valarray](<#/doc/numeric/valarray>), [std::slice_array](<#/doc/numeric/valarray/slice_array>), [std::gslice_array](<#/doc/numeric/valarray/gslice_array>), [std::mask_array](<#/doc/numeric/valarray/mask_array>) e [std::indirect_array](<#/doc/numeric/valarray/indirect_array>) podem ser construídos a partir do tipo de substituição.
*   Para cada função que recebe um `const [std::valarray](<#/doc/numeric/valarray>)<T>&`, exceto [`begin()`](<#/doc/numeric/valarray/begin2>) e [`end()`](<#/doc/numeric/valarray/end2>)(desde C++11), funções idênticas que recebem os tipos de substituição devem ser adicionadas;
*   Para cada função que recebe dois argumentos `const [std::valarray](<#/doc/numeric/valarray>)<T>&`, funções idênticas que recebem cada combinação de `const [std::valarray](<#/doc/numeric/valarray>)<T>&` e tipos de substituição devem ser adicionadas.
*   O tipo de retorno não adiciona mais de dois níveis de aninhamento de template sobre o tipo de argumento mais profundamente aninhado.

### Possível implementação
```cpp
    template<class T>
    valarray<T> sin(const valarray<T>& va)
    {
        valarray<T> other = va;
        for (T& i : other)
            i = sin(i);
    
        return other; // proxy object may be returned
    }
```

---

### Exemplo

Execute este código
```cpp
    #include <cmath>
    #include <iostream>
    #include <numbers>
    #include <valarray>
    
    int main()
    {
        std::valarray<double> v1 = {0, 0.25, 0.5, 0.75, 1};
        std::valarray<double> v2 = std::sin(v1 * std::numbers::pi);
    
        for (double n : v2)
            std::cout << std::fixed << n << ' ';
        std::cout << '\n';
    }
```

Saída:
```
    0.000000 0.707107 1.000000 0.707107 0.000000
```

### Veja também

[ cos(std::valarray)](<#/doc/numeric/valarray/cos>) | aplica a função [std::cos](<#/doc/numeric/math/cos>) a cada elemento de valarray
(modelo de função)
[ tan(std::valarray)](<#/doc/numeric/valarray/tan>) | aplica a função [std::tan](<#/doc/numeric/math/tan>) a cada elemento de valarray
(modelo de função)
[ asin(std::valarray)](<#/doc/numeric/valarray/asin>) | aplica a função [std::asin](<#/doc/numeric/math/asin>) a cada elemento de valarray
(modelo de função)
[ sinsinfsinl](<#/doc/numeric/math/sin>)(C++11)(C++11) | calcula o seno (\\({\small\sin{x}}\\)sin(x))
(função)
[ sin(std::complex)](<#/doc/numeric/complex/sin>) | calcula o seno de um número complexo (\\({\small\sin{z}}\\)sin(z))
(modelo de função)