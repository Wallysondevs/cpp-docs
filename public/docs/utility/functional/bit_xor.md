# std::bit_xor

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template< class T >
struct bit_xor;
template< class T = void >
struct bit_xor;
```

Objeto de função para realizar XOR bit a bit. Efetivamente chama operator^ no tipo `T`.

### Especializações

A standard library fornece uma especialização de `std::bit_xor` quando `T` não é especificado, o que permite que os tipos de parâmetro e o tipo de retorno sejam deduzidos. | [ bit_xor&lt;void&gt;](<#/doc/utility/functional/bit_xor_void>)(C++14) | objeto de função que implementa x ^ y deduzindo os tipos de parâmetro e retorno
(especialização de template de classe)
(desde C++14)

### Tipos de membros

Tipo | Definição
---|---
`result_type` (obsoleto em C++17)(removido em C++20) | `T`
`first_argument_type` (obsoleto em C++17)(removido em C++20) | `T`
`second_argument_type` (obsoleto em C++17)(removido em C++20) | `T`
Esses tipos de membros são obtidos através da herança pública de [std::binary_function](<#/doc/utility/functional/binary_function>)<T, T, T>. | (até C++11)

### Funções de membro

operator() | retorna o resultado do XOR bit a bit de dois argumentos
(função de membro pública)

## std::bit_xor::operator()

T operator()( const T& lhs, const T& rhs ) const; | | (constexpr desde C++14)

Retorna o resultado do XOR bit a bit de lhs e rhs.

### Parâmetros

- **lhs, rhs** — valores para calcular o XOR bit a bit

### Valor de retorno

O resultado de lhs ^ rhs.

### Exceções

Pode lançar exceções definidas pela implementação.

### Implementação possível
```
    constexpr T operator()(const T& lhs, const T& rhs) const
    {
        return lhs ^ rhs;
    }
```

---

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 660](<https://cplusplus.github.io/LWG/issue660>) | C++98 | objetos de função para operações bit a bit estão faltando | adicionado