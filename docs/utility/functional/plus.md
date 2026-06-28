# std::plus

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template< class T >
struct plus;
template< class T = void >
struct plus;
```

Objeto de função para realizar adição. Efetivamente chama operator+ em duas instâncias do tipo `T`.

### Especializações

A biblioteca padrão fornece uma especialização de `std::plus` quando `T` não é especificado, o que permite que os tipos de parâmetro e o tipo de retorno sejam deduzidos. | [ plus&lt;void&gt;](<#/doc/utility/functional/plus_void>)(C++14) | objeto de função implementando x + y deduzindo tipos de parâmetro e retorno
(especialização de template de classe)
(desde C++14)

### Tipos de membro

Tipo | Definição
---|---
`result_type` (obsoleto desde C++17)(removido desde C++20) | `T`
`first_argument_type` (obsoleto desde C++17)(removido desde C++20) | `T`
`second_argument_type` (obsoleto desde C++17)(removido desde C++20) | `T`
Esses tipos de membro são obtidos através da herança pública de [std::binary_function](<#/doc/utility/functional/binary_function>)<T, T, T>. | (até C++11)

### Funções membro

** operator()** | retorna a soma de dois argumentos
(função membro pública)

## std::plus::operator()

T operator()( const T& lhs, const T& rhs ) const; | | (constexpr desde C++14)

Retorna a soma de lhs e rhs.

### Parâmetros

- **lhs, rhs** — valores a somar

### Valor de retorno

O resultado de lhs + rhs.

### Exceções

Pode lançar exceções definidas pela implementação.

### Possível implementação
```cpp
    constexpr T operator()(const T& lhs, const T& rhs) const
    {
        return lhs + rhs;
    }
```

---