# std::multiplies

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template< class T >
struct multiplies;
template< class T = void >
struct multiplies;
```

Objeto de função para realizar multiplicação. Efetivamente chama operator* em duas instâncias do tipo `T`.

### Especializações

A standard library fornece uma especialização de `std::multiplies` quando `T` não é especificado, o que permite que os tipos de parâmetro e o tipo de retorno sejam deduzidos. | [ multiplies&lt;void&gt;](<#/doc/utility/functional/multiplies_void>)(C++14) | objeto de função que implementa x * y deduzindo tipos de parâmetro e retorno
(especialização de modelo de classe)
(desde C++14)

### Tipos de membros

Tipo | Definição
---|---
`result_type` (obsoleto em C++17)(removido em C++20) | `T`
`first_argument_type` (obsoleto em C++17)(removido em C++20) | `T`
`second_argument_type` (obsoleto em C++17)(removido em C++20) | `T`
Esses tipos de membros são obtidos através da herança pública de [std::binary_function](<#/doc/utility/functional/binary_function>)<T, T, T>. | (até C++11)

### Funções de membro

operator() | retorna o produto de dois argumentos
(função de membro pública)

## std::multiplies::operator()

T operator()( const T& lhs, const T& rhs ) const; | | (constexpr desde C++14)

Retorna o produto de lhs e rhs.

### Parâmetros

- **lhs, rhs** — valores a multiplicar

### Valor de retorno

O resultado de lhs * rhs.

### Exceções

Pode lançar exceções definidas pela implementação.

### Possível implementação
```cpp
    constexpr T operator()(const T& lhs, const T& rhs) const
    {
        return lhs * rhs;
    }
```

---