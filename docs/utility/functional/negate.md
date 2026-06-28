# std::negate

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template< class T >
struct negate;
template< class T = void >
struct negate;
```

Objeto de função para realizar a negação. Efetivamente chama operator- em uma instância do tipo `T`.

### Especializações

A standard library fornece uma especialização de `std::negate` quando `T` não é especificado, o que permite que os tipos de parâmetro e o tipo de retorno sejam deduzidos. | [ negate&lt;void&gt;](<#/doc/utility/functional/negate_void>)(C++14) | objeto de função que implementa -x deduzindo tipos de parâmetro e de retorno
(especialização de template de classe)
(desde C++14)

### Tipos de membro

Tipo | Definição
---|---
`result_type` (obsoleto em C++17)(removido em C++20) | `T`
`argument_type` (obsoleto em C++17)(removido em C++20) | `T`
Esses tipos de membro são obtidos através da herança pública de [std::unary_function](<#/doc/utility/functional/unary_function>)<T, T>. | (ate C++11)

### Funções de membro

operator() | retorna a negação do argumento
(função de membro pública)

## std::negate::operator()

T operator()( const T& arg ) const; | | (constexpr desde C++14)

Retorna a negação de arg.

### Parâmetros

- **arg** — valor para calcular a negação

### Valor de retorno

O resultado de -arg.

### Exceções

Pode lançar exceções definidas pela implementação.

### Implementação possível
```cpp
    constexpr T operator()(const T& arg) const 
    {
        return -arg;
    }
```

---