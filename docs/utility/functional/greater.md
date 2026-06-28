# std::greater

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template< class T >
struct greater;
template< class T = void >
struct greater;
```

Objeto de função para realizar comparações. O template principal invoca operator> no tipo `T`.

### Especializações

[ greater&lt;void&gt;](<#/doc/utility/functional/greater_void>)(C++14) | objeto de função que implementa x > y deduzindo tipos de parâmetro e de retorno
(especialização de template de classe)

### Tipos de membros

Tipo | Definição
---|---
`result_type` (obsoleto em C++17)(removido em C++20) | bool
`first_argument_type` (obsoleto em C++17)(removido em C++20) | `T`
`second_argument_type` (obsoleto em C++17)(removido em C++20) | `T`
Esses tipos de membros são obtidos através da herança pública de [std::binary_function](<#/doc/utility/functional/binary_function>)<T, T, bool>. | (até C++11)

### Funções membro

operator() | verifica se o primeiro argumento é _maior_ que o segundo
(função membro pública)

## std::greater::operator()

bool operator()( const T& lhs, const T& rhs ) const; | | (constexpr desde C++14)

Verifica se lhs é _maior_ que rhs.

### Parâmetros

- **lhs, rhs** — valores a comparar

### Valor de retorno

lhs > rhs.

Se `T` for um tipo ponteiro, o resultado é consistente com a [ordem total estrita definida pela implementação sobre ponteiros](<#/doc/language/operator_comparison>).

### Exceções

Pode lançar exceções definidas pela implementação.

### Possível implementação
```cpp
    constexpr bool operator()(const T& lhs, const T& rhs) const
    {
        return lhs > rhs; // assume que a implementação lida com a ordem total de ponteiros
    }
```

---

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2562](<https://cplusplus.github.io/LWG/issue2562>) | C++98 | a ordem total de ponteiros pode ser inconsistente | garantido ser consistente

### Veja também

[ less](<#/doc/utility/functional/less>) | objeto de função que implementa x < y
(template de classe)
[ ranges::greater](<#/doc/utility/functional/ranges/greater>)(C++20) | objeto de função restrito que implementa x > y
(classe)