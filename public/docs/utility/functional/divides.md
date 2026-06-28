# std::divides

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template< class T >
struct divides;
template< class T = void >
struct divides;
```

Objeto de função para realizar divisão. Efetivamente chama operator/ em duas instâncias do tipo `T`.

### Especializações

A standard library fornece uma especialização de `std::divides` quando `T` não é especificado, o que permite que os tipos de parâmetro e o tipo de retorno sejam deduzidos. | [ divides&lt;void&gt;](<#/doc/utility/functional/divides_void>)(C++14) | objeto de função que implementa x / y deduzindo os tipos de parâmetro e de retorno
(especialização de template de classe)
(desde C++14)

### Tipos de membros

Tipo | Definição
---|---
`result_type` (obsoleto desde C++17)(removido desde C++20) | `T`
`first_argument_type` (obsoleto desde C++17)(removido desde C++20) | `T`
`second_argument_type` (obsoleto desde C++17)(removido desde C++20) | `T`
Esses tipos de membros são obtidos através da herança pública de [std::binary_function](<#/doc/utility/functional/binary_function>)<T, T, T>. | (até C++11)

### Funções de membros

operator() | retorna o resultado da divisão do primeiro argumento pelo segundo argumento
(função de membro pública)

## std::divides::operator()

T operator()( const T& lhs, const T& rhs ) const; | | (constexpr desde C++14)

Retorna o resultado da divisão de lhs por rhs.

### Parâmetros

- **lhs, rhs** — valores para dividir um pelo outro

### Valor de retorno

O resultado de lhs / rhs.

### Exceções

Pode lançar exceções definidas pela implementação.

### Possível implementação
```cpp
    constexpr T operator()(const T& lhs, const T& rhs) const
    {
        return lhs / rhs;
    }
```

---