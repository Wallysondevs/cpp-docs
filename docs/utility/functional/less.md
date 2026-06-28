# std::less

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template< class T >
struct less;
template< class T = void >
struct less;
```

Objeto de função para realizar comparações. O template principal invoca o operator< no tipo `T`.

### Especializações

[ less&lt;void&gt;](<#/doc/utility/functional/less_void>)(C++14) | objeto de função que implementa x < y deduzindo tipos de parâmetro e de retorno
(especialização de template de classe)

### Tipos de membro

Tipo | Definição
---|---
`result_type` (obsoleto desde C++17)(removido desde C++20) | bool
`first_argument_type` (obsoleto desde C++17)(removido desde C++20) | `T`
`second_argument_type` (obsoleto desde C++17)(removido desde C++20) | `T`
Esses tipos de membro são obtidos através da herança pública de [std::binary_function](<#/doc/utility/functional/binary_function>)<T, T, bool>. | (ate C++11)

### Funções de membro

operator() | verifica se o primeiro argumento é _menor_ que o segundo
(função de membro pública)

## std::less::operator()

bool operator()( const T& lhs, const T& rhs ) const; | | (constexpr desde C++14)

Verifica se lhs é _menor_ que rhs.

### Parâmetros

- **lhs, rhs** — valores a comparar

### Valor de retorno

lhs < rhs.

Se `T` for um tipo ponteiro, o resultado é consistente com a [ordem total estrita definida pela implementação sobre ponteiros](<#/doc/language/operator_comparison>).

### Exceções

Pode lançar exceções definidas pela implementação.

### Possível implementação
```
    constexpr bool operator()(const T& lhs, const T& rhs) const
    {
        return lhs < rhs; // assumes that the implementation handles pointer total order
    }
```

---

### Exemplo

Execute este código
```
    #include <functional>
     
    template<typename A, typename B, typename C = std::less<>>
    constexpr bool fun(A a, B b, C cmp = C{})
    {
        return cmp(a, b);
    }
     
    static_assert(fun(1, 2) == true);
    static_assert(fun(1.0, 1) == false);
    static_assert(fun(1, 2.0) == true);
    static_assert(std::less<int>{}(5, 5.6) == false);   // 5 < 5 (warn: implicit conversion)
    static_assert(std::less<double>{}(5, 5.6) == true); // 5.0 < 5.6
    static_assert(std::less<int>{}(5.6, 5.7) == false); // 5 < 5 (warn: implicit conversion)
    static_assert(std::less{}(5, 5.6) == true);         // less<void>: 5.0 < 5.6
     
    int main() {}
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2562](<https://cplusplus.github.io/LWG/issue2562>) | C++98 | a ordem total do ponteiro pode ser inconsistente | garantida como consistente

### Veja também

[ equal_to](<#/doc/utility/functional/equal_to>) | objeto de função que implementa x == y
(template de classe)
[ greater](<#/doc/utility/functional/greater>) | objeto de função que implementa x > y
(template de classe)
[ ranges::less](<#/doc/utility/functional/ranges/less>)(C++20) | objeto de função restrito que implementa x < y
(classe)