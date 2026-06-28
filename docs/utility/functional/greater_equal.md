# std::greater_equal

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template< class T >
struct greater_equal;
template< class T = void >
struct greater_equal;
```

Objeto de função para realizar comparações. O template principal invoca operator>= no tipo `T`.

### Especializações

[ greater_equal&lt;void&gt;](<#/doc/utility/functional/greater_equal_void>)(C++14) | objeto de função que implementa x >= y deduzindo tipos de parâmetro e retorno
(especialização de template de classe)

### Tipos de Membro

Tipo | Definição
---|---
`result_type` (obsoleto desde C++17)(removido desde C++20) | bool
`first_argument_type` (obsoleto desde C++17)(removido desde C++20) | `T`
`second_argument_type` (obsoleto desde C++17)(removido desde C++20) | `T`
Esses tipos de membro são obtidos através da herança pública de [std::binary_function](<#/doc/utility/functional/binary_function>)<T, T, bool>. | (ate C++11)

### Funções de Membro

operator() | verifica se o primeiro argumento é _maior_ ou _igual_ ao segundo
(função de membro pública)

## std::greater_equal::operator()

bool operator()( const T& lhs, const T& rhs ) const; | | (constexpr desde C++14)

Verifica se lhs é _maior_ ou _igual_ a rhs.

### Parâmetros

- **lhs, rhs** — valores para comparar

### Valor de retorno

lhs >= rhs.

Se `T` for um tipo ponteiro, o resultado é consistente com a [ordem total estrita definida pela implementação sobre ponteiros](<#/doc/language/operator_comparison>).

### Exceções

Pode lançar exceções definidas pela implementação.

### Possível implementação
```cpp
    constexpr bool operator()(const T& lhs, const T& rhs) const
    {
        return lhs >= rhs; // assume que a implementação lida com a ordem total de ponteiros
    }
```

---

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2562](<https://cplusplus.github.io/LWG/issue2562>) | C++98 | a ordem total de ponteiros pode ser inconsistente | garantido como consistente

### Veja também

[ less](<#/doc/utility/functional/less>) | objeto de função que implementa x < y
(template de classe)
[ ranges::greater_equal](<#/doc/utility/functional/ranges/greater_equal>)(C++20) | objeto de função restrito que implementa x >= y
(classe)