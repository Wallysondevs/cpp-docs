# std::bit_or

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template< class T >
struct bit_or;
template< class T = void >
struct bit_or;
```

Objeto de função para realizar OR bit a bit. Efetivamente chama operator| no tipo `T`.

### Especializações

A biblioteca padrão fornece uma especialização de `std::bit_or` quando `T` não é especificado, o que permite que os tipos de parâmetro e o tipo de retorno sejam deduzidos. | [ bit_or&lt;void&gt;](<#/doc/utility/functional/bit_or_void>)(C++14) | objeto de função que implementa x | y deduzindo tipos de parâmetro e retorno
(especialização de modelo de classe)
(desde C++14)

### Tipos de membros

Tipo | Definição
---|---
`result_type` (obsoleto desde C++17)(removido desde C++20) | `T`
`first_argument_type` (obsoleto desde C++17)(removido desde C++20) | `T`
`second_argument_type` (obsoleto desde C++17)(removido desde C++20) | `T`
Esses tipos de membros são obtidos através da herança pública de [std::binary_function](<#/doc/utility/functional/binary_function>)<T, T, T>. | (ate C++11)

### Funções de membro

operator() | retorna o resultado do OR bit a bit de dois argumentos
(função de membro pública)

## std::bit_or::operator()

T operator()( const T& lhs, const T& rhs ) const; | | (constexpr desde C++14)

Retorna o resultado do OR bit a bit de lhs e rhs.

### Parâmetros

- **lhs, rhs** — valores para calcular o OR bit a bit

### Valor de retorno

O resultado de lhs | rhs.

### Exceções

Pode lançar exceções definidas pela implementação.

### Possível implementação
```cpp
    constexpr T operator()(const T& lhs, const T& rhs) const
    {
        return lhs | rhs;
    }
```

---

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 660](<https://cplusplus.github.io/LWG/issue660>) | C++98 | objetos de função para operações bit a bit estão faltando | adicionado