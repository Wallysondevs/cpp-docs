# std::asin(std::valarray)

Definido no cabeçalho `[<valarray>](<#/doc/header/valarray>)`

```c
template< class T >
valarray<T> asin( const valarray<T>& va );
```

Para cada elemento em `va`, calcula o arco seno do valor do elemento.

### Parâmetros

- **va** — array de valores para aplicar a operação

### Valor de retorno

Array de valores contendo os arcos senos dos valores em `va`.

### Notas

A função não qualificada (`asin`) é usada para realizar o cálculo. Se tal função não estiver disponível, [`std::asin`](<#/doc/numeric/math/asin>) é usada devido ao [`argument-dependent lookup`](<#/doc/language/adl>).

A função pode ser implementada com um tipo de retorno diferente de [`std::valarray`](<#/doc/numeric/valarray>). Neste caso, o tipo de substituição possui as seguintes propriedades:

*   Todas as funções membro `const` de [`std::valarray`](<#/doc/numeric/valarray>) são fornecidas.
*   [`std::valarray`](<#/doc/numeric/valarray>), [`std::slice_array`](<#/doc/numeric/valarray/slice_array>), [`std::gslice_array`](<#/doc/numeric/valarray/gslice_array>), [`std::mask_array`](<#/doc/numeric/valarray/mask_array>) e [`std::indirect_array`](<#/doc/numeric/valarray/indirect_array>) podem ser construídos a partir do tipo de substituição.
*   Para cada função que recebe um `const` [`std::valarray`](<#/doc/numeric/valarray>)`<T>&`, exceto [`begin()`](<#/doc/numeric/valarray/begin2>) e [`end()`](<#/doc/numeric/valarray/end2>)(desde C++11), funções idênticas que recebem os tipos de substituição devem ser adicionadas;
*   Para cada função que recebe dois argumentos `const` [`std::valarray`](<#/doc/numeric/valarray>)`<T>&`, funções idênticas que recebem cada combinação de `const` [`std::valarray`](<#/doc/numeric/valarray>)`<T>&` e tipos de substituição devem ser adicionadas.
*   O tipo de retorno não adiciona mais de dois níveis de aninhamento de template sobre o tipo de argumento mais profundamente aninhado.

### Possível implementação
```cpp
    template<class T>
    valarray<T> asin(const valarray<T>& va)
    {
        valarray<T> other = va;
        for (T& i : other)
            i = asin(i);
    
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
        // take common y-values from unit circle
        const double s22 = std::sqrt(2.0) / 2.0;
        const double s32 = std::sqrt(3.0) / 2.0;
        const std::valarray<double> v1 =
            {-1.0, -s32, -s22, -0.5,  0.0,  0.5, s22,  s32,  1.0};
    
        // fill with results of radians to degrees conversion
        const std::valarray<double> v2 = 
            std::asin(v1) * 180.0 / std::numbers::pi;
    
        for (std::cout << std::showpos; double n : v2)
            std::cout << n << "° ";
        std::cout << '\n';
    }
```

Saída:
```
    -90° -60° -45° -30° +0° +30° +45° +60° +90°
```

### Veja também

[ acos(std::valarray)](<#/doc/numeric/valarray/acos>) | aplica a função [`std::acos`](<#/doc/numeric/math/acos>) a cada elemento de valarray
(modelo de função)
[ atan(std::valarray)](<#/doc/numeric/valarray/atan>) | aplica a função [`std::atan`](<#/doc/numeric/math/atan>) a cada elemento de valarray
(modelo de função)
[ atan2(std::valarray)](<#/doc/numeric/valarray/atan2>) | aplica a função [`std::atan2`](<#/doc/numeric/math/atan2>) a um valarray e um valor
(modelo de função)
[ sin(std::valarray)](<#/doc/numeric/valarray/sin>) | aplica a função [`std::sin`](<#/doc/numeric/math/sin>) a cada elemento de valarray
(modelo de função)
[ asinasinfasinl](<#/doc/numeric/math/asin>)(C++11)(C++11) | calcula o arco seno (\\({\small\arcsin{x}}\\)arcsin(x))
(função)
[ asin(std::complex)](<#/doc/numeric/complex/asin>)(C++11) | calcula o arco seno de um número complexo (\\({\small\arcsin{z}}\\)arcsin(z))
(modelo de função)