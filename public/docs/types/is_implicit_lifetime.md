# std::is_implicit_lifetime

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct is_implicit_lifetime;
```

`std::is_implicit_lifetime` é um [UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>).

Se `T` for um [tipo de tempo de vida implícito](<#/doc/named_req/ImplicitLifetimeType>), fornece o membro constante `value` igual a `true`. Para qualquer outro tipo, `value` é `false`.

O comportamento é indefinido se `T` for um tipo incompleto diferente de um tipo array ou `void` (possivelmente cv-qualificado).

Se o programa adicionar especializações para `std::is_implicit_lifetime` ou `std::is_implicit_lifetime_v`, o comportamento é indefinido.

### Parâmetros de template

- **T** — um tipo a ser verificado

### Template de variável auxiliar

```cpp
template< class T >
constexpr bool is_implicit_lifetime_v = is_implicit_lifetime<T>::value;  // (desde C++23)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Membros constantes

value[static] | `true` se `T` for um tipo de tempo de vida implícito, `false` caso contrário
(membro constante estático público)

### Funções membro

operator bool | converte o objeto para `bool`, retorna `value`
(função membro pública)
operator()(C++14) | retorna `value`
(função membro pública)

### Tipos membro

Tipo | Definição
---|---
`value_type` | `bool`
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_is_implicit_lifetime`](<#/doc/feature_test>) | [`202302L`](<#/>) | (C++23) | `std::is_implicit_lifetime`

### Exemplo

Execute este código
```cpp
    // Os seguintes tipos são coletivamente chamados de tipos de tempo de vida implícito:
    // * tipos escalares:
    //     * tipos aritméticos
    //     * tipos de enumeração
    //     * tipos de ponteiro
    //     * tipos de ponteiro para membro
    //     * std::nullptr_t
    // * tipos de classe de tempo de vida implícito
    //     * é um agregado cujo destrutor não é fornecido pelo usuário
    //     * possui pelo menos um construtor elegível trivial e um destrutor trivial,
    //       não deletado
    // * tipos array
    // * versões cv-qualificadas desses tipos.
    #include <type_traits>
    
    static_assert(std::is_implicit_lifetime_v<int>); // tipo aritmético é um tipo escalar
    static_assert(std::is_implicit_lifetime_v<const int>); // tipo escalar cv-qualificado
    
    enum E { e };
    static_assert(std::is_implicit_lifetime_v<E>); // tipo de enumeração é um tipo escalar
    static_assert(std::is_implicit_lifetime_v<int*>); // tipo de ponteiro é um tipo escalar
    static_assert(std::is_implicit_lifetime_v<std::nullptr_t>); // tipo escalar
    
    struct S { int x, y; };
    // S é uma classe de tempo de vida implícito: um agregado sem destrutor fornecido pelo usuário
    static_assert(std::is_implicit_lifetime_v<S>);
    
    static_assert(std::is_implicit_lifetime_v<int S::*>); // ponteiro para membro
    
    struct X { ~X() = delete; };
    // X não é uma classe de tempo de vida implícito devido ao destrutor deletado
    static_assert(!std::is_implicit_lifetime_v<X>);
    
    static_assert(std::is_implicit_lifetime_v<int[8]>); // tipo array
    static_assert(std::is_implicit_lifetime_v<volatile int[8]>); // tipo array cv-qualificado
    
    int main() {}
```

### Veja também

[is_scalar](<#/doc/types/is_scalar>)(C++11) | verifica se um tipo é um tipo escalar
(template de classe)
[is_array](<#/doc/types/is_array>)(C++11) | verifica se um tipo é um tipo array
(template de classe)
[is_aggregate](<#/doc/types/is_aggregate>)(C++17) | verifica se um tipo é um tipo agregado
(template de classe)
[start_lifetime_asstart_lifetime_as_array](<#/doc/memory/start_lifetime_as>)(C++23) | cria implicitamente objetos no armazenamento fornecido com a representação do objeto reutilizada
(template de função)