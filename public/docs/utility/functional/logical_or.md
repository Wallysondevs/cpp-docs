# std::logical_or

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template< class T >
struct logical_or;
template< class T = void >
struct logical_or;
```

Objeto de função para realizar OR lógico (disjunção lógica). Efetivamente chama operator|| no tipo `T`.

### Especializações

A standard library fornece uma especialização de `std::logical_or` quando `T` não é especificado, o que permite que os tipos de parâmetro e o tipo de retorno sejam deduzidos. | [ logical_or&lt;void&gt;](<#/doc/utility/functional/logical_or_void>)(C++14) | objeto de função que implementa x || y deduzindo tipos de parâmetro e retorno
(especialização de template de classe)
(desde C++14)

### Tipos de membro

Tipo | Definição
---|---
`result_type` (obsoleto em C++17)(removido em C++20) | bool
`first_argument_type` (obsoleto em C++17)(removido em C++20) | `T`
`second_argument_type` (obsoleto em C++17)(removido em C++20) | `T`
Esses tipos de membro são obtidos através da herança pública de [std::binary_function](<#/doc/utility/functional/binary_function>)<T, T, bool>. | (até C++11)

### Funções de membro

operator() | retorna o OR lógico dos dois argumentos
(função de membro pública)

## std::logical_or::operator()

bool operator()( const T& lhs, const T& rhs ) const; | | (constexpr desde C++14)

Retorna o OR lógico de lhs e rhs.

### Parâmetros

- **lhs, rhs** — valores para calcular o OR lógico

### Valor de retorno

O resultado de lhs || rhs.

### Exceções

Pode lançar exceções definidas pela implementação.

### Possível implementação
```cpp
    constexpr bool operator()(const T& lhs, const T& rhs) const
    {
        return lhs || rhs;
    }
```

---