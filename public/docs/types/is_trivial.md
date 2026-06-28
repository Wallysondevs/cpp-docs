# std::is_trivial

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct is_trivial;
(obsoleto em C++26)
```

`std::is_trivial` é um [UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>).

Se `T` é um [tipo trivial](<#/doc/named_req/TrivialType>), fornece a constante membro `value` igual a true. Para qualquer outro tipo, `value` é false.

Se [std::remove_all_extents_t](<#/doc/types/remove_all_extents>)&lt;T&gt; é um tipo incompleto e não (possivelmente cv-qualificado) void, o comportamento é indefinido.

Se o programa adicionar especializações para `std::is_trivial` ou `std::is_trivial_v`, o comportamento é indefinido.

### Parâmetros de template

- **T** — um tipo a ser verificado

### Template de variável auxiliar

```cpp
template< class T >
constexpr bool is_trivial_v = is_trivial<T>::value;  // (desde C++17)
(obsoleto em C++26)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se `T` é um tipo trivial, false caso contrário
(constante membro estática pública)

### Funções membro

operator bool | converte o objeto para bool, retorna value
(função membro pública)
operator()(C++14) | retorna value
(função membro pública)

### Tipos membro

Type | Definição
---|---
`value_type` | bool
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>

### Exemplo

Execute este código
```cpp
    #include <type_traits>
    
    struct A { int m; };
    static_assert(std::is_trivial_v<A> == true);
    
    struct B { B() {} };
    static_assert(std::is_trivial_v<B> == false);
    
    // A classe a seguir mostra por que std::is_trivial(_v) pode ser uma armadilha.
    class C
    {
    private:
        C() = default;
    };
    
    static_assert(std::is_trivial_v<C> == true);
    static_assert(std::is_trivially_default_constructible_v<C> == false);
    
    int main() {}
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2015](<https://cplusplus.github.io/LWG/issue2015>) | C++11 | `T` poderia ser um array de tipo de classe incompleto com limite desconhecido | o comportamento é indefinido neste caso

### Veja também

[ is_trivially_copyable](<#/doc/types/is_trivially_copyable>)(C++11) | verifica se um tipo é trivialmente copiável
(template de classe)
[ is_default_constructibleis_trivially_default_constructibleis_nothrow_default_constructible](<#/doc/types/is_default_constructible>)(C++11)(C++11)(C++11) | verifica se um tipo possui um construtor padrão
(template de classe)