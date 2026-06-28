# operator==,!=,&lt;,&lt;=,&gt;,&gt;=(std::valarray)

Definido no cabeçalho `[<valarray>](<#/doc/header/valarray>)`

```c
template< class T >
std::valarray<bool> operator==( const std::valarray<T>& lhs, const std::valarray<T>& rhs );
template< class T >
std::valarray<bool> operator!=( const std::valarray<T>& lhs, const std::valarray<T>& rhs );
template< class T >
std::valarray<bool> operator< ( const std::valarray<T>& lhs, const std::valarray<T>& rhs );
template< class T >
std::valarray<bool> operator<=( const std::valarray<T>& lhs, const std::valarray<T>& rhs );
template< class T >
std::valarray<bool> operator> ( const std::valarray<T>& lhs, const std::valarray<T>& rhs );
template< class T >
std::valarray<bool> operator>=( const std::valarray<T>& lhs, const std::valarray<T>& rhs );
template< class T >
std::valarray<bool> operator==( const typename std::valarray<T>::value_type & lhsv,
const std::valarray<T>& rhs );
template< class T >
std::valarray<bool> operator!=( const typename std::valarray<T>::value_type & lhsv,
const std::valarray<T>& rhs );
template< class T >
std::valarray<bool> operator< ( const typename std::valarray<T>::value_type & lhsv,
const std::valarray<T>& rhs );
template< class T >
std::valarray<bool> operator<=( const typename std::valarray<T>::value_type & lhsv,
const std::valarray<T>& rhs );
template< class T >
std::valarray<bool> operator> ( const typename std::valarray<T>::value_type & lhsv,
const std::valarray<T>& rhs );
template< class T >
std::valarray<bool> operator>=( const typename std::valarray<T>::value_type & lhsv,
const std::valarray<T>& rhs );
template< class T >
std::valarray<bool> operator==( const std::valarray<T>& lhs,
const typename std::valarray<T>::value_type & rhsv );
template< class T >
std::valarray<bool> operator!=( const std::valarray<T>& lhs,
const typename std::valarray<T>::value_type & rhsv );
template< class T >
std::valarray<bool> operator< ( const std::valarray<T>& lhs,
const typename std::valarray<T>::value_type & rhsv );
template< class T >
std::valarray<bool> operator<=( const std::valarray<T>& lhs,
const typename std::valarray<T>::value_type & rhsv );
template< class T >
std::valarray<bool> operator> ( const std::valarray<T>& lhs,
const typename std::valarray<T>::value_type & rhsv );
template< class T >
std::valarray<bool> operator>=( const std::valarray<T>& lhs,
const typename std::valarray<T>::value_type & rhsv );
```

Compara cada valor dentro do array numérico com outro valor.

1) Retorna um array numérico de `bool` contendo elementos, cada um obtido pela aplicação do operador de comparação indicado aos valores correspondentes de `lhs` e `rhs`.

O comportamento é indefinido se `size() != v.size()`.

2) Retorna um array numérico de `bool` contendo elementos, cada um obtido pela aplicação do operador de comparação indicado a `lhsv` e ao valor correspondente de `rhs`.

3) Retorna um array numérico de `bool` contendo elementos, cada um obtido pela aplicação do operador de comparação indicado ao valor correspondente de `lhs` e `rhsv`.

### Parâmetros

- **lhs, rhs** — arrays numéricos para comparar
- **lhsv, rhsv** — valores para comparar com cada elemento dentro de um array numérico

### Valor de retorno

Um array numérico de `bool` contendo os resultados da comparação dos elementos correspondentes.

### Exceções

Pode lançar exceções definidas pela implementação.

### Observações

Cada um dos operadores só pode ser instanciado se os seguintes requisitos forem atendidos:

*   O operador indicado pode ser aplicado ao tipo `T`.
*   O valor resultante pode ser convertido de forma não ambígua para `bool`.

A função pode ser implementada com um tipo de retorno diferente de `std::valarray`. Neste caso, o tipo de substituição possui as seguintes propriedades:

*   Todas as funções membro `const` de `std::valarray` são fornecidas.
*   `std::valarray`, `std::slice_array`, `std::gslice_array`, `std::mask_array` e `std::indirect_array` podem ser construídos a partir do tipo de substituição.
*   Para cada função que recebe um `const std::valarray<T>&`, exceto [`begin()`](<#/doc/numeric/valarray/begin2>) e [`end()`](<#/doc/numeric/valarray/end2>) (desde C++11), funções idênticas que recebem os tipos de substituição devem ser adicionadas;
*   Para cada função que recebe dois argumentos `const std::valarray<T>&`, funções idênticas que recebem cada combinação de `const std::valarray<T>&` e tipos de substituição devem ser adicionadas.
*   O tipo de retorno não adiciona mais de dois níveis de aninhamento de template sobre o tipo de argumento mais profundamente aninhado.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <valarray>
    
    int main()
    {
        // zero all negatives in a valarray
        std::valarray<int> v = {1, -1, 0, -3, 10, -1, -2};
        std::cout << "Before: ";
        for (auto n : v)
            std::cout << n << ' ';
        std::cout << '\n';
        v[v < 0] = 0;
        std::cout << "After: ";
        for (auto n : v)
            std::cout << n << ' ';
        std::cout << '\n';
    
        // convert the valarray<bool> result of == to a single bool
        std::valarray<int> a = {1, 2, 3};
        std::valarray<int> b = {2, 4, 6};
    
        std::cout << "2*a == b is " << std::boolalpha
                  << (2 * a == b).min() << '\n';
    }
```

Saída:
```
    Before: 1 -1 0 -3 10 -1 -2
    After: 1 0 0 0 10 0 0
    2*a == b is true
```

### Relatórios de Defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3074](<https://cplusplus.github.io/LWG/issue3074>) | C++98 | `T` é deduzido tanto do escalar quanto do `valarray` para (2,3), impedindo chamadas de tipos mistos | deduzir `T` apenas do `valarray`